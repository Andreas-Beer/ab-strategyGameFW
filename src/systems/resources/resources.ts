import { PlayerData } from '../../types/data.types';
import { Price } from '../../types/price.types';
import { Result } from '../../types/validator.types';

class ResourceNotFoundError extends Error {
  public type = 'RESOURCE_NOT_FOUND_ERROR';
  public category = 'CRITICAL';
}
class ResourceNotEnoughAmountError extends Error {
  public type = 'RESOURCE_NOT_ENOUGH_AMOUNT';
  public category = 'NORMAL';
}

function checkResourceAmount(
  playerData: PlayerData,
  price: Price,
): Result<boolean, ResourceNotFoundError | ResourceNotEnoughAmountError> {
  const { amount, resourceId: resourceIdToCheck } = price;
  const currentResourceAmount = playerData.resources[resourceIdToCheck];

  if (!currentResourceAmount) {
    return {
      success: false,
      value: new ResourceNotFoundError(
        `The id ${resourceIdToCheck} is not an valid resource`,
      ),
    };
  }

  const isLiquid = currentResourceAmount >= amount;
  if (!isLiquid) {
    return {
      success: false,
      value: new ResourceNotEnoughAmountError(
        `The resource ${resourceIdToCheck}:${currentResourceAmount} is not enough for ${amount}`,
      ),
    };
  }

  return { success: true, value: true };
}

function checkLiquidity(
  playerData: PlayerData,
  prices: Price[],
): Result<boolean, (ResourceNotFoundError | ResourceNotEnoughAmountError)[]> {
  const errors = prices
    .map((price) => checkResourceAmount(playerData, price))
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

function decreaseResourceAmount(
  playerData: PlayerData,
  price: Price,
): Result<boolean, ResourceNotFoundError> {
  const { amount: resourceAmount, resourceId } = price;
  const checkResourceAmountResult = checkResourceAmount(playerData, price);

  if (!checkResourceAmountResult.success) {
    return checkResourceAmountResult;
  }

  playerData.resources[resourceId] -= resourceAmount;
  return { success: true, value: true };
}

const errors = {
  ResourceNotFoundError,
  ResourceNotEnoughAmountError,
};

const _test = {
  checkResourceAmount,
};

export { _test, errors, checkLiquidity, decreaseResourceAmount };
