import { stackData, TownId } from '../../data/playerData/playerData.types';
import { BuildingPlayerData } from '../buildings/buildings.types';
import { ResourceData } from '../resources/resources.types';

export interface I_RequirementSystemData {
  getPlayerLevel(): number;
  getItems(): stackData;
  getBuildings(townId: TownId): BuildingPlayerData[];
  getResources(townId: TownId): ResourceData[];
}
