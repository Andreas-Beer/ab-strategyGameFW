import { ErrorLevel, ErrorType, GameError } from '../../types/error.types';

export class BuildingNotEnoughResourcesError
  extends Error
  implements GameError
{
  public name = 'BUILDING';
  public type: ErrorType = 'NOT_ENOUGH_RESOURCES';
  public level: ErrorLevel = 'CRITICAL';

  constructor() {
    super('Not enough resources to build the building');
  }
}
