import { expect } from "chai";
import { findItemConfig, checkLiquidity } from "./items";

const item1: ItemConfig = { id: 1 } as ItemConfig;

const resources: ResourceData = { 1: 2 };
const prices: Price[] = [{ resourceId: 1, amount: 100 }];

describe("items", () => {
  describe("findItemConfig", () => {
    it("should return the right definition if the given id is in the list", () => {
      const itemDefinition = findItemConfig([item1], 1);
      expect(itemDefinition.value).to.be.eq(item1);
    });
    it("should return an error if the given id is not in the list", () => {
      const itemDefinition = findItemConfig([item1], 2);
      expect(itemDefinition.value).not.to.be.undefined;
      expect(itemDefinition.value instanceof Error).to.be.eq(true);
    });
  });

  describe("checkLiquidity", () => {
    it("should return an Error if the resource does not exist", () => {
      const liquidityCheck = checkLiquidity({}, prices);

      expect(liquidityCheck).not.to.be.undefined;
    });
  });
});
