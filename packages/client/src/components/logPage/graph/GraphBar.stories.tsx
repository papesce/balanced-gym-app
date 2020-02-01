import React from "react";
import GraphBar from "./GraphBar";
import { action } from "@storybook/addon-actions";

export default {
  title: "logPage/GraphBar"
};

export const graphBarEmpty = () => <GraphBar />;
export const graphBarEdit = () => (
  <GraphBar edit handleEditClick={action("click")} />
);
export const graphBarMore = () => (
  <GraphBar more handleMoreClick={action("click")} />
);
export const graphBarEditMore = () => (
  <GraphBar
    edit
    more
    handleEditClick={action("click")}
    handleMoreClick={action("click")}
  />
);
