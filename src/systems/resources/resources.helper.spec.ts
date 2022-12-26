import { ResourceData } from '../../types/data.types';

import { expect } from 'chai';
import * as sinon from 'sinon';

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
      increaseResourceAmount(resourceDataMock, resId, amount);

      const amountAfter = resourceDataMock[resId];
      expect(amountAfter).to.be.eq(amountBefore + amount);
    });

    it('should throw if the resource did not exists', () => {
      const fn = () =>
        increaseResourceAmount(resourceDataMock, resourceId999999X, amount);
      expect(fn).to.throw(ResourceNotFoundError);
    });

    it('should increase the amount only to the limit', () => {
      increaseResourceAmount(resourceDataMock, resId, amount, resLimits.max);

      const amountAfter = resourceDataMock[resId];
      expect(amountAfter).to.be.eq(resLimits.max);
    });
  });

  describe('decreaseResourceAmount', () => {
    it('should decrease the amount of the given resource id in the given player data', () => {
      decreaseResourceAmount(resourceDataMock, resId, amount);

      const amountAfter = resourceDataMock[resId];
      expect(amountAfter).to.be.eq(amountBefore - amount);
    });
    it('should throw an ResourceNotFoundError if the resourceID is not in the playerData', () => {
      const fn = () =>
        decreaseResourceAmount(resourceDataMock, resourceId999999X, amount);

      expect(fn).to.throw(ResourceNotFoundError);
    });
    it('should decrease the amount of the given resource id in oly to the limit', () => {
      decreaseResourceAmount(resourceDataMock, resId, amount, resLimits.min);

      const amountAfter = resourceDataMock[resId];
      expect(amountAfter).to.be.eq(resLimits.min);
    });
  });

  // describe('checkLiquidity', () => {
  //   it('should return true if the prices covers the stack', () => {
  //     const liquidityCheck = checkLiquidity(playerData, [price1, price2]);
  //     expect(liquidityCheck.success).to.be.true;
  //     expect(liquidityCheck.value).to.be.true;
  //   });
  //   it('should return an ResourceNotFoundError if the one of the resources is unknown', () => {
  //     const liquidityCheck = checkLiquidity(playerData, [price1, price2X]);
  //     expect(liquidityCheck.success).to.be.false;
  //     expect(liquidityCheck.value).to.be.an.instanceof(Array);
  //   });
  // });
});
