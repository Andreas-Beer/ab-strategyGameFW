import { ASC } from '../helpers/sorting';

type Task = {
  durationMs: number;
  onFinish: Function;
};

function sortTasks(taskA: Task, taskB: Task) {
  return ASC(taskA.durationMs, taskB.durationMs);
}

function checkTaskDuration(duration: number, task: Task) {
  if (duration < task.durationMs) {
    return false;
  }
  return true;
}

function callExpiredTasks(taskQueue: Task[], duration: number, data?: unknown) {
  for (let i = 0; i < taskQueue.length; i++) {
    const nextTask = taskQueue[i];

    if (!checkTaskDuration(duration, nextTask)) {
      return;
    }

    nextTask.onFinish(data);
    taskQueue.shift();
    i--;
  }
}

function addTask(taskQueue: Task[], task: Task) {
  return [...taskQueue, task].sort(sortTasks);
}

const _test = {
  addTask,
  checkTaskDuration,
  callExpiredTasks,
};

function createTaskQueue() {
  let queue;
  return {
    add() {},
    check() {},
  };
}

export { _test, Task, createTaskQueue };
