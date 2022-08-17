let id = 10000;

export default class Building {
  constructor({ typeId, level = 1 }) {
    this.id = id++;
    this.typeid = typeId;
    this.level = level;
  }

  update() {
    this.level++;
  }
}
