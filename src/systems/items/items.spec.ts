import { ConfigData } from '../../types/config.types';
import { PlayerData, ResourceData } from '../../types/data.types';
import { ItemConfig } from '../../types/item.types';
import { Price } from '../../types/price.types';

import { expect } from 'chai';
import * as sinon from 'sinon';
import {
  errors as itemErrors,
  internal as itemInternals,
  buyItem,
  addItem,
  useItem,
} from './items';

const { findItemConfig, removeItem } = itemInternals;
const { ItemConfigNotFoundError, ItemNotFoundError } = itemErrors;

let playerData: PlayerData;

const price1: Price = { resourceId: 1, amount: 10 };
const price2: Price = { resourceId: 2, amount: 10 };
const price999999X: Price = { resourceId: 999999, amount: 1000 };
const price2X: Price = { resourceId: 2, amount: 1000 };

const item1: ItemConfig = { typeId: 1, price: [price1, price2] } as ItemConfig;
const item2: ItemConfig = { typeId: 2, price: [price1] } as ItemConfig;
const itemId999999X = 999999;

describe('modules/items.ts', () => {
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
    describe('addItem()', () => {
      it('should add a new item id to the stack if the item is not in the stack', () => {
        const { typeId: itemId } = item1;
        expect(playerData.items[itemId]).to.be.undefined;
        const result = addItem(playerData, itemId);
        expect(playerData.items[itemId]).to.be.eq(1);
        expect(result.success).to.be.true;
      });

      it('should increase the item stack if the resource is already in the stack', () => {
        const { typeId: itemId } = item1;
        playerData.items[itemId] = 1;

        expect(playerData.items[itemId]).to.be.eq(1);
        const result = addItem(playerData, itemId);
        expect(playerData.items[itemId]).to.be.eq(2);
        expect(result.success).to.be.true;
      });
    });

    describe('removeItem()', () => {
      it('should remove an item if the item amount is 1', () => {
        const { typeId: itemId } = item1;
        playerData.items[itemId] = 1;

        removeItem(playerData, itemId);
        expect(playerData.items[itemId]).to.be.undefined;
      });

      it('should decrease an item if the item amount is above 1', () => {
        const { typeId: itemId } = item1;
        const oldAmount = 2;
        const expectedAmount = oldAmount - 1;
        playerData.items[itemId] = oldAmount;

        removeItem(playerData, itemId);
        expect(playerData.items[itemId]).to.be.eq(expectedAmount);
      });

      it('should return an error if the item does not exist', () => {
        const { typeId: itemId } = item1;

        const removeItemResult = removeItem(playerData, itemId);
        expect(removeItemResult).to.be.not.undefined;
        expect(removeItemResult.success).to.be.false;
        expect(removeItemResult.value).to.be.instanceOf(ItemNotFoundError);
      });
    });

    describe('buyItem()', () => {
      it('should remove the resource and add the item to the data', () => {
        const {
          typeId: itemId,
          price: [{ resourceId, amount }],
        } = item2;

        const itemAmountBefore = 1;
        const itemAmountExpected = itemAmountBefore + 1;
        playerData.items[itemId] = itemAmountBefore;

        const resourceBefore = playerData.resources[resourceId];
        const resourcesExpected = playerData.resources[resourceId] - amount;
        playerData.resources[resourceId] = resourceBefore;

        buyItem(playerData, itemId);
        expect(playerData.resources[resourceId]).to.be.eq(resourcesExpected);
        expect(playerData.items[itemId]).to.be.eq(itemAmountExpected);
      });

      it('should return the error if there is no item with the given typeId', () => {
        const result = buyItem(playerData, itemId999999X);
        expect(result.success).to.be.false;
        expect(result.value).to.be.an.instanceof(ItemConfigNotFoundError);
      });
    });

    describe('useItem()', () => {
      it('should remove the used item', () => {
        const { typeId: itemId } = item1;
        playerData.items[itemId] = 1;

        useItem(playerData, itemId);
        expect(playerData.items[itemId]).to.be.undefined;
      });
    });
  });

  describe('Internal', () => {
    describe('findItemConfig', () => {
      it('should return the right definition if the given id is in the list', () => {
        const itemDefinition = findItemConfig(1);
        expect(itemDefinition.value).to.be.eq(item1);
      });
      it('should return an ItemNotFoundError if the given id is not in the list', () => {
        const itemDefinition = findItemConfig(99999999);
        expect(itemDefinition.value).not.to.be.undefined;
        expect(itemDefinition.value).to.be.an.instanceof(
          ItemConfigNotFoundError,
        );
      });
    });
  });
});
