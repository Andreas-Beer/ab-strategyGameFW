import { TaskQueue } from '../../classes/TaskQueue';
import { ConfigDataFacade } from '../../data/configData/ConfigDataFacade';
import { TownId } from '../../data/playerData/playerData.types';
import { PlayerDataFacade } from '../../data/playerData/PlayerDataFacade';
import { BaseSystem } from '../base';
import { RequirementsSystem } from '../requirements/Requirements.system';
import { ResourcesSystem } from '../resources';
import { buildBuilding } from './buildings.module';
import { BuildingTownPosition, BuildingTypeId } from './buildings.types';

export class BuildingsSystem extends BaseSystem {
  constructor(
    configDataFacade: ConfigDataFacade,
    playerDataFacade: PlayerDataFacade,
    private resourcesSystem: ResourcesSystem,
    private requirementSystem: RequirementsSystem,
    private taskQueue: TaskQueue,
  ) {
    super(configDataFacade, playerDataFacade);
  }

  build(
    buildingTypeId: BuildingTypeId,
    buildingTownPosition: BuildingTownPosition,
    townId: TownId,
  ) {
    buildBuilding({
      requirementsSystem: this.requirementSystem,
      resourceSystem: this.resourcesSystem,
      buildingTownPosition,
      buildingConfig:
        this.configDataFacade.findBuildingConfigByTypeId(buildingTypeId),
      townData: this.playerDataFacade.findTownById(townId),
      taskQueue: this.taskQueue,
    });
  }
}
