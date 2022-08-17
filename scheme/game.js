function convertDurationIntoMs(duration) {
  console.log("duration", duration);

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

// Ticket
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

export default class Game {
  constructor({ config, data }) {
    if (!config) {
      throw Error("a new Game need to have a configuration");
    }
    this.config = config;

    tick();
  }

  createBuilding(buildingTypeId, buildingSlotId) {
    const buildingConfig = this.config.buildings.find(
      (b) => b.id === buildingTypeId
    );

    if (!buildingConfig) {
      throw Error(`building type id ${buildingTypeId} does not exists`);
    }

    const { buildTime } = buildingConfig;

    ticker.setTimeout(() => {
      console.log("building created");
    }, buildTime);

    ticker.setInterval((dur) => {
      console.log("building...", convertDurationIntoMs(buildTime) - dur);
    }, buildTime);
  }
}
