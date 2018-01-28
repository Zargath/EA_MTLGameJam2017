import Coordinate from './Coordinate';

export default class GemInfo {
  constructor({ gemType, x, y }) {
    this.gemType = gemType;
    this.location = new Coordinate(x, y);
  }
}
