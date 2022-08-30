import {
  getItemDefinition,
  checkLiquidity,
  transaction,
} from "../modules/items.js";

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
}
