import { ConfigData } from '../types/config.types';
import { BuildingTypeId, BuildingConfig } from '../types/building.types';
import { ItemTypeId, ItemConfig } from '../types/item.types';
import { UnitTypeId, UnitConfig } from '../types/units.types';

import { getConfig } from '../data/configData';

class ConfigNotFoundError extends Error {
  public name = 'CONFIG_NOT_FOUND_ERROR';
  public category = 'CRITICAL';
}

class Config {
  constructor(private configData: ConfigData = getConfig()) {}

  findBuildingConfigByTypeId(buildingTypeId: BuildingTypeId): BuildingConfig {
    const buildingConfig = this.configData.buildings.buildings.find(
      (buildingConfig) => buildingConfig.typeId === buildingTypeId,
    );

    if (!buildingConfig) {
      throw new ConfigNotFoundError(
        `config for building type id: ${buildingTypeId} not found`,
      );
    }

    return buildingConfig;
  }

  findItemConfigByTypeId(itemTypeId: ItemTypeId): ItemConfig {
    const itemConfig = this.configData.items.find(
      (itemConfig) => itemConfig.typeId === itemTypeId,
    );

    if (!itemConfig) {
      throw new ConfigNotFoundError(
        `config for item type id: ${itemTypeId} not found`,
      );
    }

    return itemConfig;
  }

  findUnitConfigByTypeId(unitTypeId: UnitTypeId): UnitConfig {
    const unitConfig = this.configData.units.find(
      (itemConfig) => itemConfig.typeId === unitTypeId,
    );

    if (!unitConfig) {
      throw new ConfigNotFoundError(
        `config for unit type id: ${unitTypeId} not found`,
      );
    }

    return unitConfig;
  }
}

export { Config, ConfigNotFoundError };
