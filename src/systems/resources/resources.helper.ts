import { clamp } from '../../helpers/clamp';
import { ResourceData } from '../../types/data.types';
import { ResourceId, ResourceLimits } from './resource.types';

// TODO: Check if the limit is reached and should be respected.

class ResourceNotFoundError extends Error {
  public type = 'RESOURCE_NOT_FOUND_ERROR';
  public category = 'CRITICAL';
}

function checkIfResourceExists(data: ResourceData, resourceId: ResourceId) {
  const resourceExists = typeof data[resourceId] !== 'undefined';
  if (!resourceExists) {
    throw new ResourceNotFoundError(
      `Resource with the ID ${resourceId} does not exist.`,
    );
  }
}

function increaseResourceAmount(
  data: ResourceData,
  resourceId: ResourceId,
  amount: number,
  max?: number,
) {
  checkIfResourceExists(data, resourceId);

  const newAmount = data[resourceId] + amount;
  const clampedAmount = clamp(newAmount, { max });
  data[resourceId] = clampedAmount;
}

function decreaseResourceAmount(
  data: ResourceData,
  resourceId: ResourceId,
  amount: number,
  min?: number,
) {
  checkIfResourceExists(data, resourceId);

  const newAmount = data[resourceId] - amount;
  const clampedAmount = clamp(newAmount, { min });
  data[resourceId] = clampedAmount;
}

export {
  ResourceNotFoundError,
  increaseResourceAmount,
  decreaseResourceAmount,
};
