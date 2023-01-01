import { TownData, TownId } from '../../data/playerData/playerData.types';
import { PlayerDataFacade } from '../../data/playerData/PlayerDataFacade';
import { Prices } from '../../types/price.types';
import { RequirementsSystem } from '../requirements/Requirements.system';
import { ResourceAmountRequirement } from '../requirements/requirements.types';
import { ResourcesSystem } from '../resources';
import { BuildingNotEnoughResourcesError } from './buildings.errors';
import {
  BuildingCityId,
  BuildingCityPosition,
  BuildingConfigData,
  BuildingPlayerData,
} from './buildings.types';

type BuildBuildingArguments = {
  resourceSystem: ResourcesSystem;
  requirementsSystem: RequirementsSystem;
  buildingConfig: BuildingConfigData;
  playerDataFacade: PlayerDataFacade;
  townData: TownData;
  buildingCityPosition: BuildingCityPosition;
};

let buildingId: BuildingCityId = 0;

function createUniqueBuildingId() {
  return buildingId++;
}

function createNewBuilding(
  buildingConfigData: BuildingConfigData,
  buildingCityPosition: BuildingCityPosition,
): BuildingPlayerData {
  return {
    typeId: buildingConfigData.typeId,
    id: createUniqueBuildingId(),
    constructionProgress: 0,
    level: 1,
    location: buildingCityPosition,
  };
}

function checkBuildingRequirements({}) {}

function payBuildCosts({
  resourceSystem,
  requirementsSystem,
  buildingPrices,
  townId,
}: {
  requirementsSystem: RequirementsSystem;
  resourceSystem: ResourcesSystem;
  buildingPrices: Prices;
  townId: TownId;
}) {
  const resourceAmountRequirements: ResourceAmountRequirement[] =
    buildingPrices.map((price) => ({ type: 'resourceAmount', ...price }));
  const hasEnoughResource = requirementsSystem.check(
    resourceAmountRequirements,
    townId,
  );

  if (!hasEnoughResource) {
    throw new BuildingNotEnoughResourcesError();
  }

  for (const { amount, resourceId } of buildingPrices) {
    resourceSystem.decreaseAmount(resourceId, amount, { townId });
  }
}

function buildBuilding({
  resourceSystem,
  requirementsSystem,
  buildingConfig,
  playerDataFacade,
  townData,
  buildingCityPosition,
}: BuildBuildingArguments) {
  const fulfillsRequirements = requirementsSystem.check(
    buildingConfig.levels[1].requirements,
    townData.id,
  );

  if (!fulfillsRequirements) {
    throw new Error();
  }

  payBuildCosts({
    resourceSystem,
    requirementsSystem,
    buildingPrices: buildingConfig.levels[1].price,
    townId: townData.id,
  });

  const newBuilding = createNewBuilding(buildingConfig, buildingCityPosition);
  townData.buildings.push(newBuilding);
}

export { buildBuilding, payBuildCosts };
