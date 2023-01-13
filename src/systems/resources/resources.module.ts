import { AmountCalculator } from '../../helpers/amountCalculator';
import { clamp } from '../../helpers/clamp';
import { ResourceNotFoundError } from './resources.errors';
import { ResourcesPlayerData } from './resources.interfaces';
import { ResourcesData, ResourceId, ResourceData } from './resources.types';

export function findResourceById({
  resourcesPlayerData,
  resourceId,
}: {
  resourcesPlayerData: ResourcesPlayerData;
  resourceId: ResourceId;
}): ResourceData {
  const globalResources = resourcesPlayerData.getGlobalResources();
  const isGlobalResource = resourceId in globalResources;
  if (isGlobalResource) {
    return globalResources[resourceId];
  }

  const townResources = resourcesPlayerData.getCurrentActiveTown().resources;
  const isTownResource = resourceId in townResources;
  if (isTownResource) {
    return townResources[resourceId];
  }

  throw new ResourceNotFoundError(resourceId);
}

export function modifyResourceAmount({
  calculator,
  resourceData,
  options: { shouldIgnoreLimit } = {},
}: {
  calculator: AmountCalculator;
  resourceData: ResourceData;
  options?: { shouldIgnoreLimit?: boolean };
}) {
  const newAmount = calculator(resourceData.amount);
  const clampedAmount = clamp(newAmount, {
    max: resourceData.max,
  });
  resourceData.amount = shouldIgnoreLimit ? newAmount : clampedAmount;
}

export function modifyMaxResourceLimit({
  calculator,
  resourcesData,
  resourceId,
}: {
  calculator: AmountCalculator;
  resourcesData: ResourcesData;
  resourceId: ResourceId;
}) {
  const resource = findResourceById({ resourcesData, resourceId });
  const newAmount = calculator(resource.max || 0);
  resource.max = newAmount;
}
