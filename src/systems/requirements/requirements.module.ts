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

export const checkHasResourceAmount: CheckPlayerData<
  ResourceAmountRequirement
> = ({ playerData, requirement, townData }) => {
  const requiredResourceTypeId = requirement.resourceId;
  const requiredREsourceAmount = requirement.amount;
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
  const requiredLevel = requirement.level;
  const passRequirement = currentLevel >= requiredLevel;
  return passRequirement;
};

export const checkHasItem: CheckPlayerData<ItemRequirement> = ({
  playerData,
  requirement,
}) => {
  const requiredItemTypeId = requirement.itemTypeId;
  const requiredItemAmount = requirement.amount ?? 1;
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
  const requiredBuildingTypeId = requirement.buildingTypeId;
  const requiredBuildingLevel = requirement.level;
  const currentBuildings = playerData.getBuildings(townData);

  const filteredBuildings = currentBuildings.filter(
    (building) => building.typeId === requiredBuildingTypeId,
  );
  if (filteredBuildings.length === 0) {
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
  building: checkHasBuilding,
  item: checkHasItem,
  playerLevel: checkHasPlayerLevel,
  resourceAmount: checkHasResourceAmount,
};

export function checkRequirementsAgainstPlayerData({
  playerData,
  requirements,
}: CheckRequirementsAgainstPlayerDataArgs): boolean {
  for (const requirement of requirements) {
    const { type, not } = requirement;
    const townData = playerData.getCurrentActiveTown();
    const checker = requirementTypeCheckerMap[type];
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
