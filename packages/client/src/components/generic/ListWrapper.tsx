import React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';

interface ListWrapperProps {
    subHeader: string
  }

  const ListWrapper: React.FC<ListWrapperProps> = ({subHeader, children}) => {
    return <List sx={{
      width: '100%',
      maxWidth: '100%',
      backgroundColor: 'background.paper',
    }}
     subheader={
      <ListSubheader component="div" id="nested-list-subheader">
        {subHeader}
      </ListSubheader>
    }>{children}</List>
  }

  export default ListWrapper;
