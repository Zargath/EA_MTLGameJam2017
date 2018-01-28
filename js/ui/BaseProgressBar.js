import ProgressBarEntity from '../Entities/ProgressBarEntity';
import BaseDrawableObject from './BaseDrawableObject';
import Settings from '../Settings';

export default class BaseProgressBar extends BaseDrawableObject {
  constructor(game, graphics, x, y, width, height) {
    super(game, graphics);
    this.width = 10;
    this.progressBarEntity = new ProgressBarEntity(0, true);

    this.x = x;
    this.y = y;
    this.maxWidth = width;
    this.height = height;

    this.lastPosition = 0;
  }

  update() {
    this.preUpdate();
    if (this.lastPosition !== this.progressBarEntity.getPosition()) {
      this.lastPosition = this.progressBarEntity.getPosition();
      this.draw();
    }
  }

  // Defines a method that must be overridden
  /*eslint-disable */
  preUpdate() {
    throw new Error('Need to redefine preupdate');
  }
  /* eslint-enable */

  draw() {
    const offset = 4;
    this.graphics.beginFill(`0X${Settings.ProgressBarForeground()}`, 1);
    this.graphics.drawRoundedRect(this.x, this.y, this.maxWidth, this.height, 2);
    if (this.progressBarEntity.getPosition() > 0) {
      const width = (this.maxWidth * this.progressBarEntity.getPosition()) - offset;
      this.graphics.beginFill(`0X${Settings.ProgressBarBackground()}`, 1);
      this.graphics.drawRoundedRect(
        this.x + 2,
        this.y + 2, width, this.height - offset, 2
      );
    }
    this.lastPosition = this.progressBarEntity.getPosition();
  }

  fixedToCamera(fixedToCamera) {
    this.graphics.fixedToCamera = fixedToCamera;
    this.text.fixedToCamera = fixedToCamera;
  }
}
