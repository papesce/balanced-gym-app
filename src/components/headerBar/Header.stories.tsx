import React from "react";
import InitialHeader from "./InitialHeader";
import BackHeader from "./BackHeader";
import ExerciseHeader from "./ExerciseHeader";
import { action } from "@storybook/addon-actions";

export default {
  title: "Header"
};

export const initialHeader = () => (
  <InitialHeader handleLogout={action("clicked item")} />
);
export const backHeader = () => (
  <BackHeader handleBack={action("clicked item")} />
);
export const exerciseHeader = () => (
  <ExerciseHeader
    handleBack={action("clicked item")}
    handleAddSerie={action("clicked item")}
  />
);
