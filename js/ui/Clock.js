import Settings from '../Settings';
import BaseDrawableObject from './BaseDrawableObject';
import ClockEntity from '../Entities/ClockEntity';
import { leftPadZero } from '../Utils';

// TODO After game jam refactor this class to seperate the logic of the autmaticScroll
// from the logic of drawing on screen. Add the abilty to have a character's portrait
// In the text as well by extending this class
export default class Clock extends BaseDrawableObject {
  constructor(game, graphics, x, y) {
    super(game, graphics);
    this.x = x;
    this.y = y;

    this.ClockEntity = new ClockEntity(this.game);

    this.initialStartTime = this.game.time.time;

    const style = { font: `${Settings.HUDFontSize()}px ${Settings.FontStyle()}`, fill: Settings.FontColor() };
    this.text = this.game.add.text(this.x + 2, this.y + 2, '', style);
  }

  update() {
    this.text.text = Clock.PrettyPrintClock(this.ClockEntity.getElapsedTimeInSeconds());
  }

  fixedToCamera(fixedToCamera) {
    this.text.fixedToCamera = fixedToCamera;
  }

  static PrettyPrintClock(timeElapsed) {
    const timeElapsedInSeconds = timeElapsed / 1000;
    const seconds = Math.round(timeElapsedInSeconds % 59);
    const minutes = Math.ceil((timeElapsedInSeconds / 59) - 1);
    return `${leftPadZero(2, minutes)}:${leftPadZero(2, seconds)}`;
  }
}
