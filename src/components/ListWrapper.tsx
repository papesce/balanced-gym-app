import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

interface ListWrapperProps {
    subHeader: string
  }
  
  const ListWrapper: React.FC<ListWrapperProps> = ({subHeader, children}) => {
    const classes = useStyles();
    return <List className={classes.root} 
     subheader={
      <ListSubheader component="div" id="nested-list-subheader">
        {subHeader}
      </ListSubheader>
    }>{children}</List>
  }

  export default ListWrapper;