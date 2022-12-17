import { Config } from './Config';

class Building {
  private config;

  constructor(private typeId: BuildingTypeId) {
    this.config = new Config().findBuildingConfigByTypeId(typeId);
  }
}
