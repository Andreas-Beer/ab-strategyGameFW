import { TownId, TownData } from '../../data/playerData/playerData.types';
import { Prices } from '../../types/price.types';
import { RequirementsSystem } from '../requirements/Requirements.system';
import { ResourceAmountRequirement } from '../requirements/requirements.types';
import { ResourcesSystem } from '../resources';
import {
  BuildingNotEnoughResourcesError,
  BuildingSlotNotFoundError,
  BuildingSlotIsNotFreeError,
} from './buildings.errors';
import { isBuildingUnderConstruction } from './buildings.helpers';
import {
  BuildingCityId,
  BuildingConfigData,
  BuildingTownPosition,
  BuildingData,
  BuildingTypeId,
} from './buildings.types';

let buildingId: BuildingCityId = 0;

export function createUniqueBuildingId() {
  return buildingId++;
}

export function createNewBuilding(
  buildingConfigData: BuildingConfigData,
  buildingCityPosition: BuildingTownPosition,
  id: BuildingCityId,
): BuildingData {
  return {
    typeId: buildingConfigData.typeId,
    id,
    constructionProgress: 0,
    level: 1,
    location: buildingCityPosition,
  };
}

export function payBuildingPrice({
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

export function validateBuildingPlace({
  buildingTypeId,
  buildingTownPosition,
  townData,
}: {
  buildingTypeId: BuildingTypeId;
  buildingTownPosition: BuildingTownPosition;
  townData: TownData;
}): boolean {
  const slotData = townData.buildingSlots.find(
    (slot) => slot.position === buildingTownPosition,
  );
  const isSlotExisting = typeof slotData !== 'undefined';
  if (!isSlotExisting) {
    throw new BuildingSlotNotFoundError(buildingTownPosition);
  }

  const buildingOnSlot = townData.buildings.find(
    (building) => building.location === buildingTownPosition,
  );
  const isBuildingSlotFree = typeof buildingOnSlot === 'undefined';
  if (!isBuildingSlotFree) {
    throw new BuildingSlotIsNotFreeError(buildingTownPosition);
  }

  const typeIsAllowed = slotData?.allowedBuildingTypes.includes(buildingTypeId);

  if (!typeIsAllowed) {
    return false;
  }

  return true;
}

export function checkForFreeParallelBuildingCapacities({
  townData,
}: {
  townData: TownData;
}): boolean {
  const buildParallelCapacity = townData.buildParallelCapacity;
  const buildingsUnderConstruction = townData.buildings.filter(
    isBuildingUnderConstruction,
  );
  const hasFreeParallelBuildingCapacities =
    buildingsUnderConstruction.length < buildParallelCapacity;

  return hasFreeParallelBuildingCapacities;
}
