import React from 'react';
import ElemPage, { IElemPage } from './ElemPage';
import './ElemPage.css';

export default {
    title: 'generic/pages/Elem Page',
  };

const C1 = <div className='sample-page' >Page 1</div>;
const C2 = <div className='sample-page'>Page 2</div>;
const C3 = <div className='sample-page'>Page 3</div>;

const samplePagesEmpty: IElemPage[] = [];
const samplePagesSimple: IElemPage[] = [
  {name: 'P1', page: C1}
];
const samplePagesTriple: IElemPage[] = [
  {name: 'p1', page: C1},
  {name: 'p2', page: C2},
  {name: 'p3', page: C3}
]
  
  export const emptyPage = () => 
      <ElemPage pages={samplePagesEmpty}/>;
  export const simplePage = () => 
      <ElemPage pages={samplePagesSimple}/>;
  export const triplePage = () => 
      <ElemPage pages={samplePagesTriple}/>;        