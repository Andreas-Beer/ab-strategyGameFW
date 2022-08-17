import config from "./config.scheme.js";
import data from "./data.scheme.js";
import Game from "./game.js";

const game = new Game({ config, data });

const buildingTypeId_01 = 4;
const buildingSlotId_01 = 10;
const unitBuilding_01 = game.createBuilding(
  buildingTypeId_01,
  buildingSlotId_01
);

window.game = game;
