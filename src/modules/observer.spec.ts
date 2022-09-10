import { expect, use } from 'chai';
import Sinon from 'sinon';
import sinonChai from 'sinon-chai';
use(sinonChai);

import { _test, createObservable } from './observer';

const { addObserver, removeObserver, notifyObservers } = _test;

describe('observer.ts', () => {
  describe('internal', () => {
    describe('addObserver()', () => {
      const list = [() => {}, () => {}];
      const listLength = list.length;
      const fn = () => {};
      let newList: ReturnType<typeof addObserver>;

      beforeEach(() => {
        newList = addObserver(list, fn);
      });

      it('should not modify the original', () => {
        expect(list).to.have.lengthOf(listLength);
      });

      it('should return a new List with the given Function ', () => {
        expect(newList)
          .to.be.an('array')
          .that.has.a.lengthOf(list.length + 1)
          .and.have.property(list.length.toString(), fn);
      });

      it('should throw an Error if the given argument is not a function', () => {
        // @ts-ignore
        expect(() => addObserver(list, 'nix')).to.throw();
      });
    });

    describe('removeObserver', () => {
      const fn = () => {};
      const list = [() => {}, () => {}, fn];
      const listLength = list.length;
      let newList: ReturnType<typeof removeObserver>;
      beforeEach(() => {
        newList = removeObserver(list, fn);
      });

      it('should not modify the original', () => {
        expect(list).to.have.lengthOf(listLength);
      });

      it('should remove the given function and return a new List', () => {
        expect(newList)
          .to.be.an('array')
          .that.has.a.lengthOf(listLength - 1)
          .and.not.include(fn);
      });
    });

    describe('notifyObservers', () => {
      const spy1 = Sinon.spy();
      const spy2 = Sinon.spy();
      const list = [spy1, spy2];

      it('should call all observers', () => {
        notifyObservers(list);
        expect(spy1).to.be.called;
        expect(spy2).to.be.called;
      });

      it('should call all observers with given data', () => {
        const data = 'data';
        notifyObservers(list, data);
        expect(spy1).to.be.calledWith(data);
        expect(spy2).to.be.calledWith(data);
      });
    });
  });
  describe('API', () => {
    describe('createObservable()', () => {});
  });
});
