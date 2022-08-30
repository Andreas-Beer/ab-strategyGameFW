function getItemDefinition(items, itemId) {
  const itemDefinition = items.find((item) => item.id === itemId);
  if (!itemDefinition) {
    return { error: new Error(`Item with ID "${itemId}" not found`) };
  }
  return itemDefinition;
}

function checkLiquidity(resources, prices) {
  for (const { resourceId, amount } of prices) {
    const resourceStock = resources[resourceId];
    console.log({ resourceStock });

    if (resourceStock == undefined) {
      return { error: new Error(`the resource ${resourceId} does not exist`) };
    }

    if (resourceStock < amount) {
      return {
        error: new Error(
          `there is not enough amount of resource ${resourceId}. stock is ${resourceStock} but ${amount} are needed`
        ),
      };
    }
  }

  return true;
}

function transaction(data, { price, id }) {
  for (const { resourceId, amount } of price) {
    data.player.resources[resourceId] -= amount;
  }

  if (!data.player.items[id]) {
    data.player.items[id] = 1;
  } else {
    data.player.items[id] += 1;
  }
}

export { getItemDefinition, checkLiquidity, transaction };
