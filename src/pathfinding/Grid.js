import Cell from './Cell';

export default class Grid {

  grid;

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.isWeighted = true;
    this.grid = new Array(numRows);
    for(let i = 0; i < numRows; i++) {
        this.grid[i] = new Array(numCols);
        for(let j = 0; j < numCols; j++) {
            this.grid[i][j] = new Cell();
        }
    }
    
  }

}
