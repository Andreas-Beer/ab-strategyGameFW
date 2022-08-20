import config from "./config.p.js";
import data from "./data.p.js";
import Game from "./game.p.js";

import Config from "./Wrapper/Config.js";
import Data from "./Wrapper/Data.js";

const gameData = new Data(data);
const gameConfig = new Config(config);
const game = new Game({ config: gameConfig, data: gameData });

game.createBuilding({
  buildingTypeId: 2,
  buildingSlotId: 10,
  townId: 1,
});

window.game = { game, config, data };
