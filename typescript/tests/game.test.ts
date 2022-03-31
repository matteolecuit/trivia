import { expect } from "chai";
import { describe, it } from "mocha";
import { GameRunner } from "../src/game-runner";
import { sinon } from "sinon";
import { Game } from "../src/game";

describe("The test environment", () => {
  it("should pass", () => {
    expect(true).to.be.true;
  });

  it("should access game", function () {
    expect(GameRunner).to.not.be.undefined;
  });

  it("game should end", () => {
    const game = GameRunner.main();
    expect(game).to.be.true;
  });
});
