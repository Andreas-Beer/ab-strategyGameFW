import { expect } from "chai";
import * as fooM from "./foo";

describe("foo", () => {
  describe("fooooooooo", () => {
    it("should work", () => {
      expect(fooM.default.foo2()).to.eq("foo");
    });
  });
  it("should NOT work", () => {
    expect(fooM.foo1()).not.to.eq("foo");
  });
});
