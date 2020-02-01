import React from 'react';
import ElemList from './ElemList';
import { action } from '@storybook/addon-actions';

export default {
    title: 'generic/elemList/ElemList',
  };

const emptydataList: [] = [];
const singledataList : any[] = [
{
  "_id": "59f0c59d4e55c40d38868034",
  "name": "title1",
  "desc":"desc1",
}];
const fulldataList : any[] = [
  {
    "_id": "59f0c59d4e55c40d38868034",
    "name": "title1",
    "desc":"desc1",
  },
  {
    "_id": "59f0c59d4e55c40d38868034",
    "name": "title2",
    "desc":"desc2",
  }
];

const getId = (elem: any) => elem._id;
const getPrimary = (elem: any) => elem.name;
const getSecondary = (elem: any) => elem.desc;
const getSecondaryColor = (elem: any) => <div style={{color:'red'}}>{elem.desc}</div>;

export const loadingList = () => <ElemList loading/>;
export const errorList = () => <ElemList error="Error loading data"/>;
export const emptyListNoMsg = () => <ElemList data={emptydataList} />;
export const emptyList = () => <ElemList data={emptydataList} 
noDataMsg="No data available"/>;
export const singleList = () => <ElemList data={singledataList}
getPrimary={getPrimary} getSecondary={getSecondary} getId={getId} 
onClick={action('clicked item')}/>;
export const singleColorList = () => <ElemList data={singledataList}
getPrimary={getPrimary} getSecondary={getSecondaryColor} getId={getId} 
onClick={action('clicked item')}/>;

export const fullList = () => <ElemList subHeader="Sub Header" 
data={fulldataList}
getPrimary={getPrimary} getSecondary={getSecondary} getId={getId}
onClick={action('clicked item')}/>;

