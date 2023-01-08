import { BuildingId } from '../../systems/buildings/buildings.types';
import { ErrorLevel, ErrorType, GameError } from '../../types/error.types';

export class PLayerDataBuildingNotFoundError
  extends Error
  implements GameError
{
  type: ErrorType = 'NOT_FOUND';
  level: ErrorLevel = 'CRITICAL';

  constructor(buildingid: BuildingId) {
    super(`Building with the building id ${buildingid} was not found!`);
  }
}
