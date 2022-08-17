let id = 10000;

export default class Building {
  constructor({ typeId, level = 1 }) {
    this._id = id++;
    this._typeid = typeId;
    this._level = level;
    this._constructionProgress = 0;
  }

  setConstructionProgress(value) {
    if (typeof value !== "number") {
      throw Error("the value must be a number");
    }

    this._constructionProgress = Math.max(Math.min(value, 100), 0);
  }

  update() {
    this._level++;
  }
}
