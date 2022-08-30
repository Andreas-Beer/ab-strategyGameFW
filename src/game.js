import { invokeEffect } from "./modules/effect.js";
import {
  getItemDefinition,
  checkLiquidity,
  transaction,
} from "./modules/items.js";
import Ticker, { convertDurationIntoMs } from "./modules/Ticker.js";

export default class Game {
  constructor({ data }) {
    if (!data) {
      throw Error("a new Game need to have a data defined");
    }
    this._data = data;
  }
  // ToDo: extract into a building creator Module
  createBuilding({ buildingTypeId, buildingSlotId, townId }) {
    // Validate - Town ID
    const town = this._data.getTownById(townId);

    // Validate - BuildingType ID
    const buildingConfig = this._data.getBuildingConfigByTypeId(buildingTypeId);

    // ToDo: Validate - Building parallel restrictions
    // ToDo: Validate - Building Requirements
    // ToDo: Validate - Building Price by resource capacity

    const duration = buildingConfig.duration.level1;
    const building = new Building({ typeId: buildingTypeId });

    const processId = Ticker.getInstance().setProcess(duration, {
      onFinish: () => {
        building.setConstructionProgress(100);

        const buildingEffects = buildingConfig.effects.level1;

        console.log("building created", duration);
        console.log("data", this._data._data.towns[0].buildings);

        if (!buildingEffects) {
          return;
        }

        for (const effect of buildingEffects) {
          invokeEffect(effect, this._data, townId, this.userID);
        }
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

  buyItem(itemId) {
    const itemsDefinitions = this._data._config.items;
    const itemDefinition = getItemDefinition(itemsDefinitions, itemId);
    const resourcesStack = this._data._data.player.resources;
    const data = this._data._data;

    if (itemDefinition.error) {
      return itemDefinition.error;
    }

    const liquidityResult = checkLiquidity(
      resourcesStack,
      itemDefinition.price
    );

    if (liquidityResult.error) {
      return liquidityResult.error;
    }

    transaction(data, itemDefinition);
  }

  // ToDo: extract into unit creator Module
  // createUnit({ unitTypeId, creationBuildingId, townId, unitAmount = 1 } = {}) {
  //   // ToDo: Validate - Town ID
  //   // ToDo: Validate - Creation-Building ID
  //   // ToDo: Validate - Unit Slots available
  //   // ToDo: Validate - Creation Price by resource capacity

  //   const town = this.gameData.getTownById(townId);

  //   const unitConfig = this._data.units.find((u) => u.id === unitTypeId);
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
  //       `unit type id ${unitTypeId} does not exists out of [${this._data.units
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
