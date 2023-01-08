import { EventEmitter } from 'stream';
import { Task } from '../../classes/Task';
import { TaskQueue } from '../../classes/TaskQueue';
import { TownId } from '../../data/playerData/playerData.types';
import { RequirementsSystem } from '../requirements/Requirements.system';
import { ResourcesSystem } from '../resources';
import {
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
  payBuildCosts,
  validateBuildingPlace,
} from './buildings.module';
import {
  BuildingData,
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

    payBuildCosts({
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

    this.taskQueue.addTask(
      new Task(levelConfig.duration, () => {
        newBuilding.constructionProgress = 100;
      }),
    );

    return newBuilding;
  }
}
