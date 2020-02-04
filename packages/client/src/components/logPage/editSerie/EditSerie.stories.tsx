import React from "react";
import EditSerie from "./EditSerie";
import { action } from "@storybook/addon-actions";
import { serie1 } from "balanced-gym-model";
export default {
  title: "logPage/EditSerie"
};

export const editSerie = () => (
  <EditSerie initialSerie={serie1} handleDelete={action("deleted")} />
);
export const withRestTime = () => (
  <EditSerie
    initialSerie={serie1}
    handleDelete={action("deleted")}
  />
);
