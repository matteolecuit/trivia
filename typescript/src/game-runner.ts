import { Game } from "./game";
import { generateRandom } from "./utils";

export class GameRunner {
  public static main() {
    const game = new Game();
    game.add("Chet");
    game.add("Pat");
    game.add("Sue");

    let notAWinner;
    let rolls: number[] = [];
    do {
      game.roll(generateRandom(6, rolls) + 1);

      if (generateRandom(10, rolls) == 7) {
        notAWinner = game.wrongAnswer();
      } else {
        notAWinner = game.wasCorrectlyAnswered();
      }
    } while (notAWinner);
    console.log(rolls);
    return true;
  }
}

GameRunner.main();
