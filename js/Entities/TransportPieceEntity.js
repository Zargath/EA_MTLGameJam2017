import GameObject from './GameObjectEntity';
import Enum from '../Enum';
import { guid } from '../Utils';

export default class TransportPieceEntity extends GameObject {
  constructor(game, color, pickupText) {
    super();
    this.id = guid();
    this.game = game;
    this.pickupText = pickupText;
    this.color = undefined;

    if (Enum.Colors.contains(color)) {
      throw new Error(`${color} is not a valid color.`);
    } else {
      this.color = color;
    }
  }

  setId(id) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  setPickupText(text) {
    this.pickupText = text;
  }

  getPickupText() {
    return this.pickupText;
  }

  setColor(color) {
    this.color = color;
  }

  getColor() {
    return this.color;
  }
}
