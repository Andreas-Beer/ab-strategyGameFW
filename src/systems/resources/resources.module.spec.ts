import { expect } from 'chai';

import {
  decreaseResourceAmount,
  decreaseResourceMaxLimit,
  findResource,
  increaseResourceAmount,
  increaseResourceMaxLimit,
  ResourceNotFoundError,
} from './resources.module';
import { ResourcesData, ResourceLimits } from './resources.types';

const resourceId1 = 1;
const resourceId999999X = 999999;

describe('systems/resources/resources.module.ts', () => {
  let resourceDataMock: ResourcesData;
  let resourceDataMockMax: ResourcesData;
  let resourceDataMockMin: ResourcesData;
  let amountBefore: number;
  let maxLimitBefore: number;
  const resId = resourceId1;
  const amount = 20;

  beforeEach(() => {
    resourceDataMock = { [resId]: { amount: 10 } };
    resourceDataMockMax = { [resId]: { amount: 10, max: 15 } };
    resourceDataMockMin = { [resId]: { amount: 10, min: 0 } };
    amountBefore = resourceDataMock[resId].amount;
    maxLimitBefore = resourceDataMockMax[resId].max!;
  });

  describe('increaseResourceAmount', () => {
    it('should increase the amount of the resource', () => {
      increaseResourceAmount({
        resourcesData: resourceDataMock,
        resourceId: resId,
        amount,
      });

      const amountAfter = resourceDataMock[resId].amount;
      expect(amountAfter).to.be.eq(amountBefore + amount);
    });

    it('should increase the amount only to the limit', () => {
      increaseResourceAmount({
        resourcesData: resourceDataMockMax,
        resourceId: resId,
        amount,
      });

      const amountAfter = resourceDataMockMax[resId].amount;
      expect(amountAfter).to.be.eq(resourceDataMockMax[resId].max);
    });

    it('should increase the amount above the limit if the shouldIgnoreLimit flag is set', () => {
      increaseResourceAmount({
        resourcesData: resourceDataMockMax,
        resourceId: resId,
        amount,
        options: { shouldIgnoreLimit: true },
      });

      const amountAfter = resourceDataMockMax[resId].amount;
      expect(amountAfter).to.be.eq(amountBefore + amount);
    });

    it('should throw if the resource did not exists', () => {
      const fn = () =>
        increaseResourceAmount({
          resourcesData: resourceDataMock,
          resourceId: resourceId999999X,
          amount,
        });
      expect(fn).to.throw(ResourceNotFoundError);
    });
  });

  describe('decreaseResourceAmount', () => {
    it('should decrease the amount of the given resource id in the given player data', () => {
      decreaseResourceAmount({
        resourcesData: resourceDataMock,
        resourceId: resId,
        amount,
      });

      const amountAfter = resourceDataMock[resId].amount;
      expect(amountAfter).to.be.eq(amountBefore - amount);
    });

    it('should decrease the amount of the given resource id in only to the limit', () => {
      decreaseResourceAmount({
        resourcesData: resourceDataMockMin,
        resourceId: resId,
        amount,
      });

      const amountAfter = resourceDataMockMin[resId].amount;
      expect(amountAfter).to.be.eq(resourceDataMockMin[resId].min);
    });

    it('should decrease the amount beneath the limit if the shouldIgnoreLimit flag is set', () => {
      decreaseResourceAmount({
        resourcesData: resourceDataMockMin,
        resourceId: resId,
        amount,
        options: { shouldIgnoreLimit: true },
      });

      const amountAfter = resourceDataMockMin[resId].amount;
      expect(amountAfter).to.be.eq(amountBefore - amount);
    });

    it('should throw an ResourceNotFoundError if the resourceID is not in the playerData', () => {
      const fn = () =>
        decreaseResourceAmount({
          resourcesData: resourceDataMock,
          resourceId: resourceId999999X,
          amount,
        });

      expect(fn).to.throw(ResourceNotFoundError);
    });
  });

  describe('increaseMaxLimit', () => {
    it('should increase the max limit by the given ', () => {
      increaseResourceMaxLimit({
        resourcesData: resourceDataMockMax,
        resourceId: resId,
        amount,
      });

      const limitAfter = resourceDataMockMax[resId].max;
      expect(limitAfter).to.be.eq(maxLimitBefore + amount);
    });
    it('should throw an ResourceNotFoundError if the resourceID is not in the playerData', () => {
      const fn = () =>
        increaseResourceMaxLimit({
          resourcesData: resourceDataMock,
          resourceId: resourceId999999X,
          amount,
        });

      expect(fn).to.throw(ResourceNotFoundError);
    });
  });

  describe('decreaseResourceMaxLimit', () => {
    it('should decrease the max limit by the given ', () => {
      decreaseResourceMaxLimit({
        resourcesData: resourceDataMockMax,
        resourceId: resId,
        amount,
      });

      const limitAfter = resourceDataMockMax[resId].max;
      expect(limitAfter).to.be.eq(maxLimitBefore - amount);
    });
    it('should throw an ResourceNotFoundError if the resourceID is not in the playerData', () => {
      const fn = () =>
        decreaseResourceMaxLimit({
          resourcesData: resourceDataMock,
          resourceId: resourceId999999X,
          amount,
        });

      expect(fn).to.throw(ResourceNotFoundError);
    });
  });

  describe('FindResource', () => {
    it('should return the correct Resource', () => {
      const searchedResource = findResource({
        resourcesData: resourceDataMock,
        resourceId: resId,
      });
      expect(searchedResource).to.be.eq(resourceDataMock[resId]);
    });
    it('should throw an ResourceNotFoundError if the resourceID is not in the playerData', () => {
      const fn = () =>
        findResource({
          resourcesData: resourceDataMock,
          resourceId: resourceId999999X,
        });

      expect(fn).to.throw(ResourceNotFoundError);
    });
  });
});
