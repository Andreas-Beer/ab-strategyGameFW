import { TaskQueue } from '../../classes/TaskQueue';
import { TownId } from '../../data/playerData/playerData.types';
import { RequirementsSystem } from '../requirements/Requirements.system';
import { ResourcesSystem } from '../resources';
import {
  BuildingsConfigData,
  BuildingsPlayerData,
} from './buildings.interfaces';
import { buildBuilding } from './buildings.module';
import {
  BuildingPlayerData,
  BuildingTownPosition,
  BuildingTypeId,
} from './buildings.types';

export class BuildingsSystem {
  constructor(
    private configData: BuildingsConfigData,
    private playerData: BuildingsPlayerData,
    private resourcesSystem: ResourcesSystem,
    private requirementSystem: RequirementsSystem,
    private taskQueue: TaskQueue,
  ) {}

  build(
    buildingTypeId: BuildingTypeId,
    buildingTownPosition: BuildingTownPosition,
    townId: TownId,
  ): BuildingPlayerData {
    const newBuilding = buildBuilding({
      requirementsSystem: this.requirementSystem,
      resourceSystem: this.resourcesSystem,
      buildingTownPosition,
      buildingConfig:
        this.configData.findBuildingConfigByTypeId(buildingTypeId),
      townData: this.playerData.findTownById(townId),
      taskQueue: this.taskQueue,
    });

    return newBuilding;
  }
}
