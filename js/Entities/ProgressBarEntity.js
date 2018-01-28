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
    if (position < 1) {
      this.position = position;
    } else {
      this.position = 1;
    }
  }

  getPosition() {
    return this.position;
  }

  setStartPosition(startPosition) {
    if (startPosition < 1) {
      this.startPosition = startPosition;
    } else {
      this.startPosition = 1;
    }
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
