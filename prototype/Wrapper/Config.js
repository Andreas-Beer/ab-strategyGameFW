export default class Config {
  constructor(config) {
    this._config = config;
  }

  getBuildingConfigByTypeId(buildingTypeId) {
    const buildingConfig = this._config.buildings.find(
      (b) => b.id === buildingTypeId
    );

    if (!buildingConfig) {
      throw Error(
        `[Config_BuildingIdNotFoundError]: A building type id ${buildingTypeId} does not exists`
      );
    }
    return buildingConfig;
  }
}
