import { expect } from 'chai';
import * as sinon from 'sinon';
import * as configModule from '../data/configData';
import {
  _test as internals,
  errors as resourcesErrors,
  checkLiquidity,
  decreaseResourceAmount,
} from './resources';

const { ResourceNotEnoughAmountError, ResourceNotFoundError } = resourcesErrors;
const { checkResourceAmount } = internals;

let playerData: PlayerData;

const price1: Price = { resourceId: 1, amount: 10 };
const price2: Price = { resourceId: 2, amount: 10 };
const price999999X: Price = { resourceId: 999999, amount: 1000 };
const price2X: Price = { resourceId: 2, amount: 1000 };

const item1 = { id: 1, price: [price1, price2] } as ItemConfig;
const item2 = { id: 2, price: [price1] } as ItemConfig;
const itemId999999X = 999999;

describe('modules/resources.ts', () => {
  beforeEach(() => {
    playerData = {
      resources: { 1: 100, 2: 200 } as ResourceData,
      items: {},
    } as PlayerData;

    // Stubs
    sinon
      .stub(configModule, 'getConfig')
      .returns({ items: [item1, item2] } as ConfigData);
  });
  afterEach(() => {
    sinon.restore();
  });

  describe('API', () => {
    describe('decreaseResourceAmount', () => {
      it('should decrease the amount of the given resource id in the given player data', () => {
        const resId = 1;
        const resAmount = 10;
        const oldAmount = playerData.resources[resId];

        const result = decreaseResourceAmount(playerData, {
          resourceId: resId,
          amount: resAmount,
        });

        expect(result.success).to.be.true;
        expect(playerData.resources[resId]).to.be.eq(oldAmount - resAmount);
      });
      it('should return an ResourceNotFoundError if the resourceID is not in the playerData', () => {
        const result = decreaseResourceAmount(playerData, price999999X);

        expect(result.success).to.be.false;
        expect(result.value).to.be.instanceOf(ResourceNotFoundError);
      });
      it('should return an ResourceNotEnoughAmountError if the price is too high', () => {
        const result = decreaseResourceAmount(playerData, price2X);

        expect(result.success).to.be.false;
        expect(result.value).to.be.instanceOf(ResourceNotEnoughAmountError);
      });
    });

    describe('checkLiquidity', () => {
      it('should return true if the prices covers the stack', () => {
        const liquidityCheck = checkLiquidity(playerData, [price1, price2]);
        expect(liquidityCheck.success).to.be.true;
        expect(liquidityCheck.value).to.be.true;
      });
      it('should return an ResourceNotFoundError if the one of the resources is unknown', () => {
        const liquidityCheck = checkLiquidity(playerData, [price1, price2X]);
        expect(liquidityCheck.success).to.be.false;
        expect(liquidityCheck.value).to.be.an.instanceof(Array);
      });
    });
  });

  describe('internal', () => {
    describe('checkResourceAmount', () => {
      it('should return true if the price covers the stack', () => {
        const amountCheck = checkResourceAmount(playerData, price1);
        expect(amountCheck.value).to.be.true;
      });
      it('should return an ResourceNotFoundError if the resource is unknown', () => {
        const amountCheck = checkResourceAmount(playerData, price999999X);
        expect(amountCheck.value).to.be.an.instanceof(ResourceNotFoundError);
      });
      it("should return an ResourceNotEnoughAmountError if the price don't covers the stack", () => {
        const amountCheck = checkResourceAmount(playerData, price2X);
        expect(amountCheck.value).to.be.an.instanceof(
          ResourceNotEnoughAmountError,
        );
      });
    });
  });
});
