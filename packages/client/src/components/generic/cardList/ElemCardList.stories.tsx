import React from 'react';
import ElemCardList from './ElemCardList';
import { action } from '@storybook/addon-actions';

export default {
    title: 'generic/cardList/ElemCardList',
  };

const emptydataList: [] = [];
const singledataList : any[] = [
{
  "_id": "59f0c59d4e55c40d38868034",
  "name": "title1",
  "days":"8 days",
  exercises: "10 exercices",
  "muscleURL": "/SubscapularisSmall.png",
}];
const fulldataList : any[] = [
  {
    "_id": "59f0c59d4e55c40d38868034",
    "name": "title1",
    "days":"desc1",
    exercises: "0 exercices",
    "muscleURL": "/TeresMinor.png",
  },
  {
    "_id": "59f0c59d4e55c40d38868034",
    "name": "title2",
    "days":"desc2",
    exercises: "2 exercices",
    "muscleURL": "/Infraspinatus.png",
  }
];

const getId = (elem: any) => elem._id;
const getPrimary = (elem: any) => elem.name;
const getSecondary1 = (elem: any) => elem.days;
const getSecondary2 = (elem: any) => elem.exercises;
const getImage = (elem: any) => elem.muscleURL;

export const loadingList = () => <ElemCardList loading/>;
export const errorList = () => <ElemCardList error="Error loading data"/>;
export const emptyListNoMsg = () => <ElemCardList data={emptydataList} />;
export const emptyList = () => <ElemCardList data={emptydataList} 
noDataMsg="No data available"/>;
export const singleList = () => <ElemCardList data={singledataList}
getPrimary={getPrimary} getSecondary1={getSecondary1} 
getSecondary2={getSecondary2} getId={getId} getImage={getImage}
onClick={action('clicked item')}/>;
export const fullList = () => <ElemCardList data={fulldataList}
getPrimary={getPrimary} getSecondary1={getSecondary1}  getImage={getImage}
getSecondary2={getSecondary2} getId={getId}
subHeader={'Sub Header'}
onClick={action('clicked item')}/>;

