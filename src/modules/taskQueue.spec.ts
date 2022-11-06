import { expect, use } from 'chai';
import Sinon from 'sinon';
import sinonChai from 'sinon-chai';
use(sinonChai);

import { Task, _test } from './taskQueue';
const { addTask, checkTaskDuration, callExpiredTasks } = _test;

const task1: Task = { onFinish: Sinon.spy(), durationMs: 10 };
const task2: Task = { onFinish: Sinon.spy(), durationMs: 20 };
const task3: Task = { onFinish: Sinon.spy(), durationMs: 30 };
const task4: Task = { onFinish: Sinon.spy(), durationMs: 40 };
const task5: Task = { onFinish: Sinon.spy(), durationMs: 50 };

describe('modules/taskQueue.ts', () => {
  describe('internal', () => {
    describe('addTask', () => {
      it('should not modify the given queue', () => {
        const oldQueue: ReturnType<typeof addTask> = [];
        addTask([], task1);
        expect(oldQueue).to.have.lengthOf(0);
      });
      it('should Add a task and return a new queue', () => {
        const newTaskQueue = addTask([], task1);
        expect(newTaskQueue).to.be.an('array').that.has.lengthOf(1);
      });
      it('should sort the tasks by duration ASC', () => {
        const newTaskQueue1 = addTask([task4], task2);
        const newTaskQueue2 = addTask(newTaskQueue1, task1);

        expect(newTaskQueue2[0]).to.be.eq(task1);
        expect(newTaskQueue2[1]).to.be.eq(task2);
        expect(newTaskQueue2[2]).to.be.eq(task4);
      });
    });
    describe('checkTaskDuration', () => {
      it('should return true if the given time is equal than the task duration', () => {
        const shouldFinishTask = checkTaskDuration(task1.durationMs, task1);
        expect(shouldFinishTask).to.be.true;
      });
      it('should return true if the given time is greater than the task duration', () => {
        const shouldFinishTask = checkTaskDuration(task1.durationMs + 2, task1);
        expect(shouldFinishTask).to.be.true;
      });
    });
    describe('callExpiredTasks', () => {
      let taskList: Task[];
      beforeEach(() => {
        taskList = [task1, task2, task3, task4, task5];
      });
      it('should mutate the given list', () => {
        callExpiredTasks(taskList, 25);
        expect(taskList).to.have.a.lengthOf(3);
      });
      it('should call all Tasks that has a duration less or equal than the given time with the given data', () => {
        callExpiredTasks(taskList, 25, 'foo');
        expect(task1.onFinish).to.be.calledWith('foo');
        expect(task2.onFinish).to.be.calledWith('foo');
        expect(task3.onFinish).not.to.be.calledWith('foo');
      });
    });
  });
  describe('API', () => {});
});
