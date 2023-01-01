import { PlayerDataFacade } from '../../data/playerData/PlayerDataFacade';
import { checkPriceAgainstResources } from '../resources/resources.module';
import { I_RequirementSystemData } from './requirements.interfaces';
import {
  BuildingRequirement,
  ItemRequirement,
  PlayerLevelRequirement,
  Requirement,
} from './requirements.types';

type CheckRequirementsAgainstPlayerDataArgs = {
  playerDataFacade: PlayerDataFacade;
  requirements: Requirement[];
};

type CheckHasRequirementArgs = {
  playerDataFacade: PlayerDataFacade;
};

type CheckPlayerDataFn<T extends Requirement> = ({
  playerData,
  requirement,
}: {
  playerData: I_RequirementSystemData;
  requirement: T;
}) => boolean;

export const checkHasResourceRequirement: CheckPlayerDataFn<
  PlayerLevelRequirement
> = ({ playerData, requirement }) => {};

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
}) => {};

// Kann das hier auch den Resource Check abbliden?
export function checkRequirementsAgainstPlayerData({
  playerDataFacade,
  requirements,
}: CheckRequirementsAgainstPlayerDataArgs): boolean {}
