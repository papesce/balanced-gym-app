import React from 'react';
import HeaderRow, { IHeaderRow }  from './HeaderRow';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
    title: 'headerRowList/Header Row', 
  };

  const header: IHeaderRow = {
     _id: '1', title: "Title:", value:"value", url:"url"
  };

  export const headerRow = () => 
    <Router><HeaderRow header={header}/></Router>;