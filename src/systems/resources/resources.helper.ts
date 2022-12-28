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

type increaseAmountArgs = {
  resourcesData: ResourcesData;
  resourceId: ResourceId;
  amount: number;
  max?: number;
};

type decreaseAmountArgs = {
  resourcesData: ResourcesData;
  resourceId: ResourceId;
  amount: number;
  min?: number;
};

function increaseResourceAmount({
  resourcesData,
  resourceId,
  amount,
}: increaseAmountArgs) {
  guardResourceExists(resourcesData, resourceId);

  const newAmount = resourcesData[resourceId].amount + amount;
  const clampedAmount = clamp(newAmount, {
    max: resourcesData[resourceId].max,
  });
  resourcesData[resourceId].amount = clampedAmount;
}

function decreaseResourceAmount({
  resourcesData,
  resourceId,
  amount,
}: decreaseAmountArgs) {
  guardResourceExists(resourcesData, resourceId);

  const newAmount = resourcesData[resourceId].amount - amount;
  const clampedAmount = clamp(newAmount, {
    min: resourcesData[resourceId].min,
  });
  resourcesData[resourceId].amount = clampedAmount;
}

export {
  ResourceNotFoundError,
  increaseResourceAmount,
  decreaseResourceAmount,
};
