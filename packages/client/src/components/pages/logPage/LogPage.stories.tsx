import React from "react";
import LogPage from "./LogPage";
import {
  sampleExerciseSeries,
  sampleExerciseSeries2,
  sampleExerciseSeries8,
  sampleExerciseSeries9now
} from "balanced-gym-model";
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
export const nowNavLim20 = () => (
  <LogPage
    exercise={sampleExerciseSeries9now}
    secondsLimit={15}
    handleAddSerie={action("addClick")}
  />
);
export const timerLim10 = () => (
  <LogPage
    exercise={sampleExerciseSeries9now}
    timerLimit={20}
    handleAddSerie={action("addClick")}
  />
);
