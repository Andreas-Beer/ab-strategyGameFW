import { ResourceData } from '../../data/playerData/playerData.types';
import { clamp } from '../../helpers/clamp';
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

type increaseAmountDTO = {
  resourceData: ResourceData;
  resourceId: ResourceId;
  amount: number;
  max?: number;
};

type decreaseAmountDTO = {
  resourceData: ResourceData;
  resourceId: ResourceId;
  amount: number;
  min?: number;
};

function increaseResourceAmount({
  resourceData,
  resourceId,
  amount,
  max,
}: increaseAmountDTO) {
  guardResourceExists(resourceData, resourceId);

  const newAmount = resourceData[resourceId] + amount;
  const clampedAmount = clamp(newAmount, { max });
  resourceData[resourceId] = clampedAmount;
}

function decreaseResourceAmount({
  resourceData,
  resourceId,
  amount,
  min,
}: decreaseAmountDTO) {
  guardResourceExists(resourceData, resourceId);

  const newAmount = resourceData[resourceId] - amount;
  const clampedAmount = clamp(newAmount, { min });
  resourceData[resourceId] = clampedAmount;
}

export {
  ResourceNotFoundError,
  increaseResourceAmount,
  decreaseResourceAmount,
};
