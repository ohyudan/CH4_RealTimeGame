import { getGameAssets } from '../init/assets.js';

export const score_Data_Setup = (userId, payload) => {};
export const first_GameAssets_Setup = (userId, payload) => {
  return { status: 'success', handler: 1, payload: getGameAssets() };
};
