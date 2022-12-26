import { createApi } from './api';
import { Task } from './classes/Task';
import { TaskQueue } from './classes/TaskQueue';
import { Ticker } from './classes/Ticker';

const api = createApi();

// const globalTaskQueue = new TaskQueue();

// const ticker = new Ticker();

// globalTaskQueue.addTask(
//   new Task('1s', () => {
//     console.log('Finish! 1s');
//   }),
// );

// globalTaskQueue.addTask(
//   new Task('2s', () => {
//     console.log('Finish! 2s');
//   }),
// );

// globalTaskQueue.addTask(
//   new Task('5s', () => {
//     console.log('Finish! 5s');
//   }),
// );

// globalTaskQueue.addTask(
//   new Task('10s', () => {
//     console.log('Finish! 10s');
//   }),
// );

// globalTaskQueue.addTask(
//   new Task('20s', () => {
//     console.log('Finish! 20s');
//   }),
// );
// globalTaskQueue.addTask(
//   new Task('30s', () => {
//     console.log('Finish! 30s');
//   }),
// );
// globalTaskQueue.addTask(
//   new Task('35s', () => {
//     console.log('Finish! 35s');
//   }),
// );
// setTimeout(() => {
//   globalTaskQueue.addTask(
//     new Task('10s', () => {
//       console.log('Finish! 10s delay');
//     }),
//   );
// }, 20000);

// function x(round: number) {
//   globalTaskQueue.addTask(
//     new Task(`${3000 - ticker.getTickDuration() / 2}ms`, () => {
//       console.log(`Finish! 3s loop ${round}`);
//       x(round + 1);
//     }),
//   );
// }
// x(1);

// ticker.on('tick', (time) => {
//   console.log('time', time);
//   globalTaskQueue.callExpiredTasks(Date.now());
// });
