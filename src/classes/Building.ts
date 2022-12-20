import {
  BuildingConfig,
  BuildingData,
  BuildingTypeId,
} from '../types/building.types';
import { Config } from './Config';

class Building {
  private config: BuildingConfig;

  static hydrateBuilding(config: BuildingData): Building {
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

  private setConfig(config: BuildingData) {}
}

export { Building };
