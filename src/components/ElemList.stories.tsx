import React from 'react';
import { ElemList }from '../components/ElemList';


export default {
    title: 'Routine',
  };

const emptydataList: [] = [];
const singledataList : any[] = [
{
  "_id": "59f0c59d4e55c40d38868034",
  "updatedAt": "2017-12-23T20:11:34.689Z",
  "createdAt": "2017-10-25T17:10:57.026Z",
  "name": "Thighs Shoulders Calves",
}];
const fulldataList : any[] = [
  {
    "_id": "59f0c59d4e55c40d38868034",
    "updatedAt": "2017-12-23T20:11:34.689Z",
    "createdAt": "2017-10-25T17:10:57.026Z",
    "name": "Thighs Shoulders Calves",
    "exercises": [
      "59f0c59d4e55c40d38868035",
      "5a3eb876260b8700140e5010"
    ],
    "__v": 68
  },
  {
    "_id": "59ee3ddc243a5977dab96c2b",
    "updatedAt": "2017-12-22T22:10:53.373Z",
    "createdAt": "2017-10-23T19:07:11.966Z",
    "name": "Chest Triceps Waist Hips",
    "exercises": [
      "59ee3ddc243a5977dab96c2c",
      "5a3d82ed01ee670014833365"
    ],
    "__v": 27
  },
  {
    "_id": "59f3a4fb73da258989f47cf0",
    "updatedAt": "2017-12-23T12:56:21.730Z",
    "createdAt": "2017-10-27T21:28:32.595Z",
    "name": "Back Biceps Forearm Neck",
    "exercises": [
      "59f3a4fc73da258989f47cf1",
      "5a3e5275d2ca8f0014f49d93"
    ],
    "__v": 39
  },
  {
    "_id": "5aaf02795c74c81afa34111f",
    "name": "None",
    "exercises": [
      
    ]
  }
];

const getId = (elem: any) => elem._id;
const getPrimary = (elem: any) => elem.name;
const getSecondary = (elem: any) => "todo";

export const emptyList = () => <ElemList data={emptydataList} 
getPrimary={getPrimary} getSecondary={getSecondary} getId={getId}/>;
export const singleList = () => <ElemList data={singledataList}
getPrimary={getPrimary} getSecondary={getSecondary} getId={getId}/>;
export const fullList = () => <ElemList data={fulldataList}
getPrimary={getPrimary} getSecondary={getSecondary} getId={getId}/>;
export const loadingList = () => <ElemList data={fulldataList}
getPrimary={getPrimary} getSecondary={getSecondary} getId={getId}/>;
export const errorList = () => <ElemList data={fulldataList}
getPrimary={getPrimary} getSecondary={getSecondary} getId={getId}/>;
