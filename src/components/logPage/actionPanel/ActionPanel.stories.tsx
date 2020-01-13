import React from "react";
import ActionPanel, { ActionPanelStage } from "./ActionPanel";
import { serie1 } from "../../../model/SerieModel.sample";
import { action } from "@storybook/addon-actions";

export default {
  title: "logPage/ActionsPanel"
};

export const showNone = () => <ActionPanel stage={ActionPanelStage.showNone} />;
export const showAdd = () => (
  <ActionPanel
    stage={ActionPanelStage.showAdd}
    handleAddSerie={action("addSerieClick")}
  />
);
export const showEdit = () => (
  <ActionPanel stage={ActionPanelStage.showEdit} initialSerie={serie1} />
);
export const showTimer = () => (
  <ActionPanel
    stage={ActionPanelStage.showTimer}
    onTimerEnd={action("stop")}
    timerLimit="00:10"
  />
);
