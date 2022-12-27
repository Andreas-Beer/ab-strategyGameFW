import { ResourceData } from '../../data/playerData/playerData.types';

import { expect } from 'chai';

import {
  decreaseResourceAmount,
  increaseResourceAmount,
  ResourceNotFoundError,
} from './resources.helper';
import { ResourceLimits } from './resource.types';

const resourceId1 = 1;
const resourceId999999X = 999999;

describe('systems/resources/resources.helper.ts', () => {
  let resourceDataMock: ResourceData;
  let amountBefore: number;
  const resId = resourceId1;
  const amount = 20;
  const resLimits: ResourceLimits = { max: 15, min: 0 };

  beforeEach(() => {
    resourceDataMock = { [resId]: 10 } as ResourceData;
    amountBefore = resourceDataMock[resId];
  });

  describe('increaseResourceAmount', () => {
    it('should increase the amount of the resource', () => {
      increaseResourceAmount({
        resourceData: resourceDataMock,
        resourceId: resId,
        amount,
      });

      const amountAfter = resourceDataMock[resId];
      expect(amountAfter).to.be.eq(amountBefore + amount);
    });

    it('should increase the amount only to the limit', () => {
      increaseResourceAmount({
        resourceData: resourceDataMock,
        resourceId: resId,
        amount,
        max: resLimits.max,
      });

      const amountAfter = resourceDataMock[resId];
      expect(amountAfter).to.be.eq(resLimits.max);
    });

    it('should throw if the resource did not exists', () => {
      const fn = () =>
        increaseResourceAmount({
          resourceData: resourceDataMock,
          resourceId: resourceId999999X,
          amount,
        });
      expect(fn).to.throw(ResourceNotFoundError);
    });
  });

  describe('decreaseResourceAmount', () => {
    it('should decrease the amount of the given resource id in the given player data', () => {
      decreaseResourceAmount({
        resourceData: resourceDataMock,
        resourceId: resId,
        amount,
      });

      const amountAfter = resourceDataMock[resId];
      expect(amountAfter).to.be.eq(amountBefore - amount);
    });

    it('should decrease the amount of the given resource id in oly to the limit', () => {
      decreaseResourceAmount({
        resourceData: resourceDataMock,
        resourceId: resId,
        amount,
        min: resLimits.min,
      });

      const amountAfter = resourceDataMock[resId];
      expect(amountAfter).to.be.eq(resLimits.min);
    });

    it('should throw an ResourceNotFoundError if the resourceID is not in the playerData', () => {
      const fn = () =>
        decreaseResourceAmount({
          resourceData: resourceDataMock,
          resourceId: resourceId999999X,
          amount,
        });

      expect(fn).to.throw(ResourceNotFoundError);
    });
  });
});
