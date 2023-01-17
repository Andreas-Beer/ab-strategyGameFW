import { EventEmitter } from 'stream';
import { EffectBus } from '../../components/EffectEventBus';
import { Task } from '../../components/Task';
import { TaskQueue } from '../../components/TaskQueue';
import { RequirementsSystem } from '../requirements/Requirements.system';
import { ResourcesSystem } from '../resources';
import {
  BuildingHasReachedMaxLevelError,
  BuildingParallelCapacityNotFree,
  BuildingPlaceNotValidError,
  BuildingProcessHasNotYetCompleted,
  BuildingRequirementsNotFulfilledError,
} from './buildings.errors';
import {
  BuildingsConfigData,
  BuildingsPlayerData,
} from './buildings.interfaces';
import {
  checkForFreeParallelBuildingCapacities,
  checkHasCompleteItsProcess,
  createNewBuilding,
  createUniqueBuildingId,
  payBuildingPrice,
  validateBuildingPlace,
} from './buildings.module';
import {
  BuildingData,
  BuildingId,
  BuildingLevel,
  BuildingTownPosition,
  BuildingTypeId,
} from './buildings.types';

export class BuildingsSystem extends EventEmitter {
  constructor(
    private configData: BuildingsConfigData,
    private playerData: BuildingsPlayerData,
    private resourcesSystem: ResourcesSystem,
    private requirementsSystem: RequirementsSystem,
    private taskQueue: TaskQueue,
    private effectBus: EffectBus,
  ) {
    super();
  }

  build(
    buildingTypeId: BuildingTypeId,
    buildingTownPosition: BuildingTownPosition,
  ): BuildingData {
    const newBuildingId = createUniqueBuildingId();
    const buildingConfig =
      this.configData.findBuildingConfigByTypeId(buildingTypeId);
    const townData = this.playerData.getCurrentActiveTown();
    const levelConfig = buildingConfig.levels[1];

    const hasReachedBuildParallelCapacities =
      checkForFreeParallelBuildingCapacities({ townData });
    if (!hasReachedBuildParallelCapacities) {
      throw new BuildingParallelCapacityNotFree();
    }

    const hasFulfilledTheRequirements = this.requirementsSystem.check(
      levelConfig.requirements,
    );
    if (!hasFulfilledTheRequirements) {
      throw new BuildingRequirementsNotFulfilledError();
    }

    const isBuildingPlaceValid = validateBuildingPlace({
      buildingTypeId,
      buildingTownPosition,
      townData,
    });
    if (!isBuildingPlaceValid) {
      throw new BuildingPlaceNotValidError();
    }

    payBuildingPrice({
      resourceSystem: this.resourcesSystem,
      requirementsSystem: this.requirementsSystem,
      buildingPrices: buildingConfig.levels[1].price,
      townData,
    });

    const newBuilding = createNewBuilding(
      buildingConfig,
      buildingTownPosition,
      newBuildingId,
    );
    townData.buildings.push(newBuilding);

    this.taskQueue.addTask(
      new Task(levelConfig.duration, () => {
        newBuilding.constructionProgress = 100;

        const buildingEffects = levelConfig.events.onFinish?.effects || [];
        for (const effect of buildingEffects) {
          this.effectBus.triggerEffect(effect.type, effect.data);
        }
      }),
    );

    return newBuilding;
  }

  upgrade(buildingId: BuildingId) {
    const building = this.playerData.findBuildingById(buildingId);
    const buildingConfig = this.configData.findBuildingConfigByTypeId(
      building.typeId,
    );
    const maxLevel = this.configData.getBuildingMaxLevel(buildingConfig);
    const currentTownData = this.playerData.getCurrentActiveTown();
    const currentBuildingLevel = building.level;

    const hasCompleteItsProcess = checkHasCompleteItsProcess(building);
    if (!hasCompleteItsProcess) {
      throw new BuildingProcessHasNotYetCompleted();
    }

    const hasReachedTheMaxLevel = currentBuildingLevel >= maxLevel;
    if (hasReachedTheMaxLevel) {
      throw new BuildingHasReachedMaxLevelError();
    }

    const hasFreeBuildParallelCapacities =
      checkForFreeParallelBuildingCapacities({ townData: currentTownData });
    if (!hasFreeBuildParallelCapacities) {
      throw new BuildingParallelCapacityNotFree();
    }

    // Get next Level Specs
    const nextLevel = (currentBuildingLevel + 1) as BuildingLevel;
    const nextLevelConfig = buildingConfig.levels[nextLevel];
    const nextLevelDuration = nextLevelConfig.duration;
    const nextLevelRequirements = nextLevelConfig.requirements;
    const nextLevelPrice = nextLevelConfig.price;

    const hasFulfilledTheRequirements = this.requirementsSystem.check(
      nextLevelRequirements,
    );
    if (!hasFulfilledTheRequirements) {
      throw new BuildingRequirementsNotFulfilledError();
    }

    // Pay Building Price
    payBuildingPrice({
      buildingPrices: nextLevelPrice,
      requirementsSystem: this.requirementsSystem,
      resourceSystem: this.resourcesSystem,
      townData: currentTownData,
    });

    // Reset Build Process
    building.constructionProgress = 0;

    // setTimeout for finish Event
    this.taskQueue.addTask(
      new Task(nextLevelDuration, () => {
        // trigger finish event
        building.constructionProgress = 100;
        building.level = nextLevel;
      }),
    );
  }
}
