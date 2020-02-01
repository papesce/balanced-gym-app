import React, { Component } from "react";
import Header from "./Header";
import IconButton from "@material-ui/core/IconButton";
// import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

interface ExerciseHeaderProps {
  handleBack: () => void;
  // handleAddSerie: () => void;
}

export default class ExerciseHeader extends Component<ExerciseHeaderProps> {
  render() {
    const { handleBack } = this.props;
    const leftComponent = (
      <IconButton onClick={handleBack} edge="start" color="inherit">
        <ArrowBackIosIcon />
      </IconButton>
    );
    // const rightComponent = (
    //   <IconButton onClick={handleAddSerie} edge="start" color="inherit">
    //     <AddIcon />
    //   </IconButton>
    // );
    return (
      <Header
        leftComponent={leftComponent}
        // ightComponent={rightComponent}
      ></Header>
    );
  }
}
