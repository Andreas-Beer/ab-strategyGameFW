import config from "./config.js";
import data from "./data.js";
import Game from "./game.js";

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

setTimeout(() => {
  game.createBuilding({
    buildingTypeId: 3,
    buildingSlotId: 10,
    townId: 1,
  });
}, 500);

global.game = { game, config, data };
