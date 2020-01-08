import React from "react";
import InitialHeader from "./InitialHeader";
import BackHeader from "./BackHeader";
import ExerciseHeader from "./ExerciseHeader";
import { action } from "@storybook/addon-actions";
import { BrowserRouter as Router } from 'react-router-dom';

export default {
  title: "headerBar"
};

export const initialHeader = () => (
  <Router><InitialHeader handleLogout={action("clicked item")} /></Router>
);
export const backHeader = () => (
  <Router><BackHeader handleBack={action("clicked item")} /></Router>
);
export const exerciseHeader = () => (
  <Router><ExerciseHeader
    handleBack={action("clicked item")}
    handleAddSerie={action("clicked item")}
  /></Router>
);
