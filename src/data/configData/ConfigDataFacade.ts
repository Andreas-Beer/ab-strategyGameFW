import {
  BuildingTypeId,
  BuildingConfigData,
} from '../../systems/buildings/types/buildings.types';
import { ConfigData } from './config.types';
import { ItemTypeId, ItemConfig } from '../../types/item.types';
import { UnitTypeId, UnitConfig } from '../../types/units.types';

class ConfigNotFoundError extends Error {
  public name = 'CONFIG_NOT_FOUND_ERROR';
  public level = 'CRITICAL';
}

class ConfigDataFacade {
  constructor(public configData: ConfigData) {}

  findBuildingConfigByTypeId(
    buildingTypeId: BuildingTypeId,
  ): BuildingConfigData {
    const buildingConfig = this.configData.buildings.buildings.find(
      (buildingConfig: BuildingConfigData) =>
        buildingConfig.typeId === buildingTypeId,
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
      (itemConfig: ItemConfig) => itemConfig.typeId === itemTypeId,
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
      (unitConfig: UnitConfig) => unitConfig.typeId === unitTypeId,
    );

    if (!unitConfig) {
      throw new ConfigNotFoundError(
        `config for unit type id: ${unitTypeId} not found`,
      );
    }

    return unitConfig;
  }
}

export { ConfigDataFacade, ConfigNotFoundError };
