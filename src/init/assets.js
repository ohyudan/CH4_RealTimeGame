import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

let gameAssets = {};

export const getGameAssets = () => {
  return gameAssets;
};

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const basePath = path.join(_dirname, '../../assets');

const readFileAsync = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(basePath, filename), 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(data));
    });
  });
};

export const loadGameAssets = async () => {
  try {
    const [stages, items, itemUnlocks] = await Promise.all([
      readFileAsync('stage.json'),
      readFileAsync('item.json'),
      readFileAsync('item_unlock.json'),
    ]);
    gameAssets = { stages, items, itemUnlocks };

    return gameAssets;
  } catch (error) {
    throw new Error('Failed to load game assets: ' + error);
  }
};
