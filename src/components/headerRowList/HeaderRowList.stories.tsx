import React from 'react';
import HeaderRowList from './HeaderRowList';
import { IHeaderRow }  from './HeaderRow';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
    title: 'headerRowList/Header Row List', 
  };

  const header: IHeaderRow = {
     _id: '1', title: "Title:", value:"value", url:"url"
  };
  
  const singleHeaders : IHeaderRow[] = [
    header
  ]

  const fullHeaders : IHeaderRow[] = [
    {_id: '1', title: "Title1:", value:"value1", url:"url1"},
    {_id: '2', title: "Title2:", value:"value2", url:"url2"},
    {_id: '3', title: "Title3:", value:"value3", url:"url3"}
  ]

  
  export const emptyHeaderRowList = () => 
    <Router><HeaderRowList headers={[]} listTitle="List Title:"/></Router>;
    export const singleHeaderRowList = () => 
    <Router><HeaderRowList headers={singleHeaders} listTitle="List Title:"/></Router>;
    export const fullHeaderRowList = () => 
    <Router><HeaderRowList headers={fullHeaders} listTitle="List Title:"/></Router>;