import MessageContainer from './ui/MessageContainer';
import ProgressBar from './ui/ProgressBar';
import Clock from './ui/Clock';

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
  }

  createTopAnchor() {
    this.graphics.beginFill(0x000000);
    this.graphics.drawRect(0, 0, this.game.width, 40);
    this.graphics.fixedToCamera = true;
  }

  update() {
    this.mc.update();
    this.pb.update();
    this.clock.update();
  }

  isDisplayingMessage() {
    return this.mc.canAcceptNextMessage();
  }

  displayMessage(message) {
    this.mc.displayMessage(message);
  }
}
