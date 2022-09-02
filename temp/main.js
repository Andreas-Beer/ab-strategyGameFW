import config from "./config.js";
import data from "./data.js";
import Game from "./game.js";

import Data from "./Wrapper/Data.js";

const gameData = new Data({ data, config });
const game = new Game({ data: gameData });

// game.createBuilding({
//   buildingTypeId: 2,
//   buildingSlotId: 10,
//   townId: 1,
// });

// setTimeout(() => {
//   game.createBuilding({
//     buildingTypeId: 3,
//     buildingSlotId: 10,
//     townId: 1,
//   });
// }, 500);

console.log(game.buyItem(1));
console.log("res  :", gameData._data.player.resources);
console.log("items:", gameData._data.player.items);

console.log(game.buyItem(2));
console.log("res  :", gameData._data.player.resources);
console.log("items:", gameData._data.player.items);

console.log("ERROR:", game.buyItem(2).message);
console.log("res  :", gameData._data.player.resources);
console.log("items:", gameData._data.player.items);

// global.game = { game, config, data };
