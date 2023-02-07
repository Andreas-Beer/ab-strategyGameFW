import { ItemTypeId } from '../../types/item.types';
import { BuildingLevel, BuildingTypeId } from '../buildings/buildings.types';
import { ResourceId, ResourceTypeId } from '../resources/resources.types';

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

export type Requirement2 =
  | ({
      type: 'has/building';
      data: {
        buildingTypeId: BuildingTypeId;
        buildingLevel: BuildingLevel;
        amount: number;
        global?: boolean;
      };
    } & RequirementNegator)
  | ({
      type: 'has/resources';
      data: {
        resourceTypeId: ResourceTypeId;
        amount: number;
        global?: boolean;
      };
    } & RequirementNegator)
  | ({
      type: 'has/item';
      data: {
        itemTypeId: ItemTypeId;
        amount: number;
      };
    } & RequirementNegator);
