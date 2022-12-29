import { ResourceId } from './resources.types';

export class ResourceNotFoundError extends Error {
  public type = 'RESOURCE_NOT_FOUND_ERROR';
  public level = 'CRITICAL';

  constructor(resourceId: ResourceId) {
    super(`Resource with the ID ${resourceId} does not exist.`);
  }
}

export class ResourceDataNotFoundError extends Error {
  public type = 'RESOURCE_DATA_NOT_FOUND_ERROR';
  public level = 'UNEXPECTED';

  constructor() {
    super('No Resource Data was found!');
  }
}
