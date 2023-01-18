import { RequirementsSystem } from '../requirements/Requirements.system';
import { Requirement } from '../requirements/requirements.types';
import {
  BuildingHasLowestLevelError,
  BuildingHasReachedMaxLevelError,
  BuildingParallelCapacityNotFree,
  BuildingProcessHasNotYetCompleted,
  BuildingRequirementsNotFulfilledError,
} from './buildings.errors';
import {
  BuildingsConfigData,
  BuildingsPlayerData,
} from './buildings.interfaces';
import {
  checkForFreeParallelBuildingCapacities,
  isBuildingUnderConstruction,
  validateBuildingPlace,
} from './buildings.module';
import {
  BuildingData,
  BuildingTownPosition,
  BuildingTypeId,
} from './buildings.types';

export class BuildingGuard {
  constructor(
    private configData: BuildingsConfigData,
    private playerData: BuildingsPlayerData,
    private requirementsSystem: RequirementsSystem,
  ) {}

  hasCompletedItsProcess(building: BuildingData) {
    const hasCompleteItsProcess = !isBuildingUnderConstruction(building);
    if (!hasCompleteItsProcess) {
      throw new BuildingProcessHasNotYetCompleted();
    }
  }

  hasNotReachedItsMaxLevel(building: BuildingData) {
    const buildingConfig = this.configData.findBuildingConfigByTypeId(
      building.typeId,
    );
    const currentBuildingLevel = building.level;
    const maxLevel = this.configData.getBuildingMaxLevel(buildingConfig);
    const hasReachedTheMaxLevel = currentBuildingLevel >= maxLevel;

    if (hasReachedTheMaxLevel) {
      throw new BuildingHasReachedMaxLevelError();
    }
  }

  hasNotTheLowestLevel(building: BuildingData) {
    const buildingConfig = this.configData.findBuildingConfigByTypeId(
      building.typeId,
    );
    const currentBuildingLevel = building.level;
    const hasTheLowestLevel = currentBuildingLevel === 1;
    if (hasTheLowestLevel) {
      throw new BuildingHasLowestLevelError();
    }
  }

  thereAreFreeParallelCapacities() {
    const currentTownData = this.playerData.getCurrentActiveTown();
    const hasFreeBuildParallelCapacities =
      checkForFreeParallelBuildingCapacities({ townData: currentTownData });
    if (!hasFreeBuildParallelCapacities) {
      throw new BuildingParallelCapacityNotFree();
    }
  }

  hasFulfilledTheRequirements(requirements: Requirement[]) {
    const hasFulfilledTheRequirements =
      this.requirementsSystem.check(requirements);
    if (!hasFulfilledTheRequirements) {
      throw new BuildingRequirementsNotFulfilledError(requirements);
    }
  }

  placeIsValid(
    buildingTypeId: BuildingTypeId,
    buildingTownPosition: BuildingTownPosition,
  ) {
    const currentTownData = this.playerData.getCurrentActiveTown();
    const isBuildingPlaceValid = validateBuildingPlace({
      buildingTypeId,
      buildingTownPosition,
      townData: currentTownData,
    });
  }
}
