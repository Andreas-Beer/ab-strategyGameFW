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
}
