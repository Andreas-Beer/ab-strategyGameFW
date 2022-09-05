import { expect } from "chai";
import { cloneObj } from "./cloneObj";
import { getData, setData } from "./nestedGetSet";

const data = {
  a: 1,
  b: { c: 2, arr: [{ a1: 1 }] },
  d: { e: { f: 3 } },
  g: { h: { i: { j: 4 } } },
  l: { m: { n: { o: { p: [0, 1, 2, 3, 4, 5] } } } },
};

describe("helpers/nestedGetSet.ts", () => {
  describe("getData", () => {
    it("should get shallow data", () => {
      expect(getData<typeof data>(data, "a")).to.be.eq(data.a);
    });
    it("should get deep data", () => {
      expect(getData<typeof data>(data, "g.h.i.j")).to.be.eq(data.g.h.i.j);
    });
    it("should get deep array data", () => {
      expect(getData<typeof data>(data, "b.arr.0.a1")).to.be.eq(
        data.b.arr.at(0)?.a1
      );
    });
  });
  describe("setData", () => {
    let clonedData: ReturnType<typeof cloneObj<typeof data>>;
    const newValue = 42;

    beforeEach(() => {
      clonedData = cloneObj(data);
    });
    it("should set a shallow value", () => {
      setData<typeof data>(clonedData, "a", newValue);
      expect(clonedData.a).to.be.eq(newValue);
    });
    it("should set a nested value", () => {
      setData<typeof data>(clonedData, "g.h.i.j", newValue);
      expect(clonedData.g.h.i.j).to.be.eq(newValue);
    });
    it("should set deep array value", () => {
      setData<typeof data>(clonedData, "b.arr.0.a1", newValue);
      expect(clonedData.b.arr[0].a1).to.be.eq(newValue);
    });
  });
});
