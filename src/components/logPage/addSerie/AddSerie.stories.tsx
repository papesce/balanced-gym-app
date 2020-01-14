import React from "react";
import AddSerie from "./AddSerie";
import { action } from "@storybook/addon-actions";

export default {
  title: "logPage/AddSerie"
};

// const action: any = () => {} 
export const logNewSerie = () => <AddSerie key={'1'} handleLogNewSerie={action('logNewSerie')}/>;
export const restTimeStarted = () => <AddSerie key={'2'} timerStarted handleLogNewSerie={action('logNewSerie')}/>;
export const initialTime = () => <AddSerie key={'3'}  initialTimerTime={12}/>;
export const limit3 = () => <AddSerie key={'4'}  timerStarted timerLimit={3}/>;
export const limit10 = () => <AddSerie key={'5'}  timerStarted timerLimit={10}/>;

// export const logNewSerie = () => <AddSerie />;
// export const stopped12 = () => <AddSerie initialTimerTime={12*1000} />;
// export const startedLimit5 = () => <AddSerie started timerLimit={5*1000}/>;

