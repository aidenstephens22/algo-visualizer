import Cell from "./Cell";

function equals(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
      for (let j = 0; j < this.numCols; j++) {
        this.grid[i][j].clearCell();
      }
    }
  }

  fillUnvisitedArray(arr) {
    for (let row = 0; row < this.numRows; row++) {
      for (let col = 0; col < this.numCols; col++) {
        if (!this.grid[row][col].isWall) arr.push([row, col]);
      }
    }
  }

  resetInstanceVars() {
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        this.grid[i][j].currentShortestDistance = Number.POSITIVE_INFINITY;
        this.grid[i][j].previousNode = null;
        this.grid[i][j].isCurrent = false;
        this.grid[i][j].hasBeenVisited = false;
        this.grid[i][j].isPath = false;
      }
    }
  }

  findAdjacentNodes([row, col], arr) {
    if (this.ifCellExistsAsPath([row, col + 1])) arr.push([row, col + 1]);
    if (this.ifCellExistsAsPath([row, col - 1])) arr.push([row, col - 1]);
    if (this.ifCellExistsAsPath([row + 1, col])) arr.push([row + 1, col]);
    if (this.ifCellExistsAsPath([row - 1, col])) arr.push([row - 1, col]);
  }

  // returns true only if node exists and is not a wall
  ifCellExistsAsPath([row, col]) {
    return (
      row >= 0 &&
      col >= 0 &&
      row < this.numRows &&
      col < this.numCols &&
      !this.grid[row][col].isWall
    );
  }

  drawPath(source, dest, rerender) {
    let path = []; // array of path coordinates
    while (!equals(source, dest)) {
      path.unshift(dest);
      dest = this.grid[dest[0]][dest[1]].previousNode;
    }
    path.unshift(source);

    for (let i = 0; i < path.length; i++) {
      this.grid[path[i][0]][path[i][1]].isPath = true;
      rerender();
    }
  }

  async animate(visited, rerender) {
    for (let i = 0; i < visited.length; i++) {
      this.grid[visited[i][0]][visited[i][1]].isCurrent = true;
      await sleep(5);
      rerender();
    }
  }

  dijkstra(source, dest, rerender) {
    this.resetInstanceVars();
    let unvisited = [];
    let visited = [];
    this.fillUnvisitedArray(unvisited);
    let animating = true;
    let currNode = source;
    this.grid[currNode[0]][currNode[1]].currentShortestDistance = 0;
    while (unvisited.length !== 0) {
      if (animating) {
        visited.push(currNode);
      }

      if (equals([currNode[0], currNode[1]], dest)) animating = false;
      let adjacentNodes = [];
      this.findAdjacentNodes([currNode[0], currNode[1]], adjacentNodes);
      if (adjacentNodes.length === 0) return;

      for (let i = 0; i < adjacentNodes.length; i++) {
        let cell = this.grid[adjacentNodes[i][0]][adjacentNodes[i][1]];
        if (!cell.hasBeenVisited) {
          let weight;
          if (this.isWeighted) weight = cell.weight;
          else weight = 1;
          let distance = 0;
          if (this.grid[currNode[0]][currNode[1]].previousNode)
            distance +=
              this.grid[currNode[0]][currNode[1]].currentShortestDistance;
          distance += weight;
          if (cell.currentShortestDistance > distance) {
            cell.currentShortestDistance = distance;
            cell.previousNode = [currNode[0], currNode[1]];
          }
        }
      }
      this.grid[currNode[0]][currNode[1]].hasBeenVisited = true;
      unvisited.splice(unvisited.indexOf(currNode), 1);

      // loop and find node with lowest currentShortestDistance and make current node
      let lowNode = unvisited[0];
      for (let i = 1; i < unvisited.length; i++) {
        if (
          this.grid[unvisited[i][0]][unvisited[i][1]].currentShortestDistance <
            this.grid[lowNode[0]][lowNode[1]].currentShortestDistance &&
          !this.grid[unvisited[i][0]][unvisited[i][1]].hasBeenVisited
        )
          lowNode = unvisited[i];
      }
      currNode = lowNode;
    }
    this.animate(visited, rerender).then(() => {this.drawPath(source, dest, rerender)});
  }
}
