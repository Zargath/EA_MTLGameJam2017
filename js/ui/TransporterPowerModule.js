import BaseDrawableObject from './BaseDrawableObject';
import Settings from '../Settings';
import { GemTypes } from '../Enum';

export default class TransporterPowerModule extends BaseDrawableObject {
  constructor(game, graphics, bag) {
    super(game, graphics);

    this.xSlots = 2;
    this.ySlots = 4;

    this.isHidden = true;

    this.gem1 = undefined;
    this.gem2 = undefined;
    this.gem3 = undefined;
    this.gem4 = undefined;
    this.gem5 = undefined;
    this.gem6 = undefined;
    this.gem7 = undefined;
    this.gem8 = undefined;

    const transporterSlotsWidth = this.xSlots * 42;
    const arrowWidth = 50;
    this.width = bag.width + arrowWidth + transporterSlotsWidth;

    const headerHeight = 20;
    const transporterHeight = (this.ySlots * 42) + headerHeight;
    this.height = Math.max(bag.height, transporterHeight);

    const containerX = (this.game.camera.width / 2) - (this.width / 2);
    const containerY = (this.game.camera.height / 2) - (this.height / 2);

    // Draw Arrow
    this.arrow = this.game.add.graphics(
      containerX + bag.width + 2,
      containerY + (this.height / 2) + (5 / 2)
    );
    this.arrow.alpha = 0.8;
    this.arrow.beginFill(0x000000);
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
    this.arrow.endFill();

    const transporterX = bag.width + containerX + arrowWidth;

    // Draw Container
    this.container = this.game.add.graphics(transporterX, containerY);
    this.container.alpha = 0.5;
    this.container.lineStyle(2, 0x0000FF);
    this.container.beginFill(0x000000);
    this.container.drawRect(0, 0, transporterSlotsWidth + 6, this.height);

    // Draw Title
    this.textHeader = this.game.add.graphics(transporterX, containerY);
    this.textHeader.alpha = 0.8;
    this.textHeader.lineStyle(2, 0x0000FF);
    this.textHeader.beginFill(0x000000);
    this.container.drawRect(0, 0, transporterSlotsWidth + 6, headerHeight);

    const style = { font: `${Settings.Header4Size()}px ${Settings.FontStyle()}`, fill: Settings.FontColor() };
    this.powerText = this.game.add.text(transporterX + 4, containerY, 'Transporter', style);

    // Draw Transorter slots
    this.transporterSlots = this.game.add.graphics(
      transporterX + 4,
      containerY + headerHeight + 4
    );
    this.transporterSlots.alpha = 1;
    this.transporterSlots.lineStyle(1, 0XFFFFFF, 1);
    for (let i = 0; i < this.xSlots; i += 1) {
      for (let k = 0; k < this.ySlots; k += 1) {
        this.transporterSlots.drawRect((i * 40) + 4, (k * 40) + 4, 34, 34);
      }
    }
  }

  isSetCompleted() {
    return this.gem1 !== undefined && this.gem2 !== undefined
    && this.gem3 !== undefined && this.gem4 !== undefined
    && this.gem5 !== undefined && this.gem6 !== undefined
    && this.gem7 !== undefined && this.gem8 !== undefined;
  }

  addGem(gem) {
    const newGem = gem;
    let currentSize = 0;
    let yMultiplier = 0;
    switch (newGem.gemType) {
      case GemTypes.SILVER:
        this.gem1 = newGem;
        currentSize = 1;
        yMultiplier = 0;
        break;
      case GemTypes.ORANGE:
        this.gem2 = newGem;
        currentSize = 2;
        yMultiplier = 0;
        break;
      case GemTypes.YELLOW:
        this.gem3 = newGem;
        currentSize = 3;
        yMultiplier = 1;
        break;
      case GemTypes.PURPLE:
        this.gem4 = newGem;
        currentSize = 4;
        yMultiplier = 1;
        break;
      case GemTypes.RED:
        this.gem5 = newGem;
        currentSize = 5;
        yMultiplier = 2;
        break;
      case GemTypes.GREEN:
        this.gem6 = newGem;
        currentSize = 6;
        yMultiplier = 2;
        break;
      case GemTypes.BLUE:
        this.gem7 = newGem;
        currentSize = 7;
        yMultiplier = 3;
        break;
      case GemTypes.TURQUOISE:
        this.gem8 = newGem;
        currentSize = 8;
        yMultiplier = 3;
        break;
      default:
        return;
    }
    newGem.x = (this.x + 4) + (40 * Math.round(currentSize % 2));
    newGem.y = (this.y + 4) + (40 * yMultiplier);
    newGem.alpha = 1;
    newGem.fixedToCamera = true;
  }

  update() {
    if (this.isSetCompleted()) {
      this.game.state.start('victory');
    }
  }

  show() {
    this.isHidden = false;
    this.container.alpha = 0.5;
    this.textHeader.alpha = 0.8;
    this.powerText.alpha = 1;
    this.arrow.alpha = 0.8;
    this.transporterSlots.alpha = 1;
  }

  hide() {
    this.isHidden = true;
    this.container.alpha = 0;
    this.textHeader.alpha = 0;
    this.powerText.alpha = 0;
    this.arrow.alpha = 0;
    this.transporterSlots.alpha = 0;
  }

  fixedToCamera(fixedToCamera) {
    this.container.fixedToCamera = fixedToCamera;
    this.textHeader.fixedToCamera = fixedToCamera;
    this.powerText.fixedToCamera = fixedToCamera;
    this.arrow.fixedToCamera = fixedToCamera;
    this.transporterSlots.fixedToCamera = fixedToCamera;
  }
}
