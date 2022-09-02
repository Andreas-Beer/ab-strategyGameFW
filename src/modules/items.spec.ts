import { expect } from "chai";
import * as sinon from "sinon";
import config, * as configModule from "../data/configData";
import {
  errors as itemErrors,
  internal as itemInternals,
  buyItem,
  addItem,
} from "./items";

const { checkLiquidity, checkResourceAmount, findItemConfig, removeItem } =
  itemInternals;
const {
  ItemConfigNotFoundError,
  ItemNotFoundError,
  ResourceNotEnoughAmountError,
  ResourceNotFoundError,
} = itemErrors;

let resources: ResourceData;
let items: ResourceData;
let playerData: PlayerData;

const price1: Price = { resourceId: 1, amount: 10 };
const price2: Price = { resourceId: 2, amount: 10 };
const price9999X: Price = { resourceId: 9999, amount: 1000 };
const price2X: Price = { resourceId: 2, amount: 1000 };

const item1: ItemConfig = { id: 1, price: [price1, price2] } as ItemConfig;

describe("items", () => {
  beforeEach(() => {
    resources = { 1: 100, 2: 200 };
    items = {};
    playerData = { resources, items } as PlayerData;

    // Stubs
    sinon
      .stub(configModule, "getConfig")
      .returns({ items: [item1] } as ConfigData);
  });
  afterEach(() => {
    sinon.restore();
  });

  describe("API", () => {
    describe("addItem", () => {
      it("should add a new item id to the stack if the item is not in the stack", () => {
        const { id } = item1;
        expect(playerData.items[id]).to.be.undefined;
        const result = addItem(id, playerData);
        expect(playerData.items[id]).to.be.eq(1);
        expect(result.success).to.be.true;
      });

      it("should increase the item stack if the resource is already in the stack", () => {
        const { id } = item1;
        playerData.items[id] = 1;

        expect(playerData.items[id]).to.be.eq(1);
        const result = addItem(id, playerData);
        expect(playerData.items[id]).to.be.eq(2);
        expect(result.success).to.be.true;
      });
    });

    describe("removeItem", () => {
      it("should remove an item if the item amount is 1", () => {
        const { id } = item1;
        playerData.items[id] = 1;

        removeItem(id, playerData);
        expect(playerData.items[id]).to.be.undefined;
      });

      it("should decrease an item if the item amount is above 1", () => {
        const { id } = item1;
        const oldAmount = 2;
        const expectedAmount = oldAmount - 1;
        playerData.items[id] = oldAmount;

        removeItem(id, playerData);
        expect(playerData.items[id]).to.be.eq(expectedAmount);
      });

      it("should return an error if the item does not exist", () => {
        const { id } = item1;

        const removeItemResult = removeItem(id, playerData);
        expect(removeItemResult).to.be.not.undefined;
        expect(removeItemResult.success).to.be.false;
        expect(removeItemResult.value).to.be.instanceOf(ItemNotFoundError);
      });
    });
  });

  describe("Internal", () => {
    describe("findItemConfig", () => {
      it("should return the right definition if the given id is in the list", () => {
        const itemDefinition = findItemConfig(1);
        expect(itemDefinition.value).to.be.eq(item1);
      });
      it("should return an ItemNotFoundError if the given id is not in the list", () => {
        const itemDefinition = findItemConfig(2);
        expect(itemDefinition.value).not.to.be.undefined;
        expect(itemDefinition.value).to.be.an.instanceof(
          ItemConfigNotFoundError
        );
      });
    });

    describe("checkResourceAmount", () => {
      it("should return true if the price covers the stack", () => {
        const amountCheck = checkResourceAmount(resources, price1);
        expect(amountCheck.value).to.be.true;
      });
      it("should return an ResourceNotFoundError if the resource is unknown", () => {
        const amountCheck = checkResourceAmount(resources, price9999X);
        expect(amountCheck.value).to.be.an.instanceof(ResourceNotFoundError);
      });
      it("should return an ResourceNotEnoughAmountError if the price don't covers the stack", () => {
        const amountCheck = checkResourceAmount(resources, price2X);
        expect(amountCheck.value).to.be.an.instanceof(
          ResourceNotEnoughAmountError
        );
      });
    });

    describe("checkLiquidity", () => {
      it("should return true if the prices covers the stack", () => {
        const liquidityCheck = checkLiquidity(resources, [price1, price2]);
        expect(liquidityCheck.success).to.be.true;
        expect(liquidityCheck.value).to.be.true;
      });
      it("should return an ResourceNotFoundError if the one of the resources is unknown", () => {
        const liquidityCheck = checkLiquidity(resources, [price1, price2X]);
        expect(liquidityCheck.success).to.be.false;
        expect(liquidityCheck.value).to.be.an.instanceof(Array);
      });
    });
  });
});
