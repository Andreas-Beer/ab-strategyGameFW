import { getConfig } from '../data/configData';
import { checkLiquidity } from './resources';

class ItemConfigNotFoundError extends Error {
  public type = 'ITEM_CONFIG_NOT_FOUND_ERROR';
  public category = 'CRITICAL';
}
class ItemNotFoundError extends Error {
  public type = 'ITEM_NOT_FOUND_ERROR';
  public category = 'CRITICAL';
}

function removeItem(
  playerData: PlayerData,
  itemTypeId: number,
): Result<boolean, ItemNotFoundError> {
  if (!playerData.items[itemTypeId]) {
    return {
      success: false,
      value: new ItemNotFoundError(
        `the item with the id ${itemTypeId} was not found`,
      ),
    };
  }

  playerData.items[itemTypeId] -= 1;
  if (playerData.items[itemTypeId] === 0) {
    delete playerData.items[itemTypeId];
  }

  return { success: true, value: true };
}

function findItemConfig(
  itemTypeId: number,
): Result<ItemConfig, ItemConfigNotFoundError> {
  const itemConfigs = getConfig().items;
  const foundDefinition = itemConfigs.find((def) => def.id === itemTypeId);
  if (!foundDefinition) {
    return {
      success: false,
      value: new ItemConfigNotFoundError(`The id ${itemTypeId} is not an item`),
    };
  }
  return { success: true, value: foundDefinition };
}

function addItem(playerData: PlayerData, itemTypeId: number): Result<boolean> {
  if (!playerData.items[itemTypeId]) {
    playerData.items[itemTypeId] = 1;
  } else {
    playerData.items[itemTypeId] += 1;
  }

  return { success: true, value: true };
}

function buyItem(playerData: PlayerData, itemTypeId: number): Result<boolean> {
  const itemConfig = findItemConfig(itemTypeId);
  if (!itemConfig.success) {
    return itemConfig;
  }
  const price = itemConfig.value.price;

  const isLiquid = checkLiquidity(playerData.resources, price);

  for (const p of price) {
    const { resourceId, amount } = p;
    playerData.resources[resourceId] -= amount;
  }

  addItem(playerData, itemTypeId);
  return { success: true, value: true };
}

function useItem(playerData: PlayerData, itemTypeId: number) {
  return removeItem(playerData, itemTypeId);
}

const internal = {
  removeItem,
  findItemConfig,
};

const errors = {
  ItemConfigNotFoundError,
  ItemNotFoundError,
};

export { internal, errors, addItem, buyItem, useItem };
