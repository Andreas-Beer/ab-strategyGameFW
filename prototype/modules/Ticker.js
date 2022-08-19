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

// START Ticker
const timeoutQueue = [];
const processQueue = [];

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

  for (const task of processQueue) {
    // console.log(
    //   "processQueue - Running ...",
    //   gameDuration,
    //   task.duration,
    //   timeoutQueue
    // );
    task.options?.onProcess?.(task.duration - gameDuration);
    if (task.duration < gameDuration) {
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

  for (const task of timeoutQueue) {
    if (task.duration > gameDuration) {
      break;
    }
    // console.log("timeoutQueue", gameDuration);
    task.options?.onFinish?.();
    timeoutQueue.shift();
  }

  lastTick = now;
  setTimeout(start, nextTick);
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

  start,
};

const test = {
  processQueue: processQueue,
  timeoutQueue,
};

export { ticker, convertDurationIntoMs, test };
