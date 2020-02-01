import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import ListWrapper from "../ListWrapper";

// import WorkIcon from '@material-ui/icons/Work';
// import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import "./ElemList.css";

interface ElemListProps {
  data?: any[];
  noDataMsg?: string;
  getId?: (elem: any) => string;
  getPrimary?: (elem: any) => string;
  getSecondary?: (elem: any) => any;
  onClick?: (elem: any) => void;
  subHeader?: any;
  loading?: boolean;
  error?: string;
}

class ElemList extends Component<ElemListProps> {
  onClick = (elem: any) => {
    const { onClick = () => {} } = this.props;
    onClick(elem);
  };
  render = () => {
    const {
      data = [],
      noDataMsg,
      getId = () => "",
      getPrimary = () => "",
      getSecondary = () => "",
      subHeader = "",
      loading,
      error
    } = this.props;
    if (loading) {
      return <CircularProgress className="elem-list" />;
    }
    if (error) {
      return (
        <Typography
          className="elem-list"
          variant="caption"
          display="block"
          gutterBottom
        >
          {error}
        </Typography>
      );
    }
    if (data.length === 0) {
      return (
        <Typography
          className="elem-list"
          variant="caption"
          display="block"
          gutterBottom
        >
          {noDataMsg || "No data"}
        </Typography>
      );
    }
    return (
      <ListWrapper subHeader={subHeader}>
        {data.map((elem: any) => (
          <ListItem button key={getId(elem)}>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              // primaryTypographyProps={{component: 'div'}}
              primary={getPrimary(elem)}
              // secondaryTypographyProps={{component: 'div'}}
              secondary={getSecondary(elem)}
              onClick={() => this.onClick(elem)}
            />
          </ListItem>
        ))}
      </ListWrapper>
    );
  };
}

export default ElemList;
