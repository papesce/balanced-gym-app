import React from "react";
import ElemList, { ISecondaryText, DEFAULT_LIST_BLUE } from "./ElemList";
import { action } from "@storybook/addon-actions";

export default {
  title: "generic/elemList/ElemList"
};

const emptydataList: [] = [];
const singledataList: any[] = [
  {
    _id: "59f0c59d4e55c40d38868034",
    name: "title1",
    desc1: "desc1",
    desc2: "desc2"
  }
];
const fulldataList: any[] = [
  {
    _id: "59f0c59d4e55c40d38868034",
    name: "title1",
    desc1: "desc1",
    desc2: "desc2"
  },
  {
    _id: "59f0c59d4e55c40d38868035",
    name: "title2",
    desc1: "desc3",
    desc2: "desc4"
  }
];

const getId = (elem: any) => elem._id;
const getPrimary = (elem: any) => elem.name;
const getSecondary1 = (elem: any): ISecondaryText => ({ text: elem.desc1 });
const getSecondary2 = (elem: any): ISecondaryText => ({
  text: elem.desc2,
  colorClass: DEFAULT_LIST_BLUE
});

export const loadingList = () => <ElemList loading />;
export const errorList = () => <ElemList error="Error loading data" />;
export const emptyListNoMsg = () => <ElemList data={emptydataList} />;
export const emptyList = () => (
  <ElemList data={emptydataList} noDataMsg="No data available" />
);
export const singleList = () => (
  <ElemList
    data={singledataList}
    getPrimary={getPrimary}
    getSecondary1={getSecondary1}
    getSecondary2={getSecondary2}
    getId={getId}
    onClick={action("clicked item")}
  />
);
export const fullList = () => (
  <ElemList
    subHeader="Sub Header"
    data={fulldataList}
    getPrimary={getPrimary}
    getSecondary1={getSecondary1}
    getSecondary2={getSecondary2}
    getId={getId}
    onClick={action("clicked item")}
  />
);
