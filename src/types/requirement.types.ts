import { BuildingTypeId } from '../systems/buildings/building.types';
import { ItemTypeId } from './item.types';

export type Requirement =
  | { type: 'playerLevel'; level: number }
  | { type: 'item'; itemTypeId: ItemTypeId; amount?: number }
  | { type: 'building'; buildingTypeId: BuildingTypeId; level: number }
  | { type: 'not-building'; buildingTypeId: BuildingTypeId };
