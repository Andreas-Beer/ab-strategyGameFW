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
}
export interface BuildingsConfigData {
  getBuildingMaxLevel(): number;
  findBuildingConfigByTypeId(buildingTypeId: BuildingTypeId): BuildingConfig;
}
