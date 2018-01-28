import BaseDrawableObject from './BaseDrawableObject';
import Settings from '../Settings';

export default class TransporterPowerModule extends BaseDrawableObject {
  constructor(game, graphics, bag) {
    super(game, graphics);

    this.xSlots = 2;
    this.ySlots = 4;

    this.isHidden = true;

    const bagSlotsWidth = bag.xSlots * 42;
    const transporterSlotsWidth = this.xSlots * 42;
    const arrowWidth = 50;
    this.width = bagSlotsWidth + arrowWidth + transporterSlotsWidth;

    const headerHeight = 20;
    const bagSlotsHeight = bag.ySlots * 42;
    const transporterSlotsHeight = this.ySlots * 42;
    this.height = Math.max(bagSlotsHeight, transporterSlotsHeight) + headerHeight;

    const containerX = (this.game.camera.width / 2) - (this.width / 2);
    const containerY = (this.game.camera.height / 2) - (this.height / 2);

    // Draw Container
    this.container = this.game.add.graphics(containerX, containerY);
    this.container.alpha = 0.5;
    this.container.lineStyle(2, 0x0000FF);
    this.container.beginFill(0x000000);
    this.container.drawRect(0, 0, this.width, this.height);

    // Draw Title
    this.textHeader = this.game.add.graphics(containerX, containerY);
    this.textHeader.alpha = 0.8;
    this.textHeader.lineStyle(2, 0x0000FF);
    this.textHeader.beginFill(0x000000);
    this.container.drawRect(0, 0, this.width, headerHeight);

    const style = { font: `${Settings.Header4Size()}px ${Settings.FontStyle()}`, fill: Settings.FontColor() };
    this.bagText = this.game.add.text(containerX + 5, containerY, 'Bag', style);
    this.powerText = this.game.add.text(containerX + 130, containerY, 'Transporter', style);

    // Draw Bag Slots
    this.bagSlots = this.game.add.graphics(containerX, containerY + headerHeight);
    this.bagSlots.alpha = 1;
    this.bagSlots.lineStyle(1, 0XFFFFFF, 1);
    for (let i = 0; i < bag.xSlots; i += 1) {
      for (let k = 0; k < bag.ySlots; k += 1) {
        this.bagSlots.drawRect((i * 40) + 4, (k * 40) + 4, 34, 34);
      }
    }

    // Draw Arrow
    this.arrow = this.game.add.graphics(
      containerX + bagSlotsWidth + 2,
      containerY + headerHeight + 20
    );
    this.arrow.lineStyle(2, 0XFFFFFF);
    this.arrow.drawPolygon([
      { x: 0, y: 0 },
      { x: 30, y: 0 },
      { x: 30, y: -10 },
      { x: 45, y: 5 },
      { x: 30, y: 20 },
      { x: 30, y: 10 },
      { x: 0, y: 10 },
      { x: 0, y: 0 }
    ]);

    // Draw Transorter slots
    this.transporterSlots = this.game.add.graphics(
      containerX + bagSlotsWidth + arrowWidth,
      containerY + headerHeight
    );
    this.transporterSlots.alpha = 1;
    this.transporterSlots.lineStyle(1, 0XFFFFFF, 1);
    for (let i = 0; i < this.xSlots; i += 1) {
      for (let k = 0; k < this.ySlots; k += 1) {
        this.transporterSlots.drawRect((i * 40) + 4, (k * 40) + 4, 34, 34);
      }
    }
  }

  show() {
    this.isHidden = false;
    this.container.alpha = 1;
    this.textHeader.alpha = 1;
    this.bagText.alpha = 1;
    this.powerText.alpha = 1;
    this.bagSlots.alpha = 1;
    this.arrow.alpha = 1;
    this.transporterSlots.alpha = 1;
  }

  hide() {
    this.isHidden = true;
    this.container.alpha = 0;
    this.textHeader.alpha = 0;
    this.bagText.alpha = 0;
    this.powerText.alpha = 0;
    this.bagSlots.alpha = 0;
    this.arrow.alpha = 0;
    this.transporterSlots.alpha = 0;
  }

  fixedToCamera(fixedToCamera) {
    this.container.fixedToCamera = fixedToCamera;
    this.textHeader.fixedToCamera = fixedToCamera;
    this.bagText.fixedToCamera = fixedToCamera;
    this.powerText.fixedToCamera = fixedToCamera;
    this.bagSlots.fixedToCamera = fixedToCamera;
    this.arrow.fixedToCamera = fixedToCamera;
    this.transporterSlots.fixedToCamera = fixedToCamera;
  }
}
