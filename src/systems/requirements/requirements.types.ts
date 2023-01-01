import { BuildingTypeId } from '../buildings/buildings.types';
import { ItemTypeId } from '../../types/item.types';

export type PlayerLevelRequirement = { type: 'playerLevel'; level: number };
export type ItemRequirement = {
  type: 'item';
  itemTypeId: ItemTypeId;
  amount?: number;
};
export type BuildingRequirement = {
  type: 'building' | 'not-building';
  buildingTypeId: BuildingTypeId;
  level: number;
};

export type Requirement =
  | PlayerLevelRequirement
  | ItemRequirement
  | BuildingRequirement;
