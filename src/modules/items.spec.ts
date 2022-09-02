import { expect } from "chai";
import {
  findItemConfig,
  errors,
  test,
  checkLiquidity,
  buyItem,
  addItem,
} from "./items";

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
  });

  describe("findItemConfig", () => {
    it("should return the right definition if the given id is in the list", () => {
      const itemDefinition = findItemConfig([item1], 1);
      expect(itemDefinition.value).to.be.eq(item1);
    });
    it("should return an ItemNotFoundError if the given id is not in the list", () => {
      const itemDefinition = findItemConfig([item1], 2);
      expect(itemDefinition.value).not.to.be.undefined;
      expect(itemDefinition.value).to.be.an.instanceof(
        errors.ItemNotFoundError
      );
    });
  });

  describe("checkResourceAmount", () => {
    it("should return true if the price covers the stack", () => {
      const amountCheck = test.checkResourceAmount(resources, price1);
      expect(amountCheck.value).to.be.true;
    });
    it("should return an ResourceNotFoundError if the resource is unknown", () => {
      const amountCheck = test.checkResourceAmount(resources, price9999X);
      expect(amountCheck.value).to.be.an.instanceof(
        errors.ResourceNotFoundError
      );
    });
    it("should return an ResourceNotEnoughAmountError if the price don't covers the stack", () => {
      const amountCheck = test.checkResourceAmount(resources, price2X);
      expect(amountCheck.value).to.be.an.instanceof(
        errors.ResourceNotEnoughAmountError
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

  describe("buyItem", () => {
    it("should mutate the player resource", () => {
      const {
        price: [
          { resourceId: resourceId1, amount: amount1 },
          { resourceId: resourceId2, amount: amount2 },
        ],
      } = item1;

      const oldAmount1 = resources[resourceId1];
      const newAmount1 = oldAmount1 - amount1;
      expect(playerData.resources[resourceId1]).to.be.eq(oldAmount1);

      const oldAmount2 = resources[resourceId2];
      const newAmount2 = oldAmount2 - amount2;
      expect(playerData.resources[resourceId2]).to.be.eq(oldAmount2);

      buyItem(item1, playerData);
      expect(playerData.resources[resourceId1]).to.be.eq(newAmount1);
      expect(playerData.resources[resourceId2]).to.be.eq(newAmount2);
    });
  });

  describe("addItem", () => {
    it("should add a new item id to the stack", () => {
      const { id } = item1;
      expect(playerData.items[id]).to.be.undefined;
      const result = addItem(id, playerData);
      expect(playerData.items[id]).to.be.eq(1);
      expect(result.success).to.be.true;
    });

    it("should increase the item stack", () => {
      const { id } = item1;
      playerData.items[id] = 1;

      expect(playerData.items[id]).to.be.eq(1);
      const result = addItem(id, playerData);
      expect(playerData.items[id]).to.be.eq(2);
      expect(result.success).to.be.true;
    });
  });
});
