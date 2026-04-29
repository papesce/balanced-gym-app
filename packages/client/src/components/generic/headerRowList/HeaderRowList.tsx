import React from 'react'
import HeaderRow, { IHeaderRow } from './HeaderRow';
import './HeaderRowList.css';

interface HeaderListProps {
    headers: IHeaderRow[];
    listTitle: string;
}

const HeaderList: React.FC<HeaderListProps> = ({ headers = [], listTitle = '' }) => {
    return (<div className="header-row-list">
          {headers.map( header => (
              <HeaderRow key={header._id} header={header} />
          ))}
          <div className='header-list-title'>{listTitle}</div>
        </div>
    )
}

export default HeaderList;
