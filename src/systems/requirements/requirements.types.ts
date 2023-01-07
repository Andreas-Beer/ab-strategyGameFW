import { BuildingTypeId } from '../buildings/types/buildings.types';
import { ItemTypeId } from '../../types/item.types';
import { ResourceId } from '../resources/resources.types';

type RequirementNegator = { not?: boolean };

export type RequirementKey =
  | 'resourceAmount'
  | 'playerLevel'
  | 'item'
  | 'building';

export type ResourceAmountRequirement = RequirementNegator & {
  type: 'resourceAmount';
  resourceId: ResourceId;
  amount: number;
};

export type PlayerLevelRequirement = RequirementNegator & {
  type: 'playerLevel';
  level: number;
};
export type ItemRequirement = RequirementNegator & {
  type: 'item';
  itemTypeId: ItemTypeId;
  amount?: number;
};
export type BuildingRequirement = RequirementNegator & {
  type: 'building';
  buildingTypeId: BuildingTypeId;
  level: number;
};

export type Requirement =
  | PlayerLevelRequirement
  | ItemRequirement
  | BuildingRequirement
  | ResourceAmountRequirement;
