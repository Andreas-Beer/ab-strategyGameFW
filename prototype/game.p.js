function convertDurationIntoMs(duration) {
  if (typeof duration === "number") {
    return duration;
  }

  if (duration.endsWith("min")) {
    return parseFloat(duration) * 60 * 1000;
  }

  if (duration.endsWith("s")) {
    return parseFloat(duration) * 1000;
  }

  if (duration.endsWith("ms")) {
    return parseFloat(duration);
  }

  throw Error("unknown duration unit: " + duration);
}

// START Ticket
const timeoutQueue = [];
const intervalQueue = [];

const TICK_SPEED = 10;
let lastTick = Date.now();
let gameDuration = 0;

function tick(now = Date.now()) {
  const duration = now - lastTick;
  gameDuration += duration;

  for (const task of intervalQueue) {
    // console.log("intervalQueue", gameDuration, task.duration, timeoutQueue);
    task.callback(task.duration - gameDuration);
    if (task.duration < gameDuration) {
      intervalQueue.shift();
    }
  }

  for (const task of timeoutQueue) {
    if (task.duration > gameDuration) {
      break;
    }
    // console.log("timeoutQueue", gameDuration);
    task.callback();
    timeoutQueue.shift();
  }

  lastTick = now;
  setTimeout(() => tick(Date.now()), TICK_SPEED);
}

const ticker = {
  setTimeout: function (callback, duration) {
    if (!duration) {
      throw Error("needs a duration!");
    }

    const relativeDuration = gameDuration + convertDurationIntoMs(duration);
    timeoutQueue.push({ duration: relativeDuration, callback });
    timeoutQueue.sort((a, b) => a.duration - b.duration);
  },

  setInterval: function (callback, duration) {
    if (!duration) {
      throw Error("needs a duration!");
    }

    const relativeDuration = gameDuration + convertDurationIntoMs(duration);
    intervalQueue.push({ duration: relativeDuration, callback });
    intervalQueue.sort((a, b) => a.duration - b.duration);
  },
};

// END Ticket

export default class Game {
  constructor({ config, data }) {
    if (!config) {
      throw Error("a new Game need to have a configuration");
    }
    this.config = config;
    this.data = data;

    tick();
  }

  createBuilding({ buildingTypeId, buildingSlotId, townId }) {
    // ToDo: Validate Town and position

    const buildingConfig = this.config.buildings.find(
      (b) => b.id === buildingTypeId
    );

    if (!buildingConfig) {
      throw Error(`building type id ${buildingTypeId} does not exists`);
    }

    const { buildTime } = buildingConfig;

    ticker.setTimeout((dur) => {
      console.log("building created", buildTime, dur);

      const town = this.data.towns.find((t) => (t.id = townId));
      if (town) {
        town.buildings.push({ id: "foo1", buildingTypeId });
      } else {
        this.data.towns.push({ buildings: [{ id: 0, buildingTypeId }] });
      }
    }, buildTime);

    ticker.setInterval((dur) => {
      const durMs = convertDurationIntoMs(buildTime);
      const timeLeft = durMs - dur;
      const percentage = Math.round((timeLeft / durMs) * 100 * 1000) / 1000;

      // console.log("building...", percentage + "%");
    }, buildTime);
  }
}
