import React, { Component } from "react";
import SwipeableItem from "../../generic/swipeable/SwipeableItem";
import SerieInput from "../serieInput/SerieInput";
import { ISerie } from "../../../model/SerieModel";
import Typography from "@material-ui/core/Typography";
import { formatDateString, millisToMinutesAndSeconds } from "../../../utils/dateUtils";
import IconButton from "@material-ui/core/IconButton";
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import './EditSerie.css';

interface EditSerieProps {
  handleDelete?: (serieId: string) => void;
  handleCancel?: () => void;
  handleDone?: (serie: ISerie) => void;
  initialSerie: ISerie;
}

const computeRestTime = (serie: ISerie) => {
  if (serie.restTime) {
        return millisToMinutesAndSeconds(serie.restTime * 1000);
  }
  return "";
};

export default class EditSerie extends Component<EditSerieProps> {
  handleDelete = () => {
    const { initialSerie, handleDelete } = this.props;
    if (handleDelete) {
      handleDelete(initialSerie._id);
    }
  };
  render() {
    const { handleCancel, handleDone, initialSerie } = this.props;
    const restTime: string = computeRestTime(initialSerie);
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
