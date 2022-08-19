import Building from "./Entities/Building.js";
import Unit from "./Entities/Unit.js";
import { convertDurationIntoMs, ticker } from "./Modules/Ticker.js";
export default class Game {
  constructor({ config, data }) {
    if (!config) {
      throw Error("a new Game need to have a configuration");
    }
    this.config = config;
    this.data = data;

    ticker.start();
  }
  // ToDo: extract into a building creator Module
  createBuilding({ buildingTypeId, buildingSlotId, townId }) {
    // ToDo: Validate - Town ID
    const town = this.data.getTownById(townId);

    // ToDo: Validate - BuildingType ID
    const buildingConfig =
      this.config.getBuildingConfigByTypeId(buildingTypeId);

    // ToDo: Validate - Building parallel restrictions
    // ToDo: Validate - Building Requirements
    // ToDo: Validate - Building Price by resource capacity

    const duration = buildingConfig.duration.level1;
    const building = new Building({ typeId: buildingTypeId });

    const processId = ticker.setProcess(duration, {
      onFinish: (dur) => {
        console.log("building created", duration, dur, building._id);
        building.setConstructionProgress(100);
      },
      onProcess: (timeLeft) => {
        const completeDuration = convertDurationIntoMs(duration);
        const processDuration = completeDuration - timeLeft;
        const percentage =
          Math.round((processDuration / completeDuration) * 100 * 1000) / 1000;

        building.setConstructionProgress(percentage);

        console.log("building...", percentage + "%", building);
      },
    });

    town.buildings.push(building);
    console.log({ processId });
  }

  // ToDo: extract into unit creator Module
  // createUnit({ unitTypeId, creationBuildingId, townId, unitAmount = 1 } = {}) {
  //   // ToDo: Validate - Town ID
  //   // ToDo: Validate - Creation-Building ID
  //   // ToDo: Validate - Unit Slots available
  //   // ToDo: Validate - Creation Price by resource capacity

  //   const town = this.gameData.getTownById(townId);

  //   const unitConfig = this.config.units.find((u) => u.id === unitTypeId);
  //   const building = town.buildings.find((b) => b._id === creationBuildingId);

  //   if (!building) {
  //     throw Error(
  //       `The creation building with the id ${creationBuildingId} does not exists. the buildings are ${JSON.stringify(
  //         town.buildings,
  //         null,
  //         4
  //       )}`
  //     );
  //   }

  //   if (!unitConfig) {
  //     throw Error(
  //       `unit type id ${unitTypeId} does not exists out of [${this.config.units
  //         .map((u) => u.id)
  //         .join(", ")}]`
  //     );
  //   }

  //   const duration = unitConfig.duration;
  //   const unit = new Unit({ typeId: unitTypeId, config: unitConfig });

  //   const processId = ticker.setProcess(duration, {
  //     onProcess: (dur) => {
  //       const durMs = convertDurationIntoMs(duration);
  //       const timeLeft = durMs - dur;
  //       const percentage = Math.round((timeLeft / durMs) * 100 * 1000) / 1000;

  //       console.log(
  //         "building.content.unitCreation",
  //         building.content.unitCreation
  //       );
  //     },
  //     onFinish: (dur) => {
  //       console.log("unit created", duration, dur);

  //       if (town.units[unitTypeId]) {
  //         town.units[unitTypeId] += unitAmount;
  //       } else {
  //         town.units[unitTypeId] = unitAmount;
  //       }
  //     },
  //   });

  //   console.log("building.content.unitCreation", building.content.unitCreation);
  //   building.content.unitCreation.push(Unit);
  // }
}
