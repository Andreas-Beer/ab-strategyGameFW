class ResourceNotFoundError extends Error {
  public type = 'RESOURCE_NOT_FOUND_ERROR';
  public category = 'CRITICAL';
}
class ResourceNotEnoughAmountError extends Error {
  public type = 'RESOURCE_NOT_ENOUGH_AMOUNT';
  public category = 'NORMAL';
}

function checkResourceAmount(
  resources: ResourceData,
  price: Price,
): Result<boolean, ResourceNotFoundError | ResourceNotEnoughAmountError> {
  const { amount, resourceId } = price;
  const resource = resources[resourceId];

  if (!resource) {
    return {
      success: false,
      value: new ResourceNotFoundError(
        `The id ${resourceId} is not an valid resource`,
      ),
    };
  }

  const isLiquid = resource >= amount;
  if (!isLiquid) {
    return {
      success: false,
      value: new ResourceNotEnoughAmountError(
        `The resource ${resourceId}:${resource} is not enough for ${amount}`,
      ),
    };
  }

  return { success: true, value: true };
}

function checkLiquidity(
  resources: ResourceData,
  prices: Price[],
): Result<boolean, (ResourceNotFoundError | ResourceNotEnoughAmountError)[]> {
  const errors = prices
    .map((price) => checkResourceAmount(resources, price))
    .filter((result) => !result.success)
    .map((result) => result.value);

  if (errors.length === 0) {
    return { success: true, value: true };
  }

  return {
    success: false,
    value: errors as (ResourceNotFoundError | ResourceNotEnoughAmountError)[],
  };
}

const errors = {
  ResourceNotFoundError,
  ResourceNotEnoughAmountError,
};

export { errors, checkLiquidity, checkResourceAmount };
