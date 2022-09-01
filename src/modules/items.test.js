import { getItemDefinition, checkLiquidity } from "./items.ts";

const fixtureItem1 = {
  id: 1,
  price: [
    { resourceId: 1, amount: 100 },
    { resourceId: 2, amount: 100 },
  ],
};
const fixtureData = {
  resources: { 1: 100, 2: 100 },
};

describe("items.js", () => {
  describe("getItemDefinition()", () => {
    test("should get right item definition", () => {
      const getItemDefinitionResult = getItemDefinition(
        [fixtureItem1],
        fixtureItem1.id
      );
      expect(getItemDefinitionResult).toBe(fixtureItem1);
    });
    test("should return error if item definition was not found", () => {
      const getItemDefinitionResult = getItemDefinition([fixtureItem1], 123823);
      expect(getItemDefinitionResult.error).toBeDefined;
    });
  });
  describe("checkLiquidity()", () => {
    test("should return true if is liquid", () => {
      const liquidity = checkLiquidity(
        fixtureData.resources,
        fixtureItem1.price
      );
      expect(liquidity).toBeDefined;
    });
    test("should return error if is not liquid", () => {
      const liquidity = checkLiquidity(fixtureData.resources, [
        { resourceId: 1, amount: 101 },
      ]);
      expect(liquidity instanceof Error).toBeTruthy;
    });
  });
});