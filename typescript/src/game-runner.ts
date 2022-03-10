import { Game } from "./game";

export class GameRunner {
    public static main(): void {
        const game = new Game(["Chet", "Pat", "Sue"]);
        game.add("Chet");
        game.add("Pat");
        game.add("Sue");
        if (!game.checkPlayers()) {
            console.error("Game should have more than 2 and less than 7 players");
            return;
        }
        let notAWinner;
        do {
            game.roll(Math.floor(Math.random() * 6) + 1);

            if (Math.floor(Math.random() * 10) == 7) {
                notAWinner = game.wrongAnswer();
            } else {
                notAWinner = game.wasCorrectlyAnswered();
            }
        } while (notAWinner);
    }
}

GameRunner.main();
