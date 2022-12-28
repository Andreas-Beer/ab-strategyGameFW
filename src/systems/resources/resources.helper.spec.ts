import { expect } from 'chai';

import {
  decreaseResourceAmount,
  increaseResourceAmount,
  ResourceNotFoundError,
} from './resources.helper';
import { ResourcesData, ResourceLimits } from './resource.types';

const resourceId1 = 1;
const resourceId999999X = 999999;

describe.only('systems/resources/resources.helper.ts', () => {
  let resourceDataMock: ResourcesData;
  let resourceDataMockMax: ResourcesData;
  let resourceDataMockMin: ResourcesData;
  let amountBefore: number;
  const resId = resourceId1;
  const amount = 20;

  beforeEach(() => {
    resourceDataMock = { [resId]: { amount: 10 } };
    resourceDataMockMax = { [resId]: { amount: 10, max: 15 } };
    resourceDataMockMin = { [resId]: { amount: 10, min: 0 } };
    amountBefore = resourceDataMock[resId].amount;
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

    it('should decrease the amount of the given resource id in oly to the limit', () => {
      decreaseResourceAmount({
        resourcesData: resourceDataMockMin,
        resourceId: resId,
        amount,
      });

      const amountAfter = resourceDataMockMin[resId].amount;
      expect(amountAfter).to.be.eq(resourceDataMockMin[resId].min);
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
});
