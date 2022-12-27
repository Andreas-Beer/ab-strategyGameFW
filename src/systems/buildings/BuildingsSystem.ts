import { ConfigDataFacade } from '../../data/configData/ConfigDataFacade';
import { PlayerDataFacade } from '../../data/playerData/PlayerDataFacade';
import { BaseSystem } from '../base';
import { ResourcesSystem } from '../resources';

export class BuildingsSystem extends BaseSystem {
  constructor(
    configData: ConfigDataFacade,
    playerData: PlayerDataFacade,
    private resourcesSystem: ResourcesSystem,
  ) {
    super(configData, playerData);
  }
}
