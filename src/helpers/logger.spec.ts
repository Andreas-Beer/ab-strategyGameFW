import { expect } from "chai";
import * as sinon from "sinon";
import { logger } from "./logger";

describe("helpers/logger.ts", () => {
  it("should be a proxy of the console", () => {
    const spy = sinon.spy(console, "log");
    logger.log("foo");
    expect(spy.called).to.be.true;
  });
});
