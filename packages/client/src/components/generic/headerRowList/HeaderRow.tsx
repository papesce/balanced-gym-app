import React from 'react'
import './HeaderRow.css';
import { Link } from 'react-router-dom';

export interface IHeaderRow {
    _id: string,
    title?: string,
    url?: string,
    value: string
}

interface HeaderRowProps {
   header: IHeaderRow;
}

const HeaderRow: React.FC<HeaderRowProps> = ({ header: { title, url, value } }) => {
    let linkedValue;
    if (url) {
        linkedValue = <Link className='header-link' to={url}>{value}</Link>
    } else {
        linkedValue = (<span className='header-row-unlinked'>{value}</span>);
    };
    return (
            <div className='header-row'>
              {title && <span className='header-row-title'>{title}</span>}
              {linkedValue}
            </div>
    )
}

export default HeaderRow;
