import { expect } from 'chai';
import * as sinon from 'sinon';
import * as configModule from '../data/configData';
import {
  errors as resourcesErrors,
  checkLiquidity,
  checkResourceAmount,
} from './resources';

const { ResourceNotEnoughAmountError, ResourceNotFoundError } = resourcesErrors;

let playerData: PlayerData;

const price1: Price = { resourceId: 1, amount: 10 };
const price2: Price = { resourceId: 2, amount: 10 };
const price999999X: Price = { resourceId: 999999, amount: 1000 };
const price2X: Price = { resourceId: 2, amount: 1000 };

const item1: ItemConfig = { id: 1, price: [price1, price2] } as ItemConfig;
const item2: ItemConfig = { id: 2, price: [price1] } as ItemConfig;
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
    describe('checkResourceAmount', () => {
      it('should return true if the price covers the stack', () => {
        const amountCheck = checkResourceAmount(playerData.resources, price1);
        expect(amountCheck.value).to.be.true;
      });
      it('should return an ResourceNotFoundError if the resource is unknown', () => {
        const amountCheck = checkResourceAmount(
          playerData.resources,
          price999999X,
        );
        expect(amountCheck.value).to.be.an.instanceof(ResourceNotFoundError);
      });
      it("should return an ResourceNotEnoughAmountError if the price don't covers the stack", () => {
        const amountCheck = checkResourceAmount(playerData.resources, price2X);
        expect(amountCheck.value).to.be.an.instanceof(
          ResourceNotEnoughAmountError,
        );
      });
    });

    describe('checkLiquidity', () => {
      it('should return true if the prices covers the stack', () => {
        const liquidityCheck = checkLiquidity(playerData.resources, [
          price1,
          price2,
        ]);
        expect(liquidityCheck.success).to.be.true;
        expect(liquidityCheck.value).to.be.true;
      });
      it('should return an ResourceNotFoundError if the one of the resources is unknown', () => {
        const liquidityCheck = checkLiquidity(playerData.resources, [
          price1,
          price2X,
        ]);
        expect(liquidityCheck.success).to.be.false;
        expect(liquidityCheck.value).to.be.an.instanceof(Array);
      });
    });
  });
});
