import { stackData, TownId } from '../../data/playerData/playerData.types';

export interface I_RequirementSystemData {
  getPlayerLevel(): number;
  getItems(): stackData;
}
