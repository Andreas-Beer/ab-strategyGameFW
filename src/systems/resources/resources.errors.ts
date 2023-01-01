import { ErrorLevel, ErrorType, GameError } from '../../types/error.types';
import { ResourceId } from './resources.types';

export class ResourceNotFoundError extends Error implements GameError {
  public name = 'RESOURCE_NOT_FOUND_ERROR';
  public type: ErrorType = 'NOT_FOUND';
  public level: ErrorLevel = 'CRITICAL';

  constructor(resourceId: ResourceId) {
    super(`Resource with the ID ${resourceId} does not exist.`);
  }
}

export class ResourceDataNotFoundError extends Error implements GameError {
  public name = 'RESOURCE_DATA_NOT_FOUND_ERROR';
  public type: ErrorType = 'NOT_FOUND';
  public level: ErrorLevel = 'UNEXPECTED';

  constructor() {
    super('No Resource Data was found!');
  }
}
