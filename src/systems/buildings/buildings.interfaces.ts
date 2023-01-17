import { TownId, TownData } from '../../data/playerData/playerData.types';
import {
  BuildingTypeId,
  BuildingConfig,
  BuildingId,
  BuildingData,
  BuildingLevel,
} from './buildings.types';

export interface BuildingsPlayerData {
  findTownById(townId: TownId): TownData;
  findBuildingById(buildingId: BuildingId): BuildingData;
  findTownByBuildingId(buildingId: BuildingId): TownData;
  getCurrentActiveTown(): TownData;
}
export interface BuildingsConfigData {
  getBuildingMaxLevel(buildingConfig: BuildingConfig): BuildingLevel;
  findBuildingConfigByTypeId(buildingTypeId: BuildingTypeId): BuildingConfig;
}
