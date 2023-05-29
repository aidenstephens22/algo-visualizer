import React from "react";
import { FormControlLabel, Switch, Button } from "@mui/material";
import "./ControlBar.css";
import { Context } from "./PathfindingPage";
import { useContext } from "react";

function ControlBar() {
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
  } = useContext(Context);

  return (
    <>
      <FormControlLabel
        control={<Switch onChange={changeIsWeighted} checked={isWeighted} />}
        label="Weighted Graph"
      />
      <Button
        onClick={changeIsMakeWallButtonClicked}
        variant={isMakeWallButtonClicked ? "contained" : "outlined"}
        color="error"
      >
        Set Walls
      </Button>
      <Button
        onClick={changeIsDeleteWallButtonClicked}
        variant={isDeleteWallButtonClicked ? "contained" : "outlined"}
        color="error"
      >
        Delete Walls
      </Button>
      <Button
        onClick={changeIsSetStartButtonClicked}
        variant={isStartButtonClicked ? "contained" : "outlined"}
        color="error"
      >
        Set Start
      </Button>
      <Button
        onClick={changeIsSetDestinationButtonClicked}
        variant={isDestinationButtonClicked ? "contained" : "outlined"}
        color="error"
      >
        Set Destination
      </Button>
      <Button
        disabled={!isWeighted}
        onClick={randomizeWeights}
        variant="contained"
      >
        Randomize Weights
      </Button>
      <Button onClick={clearBoard} variant="contained">
        Clear Board
      </Button>
      <Button onClick={startAlgorithm} variant="contained">
        Start
      </Button>
    </>
  );
}

export default ControlBar;
