import config from "./config.p";
import data from "./data.p";

// create a new game
const game = new Game({ config, data }).on("error", onGameError);

// Example create a barracks building
const buildingTypeId_01 = 4;
const buildingSlotId_01 = 10;
const unitBuilding_01 = game
  .createBuilding(buildingTypeId_01, buildingSlotId_01)
  .on("finish", onCreateBuildingFinished)
  .on("progress", onCreateBuildingProgress);

// Example create units
const unitTypeId = 2;
game
  .createUnit(unitBuilding_01, unitTypeId, 30)
  .on("unitProgress", () => onUnitProgress)
  .on("unitFinish", () => onUnitFinished);

// Example create a resourceBuilding
const buildingTypeId_02 = 4;
const buildingSlotId_02 = 10;
const resourceBuilding_01 = game
  .createBuilding(buildingTypeId_02, buildingSlotId_02)
  .on("finish", onCreateBuildingFinished)
  .on("progress", onCreateBuildingProgress)
  .on("cycle", onResourceBuildingCycling);
