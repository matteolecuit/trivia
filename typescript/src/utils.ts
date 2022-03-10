import { Category, Player, Questions } from "./types";
import * as readline from "readline-sync";

export const initPlayers = (playerNames: string[]) => {
  let playerCount = 0;
  const players: Player[] = playerNames.map((playerName) => {
    playerCount += 1;
    console.log(playerName + " was added");
    console.log("They are " + playerCount + " players");
    return {
      name: playerName,
      gold: 0,
      place: 0,
      isInPenaltyBox: false,
      isGettingOutOfPenaltyBox: false,
      hasQuit: false,
    };
  });
  return players;
};

export const didPlayerWin = (player: Player) => {
  return !(player.gold === 6);
};

export const currentCategory = (player: Player, isRock: boolean) => {
  let category: Category = "rock";
  if (player.place == 0) category = "pop";
  if (player.place == 1) category = "science";
  if (player.place == 2) category = "sports";
  if (player.place == 4) category = "pop";
  if (player.place == 5) category = "science";
  if (player.place == 6) category = "sports";
  if (player.place == 8) category = "pop";
  if (player.place == 9) category = "science";
  if (player.place == 10) category = "sports";

  if (category == "rock" && !isRock) category = "techno";
  return category;
};
export const askQuestion = (player: Player, questions: Questions, isRock: boolean) => {
  if (!player.hasQuit) {
    const category = currentCategory(player, isRock);
    const availableQuestions = questions[category] as string[];
    console.log(availableQuestions.shift());
  }
};

export const wrongAnswer = (players: Player[], currentPlayer: number) => {
  const player = players[currentPlayer];
  console.log("Question was incorrectly answered");
  console.log(player.name + " was sent to the penalty box");
  player.isInPenaltyBox = true;

  currentPlayer += 1;
  if (currentPlayer == players.length) currentPlayer = 0;
  return { players, currentPlayer };
};

export const wasCorrectlyAnswered = (players: Player[], currentPlayer: number) => {
  const player = players[currentPlayer];
  if (!player.hasQuit) {
    if (player.isInPenaltyBox) {
      if (player.isGettingOutOfPenaltyBox) {
        console.log("Answer was correct!!!!");
        player.gold += 1;
        console.log(player.name + " now 1has " + player.gold + " Gold Coins.");

        var winner = didPlayerWin(player);
        currentPlayer += 1;
        if (currentPlayer == players.length) currentPlayer = 0;

        return winner;
      } else {
        currentPlayer += 1;
        if (currentPlayer == players.length) currentPlayer = 0;
        return true;
      }
    } else {
      console.log("Answer was correct!!!!");

      player.gold += 1;
      console.log(player.name + " now 2has " + player.gold + " Gold Coins.");

      var winner = didPlayerWin(player);

      currentPlayer += 1;
      if (currentPlayer == players.length) currentPlayer = 0;

      return winner;
    }
  } else {
    return false;
  }
};

export const checkPlayers = (players: Player[]) => {
  if (players.length >= 2 && players.length <= 6) {
    return true;
  }
  return false;
};

export const askRockType = () => {
  let rockPrompt: string = readline.question("Tu veux du rock mon copain ? (Y/N) : ");

  if (rockPrompt.toLowerCase() === "y") {
    console.log("You choose Rock");
    return true;
  } else if (rockPrompt.toLowerCase() === "n") {
    console.log("You'll have Techno questions");
    return false;
  } else {
    console.log("Invalid answer, You'll have Techno questions");
    return false;
  }
};

export const askAction = (player: Player) => {
  let askPrompt: string = readline.question(
    "Choisissez votre action ? : \
    1- Répondre à la question \
    2- Utiliser un joker \
    3- Quitter la partie"
  );

  if (askPrompt === "1") {
    console.log("You'll answer to this question");
    return 1;
  } else if (askPrompt === "2") {
    console.log("You skip the question, you lost your Joker !");
    return 2;
  } else if (askPrompt === "3") {
    console.log("You are out !");
    player.hasQuit = true;
    return 3;
  } else {
    console.log("Invalid answer, You'll answer to this question");
    return 0;
  }
};

export const createRockQuestion = (index: number, isRock: boolean) => {
  let type: string;
  type = isRock ? "Rock" : "Techno";
  return type + " Question " + index;
};
