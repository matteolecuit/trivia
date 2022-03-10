import { Game } from "./game";
import { checkPlayers, wrongAnswer } from "./utils";

export class GameRunner {
  public static main(): void {
    const game = new Game(["Chet", "Pat", "Sue"]);

    const isGameValid = checkPlayers(game.players);
    if (!isGameValid) {
      console.error("Game should have more than 2 and less than 7 players");
      return;
    }
    let notAWinner;
    do {
      game.roll(Math.floor(Math.random() * 6) + 1);

      if (Math.floor(Math.random() * 10) == 7) {
        wrongAnswer(game.players, game.currentPlayer);
      } else {
        notAWinner = game.wasCorrectlyAnswered();
      }
    } while (notAWinner);
  }
}

GameRunner.main();
