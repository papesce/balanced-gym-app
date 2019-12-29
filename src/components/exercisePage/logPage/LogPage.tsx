import React, { Component } from 'react';
import { IExercise } from '../../../model/ExerciseModel';
import Graph from './Graph';
import Serie from './Serie';

interface LogProps {
    exercise: IExercise
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
    render() {
        const { exercise } = this.props;
        const { serieIndex } = this.state;
        const selectedSerie = getSerie(exercise, serieIndex);
        if (selectedSerie) console.log(selectedSerie.reps);
        return (<>
            <Graph exercise={exercise} 
                   handleSelected={this.handleSelected} ></Graph>
            {selectedSerie && <Serie key={selectedSerie._id} initialSerie={selectedSerie}></Serie>}
           
            </>
        )
    }
}
