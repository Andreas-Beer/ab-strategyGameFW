import { stackData, TownData } from '../../data/playerData/playerData.types';
import { BuildingData } from '../buildings/buildings.types';
import { ResourcesData } from '../resources/resources.types';

export interface RequirementPlayerData {
  getPlayerLevel(): number;
  getItems(): stackData;
  getBuildings(townData: TownData): BuildingData[];
  getResources(townData: TownData): ResourcesData;
  getCurrentActiveTown(): TownData;
}
