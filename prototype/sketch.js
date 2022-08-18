// import config;
// import data;

// create a new game
const gameData = new GameConfig({ data });
const gameConfig = new GameConfig({ config, data });

const eventBus = new EventBus();
const game = new Game({ gameConfig, gameData, eventBus });
new Ui({ game, eventBus });
new View({ game, eventBus });

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
