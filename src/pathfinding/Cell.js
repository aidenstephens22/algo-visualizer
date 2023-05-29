export default class Cell {
  isWall = false;
  hasBeenSearched = false;
  isSolvedPath = false;
  weight = Math.floor(Math.random() * 20) + 1; // random integer from 1 to 20

  randomizeWeight() {
    this.weight = Math.floor(Math.random() * 20) + 1; // random integer from 1 to 20
  }

  clearCell() {
    this.isWall = false;
    this.hasBeenSearched = false;
    this.isSolvedPath = false;
  }
}
