import ProgressBarEntity from '../Entities/ProgressBarEntity';
import BaseDrawableObject from './BaseDrawableObject';
import Settings from '../Settings';

export default class ProgressBar extends BaseDrawableObject {
  constructor(game, graphics, x, y, width, height) {
    super(game, graphics);
    this.width = 10;
    this.progressBarEntity = new ProgressBarEntity(0.2, true);

    this.x = x;
    this.y = y;
    this.maxWidth = width;
    this.height = height;

    this.lastPosition = 0;

    const style = { font: `${Settings.HUDFontSize()}px ${Settings.FontStyle()}`, fill: Settings.FontColor() };
    this.text = this.game.add.text(this.x, this.y, 'loneliness', style);

    this.draw();
  }

  update() {
    if (this.lastPosition !== this.progressBarEntity.getPosition()) {
      this.lastPosition = this.progressBarEntity.getPosition();
      this.draw();
    }
  }

  draw() {
    const offset = 4;
    const offsetY = (this.text.height - this.height) / 5;
    const offsetX = offset + this.text.width;
    this.graphics.beginFill(`0X${Settings.ProgressBarForeground()}`, 1);
    this.graphics.drawRoundedRect(
      this.x + offsetX, this.y + offsetY,
      this.maxWidth, this.height, 2
    );
    if (this.progressBarEntity.getPosition() > 0) {
      const width = (this.maxWidth * this.progressBarEntity.getPosition()) - offset;
      this.graphics.beginFill(`0X${Settings.ProgressBarBackground()}`, 1);
      this.graphics.drawRoundedRect(
        this.x + 2 + offsetX,
        this.y + 2 + offsetY, width, this.height - offset, 2
      );
    }
    this.lastPosition = this.progressBarEntity.getPosition();
  }

  fixedToCamera(fixedToCamera) {
    this.graphics.fixedToCamera = fixedToCamera;
    this.text.fixedToCamera = fixedToCamera;
  }
}
