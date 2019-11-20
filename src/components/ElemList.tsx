import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import CircularProgress from '@material-ui/core/CircularProgress';
// import WorkIcon from '@material-ui/icons/Work';
// import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

type Primary = (elem: any) => string;
type Secondary = (elem: any) => string;

interface ElemListProps {
  data?: any[],
  noDataMsg?: string,
  getId?: (elem: any) => string;
  getPrimary?: (elem: any) => string;
  getSecondary?: (elem: any) => string;
  loading?: boolean;
  error?: string;
}

export const ElemList: React.FC<ElemListProps> = 
({data = [],
   noDataMsg,
    getPrimary = (f=>''),
     getSecondary = (f=>''),
      loading, error}) => {
  const classes = useStyles();
  if (loading) {
    return  (<CircularProgress />);
  }
  if (error) {
    return (<div>{error}</div>);
  }
  if (data.length === 0) {
    return (<div>{noDataMsg || 'No data'}</div>);
  }
  return (
    <List className={classes.root}>
      {data.map((elem: any) => (
        <ListItem // ref={getId(elem)}
        >

        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={getPrimary(elem)}
           secondary={getSecondary(elem)} />

      </ListItem>
      ))}
    </List>
  );
}