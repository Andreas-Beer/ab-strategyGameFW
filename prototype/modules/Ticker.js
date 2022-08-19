let taskId = 0;

function convertDurationIntoMs(duration) {
  if (typeof duration === "number") {
    return duration;
  }

  if (duration.endsWith("ms")) {
    return parseFloat(duration);
  }

  if (duration.endsWith("s")) {
    return parseFloat(duration) * 1000;
  }

  if (duration.endsWith("min")) {
    return parseFloat(duration) * 60 * 1000;
  }

  throw Error("unknown duration unit: " + duration);
}

const timeoutQueue = [];
const processQueue = [];

const TICK_SPEED = 100;
let lastTick = Date.now();
let gameDuration = 0;
let expected = Date.now() + TICK_SPEED;

function checkTimeoutQueue(gameDuration) {
  for (const task of timeoutQueue) {
    if (task.duration > gameDuration) {
      break;
    }
    // console.log("timeoutQueue", gameDuration);
    task.options?.onFinish?.();
    timeoutQueue.shift();
  }
}

function checkProcessQueue(gameDuration) {
  for (const task of processQueue) {
    // console.log(
    //   "processQueue - Running ...",
    //   gameDuration,
    //   task.duration,
    //   timeoutQueue
    // );
    task.options?.onProcess?.(task.duration - gameDuration);
    if (task.duration <= gameDuration) {
      processQueue.shift();
      task.options?.onFinish(task.duration - gameDuration);
      // console.log(
      //   "processQueue - Finish",
      //   gameDuration,
      //   task.duration,
      //   timeoutQueue
      // );
    }
  }
}

function tick() {
  const now = Date.now();
  const duration = now - lastTick;
  const drift = now - expected; // the drift (positive for overshooting)
  const nextTick = Math.max(0, TICK_SPEED - drift);
  lastTick = now;

  if (drift > TICK_SPEED) {
    // something really bad happened. Maybe the browser (tab) was inactive?
    // possibly special handling to avoid futile "catch up" run
    console.warn("Ticker.js - drift too high! - OH no !", { drift: drift });
  }

  gameDuration += duration;
  expected += TICK_SPEED;

  checkProcessQueue(gameDuration);
  checkTimeoutQueue(gameDuration);
  setTimeout(tick, nextTick);
}

function createTask(duration, options) {
  const relativeTaskDuration = gameDuration + convertDurationIntoMs(duration);
  const newTask = { id: taskId++, duration: relativeTaskDuration, options };

  return newTask;
}

const ticker = {
  setTimeout: function (duration, options) {
    if (!duration) {
      throw Error("needs a duration!");
    }

    const newTask = createTask(duration, options);
    timeoutQueue.push(newTask);
    timeoutQueue.sort((a, b) => a.duration - b.duration);
    return newTask.id;
  },

  setProcess: function (duration, options) {
    if (!duration) {
      throw Error("needs a duration!");
    }

    const newTask = createTask(duration, options);
    processQueue.push(newTask);
    processQueue.sort((a, b) => a.duration - b.duration);
    return newTask.id;
  },

  start: tick,
};

export { ticker, convertDurationIntoMs };
