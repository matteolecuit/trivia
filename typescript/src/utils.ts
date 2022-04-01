import { logs } from "./game-runner";

export const generateRandom = (
  limit: number,
  rolls: number[],
  fixedNumber?: number
) => {
  const result = fixedNumber
    ? fixedNumber
    : Math.floor(Math.random() * limit) + 1;
  rolls.push(result);
  return result;
};

export const consoleLog = (message: string) => {
  console.log(message);
  logs.push(message);
};
