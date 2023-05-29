import React from "react";
import ControlBar from "./ControlBar";
import GridView from "./GridView";
import { useState, useRef } from "react";
import Grid from "./Grid";
import "./PathfindingPage.css";

export const Context = React.createContext();

const NUM_ROWS = 25;
const NUM_COLS = 55;
const thisGrid = new Grid(NUM_ROWS, NUM_COLS);

function PathfindingPage() {
  const [isWeighted, setWeighted] = useState(true); // weighted/unweighted graph
  const [isMakeWallButtonClicked, setMakeWallButtonClicked] = useState(false); // is make wall button currently clicked
  const [isDeleteWallButtonClicked, setDeleteWallButtonClicked] =
    useState(false); // is delete wall button currently clicked
  const [isStartButtonClicked, setIsStartButtonClicked] = useState(false); // is set start button currently clicked
  const [isDestinationButtonClicked, setIsDestinationButtonClicked] =
    useState(false); // is set destination button currently clicked

  const mouseDown = useRef(false); // determines if mouse is clicked down for the purpose of creating walls by dragging mouse

  /*
   * rerender(!ignored) is a function that rerenders the PathfindingPage
   * usefult to rerender the app when something is changed in the thisGrid variable
   */
  const [ignored, rerender] = useState(true);

  // function called when isWeighted is switched
  const changeIsWeighted = () => {
    setWeighted(!isWeighted);
    thisGrid.isWeighted = !isWeighted;
  };

  const startAlgorithm = () => {
    setIsDestinationButtonClicked(false);
    setIsStartButtonClicked(false);
    setMakeWallButtonClicked(false);
    setDeleteWallButtonClicked(false);

    console.log("Start!");
  };

  // function called when user wants to randomize weights
  // randomizes weights then re-renders
  const randomizeWeights = () => {
    thisGrid.randomizeWeights();
    rerender(!ignored); // I am using this because the grid dispay on the app is controlled by a class I created
  };

  const clearBoard = () => {
    thisGrid.clearBoard();
    rerender(!ignored);
  };

  const changeIsMakeWallButtonClicked = () => {
    setMakeWallButtonClicked(!isMakeWallButtonClicked);

    setIsStartButtonClicked(false);
    setIsDestinationButtonClicked(false);
    setDeleteWallButtonClicked(false);
  };

  const changeIsDeleteWallButtonClicked = () => {
    setDeleteWallButtonClicked(!isDeleteWallButtonClicked);

    setIsStartButtonClicked(false);
    setIsDestinationButtonClicked(false);
    setMakeWallButtonClicked(false);
  };

  const changeIsSetStartButtonClicked = () => {
    setIsStartButtonClicked(!isStartButtonClicked);

    setMakeWallButtonClicked(false);
    setIsDestinationButtonClicked(false);
    setDeleteWallButtonClicked(false);
  };

  const changeIsSetDestinationButtonClicked = () => {
    setIsDestinationButtonClicked(!isDestinationButtonClicked);

    setIsStartButtonClicked(false);
    setMakeWallButtonClicked(false);
    setDeleteWallButtonClicked(false);
  };

  return (
    <Context.Provider
      value={{
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
        mouseDown
      }}
    >
      <ControlBar className="controlBar" />
      <div className="gridView">
        <GridView thisGrid={thisGrid} />
      </div>
    </Context.Provider>
  );
}

export default PathfindingPage;
