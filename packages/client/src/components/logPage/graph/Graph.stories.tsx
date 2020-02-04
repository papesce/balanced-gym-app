import React from "react";
import Graph from "./Graph";
import { series1, series2, series8 } from "balanced-gym-model";
import { action } from "@storybook/addon-actions";

export default {
  title: "logPage/Graph"
};

export const graph0 = () => <Graph series={[]} />;
export const graphSeries1 = () => <Graph series={series1} />;
export const graphSeries2 = () => <Graph series={series2} />;
export const graphSeries8Nav = () => (
  <Graph series={series8} isNavigable handleSelected={action("selected")} />
);
export const graphClick = () => (
  <Graph series={series8} handleGraphClick={action("clicked")} />
);
export const graphNavClick = () => (
  <Graph series={series8} isNavigable handleGraphClick={action("clicked")} />
);
