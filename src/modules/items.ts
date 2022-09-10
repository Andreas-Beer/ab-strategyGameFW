import { getConfig } from '../data/configData';

class ItemConfigNotFoundError extends Error {
  public type = 'ITEM_CONFIG_NOT_FOUND_ERROR';
  public category = 'CRITICAL';
}
class ItemNotFoundError extends Error {
  public type = 'ITEM_NOT_FOUND_ERROR';
  public category = 'CRITICAL';
}
class ResourceNotFoundError extends Error {
  public type = 'RESOURCE_NOT_FOUND_ERROR';
  public category = 'CRITICAL';
}
class ResourceNotEnoughAmountError extends Error {
  public type = 'RESOURCE_NOT_ENOUGH_AMOUNT';
  public category = 'NORMAL';
}

function addItem(playerData: PlayerData, itemId: number): Result {
  if (!playerData.items[itemId]) {
    playerData.items[itemId] = 1;
  } else {
    playerData.items[itemId] += 1;
  }

  return { success: true, value: true };
}

function buyItem(playerData: PlayerData, itemId: number): Result {
  const itemConfig = findItemConfig(itemId);
  if (!itemConfig.success) {
    return itemConfig;
  }

  const price = itemConfig.value.price;
  for (const p of price) {
    const { resourceId, amount } = p;
    playerData.resources[resourceId] -= amount;
  }

  addItem(playerData, itemId);
  return { success: true, value: true };
}

function useItem(playerData: PlayerData, itemId: number) {
  return removeItem(playerData, itemId);
}

function removeItem(playerData: PlayerData, itemId: number): Result {
  if (!playerData.items[itemId]) {
    return {
      success: false,
      value: new ItemNotFoundError(
        `the item with the id ${itemId} was not found`,
      ),
    };
  }

  playerData.items[itemId] -= 1;
  if (playerData.items[itemId] === 0) {
    delete playerData.items[itemId];
  }

  return { success: true, value: true };
}

function findItemConfig(itemId: number): Result {
  const itemConfigs = getConfig().items;
  const foundDefinition = itemConfigs.find((def) => def.id === itemId);
  if (!foundDefinition) {
    return {
      success: false,
      value: new ItemConfigNotFoundError(`The id ${itemId} is not an item`),
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

function checkLiquidity(resources: ResourceData, prices: Price[]): Result {
  const errors = prices
    .map((price) => checkResourceAmount(resources, price))
    .filter((result) => !result.success)
    .map((result) => result.value.type);

  if (errors.length === 0) {
    return { success: true, value: true };
  }

  return { success: false, value: errors };
}

const internal = {
  removeItem,
  checkResourceAmount,
  findItemConfig,
  checkLiquidity,
};

const errors = {
  ItemConfigNotFoundError,
  ItemNotFoundError,
  ResourceNotFoundError,
  ResourceNotEnoughAmountError,
};

export { internal, errors, addItem, buyItem, useItem };
