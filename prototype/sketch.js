// import config;
// import data;
// import options;

// create a new game
const gameData = new GameData({ data });
const gameConfig = new GameConfig({ config, options });

const eventBus = new EventBus();
const game = new Game({ gameConfig, gameData, eventBus });
new Ui({ game, options, eventBus });
new View({ game, options, eventBus });

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
