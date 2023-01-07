import { TownId, TownData } from '../../data/playerData/playerData.types';
import { BuildingTypeId, BuildingConfigData } from './buildings.types';

export interface BuildingsPlayerData {
  findTownById(townId: TownId): TownData;
}
export interface BuildingsConfigData {
  findBuildingConfigByTypeId(
    buildingTypeId: BuildingTypeId,
  ): BuildingConfigData;
}
