import { Game } from "./game";
import { generateRandom } from "./utils";

export class GameRunner {
  public static main() {
    const game = new Game();
    game.add("Chet");
    game.add("Pat");
    game.add("Sue");

    let notAWinner;
    do {
      game.roll(generateRandom(6) + 1);

      if (generateRandom(10) == 7) {
        notAWinner = game.wrongAnswer();
      } else {
        notAWinner = game.wasCorrectlyAnswered();
      }
    } while (notAWinner);
    return true;
  }
}

GameRunner.main();
