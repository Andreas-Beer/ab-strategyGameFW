import { expect, use } from "chai";
import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import { logger } from "./logger";
use(sinonChai);

describe("helpers/logger.ts", () => {
  it("should be a proxy of the console", () => {
    const loggerDouble = sinon.stub(console, "log");
    logger.log("foo");
    expect(loggerDouble).to.have.been.called;
    loggerDouble.restore();
  });
});
