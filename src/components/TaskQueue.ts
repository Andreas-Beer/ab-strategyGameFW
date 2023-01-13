import { ASC } from '../helpers/sorting';
import { Task } from './Task';

function sortTasks(taskA: Task, taskB: Task) {
  return ASC(taskA.durationMs, taskB.durationMs);
}

function checkTaskDuration(duration: number, task: Task) {
  if (duration < task.durationMs) {
    return false;
  }
  return true;
}

function _callExpiredTasks(
  taskQueue: Task[],
  duration: number,
  data?: unknown,
) {
  for (let i = 0; i < taskQueue.length; i++) {
    const nextTask = taskQueue[i];

    if (!checkTaskDuration(duration, nextTask)) {
      return;
    }

    queueMicrotask(() => {
      nextTask.onFinish(data);
    });

    taskQueue.shift();
    i--;
  }
}

function _addTask(taskQueue: Task[], task: Task) {
  return [...taskQueue, task].sort(sortTasks);
}

const _test = {
  addTask: _addTask,
  checkTaskDuration,
  callExpiredTasks: _callExpiredTasks,
};

class TaskQueue {
  _queue: Task[] = [];

  addTask(task: Task): void {
    this._queue = _addTask(this._queue, task);
  }

  callExpiredTasks(duration: number, data?: unknown): void {
    _callExpiredTasks(this._queue, duration, data);
  }
}

export { _test, TaskQueue };