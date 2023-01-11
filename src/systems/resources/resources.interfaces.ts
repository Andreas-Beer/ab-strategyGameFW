import { TownData, TownId } from '../../data/playerData/playerData.types';
import { ResourcesData } from './resources.types';

export interface ResourcesPlayerData {
  findTownById(townId: TownId): TownData;
  getGlobalResources(): ResourcesData;
  getCurrentActiveTown(): TownData;
}
