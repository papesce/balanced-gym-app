import React, { Component } from 'react'
import './HeaderRow.css';
import { Link } from 'react-router-dom';

export interface IHeaderRow {
    _id: string,
    title: string,
    url?: string,
    value: string
}

interface HeaderRowProps {
   header: IHeaderRow;   
}

export default class HeaderRow extends Component<HeaderRowProps> {
    render() {
        const { header: { title, url, value } } = this.props;
        let linkedValue;
        if (url) {
            linkedValue = <Link className='header-link' to={url}>{value}</Link>  
        } else {
            linkedValue = (<span className='header-row-unlinked'>{value}</span>);
        };
        return (
                <div className='header-row'>
                  <span className='header-row-title'>{title}</span>
                  {linkedValue}
                </div>
        )
    }
}
