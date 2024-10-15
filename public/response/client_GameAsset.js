import { sendEvent } from '../Socket.js';
import { client_handlerMapping } from '../client_handlerMapping.js';
let gameAssets = {};

export const getGameAssets = () => {
  return gameAssets;
};

export const game_ServerConnnect_Start = () => {
  sendEvent(client_handlerMapping.first_GameAssets_Setup, null);
};

export const gameAssets_Setup = (data) => {
  const { items, itemUnlocks, stages } = data.payload;
  gameAssets.items = items;
  gameAssets.itemUnlocks = itemUnlocks;
  gameAssets.stages = stages;
};
