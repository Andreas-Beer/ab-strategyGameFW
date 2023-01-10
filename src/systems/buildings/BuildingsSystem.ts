import { EventEmitter } from 'stream';
import { Task } from '../../components/Task';
import { TaskQueue } from '../../components/TaskQueue';
import { TownId } from '../../data/playerData/playerData.types';
import { RequirementsSystem } from '../requirements/Requirements.system';
import { ResourcesSystem } from '../resources';
import {
  BuildingHasReachedMaxLevelError,
  BuildingParallelCapacityNotFree,
  BuildingPlaceNotValidError,
  BuildingRequirementsNotFulfilledError,
} from './buildings.errors';
import {
  BuildingsConfigData,
  BuildingsPlayerData,
} from './buildings.interfaces';
import {
  checkForFreeParallelBuildingCapacities,
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
  ) {
    super();
  }

  build(
    buildingTypeId: BuildingTypeId,
    buildingTownPosition: BuildingTownPosition,
    townId: TownId,
  ): BuildingData {
    const newBuildingId = createUniqueBuildingId();
    const townData = this.playerData.findTownById(townId);
    const buildingConfig =
      this.configData.findBuildingConfigByTypeId(buildingTypeId);
    const levelConfig = buildingConfig.levels[1];

    const hasReachedBuildParallelCapacities =
      checkForFreeParallelBuildingCapacities({ townData });
    if (!hasReachedBuildParallelCapacities) {
      throw new BuildingParallelCapacityNotFree();
    }

    const hasFulfilledTheRequirements = this.requirementsSystem.check(
      levelConfig.requirements,
      townId,
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
      townId,
    });

    const newBuilding = createNewBuilding(
      buildingConfig,
      buildingTownPosition,
      newBuildingId,
    );
    townData.buildings.push(newBuilding);

    const finishedTask = new Task(levelConfig.duration, () => {
      newBuilding.constructionProgress = 100;
    });

    this.taskQueue.addTask(finishedTask);

    return newBuilding;
  }

  upgrade(buildingId: BuildingId) {
    const building = this.playerData.findBuildingById(buildingId);
    const currentBuildingLevel = building.level;
    const maxLevel = this.configData.getBuildingMaxLevel();

    const hasReachedTheMaxLevel = currentBuildingLevel >= maxLevel;
    if (hasReachedTheMaxLevel) {
      throw new BuildingHasReachedMaxLevelError();
    }
    const nextLevel = currentBuildingLevel + 1;

    const buildingTypeid = building.typeId;
    const buildingConfig =
      this.configData.findBuildingConfigByTypeId(buildingTypeid);
    const townData = this.playerData.findTownByBuildingId(buildingId);

    const nextLevelPrice = buildingConfig.levels[nextLevel].price;
    const hasReachedBuildParallelCapacities =
      checkForFreeParallelBuildingCapacities({ townData });
    if (!hasReachedBuildParallelCapacities) {
      throw new BuildingParallelCapacityNotFree();
    }

    payBuildingPrice({
      buildingPrices: nextLevelPrice,
      requirementsSystem: this.requirementsSystem,
      resourceSystem: this.resourcesSystem,
      townId: townData.id,
    });

    building.level = nextLevel as BuildingLevel;
  }
}
