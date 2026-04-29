import React from "react";
import Header from "./Header";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

interface ExerciseHeaderProps {
  handleBack: () => void;
}

const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({ handleBack }) => {
  const leftComponent = (
    <IconButton onClick={handleBack} edge="start" color="inherit">
      <ArrowBackIosIcon />
    </IconButton>
  );
  return <Header leftComponent={leftComponent} />;
};

export default ExerciseHeader;
