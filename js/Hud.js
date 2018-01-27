import Phaser from 'phaser';
import MessageContainer from './ui/MessageContainer';
import ProgressBar from './ui/ProgressBar';
import Clock from './ui/Clock';
import Settings from './Settings';
import { HelpText } from './Text';

export default class Hud {
  constructor(game) {
    this.game = game;
    this.graphics = this.game.add.graphics(0, 0);
    this.createTopAnchor();
    this.clock = new Clock(this.game, this.graphics, 600, 40 / 5);
    this.pb = new ProgressBar(this.game, this.graphics, 10, 10, 300, 12);
    this.mc = new MessageContainer(this.game, this.graphics, 200, 380, 400, 200, '', true);
    this.clock.fixedToCamera(true);
    this.mc.fixedToCamera(true);
    this.pb.fixedToCamera(true);

    this.isHelpDisplayed = false;
    this.helpGraphics = this.game.add.graphics(100, 50);

    const style = { font: `${Settings.Header1Size()}px ${Settings.FontStyle()}`, fill: Settings.FontColor() };
    this.helpTextHeader = this.game.add.text(0, 70, 'Help Menu', style);
    this.helpTextHeader.alpha = 0;
    this.helpTextHeader.x = (this.game.width - this.helpTextHeader.width) / 2;

    const style2 = { font: `${Settings.FontSize()}px ${Settings.FontStyle()}`, fill: Settings.FontColor() };
    this.helpText = this.game.add.text(110, 120, HelpText.join('\n'), style2);
    this.helpText.alpha = 0;

    this.helpTextHeader.fixedToCamera = true;
    this.helpText.fixedToCamera = true;

    this.helpButton = this.game.add.button(700, 40 / 5, 'help', this.displayHelp, this, 0);
    this.helpButton.fixedToCamera = true;

    this.helpGraphics.lineStyle(4, 0x0000FF, 2);
    this.helpGraphics.beginFill(0x000000);
    this.helpGraphics.drawRect(0, 0, 600, 500);
    this.helpGraphics.alpha = 0;
    this.helpGraphics.fixedToCamera = true;

    this.escapeKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
  }

  displayHelp() {
    if (!this.isHelpDisplayed) {
      this.helpGraphics.alpha = 1;
      this.helpText.alpha = 1;
      this.helpTextHeader.alpha = 1;
    }
    this.isHelpDisplayed = true;
  }
  hideHelp() {
    this.helpGraphics.alpha = 0;
    this.helpText.alpha = 0;
    this.helpTextHeader.alpha = 0;
    this.isHelpDisplayed = false;
  }

  createTopAnchor() {
    const graphics2 = this.game.add.graphics(0, 0);
    graphics2.alpha = 0.5;
    graphics2.beginFill(0x000000);
    graphics2.drawRect(0, 0, this.game.width, 40);
    graphics2.fixedToCamera = true;
  }

  update() {
    if (this.escapeKey.isDown && this.isHelpDisplayed) {
      this.hideHelp();
    }
    this.mc.update();
    this.pb.update();
    this.clock.update();
  }

  addMessageToQueue(text) {
    this.mc.addMessageToQueue(text);
  }
}
