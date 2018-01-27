import { TileTypes } from '../Enum';

const getSpriteIndex = (tileType) => {
  switch (tileType) {
    case TileTypes.FLOOR:
      return 0;
    case TileTypes.WALL:
      return 1;
    default:
      throw new Error('Tile type not supported.');
  }
};

export default class TileInfo {
  constructor({ tileType }) {
    this.spriteIndex = getSpriteIndex(tileType);
  }
}
