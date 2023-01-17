import { TownData } from '../../data/playerData/playerData.types';
import {
  BuildingHasReachedMaxLevelError,
  BuildingParallelCapacityNotFree,
  BuildingPlaceNotValidError,
  BuildingProcessHasNotYetCompleted,
  BuildingRequirementsNotFulfilledError,
} from './buildings.errors';
import {
  BuildingData,
  BuildingLevel,
  BuildingTownPosition,
  BuildingTypeId,
} from './buildings.types';
import {
  checkHasCompleteItsProcess,
  checkForFreeParallelBuildingCapacities,
  validateBuildingPlace,
} from './buildings.module';
import { Requirement } from '../requirements/requirements.types';
import { RequirementsSystem } from '../requirements/Requirements.system';

export function guardBuildingHasCompletedItsProcess(building: BuildingData) {
  const hasCompleteItsProcess = checkHasCompleteItsProcess(building);
  if (!hasCompleteItsProcess) {
    throw new BuildingProcessHasNotYetCompleted();
  }
}

export function guardBuildingHasNotReachedItsMaxLevel(
  currentBuildingLevel: BuildingLevel,
  maxLevel: BuildingLevel,
) {
  const hasReachedTheMaxLevel = currentBuildingLevel >= maxLevel;
  if (hasReachedTheMaxLevel) {
    throw new BuildingHasReachedMaxLevelError();
  }
}

export function guardBuildingHasFreeParallelCapacities(
  currentTownData: TownData,
) {
  const hasFreeBuildParallelCapacities = checkForFreeParallelBuildingCapacities(
    { townData: currentTownData },
  );
  if (!hasFreeBuildParallelCapacities) {
    throw new BuildingParallelCapacityNotFree();
  }
}

export function guardBuildingHasFulfilledTheRequirements(
  requirementsSystem: RequirementsSystem,
  requirements: Requirement[],
) {
  const hasFulfilledTheRequirements = requirementsSystem.check(requirements);
  if (!hasFulfilledTheRequirements) {
    throw new BuildingRequirementsNotFulfilledError();
  }
}

export function guardBuildingPlaceIsValid(
  buildingTypeId: BuildingTypeId,
  buildingTownPosition: BuildingTownPosition,
  townData: TownData,
) {
  const isBuildingPlaceValid = validateBuildingPlace({
    buildingTypeId,
    buildingTownPosition,
    townData,
  });
  if (!isBuildingPlaceValid) {
    throw new BuildingPlaceNotValidError();
  }
}
