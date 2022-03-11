import { Game } from "./game";
import {
  checkPlayers,
  roll,
  switchPlayer,
  wasCorrectlyAnswered,
  wrongAnswer,
} from "./utils";
import {
  getGameModeFromPrompt,
  getGoldLimitFromPrompt,
  getNuberCellFromPrompt,
  wantToReplay,
} from "./prompt-service";

export class GameRunner {
    
    game: Game;

    public main(): void {
    const gameMode = getGameModeFromPrompt();
    let autoMode = gameMode === "auto";
    const maxGold = getGoldLimitFromPrompt(autoMode);
    const playersNames = ["Chet", "Pat", "Sue"];
    const numberCells = getNuberCellFromPrompt(playersNames);
    
        do{
            this.game = new Game(playersNames, maxGold, autoMode, numberCells);

            const isGameValid = checkPlayers(this.game.players);
            if (!isGameValid) {
                console.error("Game should have more than 2 and less than 7 players");
                return;
            }
            this.play()
        }while(wantToReplay())
        
    }

    private play(): void{
        let gameHasEnded = false;
        do {
            const diceRoll = Math.floor(Math.random() * 6) + 1;
            let action = roll(
                this.game,
                diceRoll,
            );
            this.game.nextCategory = ""
            if(this.game.rageQuitBoard.length === 1 && this.game.players.length === 2) gameHasEnded = true;
            if (action == 0) {
                if (Math.floor(Math.random() * 3) == 1) {
                    this.game.nextCategory = wrongAnswer(this.game);
                } else {
                    let winner = wasCorrectlyAnswered(
                        this.game.players,
                        this.game.currentPlayer,
                        this.game.maxGold
                    );
                    if (winner) {
                        this.game.leaderboard.push(this.game.players[this.game.currentPlayer]);
                        this.game.players[this.game.currentPlayer].hasQuit = true;
                    } 
                    if ((this.game.leaderboard.length === (this.game.players.length - this.game.rageQuitBoard.length)) || this.game.leaderboard.length === 3) gameHasEnded = true;
                }
            } if(action == 2) {
                console.log(
                    "🃏" + this.game.players[this.game.currentPlayer].name + " used a joker"
                );
            }
            this.game.currentPlayer = switchPlayer(this.game.currentPlayer, this.game.players);
        } while (!gameHasEnded);
        if (this.game.leaderboard.length + this.game.rageQuitBoard.length >= 3) {
            this.game.rageQuitBoard.reverse();
            this.game.rageQuitBoard.forEach(element => {
                this.game.leaderboard.push(element);
            })
        }
        let i = 1;
        console.log("LeaderBoard: \ ");
        this.game.leaderboard.forEach(element => {
            console.log(i + " - " + element.name + " \ ");
            i++;
        });
        if (this.game.players.length == 2 && this.game.rageQuitBoard.length == 1){
            let j = 1;
            this.game.players.forEach(element => {
                if(element != this.game.rageQuitBoard[0]){
                    console.log("1 - " + element.name + " \ ");
                    j++;
                    console.log("2 - " + this.game.rageQuitBoard[0].name + " \ ");
                }
            });
        }
    }

}

new GameRunner().main();
