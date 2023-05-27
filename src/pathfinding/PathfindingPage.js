import React from "react";
import ControlBar from "./ControlBar";
import GridView from "./GridView";
import { useState } from "react";
import Grid from "./Grid";
import "./PathfindingPage.css"

export const Context = React.createContext();

const numRows = 55;
const numCols = 25;
const thisGrid = new Grid(numRows, numCols);

function PathfindingPage() {

  const [isWeighted, setWeighted] = useState(true); // weighted/unweighted graph
  const [isMakeWallButtonClicked, setMakeWallButtonClicked] = useState(false); // is make wall button currently clicked
  const [isDeleteWallButtonClicked, setDeleteWallButtonClicked] =
    useState(false); // is delete wall button currently clicked
  const [isStartButtonClicked, setIsStartButtonClicked] = useState(false); // is set start button currently clicked
  const [isDestinationButtonClicked, setIsDestinationButtonClicked] =
    useState(false); // is set destination button currently clicked

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

  const randomizeWeights = () => {
    console.log("Randomize Weights");
  };

  const clearBoard = () => {
    console.log("Clear Board");
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
        startAlgorithm
      }}
    >
      <ControlBar />
      <div className="gridView">
      <GridView thisGrid={thisGrid} />
      </div>
    </Context.Provider>
  );
}

export default PathfindingPage;
