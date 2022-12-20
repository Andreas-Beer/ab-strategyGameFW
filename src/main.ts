import { createApi } from './api';
import { Task } from './classes/Task';
import { TaskQueue } from './classes/TaskQueue';
import { Ticker } from './classes/Ticker';

const api = createApi();
const globalTaskQueue = new TaskQueue();

globalTaskQueue.addTask(
  new Task('1s', () => {
    console.log('Finish! 1s');
  }),
);

globalTaskQueue.addTask(
  new Task('2s', () => {
    console.log('Finish! 2s');
  }),
);

globalTaskQueue.addTask(
  new Task('5s', () => {
    console.log('Finish! 5s');
  }),
);

const timer = new Ticker();
timer.on('tick', (time) => {
  //   console.log('time', time);
  globalTaskQueue.callExpiredTasks(time);
});
