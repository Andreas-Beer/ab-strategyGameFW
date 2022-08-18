// import config;
// import data;
// import options;

// import GameOptions
// import GameDate
// import GameConfig
// import L10n
// import Gfx
// import Game
// import Ui
// import View

// create a new game
const gameOptions = new GameOptions({ options });
const gameData = new GameData({ data });

const l10n = new L10n("de-DE");
const gfx = new Gfx("reborn");
const gameConfig = new GameConfig({ config, l10n, gfx });

const game = new Game({ gameConfig, gameData });
new Ui({ game, options });
new View({ game, options });

//
//
//
//
//
// EXAMPLES
//
//
//
//

// Example create a barracks building
const unitBuilding_01 = game.createBuilding({
  buildingTypeId: 4,
  buildSlotId: 10,
  townId: 1,
});

// Example create units
game.createUnit({
  buildingId: 20,
  unitTypeId: 2,
  amount: 30,
});

// Example create a resourceBuilding
const resourceBuilding_01 = game.createBuilding({
  buildingTypeId: 4,
  buildSlotId: 12,
  townId: 1,
});
