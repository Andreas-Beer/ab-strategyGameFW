import { getConfigData } from '../../data/configData/configData';
import { PlayerData } from '../../data/playerData/playerData.types';
import { ItemConfig } from '../../types/item.types';
import { Result } from '../../types/validator.types';

import { decreaseResourceAmount } from '../resources/resources.module';

class ItemConfigNotFoundError extends Error {
  public type = 'ITEM_CONFIG_NOT_FOUND_ERROR';
  public level = 'CRITICAL';
}
class ItemNotFoundError extends Error {
  public type = 'ITEM_NOT_FOUND_ERROR';
  public level = 'CRITICAL';
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

function addItem(playerData: PlayerData, itemTypeId: number): Result<boolean> {
  if (!playerData.items[itemTypeId]) {
    playerData.items[itemTypeId] = 1;
  } else {
    playerData.items[itemTypeId] += 1;
  }

  return { success: true, value: true };
}

function useItem(playerData: PlayerData, itemTypeId: number) {
  return removeItem(playerData, itemTypeId);
}

const internal = {
  removeItem,
  // findItemConfig,
};

const errors = {
  ItemConfigNotFoundError,
  ItemNotFoundError,
};

export { internal, errors, addItem, useItem };
