import React from "react";
import "./GridView.css";
import { Context } from "./PathfindingPage";
import { useContext } from "react";
import { useRef } from "react";

const NUM_ROWS = 25;
const NUM_COLS = 55;

function GridView({ thisGrid }) {
  const returnArr = [];

  for (let i = 0; i < NUM_ROWS; i++) {
    returnArr.push(<Row rowNum={i} thisGrid={thisGrid} />);
  }

  return <div className="board">{returnArr}</div>;
}

function Row({ rowNum, thisGrid }) {
  const returnArr = [];

  for (let i = 0; i < NUM_COLS; i++) {
    returnArr.push(
      <CellComponent rowNum={rowNum} colNum={i} thisGrid={thisGrid} />
    );
  }

  return <>{returnArr}</>;
}

function CellComponent({ rowNum, colNum, thisGrid }) {
  const {
    changeIsWeighted,
    isWeighted,
    changeIsMakeWallButtonClicked,
    isMakeWallButtonClicked,
    changeIsDeleteWallButtonClicked,
    isDeleteWallButtonClicked,
    changeIsSetStartButtonClicked,
    isStartButtonClicked,
    changeIsSetDestinationButtonClicked,
    isDestinationButtonClicked,
    randomizeWeights,
    clearBoard,
    startAlgorithm,
    ignored,
    rerender,
    mouseDown,
  } = useContext(Context);

  function handleClick() {
    if (isStartButtonClicked) {
      thisGrid.setStartCoordinates(rowNum, colNum);
      rerender(!ignored);
    } else if (isDestinationButtonClicked) {
      thisGrid.setDestCoordinates(rowNum, colNum);
      rerender(!ignored);
    } else if (isMakeWallButtonClicked) {
      thisGrid.grid[rowNum][colNum].isWall = true;
      rerender(!ignored);
    } else if (isDeleteWallButtonClicked) {
      thisGrid.grid[rowNum][colNum].isWall = false;
      rerender(!ignored);
    }
  }

  function handleMouseDown() {
    mouseDown.current = true;
    if (isMakeWallButtonClicked && mouseDown.current) {
      thisGrid.grid[rowNum][colNum].isWall = true;
      rerender(!ignored);
    } else if (isDeleteWallButtonClicked && mouseDown.current) {
      thisGrid.grid[rowNum][colNum].isWall = false;
      rerender(!ignored);
    }
  }
  function handleMouseEnter() {
    if (isMakeWallButtonClicked && mouseDown.current) {
      thisGrid.grid[rowNum][colNum].isWall = true;
      rerender(!ignored);
    } else if (isDeleteWallButtonClicked && mouseDown.current) {
      thisGrid.grid[rowNum][colNum].isWall = false;
      rerender(!ignored);
    }
  }
  function handleMouseUp() {
    mouseDown.current = false;
  }

  let weightNum;

  if (thisGrid.isWeighted) {
    weightNum = (
      <p className="weight">{thisGrid.grid[rowNum][colNum].weight}</p>
    );
  } else {
    weightNum = ""; // unweighted graph shows no numbers
  }

  let id;

  if (rowNum === thisGrid.startRow && colNum === thisGrid.startCol) {
    id = "start";
  } else if (rowNum === thisGrid.destRow && colNum === thisGrid.destCol) {
    id = "dest";
  } else if (thisGrid.grid[rowNum][colNum].isWall) {
    id = "wall";
  } else {
    id = "";
  }

  return (
    <div
      className="cell"
      onClick={handleClick}
      id={id}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
    >
      {weightNum}
    </div>
  );
}

export default GridView;
