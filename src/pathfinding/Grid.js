import Cell from "./Cell";

export default class Grid {
  grid;
  startRow = null;
  startCol = null;
  destRow = null;
  destCol = null;

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.isWeighted = true;
    this.grid = new Array(numRows);
    for (let i = 0; i < numRows; i++) {
      this.grid[i] = new Array(numCols);
      for (let j = 0; j < numCols; j++) {
        this.grid[i][j] = new Cell();
      }
    }
  }

  randomizeWeights() {
    for (let i = 0; i < this.numRows; i++) {
      // loop rows
      for (let j = 0; j < this.numCols; j++) {
        this.grid[i][j].randomizeWeight();
      }
    }
  }

  setStartCoordinates(row, col) {
    this.startRow = row;
    this.startCol = col;
  }

  setDestCoordinates(row, col) {
    this.destRow = row;
    this.destCol = col;
  }

  clearBoard() {
    this.startRow = null;
    this.startCol = null;
    this.destRow = null;
    this.destCol = null;
    for (let i = 0; i < this.numRows; i++) {
      // loop rows
      for (let j = 0; j < this.numCols; j++) {
        this.grid[i][j].clearCell();
      }
    }
  }
}
