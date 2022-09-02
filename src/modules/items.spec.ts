import { expect } from "chai";
import { findItemConfig, errors, test } from "./items";

const item1: ItemConfig = { id: 1 } as ItemConfig;

const resources: ResourceData = { 1: 100 };
const price1: Price = { resourceId: 1, amount: 10 };
const price2: Price = { resourceId: 1, amount: 1000 };
const priceX: Price = { resourceId: 9999, amount: 1000 };

describe("items", () => {
  describe("findItemConfig", () => {
    it("should return the right definition if the given id is in the list", () => {
      const itemDefinition = findItemConfig([item1], 1);
      expect(itemDefinition.value).to.be.eq(item1);
    });
    it("should return an ItemNotFoundError if the given id is not in the list", () => {
      const itemDefinition = findItemConfig([item1], 2);
      expect(itemDefinition.value).not.to.be.undefined;
      expect(itemDefinition.value instanceof errors.ItemNotFoundError).to.be.eq(
        true
      );
    });
  });

  describe("checkResourceAmount", () => {
    it("should return true if the price covers the stack", () => {
      const liquidityCheck = test.checkResourceAmount(resources, price1);
      expect(liquidityCheck.value).to.be.true;
    });
    it("should return an ResourceNotFoundError if the resource is unknown", () => {
      const liquidityCheck = test.checkResourceAmount(resources, priceX);
      expect(liquidityCheck.value instanceof errors.ResourceNotFoundError).to.be
        .true;
    });
    it("should return an ResourceNotEnoughAmountError if the price don't covers the stack", () => {
      const liquidityCheck = test.checkResourceAmount(resources, price2);
      expect(
        liquidityCheck.value instanceof errors.ResourceNotEnoughAmountError
      ).to.be.true;
    });
  });
});
