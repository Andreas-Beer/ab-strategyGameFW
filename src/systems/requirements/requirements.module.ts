import { TownId } from '../../data/playerData/playerData.types';
import { RequirementPlayerData } from './requirements.interfaces';
import {
  BuildingRequirement,
  ItemRequirement,
  PlayerLevelRequirement,
  Requirement,
  RequirementKey,
  ResourceAmountRequirement,
} from './requirements.types';

type CheckPlayerDataFn<T extends Requirement> = (args: {
  playerData: RequirementPlayerData;
  requirement: T;
  townId: TownId;
}) => boolean;

export const checkHasResourceAmount: CheckPlayerDataFn<
  ResourceAmountRequirement
> = ({ playerData, requirement, townId }) => {
  const requiredResourceTypeId = requirement.resourceId;
  const requiredREsourceAmount = requirement.amount;
  const currentResources = playerData.getResources(townId);

  const searchedResource = currentResources[requiredResourceTypeId];
  if (!searchedResource) {
    return false;
  }

  const passRequirement = searchedResource.amount >= requiredREsourceAmount;
  return passRequirement;
};

export const checkHasPlayerLevel: CheckPlayerDataFn<PlayerLevelRequirement> = ({
  playerData,
  requirement,
}) => {
  const currentLevel = playerData.getPlayerLevel();
  const requiredLevel = requirement.level;
  const passRequirement = currentLevel >= requiredLevel;
  return passRequirement;
};

export const checkHasItem: CheckPlayerDataFn<ItemRequirement> = ({
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

export const checkHasBuilding: CheckPlayerDataFn<BuildingRequirement> = ({
  playerData,
  requirement,
  townId,
}) => {
  const requiredBuildingTypeId = requirement.buildingTypeId;
  const requiredBuildingLevel = requirement.level;
  const currentBuildings = playerData.getBuildings(townId);

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

const requirementTypeCheckerMap: Record<
  RequirementKey,
  CheckPlayerDataFn<Requirement>
> = {
  building: checkHasBuilding,
  item: checkHasItem,
  playerLevel: checkHasPlayerLevel,
  resourceAmount: checkHasResourceAmount,
} as Record<RequirementKey, CheckPlayerDataFn<Requirement>>;

type CheckRequirementsAgainstPlayerDataArgs = {
  playerData: RequirementPlayerData;
  requirements: Requirement[];
  townId: TownId;
};

export function checkRequirementsAgainstPlayerData({
  playerData,
  requirements,
  townId,
}: CheckRequirementsAgainstPlayerDataArgs): boolean {
  for (const requirement of requirements) {
    const { type, not } = requirement;
    const checker = requirementTypeCheckerMap[type];
    const result = checker({
      playerData,
      requirement,
      townId,
    });
    const modifiedResult = not ? !result : result;

    if (!modifiedResult) {
      return false;
    }
  }

  return true;
}
