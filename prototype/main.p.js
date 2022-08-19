import config from "./config.p.js";
import data from "./data.p.js";
import Game from "./game.p.js";

const game = new Game({ config, data });

const buildingTypeId_01 = 4;
const buildingSlotId_01 = 10;
const townId_01 = 2;
game.createBuilding({
  buildingTypeId: buildingTypeId_01,
  buildingSlotId: buildingSlotId_01,
  townId: townId_01,
});

window.game = { game, config, data };
