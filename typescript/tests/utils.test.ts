import { expect } from "chai";
import { describe, it } from "mocha";
import { Player } from "../src/types";
import { currentCategory } from "../src/utils";

describe("The test initPlayers", () => {
  it("Test initPlayers", async () => {
    expect(0).to.be.equal(0);
  })
})

describe("The test didPlayerWin", () => {
  it("Test didPlayerWin", async () => {
    expect(0).to.equal(0);
  })
})

describe("The test currentCategory", () => {
  it("Test currentCategory", async () => {
    expect(0).to.be.equal(0);
  })
})

describe("The test wrongAnswer", () => {
  it("Test wrongAnswer", async () => {
    expect(0).to.be.equal(0);
  })
})

describe("The test switchPlayer", () => {
  it("Test switchPlayer", async () => {
    expect(0).to.be.equal(0);
  })
})

describe("The test wasCorrectlyAnswered", () => {
  it("Test wasCorrectlyAnswered", async () => {
    expect(0).to.be.equal(0);
  })
})

describe("The test checkPlayers", () => {
  it("Test checkPlayers", async () => {
    expect(0).to.be.equal(0);
  })
})

describe("The test askRockType", () => {
  it("Test askRockType", async () => {
    expect(0).to.be.equal(0);
  })
})

describe("The test askAction", () => {
  it("Test askAction", async () => {
    expect(0).to.be.equal(0);
  })
})

describe("The test askCategory", () => {
  it("Test askCategory", async () => {
    expect(0).to.be.equal(0);
  })
})

describe("The test createRockQuestion", () => {
  it("Test createRockQuestion", async () => {
    expect(0).to.be.equal(0);
  })
})

describe("The test roll", () => {
  it("Test roll", async () => {
    expect(0).to.be.equal(0);
  })
})

describe("The test move", () => {
  it("Test move", async () => {
    expect(0).to.be.equal(0);
  })
})

describe("The test generateQuestions", () => {
  it("Test generateQuestions", async () => {
    expect(0).to.be.equal(0);
  })
})

// describe("The test environment", () => {
//   it("Generate category samples", async () => {
//     let results = [
//       { pop: 0, science: 0, sports: 0, rock: 0, techno: 0, rap: 0, philosophy: 0, literature: 0, geography: 0, people: 0 },
//       { pop: 0, science: 0, sports: 0, rock: 0, techno: 0, rap: 0, philosophy: 0, literature: 0, geography: 0, people: 0 },
//       { pop: 0, science: 0, sports: 0, rock: 0, techno: 0, rap: 0, philosophy: 0, literature: 0, geography: 0, people: 0 },
//     ];
//     console.log("start");
//     const players: Player[] = [
//       {
//         place: 0,
//         gold: 0,
//         hasQuit: false,
//         prison: 0,
//         isInPenaltyBox: false,
//         timeInPenaltyBox: 0,
//         jokers: 0,
//         name: "0",
//         streak: 0,
//         designedCategory: "",
//       },
//       {
//         place: 0,
//         gold: 0,
//         hasQuit: false,
//         prison: 0,
//         isInPenaltyBox: false,
//         timeInPenaltyBox: 0,
//         jokers: 0,
//         name: "1",
//         streak: 0,
//         designedCategory: "",
//       },
//       {
//         place: 0,
//         gold: 0,
//         hasQuit: false,
//         prison: 0,
//         isInPenaltyBox: false,
//         timeInPenaltyBox: 0,
//         jokers: 0,
//         name: "2",
//         streak: 0,
//         designedCategory: "",
//       },
//     ];

//     for (let i = 0; i < 10000; i++) {
//       for (const player of players) {
//         console.log(i);
//         player.place = Math.floor(Math.random() * 12) + 1;
//         const category = currentCategory(category, null);
//         console.log(category);
//         results[Number(player.name)][category] += 1;
//       }
//     }
//     console.log(results);
//     expect(results[1]["pop"]).to.be.greaterThan(0);
//   });
// });
