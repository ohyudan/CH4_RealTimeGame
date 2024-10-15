import { moveStageHandler } from './stage.handler.js';
import { gameEnd, gameStart } from './game.handler.js';
import { first_GameAssets_Setup, score_Data_Setup } from './data.handler.js';

const handlerMappings = {
  1: first_GameAssets_Setup,
  2: gameStart,
  3: gameEnd,
  11: moveStageHandler,
  100: score_Data_Setup,
};

export default handlerMappings;
