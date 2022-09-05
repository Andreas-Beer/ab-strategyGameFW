import { expect } from "chai";
import { getPlayerData } from "./playerData";

const data = { id: 1, email: "1@1.test" };

describe("data/playerData.ts", () => {
  let playerData: Awaited<ReturnType<typeof getPlayerData>>;

  beforeEach(() => {
    return getPlayerData(1, data).then((d) => {
      playerData = d;
    });
  });
  describe("set", () => {
    it("could be modified values", () => {
      const emailNew = "nix@da.net";
      playerData.set("email", emailNew);
      expect(playerData.get("email")).to.be.eq(emailNew);
    });
  });
});
