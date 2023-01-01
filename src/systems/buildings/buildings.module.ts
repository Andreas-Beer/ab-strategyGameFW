import { TaskQueue } from '../../classes/TaskQueue';
import { TownData, TownId } from '../../data/playerData/playerData.types';
import { PlayerDataFacade } from '../../data/playerData/PlayerDataFacade';
import { Prices } from '../../types/price.types';
import { RequirementsSystem } from '../requirements/Requirements.system';
import { ResourceAmountRequirement } from '../requirements/requirements.types';
import { ResourcesSystem } from '../resources';
import {
  BuildingNotEnoughResourcesError,
  BuildingRequirementsNotFulfilledError,
} from './buildings.errors';
import {
  BuildingCityId,
  BuildingTownPosition,
  BuildingConfigData,
  BuildingPlayerData,
} from './buildings.types';

let buildingId: BuildingCityId = 0;

function createUniqueBuildingId() {
  return buildingId++;
}

function createNewBuilding(
  buildingConfigData: BuildingConfigData,
  buildingCityPosition: BuildingTownPosition,
): BuildingPlayerData {
  return {
    typeId: buildingConfigData.typeId,
    id: createUniqueBuildingId(),
    constructionProgress: 0,
    level: 1,
    location: buildingCityPosition,
  };
}

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
  townData,
  buildingTownPosition: buildingCityPosition,
  taskQueue,
}: {
  resourceSystem: ResourcesSystem;
  requirementsSystem: RequirementsSystem;
  buildingConfig: BuildingConfigData;
  townData: TownData;
  buildingTownPosition: BuildingTownPosition;
  taskQueue: TaskQueue;
}) {
  const hasFulfilledTheRequirements = requirementsSystem.check(
    buildingConfig.levels[1].requirements,
    townData.id,
  );

  if (!hasFulfilledTheRequirements) {
    throw new BuildingRequirementsNotFulfilledError();
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
