import { clamp } from '../../helpers/clamp';
import { ResourceData } from '../../types/playerData.types';
import { ResourceId, ResourceLimits } from './resource.types';

class ResourceNotFoundError extends Error {
  public type = 'RESOURCE_NOT_FOUND_ERROR';
  public category = 'CRITICAL';
}

function guardResourceExists(data: ResourceData, resourceId: ResourceId) {
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
  guardResourceExists(data, resourceId);

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
  guardResourceExists(data, resourceId);

  const newAmount = data[resourceId] - amount;
  const clampedAmount = clamp(newAmount, { min });
  data[resourceId] = clampedAmount;
}

export {
  ResourceNotFoundError,
  increaseResourceAmount,
  decreaseResourceAmount,
};
