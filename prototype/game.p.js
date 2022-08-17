import Building from "./Entities/Building.js";
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

  createBuilding({ buildingTypeId, buildingSlotId, townId }) {
    // ToDo: Validate - Town ID
    // ToDo: Validate - Building ID
    // ToDo: Validate - Building parallel restrictions
    // ToDo: Validate - Building Requirements
    // ToDo: Validate - Building Price by resource capacity

    const buildingConfig = this.config.buildings.find(
      (b) => b.id === buildingTypeId
    );

    if (!buildingConfig) {
      throw Error(`building type id ${buildingTypeId} does not exists`);
    }

    const { buildTime } = buildingConfig;
    const building = new Building({ typeId: buildingTypeId });

    ticker.setTimeout((dur) => {
      console.log("building created", buildTime, dur);

      const town = this.data.towns.find((t) => (t.id = townId));
      if (town) {
        town.buildings.push(building);
      } else {
        this.data.towns.push({ buildings: [building] });
      }
    }, buildTime);

    ticker.setInterval((dur) => {
      const durMs = convertDurationIntoMs(buildTime);
      const timeLeft = durMs - dur;
      const percentage = Math.round((timeLeft / durMs) * 100 * 1000) / 1000;

      building.setConstructionProgress(percentage);

      console.log("building...", percentage + "%", building);
    }, buildTime);
  }

  on(eventName, eventHandler) {}
}
