import React from "react";
import AddSerie from "./AddSerie";
import { action } from "@storybook/addon-actions";
import { serie1, serieNow, serieMinAgo } from "balanced-gym-model";

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
    lastCreationDate={serie1.createdAt}
    handleLogNewSerie={action("logNewSerie")}
  />
);
export const prevSerieNow = () => (
  <AddSerie
    key={"3"}
    lastCreationDate={serieNow.createdAt}
    handleLogNewSerie={action("logNewSerie")}
  />
);

export const prevSerieMinAgo = () => (
  <AddSerie
    key={"4"}
    lastCreationDate={serieMinAgo.createdAt}
    handleLogNewSerie={action("logNewSerie")}
  />
);

export const nowLimit10 = () => (
  <AddSerie
    timerLimit={10}
    key={"5"}
    lastCreationDate={serieNow.createdAt}
    handleLogNewSerie={action("logNewSerie")}
  />
);
