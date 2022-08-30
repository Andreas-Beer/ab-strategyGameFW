import { getItemDefinition } from "./items.js";

describe("sum module 1", () => {
  describe("sum module 2", () => {
    test("adds 1 + 2 to equal 3", () => {
      expect(1 + 2).toBe(3);
    });
    test("adds 1 + 2 to equal 3", () => {
      expect(1 + 2).not.toBe(4);
    });
    test("adds 1 + 2 to equal 3", () => {
      expect(getItemDefinition).toBeDefined();
    });
    test("adds 1 + 2 to equal 3", () => {
      expect(typeof getItemDefinition).toEqual("function");
    });
  });
});
