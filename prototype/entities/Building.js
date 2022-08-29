import Logger from "../modules/Logger.js";

let id = 100;

const logger = new Logger();

export default class Building {
  constructor({ typeId, level = 0 }) {
    this._id = id++;
    this._typeid = typeId;
    this._level = level;
    this._constructionProgress = 0;
  }

  setConstructionProgress(value) {
    if (typeof value !== "number") {
      throw Error("the value must be a number");
    }
    if (this._constructionProgress === 100) {
      return;
    }

    const percentage = Math.max(Math.min(value, 100), 0);
    this._constructionProgress = percentage;

    if (percentage === 100) {
      this._update();
    }
  }

  _update() {
    this._level++;
  }
}
