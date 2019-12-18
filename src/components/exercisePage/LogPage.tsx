import React, { Component } from 'react';
import { IExercise } from '../../model/ExerciseModel';
import Graph from './Graph';

interface LogProps {
    exercise: IExercise
}

export default class LogPage extends Component<LogProps> {
    render() {
        const { exercise } = this.props;
        return (
            <Graph exercise={exercise}></Graph>
        )
    }
}
