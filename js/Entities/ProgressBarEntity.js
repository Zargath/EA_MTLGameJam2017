export default class ProgressBarEntity {
  /**
 * Created a new progressBar entity
 * based on the passed starting position integer between 0 and 1
 * and whether the progressBar is going up or down
 */
  constructor(startPercentage, isIncremented) {
    this.startPosition = startPercentage;
    this.position = startPercentage;
    this.isIncremented = isIncremented;
  }

  setPosition(position) {
    this.position = position;
  }

  getPosition() {
    return this.position;
  }

  setStartPosition(startPosition) {
    this.startPosition = startPosition;
  }

  getStartPosition() {
    return this.startPosition;
  }

  setIsIncremented(isIncremented) {
    this.isIncremented = isIncremented;
  }

  getIsIncremented() {
    return this.isIncremented;
  }
}
