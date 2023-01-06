import { TownData, TownId } from '../../data/playerData/playerData.types';
import { BuildingConfigData, BuildingTypeId } from './buildings.types';

export interface BuildingsPlayerData {
  findTownById(townId: TownId): TownData;
}
export interface BuildingsConfigData {
  findBuildingConfigByTypeId(
    buildingTypeId: BuildingTypeId,
  ): BuildingConfigData;
}
