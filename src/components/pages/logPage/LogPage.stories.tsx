import React from "react";
import LogPage from "./LogPage";
import {
  sampleExerciseSeries,
  sampleExerciseSeries2,
  sampleExerciseSeries8,
  sampleExerciseSeries9now
} from "../../../model/ExerciseModel.sample";
import { action } from "@storybook/addon-actions";

export default {
  title: "pages/LogPage"
};

export const noseries = () => (
  <LogPage
    exercise={sampleExerciseSeries}
    handleAddSerie={action("addClick")}
  />
);
export const series2 = () => (
  <LogPage
    exercise={sampleExerciseSeries2}
    handleAddSerie={action("addClick")}
  />
);
export const series8 = () => (
  <LogPage
    exercise={sampleExerciseSeries8}
    handleAddSerie={action("addClick")}
  />
);
export const series9now = () => (
  <LogPage
    exercise={sampleExerciseSeries9now}
    handleAddSerie={action("addClick")}
  />
);
export const series9nowLim10 = () => (
  <LogPage
    exercise={sampleExerciseSeries9now}
    secondsLimit={10}
    handleAddSerie={action("addClick")}
  />
);
