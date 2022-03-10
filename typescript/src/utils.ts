import { Category, Player, Questions } from "./types";

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
    };
  });
  return players;
};

export const didPlayerWin = (player: Player) => {
  return !(player.gold === 6);
};

export const currentCategory = (player: Player) => {
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
  return category;
};
export const askQuestion = (player: Player, questions: Questions) => {
  const category = currentCategory(player);
  const availableQuestions = questions[category] as string[];
  console.log(availableQuestions.shift());
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

export const wasCorrectlyAnswered = (
  players: Player[],
  currentPlayer: number
) => {
  const player = players[currentPlayer];
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
    console.log("Answer was corrent!!!!");

    player.gold += 1;
    console.log(player.name + " now 2has " + player.gold + " Gold Coins.");

    var winner = didPlayerWin(player);

    currentPlayer += 1;
    if (currentPlayer == players.length) currentPlayer = 0;

    return winner;
  }
};
