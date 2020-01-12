import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MoreOutlinedIcon from "@material-ui/icons/MoreOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import "./GraphBar.css";

interface GraphBarProps {
  edit?: boolean;
  more?: boolean;
  handleEditClick?: () => void;
  handleMoreClick?: () => void;
}

export default class GraphBar extends Component<GraphBarProps> {
  render() {
    const { edit, more, handleEditClick, handleMoreClick } = this.props;
    return (
      <div className="graph-bar-container">
        {edit && (
          <Tooltip title="Edit Series">
            <IconButton
              className={"graph-bar-icon-button"}
              size="small"
              onClick={handleEditClick}
            >
              <EditOutlinedIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        )}
        {more && (
          <Tooltip title="Show More">
            <IconButton
              className={"graph-bar-icon-button"}
              size="small"
              onClick={handleMoreClick}
            >
              <MoreOutlinedIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        )}
      </div>
    );
  }
}
