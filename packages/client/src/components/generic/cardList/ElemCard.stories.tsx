import React from 'react';
import ElemCard from './ElemCard';

export default {
    title: 'generic/cardList/ElemCard',
};

const data =
{
  "_id": "59f0c59d4e55c40d38868034",
  "name": "title1",
  desc1:"first subtitle",
  desc2:"second subtitle",
  muscleURL: "/GluteusMaximus.png"
};

export const card = () => <ElemCard 
  primary={data.name}
  secondary1={data.desc1}
  secondary2={(<div style={{color: 'blue'}}>{data.desc2}</div>)}
  image={data.muscleURL}
/>

