export default class Data {
  constructor(data) {
    this._data = data;
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
}
