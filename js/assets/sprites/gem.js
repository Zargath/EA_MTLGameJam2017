import Phaser from 'Phaser';

import { GemTypes } from '../../Enum';

const getSpriteIndex = (gemType) => {
  switch (gemType) {
    case GemTypes.SILVER:
      return 0;
    case GemTypes.ORANGE:
      return 1;
    case GemTypes.YELLOW:
      return 2;
    case GemTypes.PURPLE:
      return 3;
    case GemTypes.RED:
      return 4;
    case GemTypes.GREEN:
      return 5;
    case GemTypes.BLUE:
      return 6;
    case GemTypes.TURQUOISE:
      return 7;
  }
};

export default class Gem extends Phaser.Sprite {
  constructor({ game, x, y, gemType }) {
    super(game, x, y, 'gems', getSpriteIndex(gemType));
  }
}