import { Config } from './Config';

class Building {
  private config: BuildingConfig;

  static hydrateBuilding(config): Building {
    const building = new Building(config.typeId);
    building.setConfig(config);
    return building;
  }

  constructor(typeId: BuildingTypeId) {
    this.config = new Config().findBuildingConfigByTypeId(typeId);
  }

  update() {}
  downgrade() {}
  destroy() {}

  private setConfig(config) {}
}

export { Building };
