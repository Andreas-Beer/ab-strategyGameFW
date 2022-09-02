class ItemNotFoundError extends Error {
  public type = "ITEM_NOT_FOUND_ERROR";
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

function checkLiquidity(resources: ResourceData, prices: Price[]): Result {}

export { findItemConfig, checkLiquidity };
