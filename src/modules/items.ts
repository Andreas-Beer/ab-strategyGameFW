class ItemNotFoundError extends Error {
  public type = "ITEM_NOT_FOUND_ERROR";
}

function findItemConfig(itemConfigs: ItemConfig[], itemId: number) {
  const foundDefinition = itemConfigs.find((def) => def.id === itemId);
  if (!foundDefinition) {
    return {
      error: new ItemNotFoundError(`The id ${itemId} is not an item`),
    };
  }
  return { value: foundDefinition };
}

export { findItemConfig };
