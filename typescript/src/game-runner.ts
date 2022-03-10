import { Game } from "./game";
import { checkPlayers, roll, wasCorrectlyAnswered, wrongAnswer } from "./utils";

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
      const diceRoll = Math.floor(Math.random() * 6) + 1;
      let action = roll(
        game.players,
        game.currentPlayer,
        game.questions,
        game.isRock,
        diceRoll
      );
      console.log(action);
      if (action != 2) {
        if (Math.floor(Math.random() * 10) == 7) {
          wrongAnswer(game.players, game.currentPlayer);
        } else {
          notAWinner = wasCorrectlyAnswered(game.players, game.currentPlayer);
        }
      } else {
        notAWinner = true;
      }
    } while (notAWinner);
  }
}

GameRunner.main();
