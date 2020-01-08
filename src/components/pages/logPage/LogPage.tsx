import React, { Component } from "react";
import { IExercise } from "../../../model/ExerciseModel";
import { ISerie } from "../../../model/SerieModel";
import Graph from "./SeriesGraph";
import Serie from "./Serie";
import { isToday } from '../../../utils/dateUtils';
import Typography from '@material-ui/core/Typography';
import { formatDateString } from '../../../utils/dateUtils';
import './LogPage.css';

interface LogProps {
  exercise: IExercise;
  handleEditSerie?: (exerciseId: string, serie: ISerie) => void;
  handleDeleteSerie?: (exerciseId: string, serieId: string) => void;
}

interface LogState {
  serieIndex: number;
  navigable: boolean;
}

export const getSerie = (exercise: IExercise, index: number) => {
  const { series = [] } = exercise;
  if (series.length > 0 && index < series.length) {
    return series[index];
  }
  return undefined;
};

export default class LogPage extends Component<LogProps, LogState> {
  constructor(props: LogProps) {
      super(props)
      const { exercise } = this.props;
      const { series = [] } = exercise;
      let isNavigable = false;
      if (series.length > 0) {
        const lastSerie: ISerie = series[0];
        if (lastSerie.createdAt) {
            isNavigable = isToday(new Date(lastSerie.createdAt));
        }
      }
      this.state = { serieIndex: 0, navigable: isNavigable };
  }  
  
  handleSelected = (index: number) => {
    this.setState({ serieIndex: index });
  };
  handleDelete = (serieId: string) => {
    const { handleDeleteSerie, exercise } = this.props;
    handleDeleteSerie && handleDeleteSerie(exercise._id, serieId);
  };
  handleDone = (editedSerie: ISerie) => {
    const { exercise, handleEditSerie } = this.props;
    const { weight, reps, _id } = editedSerie;
    if (handleEditSerie) {
      const editedSerie: ISerie = {
        _id,
        weight,
        reps
      };
      handleEditSerie(exercise._id, editedSerie);
    }
  };
  handleGraphClick = () => {
    this.setState(prev => ({navigable: true}));
  }
  render() {
    const { exercise } = this.props;
    const { serieIndex, navigable } = this.state;
    const selectedSerie = getSerie(exercise, serieIndex);
    // if (selectedSerie) console.log(selectedSerie.reps);
    return (
      <>
        <Graph
          key={navigable ? "1" : "0"}
          exercise={exercise}
          handleSelected={this.handleSelected}
          handleGraphClick={this.handleGraphClick}
          isNavigable={navigable}
        ></Graph>
        {navigable && selectedSerie && (
          <>
          <Typography className='log-page-created' variant="caption" display="block" gutterBottom >
            Created: {formatDateString(selectedSerie.createdAt || '')}
          </Typography>

          <Serie
            key={selectedSerie._id}
            initialSerie={selectedSerie}
            handleDone={this.handleDone}
            handleDelete={this.handleDelete}
          ></Serie>
          </>
        )}
      </>
    );
  }
}
