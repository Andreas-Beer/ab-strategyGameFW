function getItemDefinition(config, itemId) {
  const itemDefinition = config.items.find((item) => item.id === itemId);
  if (!itemDefinition) {
    throw new Error(`Item with ID "${itemId}" not found`);
  }
  return itemDefinition;
}

function checkLiquidity(data, item) {
  const { price } = item;
  const { resources } = data.player;
  console.log({ price, resources, data });

  let enoughResources = true;
  for (const { resourceId, amount } of price) {
    const resourceStock = resources[resourceId];
    if (!resourceStock) {
      throw new Error(`the resource ${resourceId} does not exist`);
    }
    if (resourceStock < amount) {
      throw new Error(`there is not enough amount of resource ${resourceId}.`);
    }
  }

  return enoughResources;
}

export default class Data {
  constructor({ data, config }) {
    this._data = data;
    this._config = config;
  }

  getTownById(townId) {
    const towns = this._data.towns;
    const searchedTown = towns.find((t) => t.id === townId);

    if (!searchedTown) {
      throw Error(
        `[Data_TownNotFoundError]: A town with the id ${townId} does not exists`
      );
    }
    return searchedTown;
  }

  modifyValue(townId, type, value, amount) {
    const town = this.getTownById(townId);

    if (!value) {
      town[type] = town[type] ? town[type] + amount : amount;
      return;
    }

    if (!town[type]) {
      town[type] = {};
    }

    if (!town[type][value]) {
      town[type][value] = amount;
    } else {
      town[type][value] += amount;
    }
  }

  getBuildingConfigByTypeId(buildingTypeId) {
    const buildingConfig = this._config.buildings.find(
      (b) => b.id === buildingTypeId
    );

    if (!buildingConfig) {
      throw Error(
        `[Config_BuildingIdNotFoundError]: A building type id ${buildingTypeId} does not exists`
      );
    }
    return buildingConfig;
  }

  buyItem(itemId) {
    const itemDefinition = getItemDefinition(this._config, itemId);
    const isLiquid = checkLiquidity(this._data, itemDefinition);

    console.log({ isLiquid });
  }
}
