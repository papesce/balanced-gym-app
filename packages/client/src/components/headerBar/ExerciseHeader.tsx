import React from "react";
import Header from "./Header";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

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
