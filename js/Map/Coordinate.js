export default class coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Get the pixel location for this coordinate.
   *
   * @return
   *   The top left pixel location of that grid coordinate.
   */
  getPixelLocation() {
    return { x: this.x * 32, y: this.y * 32 };
  }
}
