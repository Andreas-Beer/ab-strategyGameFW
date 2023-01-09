import { BuildingsConfigData } from '../../systems/buildings/buildings.interfaces';
import {
  BuildingConfig,
  BuildingTypeId,
} from '../../systems/buildings/buildings.types';
import { ItemConfig, ItemTypeId } from '../../types/item.types';
import { UnitConfig, UnitTypeId } from '../../types/units.types';
import { ConfigData } from './config.types';

class ConfigNotFoundError extends Error {
  public name = 'CONFIG_NOT_FOUND_ERROR';
  public level = 'CRITICAL';
}

class ConfigDataFacade implements BuildingsConfigData {
  constructor(public configData: ConfigData) {}

  getBuildingMaxLevel(): number {
    return this.configData.buildings.buildingsMaxLevel;
  }

  findBuildingConfigByTypeId(buildingTypeId: BuildingTypeId): BuildingConfig {
    const buildingConfig = this.configData.buildings.buildings.find(
      (buildingConfig: BuildingConfig) =>
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
