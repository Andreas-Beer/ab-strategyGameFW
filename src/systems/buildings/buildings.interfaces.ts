import { TownId, TownData } from '../../data/playerData/playerData.types';
import {
  BuildingTypeId,
  BuildingConfig,
  BuildingId,
  BuildingData,
} from './buildings.types';

export interface BuildingsPlayerData {
  findTownById(townId: TownId): TownData;
  findBuildingById(buildingId: BuildingId): BuildingData;
  findTownByBuildingId(buildingId: BuildingId): TownData;
  getCurrentActiveTown(): TownData;
}
export interface BuildingsConfigData {
  getBuildingMaxLevel(buildingConfig: BuildingConfig): number;
  findBuildingConfigByTypeId(buildingTypeId: BuildingTypeId): BuildingConfig;
}
