import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import ListWrapper from "../ListWrapper";
import "./ElemList.css";

export const DEFAULT_LIST_BLUE = "elem-list-secondary-blue";

export interface ISecondaryText {
  text: string;
  colorClass?: string;
}

interface ElemListProps {
  data?: any[];
  noDataMsg?: string;
  getId?: (elem: any) => string;
  getPrimary?: (elem: any) => string;
  getSecondary1?: (elem: any) => ISecondaryText;
  getSecondary2?: (elem: any) => ISecondaryText;
  getSecondary2Color?: (elem: any) => string;
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
    const emptyFunc: (elem: any) => ISecondaryText = () => ({ text: "" });
    const {
      data = [],
      noDataMsg,
      getId = () => "",
      getPrimary = () => "",
      getSecondary1 = emptyFunc,
      getSecondary2 = emptyFunc,
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
    const primary = (elem: any) => (
      <Typography component="div" variant="body1">
        {getPrimary(elem)}
      </Typography>
    );
    const secondary = (elem: any) => {
      const { text: t1, colorClass: c1 } = getSecondary1(elem);
      const { text: t2, colorClass: c2 } = getSecondary2(elem);
      return (
        <Typography component="div" variant="body2" color="textSecondary">
          <div className={c1}>{t1}</div>
          <div className={c2}>{t2}</div>
        </Typography>
      );
    };
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
              className={"elem-list-text"}
              disableTypography={true}
              primary={primary(elem)}
              secondary={secondary(elem)}
              onClick={() => this.onClick(elem)}
            />
          </ListItem>
        ))}
      </ListWrapper>
    );
  };
}

export default ElemList;
