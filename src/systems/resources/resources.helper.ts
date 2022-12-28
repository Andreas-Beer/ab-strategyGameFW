import { clamp } from '../../helpers/clamp';
import { ResourcesData, ResourceId, ResourceLimits } from './resource.types';

class ResourceNotFoundError extends Error {
  public type = 'RESOURCE_NOT_FOUND_ERROR';
  public category = 'CRITICAL';
}

function guardResourceExists(data: ResourcesData, resourceId: ResourceId) {
  const resourceExists = typeof data[resourceId] !== 'undefined';
  if (!resourceExists) {
    throw new ResourceNotFoundError(
      `Resource with the ID ${resourceId} does not exist.`,
    );
  }
}

type changeAmountArgs = {
  resourcesData: ResourcesData;
  resourceId: ResourceId;
  amount: number;
  options?: { shouldIgnoreLimit?: boolean };
};

function increaseResourceAmount({
  resourcesData,
  resourceId,
  amount,
  options: { shouldIgnoreLimit } = {},
}: changeAmountArgs) {
  guardResourceExists(resourcesData, resourceId);

  const newAmount = resourcesData[resourceId].amount + amount;
  const clampedAmount = clamp(newAmount, {
    max: resourcesData[resourceId].max,
  });
  resourcesData[resourceId].amount = shouldIgnoreLimit
    ? newAmount
    : clampedAmount;
}

function decreaseResourceAmount({
  resourcesData,
  resourceId,
  amount,
  options: { shouldIgnoreLimit } = {},
}: changeAmountArgs) {
  guardResourceExists(resourcesData, resourceId);

  const newAmount = resourcesData[resourceId].amount - amount;
  const clampedAmount = clamp(newAmount, {
    min: resourcesData[resourceId].min,
  });
  resourcesData[resourceId].amount = shouldIgnoreLimit
    ? newAmount
    : clampedAmount;
}

export {
  ResourceNotFoundError,
  increaseResourceAmount,
  decreaseResourceAmount,
};
