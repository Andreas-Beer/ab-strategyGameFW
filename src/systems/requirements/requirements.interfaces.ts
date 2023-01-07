import { stackData, TownId } from '../../data/playerData/playerData.types';
import { BuildingPlayerData } from '../buildings/types/buildings.types';
import { ResourcesData } from '../resources/resources.types';

export interface RequirementPlayerData {
  getPlayerLevel(): number;
  getItems(): stackData;
  getBuildings(townId: TownId): BuildingPlayerData[];
  getResources(townId: TownId): ResourcesData;
}
