import React from "react";
import './GridView.css'

const numRows = 55;
const numCols = 25;

function GridView({thisGrid}) {

  const returnArr = [];

  for (let i = 0; i < numRows; i++) {
    returnArr.push(<Row rowNum={i} thisGrid={thisGrid} />);
  }

  return <div className="board">{returnArr}</div>;
}

function Row({ rowNum, thisGrid }) {
  const returnArr = [];

  for (let i = 0; i < numCols; i++) {
    returnArr.push(<CellComponent rowNum={rowNum} colNum={i} thisGrid={thisGrid} />);
  }

  return <>{returnArr}</>;
}

function CellComponent({ rowNum, colNum, thisGrid }) {
  return (
    <div className="cell" id={null}>
      <p className="weight">{thisGrid.grid[rowNum][colNum].weight}</p>
    </div>
  );
}

export default GridView;
