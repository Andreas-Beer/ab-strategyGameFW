import { TownData } from '../../data/playerData/playerData.types';
import { RequirementPlayerData } from './requirements.interfaces';
import {
  BuildingRequirement,
  ItemRequirement,
  PlayerLevelRequirement,
  Requirement,
  RequirementKey,
  ResourceAmountRequirement,
} from './requirements.types';

type CheckPlayerData<T extends Requirement> = (args: {
  playerData: RequirementPlayerData;
  requirement: T;
  townData: TownData;
}) => boolean;

type CheckRequirementsAgainstPlayerDataArgs = {
  playerData: RequirementPlayerData;
  requirements: Requirement[];
};

export const checkHasResources: CheckPlayerData<ResourceAmountRequirement> = ({
  playerData,
  requirement,
  townData,
}) => {
  const requiredResourceTypeId = requirement.data.resourceTypeId;
  const requiredREsourceAmount = requirement.data.amount;
  const currentResources = playerData.getResources(townData);

  const searchedResource = currentResources[requiredResourceTypeId];
  if (!searchedResource) {
    return false;
  }

  const passRequirement = searchedResource.amount >= requiredREsourceAmount;
  return passRequirement;
};

export const checkHasPlayerLevel: CheckPlayerData<PlayerLevelRequirement> = ({
  playerData,
  requirement,
}) => {
  const currentLevel = playerData.getPlayerLevel();
  const requiredLevel = requirement.data.playerLevel;
  const passRequirement = currentLevel >= requiredLevel;
  return passRequirement;
};

export const checkHasItem: CheckPlayerData<ItemRequirement> = ({
  playerData,
  requirement,
}) => {
  const requiredItemTypeId = requirement.data.itemTypeId;
  const requiredItemAmount = requirement.data.amount;
  const currentItems = playerData.getItems();
  const passRequirement =
    currentItems[requiredItemTypeId] >= requiredItemAmount;
  return passRequirement;
};

export const checkHasBuilding: CheckPlayerData<BuildingRequirement> = ({
  playerData,
  requirement,
  townData,
}) => {
  const requiredBuildingTypeId = requirement.data.buildingTypeId;
  const requiredBuildingLevel = requirement.data.buildingLevel;
  const requiredBuildingAmount = requirement.data.amount;
  const currentBuildings = playerData.getBuildings(townData);

  const filteredBuildings = currentBuildings.filter(
    (building) =>
      building.buildingTypeId === requiredBuildingTypeId &&
      building.level >= requiredBuildingLevel,
  );

  const hasRequiredBuilding = filteredBuildings.length > 0;
  if (!hasRequiredBuilding) {
    return false;
  }

  const hasEnoughBuildings = requiredBuildingAmount <= filteredBuildings.length;
  if (!hasEnoughBuildings) {
    return false;
  }

  const hasABuildingAHighEnoughLevel = filteredBuildings.some(
    (building) => building.level >= requiredBuildingLevel,
  );
  if (!hasABuildingAHighEnoughLevel) {
    return false;
  }

  return true;
};

const requirementTypeCheckerMap: {
  [Key in RequirementKey]: CheckPlayerData<Requirement>;
} = {
  'has/building': checkHasBuilding,
  'has/item': checkHasItem,
  'has/playerLevel': checkHasPlayerLevel,
  'has/resources': checkHasResources,
  theImpossible: () => false,
};

export function checkRequirementsAgainstPlayerData({
  playerData,
  requirements,
}: CheckRequirementsAgainstPlayerDataArgs): boolean {
  for (const requirement of requirements) {
    const { type, not = false } = requirement;
    const townData = playerData.getCurrentActiveTown();
    const checker = requirementTypeCheckerMap[type];

    if (!checker) {
      throw new Error(`The requirement type ${type} has no handler`);
    }

    const result = checker({
      playerData,
      requirement,
      townData,
    });

    const modifiedResult = not ? !result : result;

    if (!modifiedResult) {
      return false;
    }
  }

  return true;
}
