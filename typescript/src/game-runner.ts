import * as fs from "fs";
import { Game } from "./game";
import { generateRandom } from "./utils";
export let logs: string[] = [];

export class GameRunner {
  public static main() {
    const numberOfGame = 1000;
    const listOfStats: string[] = [];
    let rolls: number[] = [];
    for (let i = 0; i < numberOfGame; i++) {
      const game = new Game();
      game.add("Chet");
      game.add("Pat");
      game.add("Sue");

      let notAWinner;
      do {
        game.roll(generateRandom(6, rolls) + 1);

        if (generateRandom(10, rolls) == 7) {
          notAWinner = game.wrongAnswer();
        } else {
          notAWinner = game.wasCorrectlyAnswered();
        }
      } while (notAWinner);
      console.log(rolls);
      console.log(logs);
      const string_rolls = rolls.toString();
      listOfStats.push(string_rolls + "\n" + logs.toString());
      rolls = [];
      logs = [];
    }

    // this.generateCsvOneGame(rolls);
    this.generateCsvMultiGame(listOfStats);
    return true;
  }

  static generateCsvMultiGame(listOfStats: string[]) {
    fs.writeFile("game.txt", listOfStats.join("\n"), function (err) {
      if (err) return console.log(err);
      console.log("Game");
    });
  }

  static generateCsvOneGame(rolls: number[]) {
    const string_rolls = rolls.toString();
    fs.writeFile(
      "game.txt",
      string_rolls + "\n" + logs.toString(),
      function (err) {
        if (err) return console.log(err);
        console.log("Game");
      }
    );
  }
}

GameRunner.main();
