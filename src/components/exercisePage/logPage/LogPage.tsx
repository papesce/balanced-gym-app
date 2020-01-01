import React, { Component } from 'react';
import { IExercise } from '../../../model/ExerciseModel';
import { ISerie } from '../../../model/SerieModel';
import Graph from './Graph';
import Serie from './Serie';

interface LogProps {
    exercise: IExercise,
    handleEditSerie?: (serie: ISerie) => void;
    handleDeleteSerie?: (exerciseId: string, serieId: string) => void;
}

interface LogState {
    serieIndex: number
}

export const getSerie = (exercise: IExercise, index: number) => {
  const { series = [] } = exercise;
  if (series.length > 0 && index < series.length) {
    return series[index];
  }
  return undefined;
}



export default class LogPage extends Component<LogProps, LogState> {
    state = { serieIndex: 0 } 
    handleSelected = (index: number) => {
        this.setState({serieIndex: index});
    }
    handleDelete = (serieId: string) => {
        const { handleDeleteSerie, exercise } = this.props;
        handleDeleteSerie && handleDeleteSerie(exercise._id, serieId);
    }
    handleDone = () => {
        const { exercise, handleEditSerie } = this.props;
        const { serieIndex } = this.state;
        const selectedSerie = getSerie(exercise, serieIndex);
        if (selectedSerie && handleEditSerie) {
            const editedSerie: ISerie  = {
                _id: selectedSerie._id,
                weight: 0,
                reps: 0,
            }
             handleEditSerie(editedSerie);
        }
    }
    render() {
        const { exercise } = this.props;
        const { serieIndex } = this.state;
        const selectedSerie = getSerie(exercise, serieIndex);
        // if (selectedSerie) console.log(selectedSerie.reps);
        return (<>
            <Graph exercise={exercise} 
                   handleSelected={this.handleSelected} isNavigable></Graph>
            {selectedSerie && <Serie key={selectedSerie._id} 
                initialSerie={selectedSerie}
                handleDone={this.handleDone}
                handleDelete={this.handleDelete}
            ></Serie>}
           
            </>
        )
    }
}
