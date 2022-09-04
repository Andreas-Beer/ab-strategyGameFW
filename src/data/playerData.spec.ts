import { expect } from "chai";
import { getPlayerData } from "./playerData";

describe("playerData", () => {
  describe("XYZ", () => {
    it("could be modified values", (done) => {
      const emailNew = "nix@da.net";
      getPlayerData(1).then((playerData) => {
        console.log("playerData", playerData);

        playerData.set("email", emailNew);
        expect(playerData.get("email")).to.be.eq(emailNew);
        done();
      });
    });
  });
});
