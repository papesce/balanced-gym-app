import React from "react";
import AddSerie from "./AddSerie";
import { action } from "@storybook/addon-actions";
import { serie1, serieNow, serieMinAgo } from "../../../model/SerieModel.sample";

export default {
  title: "logPage/AddSerie"
};



// const action: any = () => {}
export const noPrevSerie = () => (
  <AddSerie key={"1"} handleLogNewSerie={action("logNewSerie")} />
);
export const prevSerieOld = () => (
  <AddSerie
    key={"2"}
    lastSerie={serie1}
    handleLogNewSerie={action("logNewSerie")}
  />
);
export const prevSerieNow = () => (
  <AddSerie
    key={"3"}
    lastSerie={serieNow}
    handleLogNewSerie={action("logNewSerie")}
  />
);

export const prevSerieMinAgo = () => (
  <AddSerie
    key={"4"}
    lastSerie={serieMinAgo}
    handleLogNewSerie={action("logNewSerie")}
  />
);

export const nowLimit10 = () => (
  <AddSerie
    timerLimit={10}
    key={"5"}
    lastSerie={serieNow}
    handleLogNewSerie={action("logNewSerie")}
  />
);
