import { Category, Player, Questions } from "./types";

export const howManyPlayers = (players: Player[]) => {
  return players.length;
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
