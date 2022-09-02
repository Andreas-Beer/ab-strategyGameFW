import { expect } from "chai";
import { findItemConfig } from "./items";

const item1 = { id: 1 };

describe("items", () => {
  describe("findItemConfig", () => {
    it("should return the right definition if the given id is in the list", () => {
      const itemDefinition = findItemConfig([item1], 1);
      expect(itemDefinition.value).to.be.eq(item1);
    });
    it("should return an error if the given id is not in the list", () => {
      const itemDefinition = findItemConfig([item1], 2);
      expect(itemDefinition.error).not.to.be.undefined;
      expect(itemDefinition.error instanceof Error).to.be.eq(true);
    });
  });
});
