import { clamp } from '../../helpers/clamp';
import { Prices } from '../../types/price.types';
import {
  ResourceDataNotFoundError,
  ResourceNotFoundError,
} from './resources.errors';
import { ResourcesData, ResourceId, ResourceData } from './resources.types';

function guardResourceExists(data: ResourcesData, resourceId: ResourceId) {
  if (!data) {
    throw new ResourceDataNotFoundError();
  }

  const resourceExists = typeof data[resourceId] !== 'undefined';
  if (!resourceExists) {
    throw new ResourceNotFoundError(resourceId);
  }
}

function guardResourceIsAboveZero(newResourceAmount: number) {
  if (newResourceAmount < 0) {
    throw new Error('resource beneath zero');
  }
}

type FindResourceArgs = {
  resourcesData: ResourcesData;
  resourceId: ResourceId;
};

type CheckPriceArgs = {
  resourcesData: ResourcesData;
  prices: Prices;
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

function checkPriceAgainstResources({
  resourcesData,
  prices,
}: CheckPriceArgs): boolean {
  for (const { resourceId, amount } of prices) {
    const resourceInStock = resourcesData[resourceId];
    const resourceAmountInStock = resourceInStock.amount;
    if (resourceAmountInStock < amount) {
      return false;
    }
  }

  return true;
}

function increaseResourceAmount({
  resourcesData,
  resourceId,
  amount,
  options: { shouldIgnoreLimit } = {},
}: ChangeAmountArgs): void {
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
}: ChangeAmountArgs): void {
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
}: ChangeLimitArgs): void {
  const resource = findResource({ resourcesData, resourceId });
  const newAmount = (resource.max || 0) + amount;
  resource.max = newAmount;
}

function decreaseResourceMaxLimit({
  resourcesData,
  resourceId,
  amount,
}: ChangeLimitArgs): void {
  const resource = findResource({ resourcesData, resourceId });
  const newAmount = (resource.max || 0) - amount;
  resource.max = newAmount;
}

export {
  ResourceNotFoundError,
  checkPriceAgainstResources,
  findResource,
  increaseResourceAmount,
  decreaseResourceAmount,
  increaseResourceMaxLimit,
  decreaseResourceMaxLimit,
};
