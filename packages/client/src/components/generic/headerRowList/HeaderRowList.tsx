import React, { Component } from 'react'
import HeaderRow, { IHeaderRow } from './HeaderRow';
import './HeaderRowList.css';

interface HeaderListProps {
    headers: IHeaderRow[];
    listTitle: string;
}

export default class HeaderList extends Component<HeaderListProps> {
    render() {
        const { headers = [], listTitle = ''} = this.props;
        return (<div className="header-row-list">
              {headers.map( header => (
                  <HeaderRow key={header._id} header={header} />
              ))}
              <div className='header-list-title'>{listTitle}</div>
            </div>
        )
    }
}
