import React from "react";
import Navigation from "./Navigation";
import { action } from "@storybook/addon-actions";
import { series6, series8, series9 } from '../../../model/SerieModel.sample'; 

export default {
  title: "logPage/Navigation"
};

export const navSeries0 = () => (
  <Navigation series={[]} />
);
export const navSeries6 = () => (
  <Navigation series={series6} />
);
export const navSeries8 = () => (
  <Navigation series={series8} />
);
export const navSeries9 = () => (
  <Navigation series={series9} handleSeriesChange={
     action('change selected serie')
  }/>
);


