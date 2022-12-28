import { clamp } from '../../helpers/clamp';
import {
  ResourcesData,
  ResourceId,
  ResourceLimits,
  ResourceData,
} from './resources.types';

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

type FindResourceArgs = {
  resourcesData: ResourcesData;
  resourceId: ResourceId;
};

type ChangeAmountArgs = {
  resourcesData: ResourcesData;
  resourceId: ResourceId;
  amount: number;
  options?: { shouldIgnoreLimit?: boolean };
};

type ChangeLimitArgs = {
  resourcesData: ResourcesData;
  resourceId: ResourceId;
  amount: number;
};

function findResource({
  resourcesData,
  resourceId,
}: FindResourceArgs): ResourceData {
  guardResourceExists(resourcesData, resourceId);
  return resourcesData[resourceId];
}

function increaseResourceAmount({
  resourcesData,
  resourceId,
  amount,
  options: { shouldIgnoreLimit } = {},
}: ChangeAmountArgs) {
  const resource = findResource({ resourcesData, resourceId });
  const newAmount = resource.amount + amount;
  const clampedAmount = clamp(newAmount, {
    max: resource.max,
  });
  resource.amount = shouldIgnoreLimit ? newAmount : clampedAmount;
}

function decreaseResourceAmount({
  resourcesData,
  resourceId,
  amount,
  options: { shouldIgnoreLimit } = {},
}: ChangeAmountArgs) {
  const resource = findResource({ resourcesData, resourceId });
  const newAmount = resource.amount - amount;
  const clampedAmount = clamp(newAmount, {
    min: resource.min,
  });
  resource.amount = shouldIgnoreLimit ? newAmount : clampedAmount;
}

function increaseResourceMaxLimit({
  resourcesData,
  resourceId,
  amount,
}: ChangeLimitArgs) {
  const resource = findResource({ resourcesData, resourceId });
  const newAmount = (resource.max || 0) + amount;
  resource.max = newAmount;
}

function decreaseResourceMaxLimit({
  resourcesData,
  resourceId,
  amount,
}: ChangeLimitArgs) {
  const resource = findResource({ resourcesData, resourceId });
  const newAmount = (resource.max || 0) - amount;
  resource.max = newAmount;
}

export {
  ResourceNotFoundError,
  findResource,
  increaseResourceAmount,
  decreaseResourceAmount,
  increaseResourceMaxLimit,
  decreaseResourceMaxLimit,
};
