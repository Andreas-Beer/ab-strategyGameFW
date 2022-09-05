import { expect } from "chai";
import { getConfig } from "./configData";

describe("data/configData.ts", () => {
  describe("set", () => {
    it("could be modified values", () => {
      const conf = getConfig();
      expect(conf)
        .to.be.an("object")
        .include.keys("buildings", "units", "items");
    });
  });
});
