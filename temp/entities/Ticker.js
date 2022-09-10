import { convertDurationIntoMs } from "../helpers/duration";
import { logger } from "../helpers/logger";

let taskId = 0;

const processQueue = [];

const TICK_DURATION = 100;
const TICK_DRIFT_THRESHOLD = 100;
let lastTick = Date.now();
let gameDuration = 0;
let expected = Date.now() + TICK_DURATION;

/**
 *
 * @param {Array} queue
 * @param {number} gameDuration
 */
function checkQueue(queue, gameDuration) {
  for (let i = 0; i < queue.length; i++) {
    const task = queue[i];
    task.options?.onProcess?.(task.duration - gameDuration);
    if (task.duration <= gameDuration) {
      queue.shift();
      i--;
      task.options?.onFinish?.(task.duration - gameDuration);
    }
  }
}

function tick() {
  const now = Date.now();
  const duration = now - lastTick;
  const drift = now - expected; // the drift (positive for overshooting)
  const nextTick = Math.max(0, TICK_DURATION - drift);
  lastTick = now;

  if (drift > TICK_DURATION && drift - TICK_DURATION > TICK_DRIFT_THRESHOLD) {
    // something really bad happened. Maybe the browser (tab) was inactive?
    // possibly special handling to avoid futile "catch up" run
    logger.log("Ticker.js - drift too high! - OH no !", { drift: drift });
    return;
  }

  gameDuration += duration;
  expected += TICK_DURATION;

  checkQueue(processQueue, gameDuration);
  setTimeout(tick, nextTick);
}

function createTask(duration, options) {
  const relativeTaskDuration = gameDuration + convertDurationIntoMs(duration);
  const newTask = { id: taskId++, duration: relativeTaskDuration, options };

  return newTask;
}

let instance = null;

export default class Ticker {
  constructor() {
    if (instance) {
      throw Error("only one Ticker allowed!");
    }

    tick();
  }

  static getInstance() {
    if (!instance) {
      instance = new Ticker();
    }
    return instance;
  }

  setProcess(duration, options) {
    if (!duration) {
      throw Error("needs a duration!");
    }

    const newTask = createTask(duration, options);
    processQueue.push(newTask);
    processQueue.sort((a, b) => a.duration - b.duration);
    return newTask.id;
  }
}

export { convertDurationIntoMs };