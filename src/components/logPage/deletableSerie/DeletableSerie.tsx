import React, { Component } from "react";
import SwipeableItem from "../../generic/swipeable/SwipeableItem";
import SerieInput from "../serieInput/SerieInput";
import { ISerie } from "../../../model/SerieModel";
import Typography from "@material-ui/core/Typography";
import { formatDateString } from "../../../utils/dateUtils";
import IconButton from "@material-ui/core/IconButton";
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import './DeletableSerie.css';

interface DeletableSerieProps {
  handleDelete?: (serieId: string) => void;
  handleCancel?: () => void;
  handleDone?: (serie: ISerie) => void;
  initialSerie: ISerie;
  restTime?: string;
}

export default class DeletableSerie extends Component<DeletableSerieProps> {
  handleDelete = () => {
    const { initialSerie, handleDelete } = this.props;
    if (handleDelete) {
      handleDelete(initialSerie._id);
    }
  };
  render() {
    const { handleCancel, handleDone, initialSerie, restTime } = this.props;

    return (
      <div className="deleteable-serie-container">
      <IconButton className={"deleteable-serie-icon-button"} size="small" onClick={handleCancel}>
          <CancelOutlinedIcon fontSize="inherit" />
      </IconButton>
      <Typography
          className="log-page-created"
          component="span"
          variant="caption"
          display="block"
          gutterBottom
        >
          Created: {formatDateString(initialSerie.createdAt || "")}
          {restTime && <span> ( rest: {restTime} )</span>}
        </Typography>
        
        <SwipeableItem onSwipe={this.handleDelete}>
          <SerieInput
            initialSerie={initialSerie}
            handleCancelClick={handleCancel}
            handleDoneClick={handleDone}
          ></SerieInput>
        </SwipeableItem>
      </div>
    );
  }
}
