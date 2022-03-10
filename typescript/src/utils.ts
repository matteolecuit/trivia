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
      streak: 0,
      jokers: 1,
      isInPenaltyBox: false,
      isGettingOutOfPenaltyBox: false,
      hasQuit: false,
    };
  });
  return players;
};

export const didPlayerWin = (player: Player, maxGold: number) => {
  return player.gold >= maxGold;
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
export const askQuestion = (
  player: Player,
  questions: Questions,
  isRock: boolean
) => {
  if (!player.hasQuit) {
    const category = currentCategory(player, isRock);
    const availableQuestions = questions[category] as string[];
    console.log(availableQuestions.shift());
  }
};

export const wrongAnswer = (players: Player[], currentPlayer: number) => {
  const player = players[currentPlayer];
  console.log("Question was incorrectly answered");
  console.log("Streak has been reset");
  console.log(player.name + " was sent to the penalty box");
  player.isInPenaltyBox = true;

  player.streak = 0;
  currentPlayer += 1;
};

export const switchPlayer = (currentPlayer: number, players: Player[]) => {
  currentPlayer += 1;
  if (currentPlayer == players.length) currentPlayer = 0;
  return currentPlayer;
};
export const wasCorrectlyAnswered = (
  players: Player[],
  currentPlayer: number,
  maxGold: number
) => {
  const player = players[currentPlayer];
  if (!player.hasQuit) {
    if (player.isInPenaltyBox) {
      if (player.isGettingOutOfPenaltyBox) {
        console.log("---------------------------");
        console.log(
          "Answer was correct!!!!" +
            player.name +
            " is leaving the penalty box."
        );

        player.isInPenaltyBox = false;
        player.isGettingOutOfPenaltyBox = false;

        player.streak += 1;
        player.gold += player.streak;

        console.log(player.name + " now 1has " + player.gold + " Gold Coins.");

        var winner = didPlayerWin(player, maxGold);

        return winner;
      } else {
        return true;
      }
    } else {
      console.log("Answer was correct!!!!");

      player.streak += 1;
      player.gold += player.streak;

      console.log(player.name + " now 2has " + player.gold + " Gold Coins.");

      var winner = didPlayerWin(player, maxGold);

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
  let rockPrompt: string = readline.question(
    "Tu veux du rock mon copain ? (Y/N) : "
  );

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
  } else if (askPrompt === "2") {
    if (player.jokers > 0) {
      console.log("You skip the question, you lost your Joker !");
    } else {
      console.log("You don't have any jokers, You'll answer to this question");
      return 1;
    }
  } else if (askPrompt === "3") {
    console.log("You are out !");
  } else {
    console.log("Invalid answer, You'll answer to this question");
    return 0;
  }
  return Number(askPrompt);
};

export const createRockQuestion = (index: number, isRock: boolean) => {
  let type: string;
  type = isRock ? "Rock" : "Techno";
  return type + " Question " + index;
};

export const roll = (
  players: Player[],
  currentPlayer: number,
  questions: Questions,
  isRock: boolean,
  roll: number
) => {
  const player = players[currentPlayer];
  console.log(player.name + " is the current player");
  console.log("They have rolled a " + roll);

  if (!player.hasQuit) {
    if (player.isInPenaltyBox) {
      if (roll % 2 != 0) {
        player.isGettingOutOfPenaltyBox = true;

        player.place = player.place + roll;
        if (player.place > 11) {
          player.place = player.place - 12;
        }

        console.log(player.name + "'s new location is " + player.place);
        console.log("The category is " + currentCategory(player, isRock));
        if (askAction(player) == 2) {
          player.jokers--;
          return 2;
        }

        askQuestion(player, questions, isRock);
      } else {
        console.log(player.name + " is not getting out of the penalty box");
        player.isGettingOutOfPenaltyBox = false;
      }
    } else {
      player.place = player.place + roll;
      if (player.place > 11) {
        player.place = player.place - 12;
      }

      console.log(player.name + "'s new location is " + player.place);
      console.log("The category is " + currentCategory(player, isRock));
      if (askAction(player) == 2) {
        player.jokers--;
        return 2;
      }
      askQuestion(player, questions, isRock);
    }
  }
};
