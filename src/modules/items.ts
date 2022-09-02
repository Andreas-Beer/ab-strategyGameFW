class ItemNotFoundError extends Error {
  public type = "ITEM_NOT_FOUND_ERROR";
  public category = "CRITICAL";
}

class ResourceNotFoundError extends Error {
  public type = "RESOURCE_NOT_FOUND_ERROR";
  public category = "CRITICAL";
}

class ResourceNotEnoughAmountError extends Error {
  public type = "RESOURCE_NOT_ENOUGH_AMOUNT";
  public category = "NORMAL";
}

function findItemConfig(itemConfigs: ItemConfig[], itemId: number): Result {
  const foundDefinition = itemConfigs.find((def) => def.id === itemId);
  if (!foundDefinition) {
    return {
      success: false,
      value: new ItemNotFoundError(`The id ${itemId} is not an item`),
    };
  }
  return { success: true, value: foundDefinition };
}

function checkResourceAmount(resources: ResourceData, price: Price): Result {
  const { amount, resourceId } = price;
  const resource = resources[resourceId];

  if (!resource) {
    return {
      success: false,
      value: new ResourceNotFoundError(
        `The id ${resourceId} is not an valid resource`
      ),
    };
  }

  const isLiquid = resource >= amount;
  if (!isLiquid) {
    return {
      success: false,
      value: new ResourceNotEnoughAmountError(
        `The resource ${resourceId}:${resource} is not enough for ${amount}`
      ),
    };
  }

  return { success: true, value: true };
}

function checkLiquidity(resources: ResourceData, prices: Price[]): Result {}

const test = {
  checkResourceAmount,
};

const errors = {
  ItemNotFoundError,
  ResourceNotFoundError,
  ResourceNotEnoughAmountError,
};

export { test, errors, findItemConfig, checkLiquidity };
