/* Creates a new queue. A queue is a first-in-first-out (FIFO) data structure -
 * items are added to the end of the queue and removed from the front. */
export default class Queue {
  constructor() {
    this.queue = [];
    this.offset = 0;
  }

  // Enqueues the given item
  enqueue(item) {
    this.queue.push(item);
  }

  dequeue() {
    // if the queue is empty, return immediately
    if (this.isEmpty()) return undefined;

    // store the item at the front of the queue
    const item = this.queue[this.offset];

    // increment the offset and remove the free space if necessary
    this.offset += 1;
    if (this.offset * 2 >= this.queue.length) {
      this.queue = this.queue.slice(this.offset);
      this.offset = 0;
    }

    // return the dequeued item
    return item;
  }

  // Returns the first item in the queue or undefined if empty
  peek() {
    return (this.queue.length > 0 ? this.queue[this.offset] : undefined);
  }

  // Returns the length of the queue
  getLength() {
    return this.queue.length - this.offset;
  }

  // Returns true if the queue is empty, and false otherwise.
  isEmpty() {
    return this.queue.length === 0;
  }
}
