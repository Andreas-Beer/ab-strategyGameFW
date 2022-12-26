import { ConfigDataFacade } from '../../data/configData/ConfigDataFacade';
import { BuildingsConfig } from '../../types/building.types';

export function getBuildingConfig(
  configFacade: ConfigDataFacade,
): BuildingsConfig {
  return configFacade.configData.buildings;
}
