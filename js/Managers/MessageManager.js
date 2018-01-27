import Queue from '../DataStorage/Queue';

export default class MessageManager {
  constructor(game, hud) {
    this.game = game;
    this.hud = hud;
    this.messageQueue = new Queue();

    this.timer = this.game.time.create(true);
    this.messageTimedEvent = this.timer.loop(1000, this.displayMessage, this);
    this.timer.start();
  }

  hasMessages() {
    return !this.messageQueue.isEmpty();
  }

  queueMessage(message) {
    this.messageQueue.enqueue(message);
  }

  displayMessage() {
    if (this.hasMessages()) {
    // Checks that the message hud is empty before displaying the message on screen
      if (!this.hud.isDisplayingMessage()) {
        const msg = this.messageQueue.dequeue();
        this.hud.displayMessage(msg);
      }
    }
  }
}
