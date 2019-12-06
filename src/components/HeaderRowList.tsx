import React, { Component } from 'react'
import HeaderRow, { IHeaderRow } from './HeaderRow';

interface HeaderListProps {
    headers: IHeaderRow[];
    listTitle: string
}

export default class HeaderList extends Component<HeaderListProps> {
    render() {
        const { headers = [], listTitle = ''} = this.props;
        return (<>
              {headers.map( header => (
                  <HeaderRow key={header._id} header={header} />
              ))}
              {listTitle}
            </>
        )
    }
}
