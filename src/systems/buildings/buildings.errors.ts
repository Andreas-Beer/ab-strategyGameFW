import { ErrorLevel, ErrorType, GameError } from '../../types/error.types';
import { BuildingTownPosition } from './buildings.types';

export class BuildingNotEnoughResourcesError
  extends Error
  implements GameError
{
  public name = 'BUILDING_NOT_ENOUGH_RESOURCES';
  public type: ErrorType = 'NOT_ENOUGH_RESOURCES';
  public level: ErrorLevel = 'WARNING';

  constructor() {
    super('Not enough resources to build the building!');
  }
}

export class BuildingRequirementsNotFulfilledError
  extends Error
  implements GameError
{
  public name = 'BUILDING_REQUIREMENTS_NOT_FULFILLED';
  public type: ErrorType = 'NOT_GATE_PASSED';
  public level: ErrorLevel = 'WARNING';

  constructor() {
    super('The building requirements are not fulfilled!');
  }
}

export class BuildingPlaceNotValidError extends Error implements GameError {
  type: ErrorType = 'NOT_GATE_PASSED';
  level: ErrorLevel = 'WARNING';

  constructor() {
    super('The building place is not valid!');
  }
}

export class BuildingSlotIsNotFreeError extends Error implements GameError {
  type: ErrorType = 'NOT_GATE_PASSED';
  level: ErrorLevel = 'UNEXPECTED';

  constructor(buildingTownPosition: BuildingTownPosition) {
    super(`The Building town position "${buildingTownPosition}" is not free.`);
  }
}

export class BuildingSlotNotFoundError extends Error implements GameError {
  type: ErrorType = 'NOT_FOUND';
  level: ErrorLevel = 'UNEXPECTED';

  constructor(buildingTownPosition: BuildingTownPosition) {
    super(
      `The Building slot position "${buildingTownPosition}" is not a valid building slot.`,
    );
  }
}
