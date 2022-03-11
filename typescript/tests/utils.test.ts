import { expect } from "chai";
import { describe, it } from "mocha";
import { Player } from "../src/types";
import { currentCategory } from "../src/utils";

describe("The test environment", () => {
  it("Generate category samples", async () => {
    let results = [
      { pop: 0, science: 0, sports: 0, rock: 0 },
      { pop: 0, science: 0, sports: 0, rock: 0 },
      { pop: 0, science: 0, sports: 0, rock: 0 },
    ];
    console.log("start");
    const players: Player[] = [
      {
        place: 0,
        gold: 0,
        hasQuit: false,
        prison: 0,
        isInPenaltyBox: false,
        timeInPenaltyBox: 0,
        jokers: 0,
        name: "0",
        streak: 0,
        designedCategory: "",
      },
      {
        place: 0,
        gold: 0,
        hasQuit: false,
        prison: 0,
        isInPenaltyBox: false,
        timeInPenaltyBox: 0,
        jokers: 0,
        name: "1",
        streak: 0,
        designedCategory: "",
      },
      {
        place: 0,
        gold: 0,
        hasQuit: false,
        prison: 0,
        isInPenaltyBox: false,
        timeInPenaltyBox: 0,
        jokers: 0,
        name: "2",
        streak: 0,
        designedCategory: "",
      },
    ];

    for (let i = 0; i < 10000; i++) {
      for (const player of players) {
        console.log(i);
        player.place = Math.floor(Math.random() * 12) + 1;
        const category = currentCategory(player, true, "");
        console.log(category);
        results[Number(player.name)][category] += 1;
      }
    }
    console.log(results);
    expect(results[1]["pop"]).to.be.greaterThan(0);
  });
});
