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

// START Ticker
const timeoutQueue = [];
const intervalQueue = [];

const TICK_SPEED = 100;
let lastTick = Date.now();
let gameDuration = 0;

let expected = Date.now() + TICK_SPEED;

function start() {
  const now = Date.now();
  const drift = now - expected; // the drift (positive for overshooting)
  expected += TICK_SPEED;

  if (drift > TICK_SPEED) {
    // something really bad happened. Maybe the browser (tab) was inactive?
    // possibly special handling to avoid futile "catch up" run
    console.warn("Ticker.js:39 - OH no !", { drift });
  }

  const duration = now - lastTick;
  gameDuration += duration;
  const nextTick = Math.max(0, TICK_SPEED - drift);

  // console.log("tick", {
  //   duration,
  //   // expected,
  //   // drift,
  //   // TICK_SPEED,
  //   // nextTick,
  //   gameDuration,
  // });

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
  setTimeout(start, nextTick);
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

  start,
};

export { ticker, convertDurationIntoMs };
