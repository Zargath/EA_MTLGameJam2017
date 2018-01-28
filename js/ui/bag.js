import { remove } from 'lodash';

import BaseDrawableObject from './BaseDrawableObject';
import Settings from '../Settings';

export default class Bag extends BaseDrawableObject {
  constructor(game, graphics, x, y, xSlots, ySlots) {
    super(game, graphics);

    this.x = x;
    this.y = y;
    this.width = 42 * xSlots;
    this.height = 42 * ySlots;
    this.xSlots = xSlots;
    this.ySlots = ySlots;

    this.redrawBag();

    this.bag = [];

    this.transporter = null;
  }

  getBagCurrentCapacity() {
    return this.bag.length;
  }

  isBagFull() {
    return (this.xSlots * this.ySlots) <= this.getBagCurrentCapacity();
  }

  addGemToBag(gem) {
    const bagCurrentSize = this.getBagCurrentCapacity();
    const newGem = gem;
    if (!this.isBagFull()) {
      let yMultiplier = 0;
      yMultiplier = Math.floor(bagCurrentSize / 2);

      newGem.x = (this.x + 4) + (40 * Math.round(bagCurrentSize % 2));
      newGem.y = (this.y + 4) + (40 * yMultiplier);
      newGem.alpha = 1;
      newGem.fixedToCamera = true;
      newGem.inputEnabled = true;
      newGem.events.onInputDown.add((g) => {
        if (!this.transporter.isHidden) {
          this.transporter.addGem(g);
          remove(this.bag, bagGem => bagGem === g);
        }
      });
      this.bag.push(newGem);
    }
  }

  redrawBag() {
    this.graphics = this.game.add.graphics(0, 0);
    this.graphics.alpha = 0.5;
    this.graphics.lineStyle(2, 0x0000FF, 1);
    this.graphics.beginFill(0x000000);
    this.graphics.drawRect(this.x, this.y, this.width, this.height);

    this.graphics2 = this.game.add.graphics(0, 0);
    this.graphics2.alpha = 0.8;
    this.graphics2.lineStyle(2, 0x0000FF, 1);
    this.graphics2.beginFill(0x000000);
    this.graphics2.drawRect(this.x, this.y - 20, this.width, 20);

    this.graphics3 = this.game.add.graphics(0, 0);
    this.graphics3.alpha = 1;
    this.graphics3.lineStyle(1, 0XFFFFFF, 1);
    for (let i = 0; i < this.xSlots; i += 1) {
      for (let k = 0; k < this.ySlots; k += 1) {
        this.graphics3.drawRect(this.x + 4 + (i * 40), this.y + 4 + (k * 40), 34, 34);
      }
    }
    const style = { font: `${Settings.Header4Size()}px ${Settings.FontStyle()}`, fill: Settings.FontColor() };
    this.text = this.game.add.text(this.x + 25, this.y - 20, 'Bag', style);
  }

  fixedToCamera(fixedToCamera) {
    this.graphics.fixedToCamera = fixedToCamera;
    this.graphics2.fixedToCamera = fixedToCamera;
    this.graphics3.fixedToCamera = fixedToCamera;
    this.text.fixedToCamera = fixedToCamera;
  }
}
