import BaseDrawableObject from './BaseDrawableObject';
import Settings from '../Settings';
import { GemTypes } from '../Enum';

export default class TransporterPowerModule extends BaseDrawableObject {
  constructor(game, graphics) {
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
    this.width = transporterSlotsWidth;

    const headerHeight = 20;
    const transporterHeight = (this.ySlots * 42) + headerHeight;
    this.height = transporterHeight;

    const containerX = 20;
    const containerY = 230;

    const transporterX = containerX;

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
    this.slotsX = transporterX + 4;
    this.slotsY = containerY + headerHeight + 4;
    this.transporterSlots = this.game.add.graphics(
      this.slotsX,
      this.slotsY
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

    newGem.inputEnabled = false;
    newGem.x = this.slotsX + 4 + (40 * Math.round(currentSize % 2));
    newGem.y = this.slotsY + 4 + (40 * yMultiplier);
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
    this.transporterSlots.alpha = 1;

    if (this.gem1) this.gem1.alpha = 1;
    if (this.gem2) this.gem2.alpha = 1;
    if (this.gem3) this.gem3.alpha = 1;
    if (this.gem4) this.gem4.alpha = 1;
    if (this.gem5) this.gem5.alpha = 1;
    if (this.gem6) this.gem6.alpha = 1;
    if (this.gem7) this.gem7.alpha = 1;
    if (this.gem8) this.gem8.alpha = 1;
  }

  hide() {
    this.isHidden = true;
    this.container.alpha = 0;
    this.textHeader.alpha = 0;
    this.powerText.alpha = 0;
    this.transporterSlots.alpha = 0;

    if (this.gem1) this.gem1.alpha = 0;
    if (this.gem2) this.gem2.alpha = 0;
    if (this.gem3) this.gem3.alpha = 0;
    if (this.gem4) this.gem4.alpha = 0;
    if (this.gem5) this.gem5.alpha = 0;
    if (this.gem6) this.gem6.alpha = 0;
    if (this.gem7) this.gem7.alpha = 0;
    if (this.gem8) this.gem8.alpha = 0;
  }

  fixedToCamera(fixedToCamera) {
    this.container.fixedToCamera = fixedToCamera;
    this.textHeader.fixedToCamera = fixedToCamera;
    this.powerText.fixedToCamera = fixedToCamera;
    this.transporterSlots.fixedToCamera = fixedToCamera;
  }
}
