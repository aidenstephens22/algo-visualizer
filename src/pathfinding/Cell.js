export default class Cell {
  isWall = false;
  hasBeenVisited = false;
  isPath = false;
  isCurrent = false;
  weight = Math.floor(Math.random() * 20) + 1; // random integer from 1 to 20
  currentShortestDistance = Number.POSITIVE_INFINITY;
  previousNode = null; // [row, col]

  randomizeWeight() {
    this.weight = Math.floor(Math.random() * 20) + 1; // random integer from 1 to 20
  }

  clearCell() {
    this.isWall = false;
    this.hasBeenVisited = false;
    this.isPath = false;
    this.isCurrent = false;
  }
}
