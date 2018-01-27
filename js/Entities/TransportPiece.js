import GameObject from './GameObject';
import Enum from '../Enum';
import { guid } from '../Utils';

export default class TransportPiece extends GameObject {
  constructor({ game, color }) {
    super();
    this.id = guid();
    this.game = game;

    if (Enum.Colors.contains(color)) {
      throw new Error(`${color} is not a valid color.`);
    } else {
      this.color = color;
    }
  }
}
