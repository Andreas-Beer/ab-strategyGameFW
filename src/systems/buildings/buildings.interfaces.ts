import { TownId, TownData } from '../../data/playerData/playerData.types';
import {
  BuildingTypeId,
  BuildingConfigData,
  BuildingId,
  BuildingData,
} from './buildings.types';

export interface BuildingsPlayerData {
  findTownById(townId: TownId): TownData;
  findBuildingById(buildingId: BuildingId): BuildingData;
}
export interface BuildingsConfigData {
  findBuildingConfigByTypeId(
    buildingTypeId: BuildingTypeId,
  ): BuildingConfigData;
}
