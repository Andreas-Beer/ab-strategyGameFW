import { ErrorLevel, ErrorType, GameError } from '../../types/error.types';

export class BuildingNotEnoughResourcesError
  extends Error
  implements GameError
{
  public name = 'BUILDING_NOT_ENOUGH_RESOURCES';
  public type: ErrorType = 'NOT_ENOUGH_RESOURCES';
  public level: ErrorLevel = 'CRITICAL';

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
