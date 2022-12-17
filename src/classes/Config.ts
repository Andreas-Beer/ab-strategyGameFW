import { getConfig } from '../data/configData';

class ConfigNotFoundError extends Error {
  public type = 'CONFIG_NOT_FOUND_ERROR';
  public category = 'CRITICAL';
}

class Config {
  constructor(private configData: ConfigData = getConfig()) {}

  findBuildingConfigByTypeId(
    buildingTypeId: BuildingTypeId,
  ): Result<BuildingConfig, ConfigNotFoundError> {
    const buildingConfig = this.configData.buildings.buildings.find(
      (buildingConfig) => buildingConfig.typeId === buildingTypeId,
    );

    if (!buildingConfig) {
      return {
        success: false,
        value: new ConfigNotFoundError(
          `config for building type id: ${buildingTypeId} not found`,
        ),
      };
    }

    return { success: true, value: buildingConfig };
  }

  findItemConfigByTypeId(
    buildingTypeId: ItemTypeId,
  ): Result<ItemConfig, ConfigNotFoundError> {
    const itemConfig = this.configData.items.find(
      (itemConfig) => itemConfig.typeId === buildingTypeId,
    );

    if (!itemConfig) {
      return {
        success: false,
        value: new ConfigNotFoundError(
          `config for item type id: ${buildingTypeId} not found`,
        ),
      };
    }

    return { success: true, value: itemConfig };
  }
}

export { Config, ConfigNotFoundError };
