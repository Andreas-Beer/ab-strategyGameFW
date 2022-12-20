import { createApi } from './api';
import { TaskQueue } from './classes/TaskQueue';
import { Ticker } from './classes/Ticker';

const api = createApi();

const globalTaskQueue = new TaskQueue();

const timer = new Ticker();
timer.on('tick', (time) => {
  globalTaskQueue.callExpiredTasks(time);
});
