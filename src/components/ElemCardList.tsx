import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ElemCard from './ElemCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import ListWrapper from './ListWrapper';
import './ElemCardList.css';

// import WorkIcon from '@material-ui/icons/Work';
// import BeachAccessIcon from '@material-ui/icons/BeachAccess';



interface ElemCardListProps {
  data?: any[],
  noDataMsg?: string,
  getId?: (elem: any) => string;
  getPrimary?: (elem: any) => string;
  getSecondary1?: (elem: any) => string;
  getSecondary2?: (elem: any) => string;
  getImage?: (elem: any) => string;
  onClick?: (elem: any) => void;
  subHeader?: string;
  loading?: boolean;
  error?: string;
}

class ElemCardList extends Component<ElemCardListProps> { 
onClick = (elem: any) => {
  const { onClick = (()=>{}) }  = this.props;
  onClick(elem);
}
render = () => {
  const {data = [], noDataMsg,
    getId = (()=>''),
     getPrimary = (()=>''),
     getSecondary1 = (()=>''),
     getSecondary2 = (()=>''),
     getImage = (()=>''),
     subHeader = '',
     loading, error} = this.props;
  if (loading) {
    return  (<CircularProgress  className='target-list'/>);
  }
  if (error) {
    return (<Typography className='elem-list' variant="caption" display="block" gutterBottom>
    {error}
  </Typography>);
  }
  if (data.length === 0) {
    return (<Typography className='elem-list' variant="caption" display="block" gutterBottom>
    {noDataMsg || 'No data'}
  </Typography>);
  }
  return (
    <ListWrapper subHeader={subHeader}>
      {data.map((elem: any) => (
        <ListItem button key={getId(elem)} onClick={() => this.onClick(elem)}
        >
        <ElemCard primary={getPrimary(elem)} 
           secondary1={getSecondary1(elem)} 
           secondary2={getSecondary2(elem)}
           image={getImage(elem)}  
           // onClick={() => this.onClick(elem)}
           ></ElemCard>
        {/* <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar> */}
        {/* <ListItemText primary={getPrimary(elem)}
           secondary={getSecondary(elem)} 
           onClick={() => this.onClick(elem)}/> */}
      </ListItem> 
      ))}
    </ListWrapper>
  );
}
}

export default ElemCardList;