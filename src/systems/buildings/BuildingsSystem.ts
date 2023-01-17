import { EventEmitter } from 'stream';
import { EffectBus } from '../../components/EffectEventBus';
import { Task } from '../../components/Task';
import { TaskQueue } from '../../components/TaskQueue';
import { RequirementsSystem } from '../requirements/Requirements.system';
import { ResourcesSystem } from '../resources';
import {
  BuildingsConfigData,
  BuildingsPlayerData,
} from './buildings.interfaces';
import {
  createNewBuilding,
  createUniqueBuildingId,
  payBuildingPrice,
} from './buildings.module';
import {
  guardBuildingHasCompletedItsProcess,
  guardBuildingHasFreeParallelCapacities,
  guardBuildingHasFulfilledTheRequirements,
  guardBuildingHasNotReachedItsMaxLevel,
  guardBuildingPlaceIsValid,
} from './buildings.guards';
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

    guardBuildingHasFreeParallelCapacities(townData);
    guardBuildingHasFulfilledTheRequirements(
      this.requirementsSystem,
      levelConfig.requirements,
    );
    guardBuildingPlaceIsValid(buildingTypeId, buildingTownPosition, townData);

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

    guardBuildingHasCompletedItsProcess(building);
    guardBuildingHasNotReachedItsMaxLevel(currentBuildingLevel, maxLevel);
    guardBuildingHasFreeParallelCapacities(currentTownData);

    // Get next Level Specs
    const nextLevel = (currentBuildingLevel + 1) as BuildingLevel;
    const nextLevelConfig = buildingConfig.levels[nextLevel];
    const nextLevelDuration = nextLevelConfig.duration;
    const nextLevelRequirements = nextLevelConfig.requirements;
    const nextLevelPrice = nextLevelConfig.price;

    guardBuildingHasFulfilledTheRequirements(
      this.requirementsSystem,
      nextLevelRequirements,
    );

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
