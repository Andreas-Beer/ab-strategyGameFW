import { ItemTypeId } from '../../types/item.types';
import { BuildingLevel, BuildingTypeId } from '../buildings/buildings.types';
import { ResourceTypeId } from '../resources/resources.types';

type RequirementNegator = { not?: boolean };

export type RequirementKey =
  | 'resourceAmount'
  | 'playerLevel'
  | 'item'
  | 'building';

export type ResourceAmountRequirement = RequirementNegator & {
  type: 'has/resources';
  data: {
    resourceTypeId: ResourceTypeId;
    amount: number;
    global?: boolean;
  };
};

export type PlayerLevelRequirement = RequirementNegator & {
  type: 'has/playerLevel';
  data: {
    playerLevel: number;
  };
};

export type ItemRequirement = RequirementNegator & {
  type: 'has/item';
  data: {
    itemTypeId: ItemTypeId;
    amount: number;
  };
};

export type BuildingRequirement = RequirementNegator & {
  type: 'has/building';
  data: {
    buildingTypeId: BuildingTypeId;
    buildingLevel: BuildingLevel;
    amount: number;
    global?: boolean;
  };
};

export type ImpossibleRequirement = RequirementNegator & {
  type: 'theImpossible';
};

export type Requirement =
  | ImpossibleRequirement
  | PlayerLevelRequirement
  | ItemRequirement
  | BuildingRequirement
  | ResourceAmountRequirement;
