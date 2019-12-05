import React from 'react';
import ElemCard from './ElemCard';
import { action } from '@storybook/addon-actions';

export default {
    title: 'ElemCard',
  };

const data =
{
  "_id": "59f0c59d4e55c40d38868034",
  "name": "title1",
  desc1:"first subtitle",
  desc2:"second subtitle",
  muscleURL: "/GluteusMaximus.png"
};

const getId = (elem: any) => elem._id;
const getPrimary = (elem: any) => elem.name;
const getSecondary1 = (elem: any) => elem.desc1;
const getSecondary2 = (elem: any) => elem.desc2;
const getImage = (elem: any) => elem.muscleURL;


export const card = () => <ElemCard 
  primary={getPrimary(data)}
  secondary1={getSecondary1(data)}
  secondary2={getSecondary2(data)}
  image={getImage(data)}
  // onClick={action('clicked item')}
/>
// export const loadingList = () => <ElemCardList loading/>;
// export const errorList = () => <ElemCardList error="Error loading data"/>;
// export const emptyListNoMsg = () => <ElemCardList data={emptydataList} />;
// export const emptyList = () => <ElemCardList data={emptydataList} 
// noDataMsg="No data available"/>;
// export const singleList = () => <ElemCardList data={singledataList}
// getPrimary={getPrimary} getSecondary={getSecondary} getId={getId} 
// onClick={action('clicked item')}/>;
// export const fullList = () => <ElemCardList data={fulldataList}
// getPrimary={getPrimary} getSecondary={getSecondary} getId={getId}
// onClick={action('clicked item')}/>;

