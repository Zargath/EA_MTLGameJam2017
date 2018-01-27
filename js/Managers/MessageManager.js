import Queue from '../DataStorage/Queue';

export default class MessageManager {
  constructor({ game, hud }) {
    this.game = game;
    this.hud = hud;
    this.messageQueue = new Queue();
  }

  queueMessage(message) {
    this.messageQueue.enqueue(message);
  }

  displayMessage() {
    // Checks that the message hud is empty before displaying the message on screen
    if (!this.hud.isDisplayingMessage()) {
      this.hud.displayMessage(this.messageQueue.dequeue());
    }
  }
}
