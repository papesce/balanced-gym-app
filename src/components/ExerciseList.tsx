import React, { Component } from 'react'
import ElemList from './ElemList';
import { ITarget } from '../model/TargetModel';
import { IExercise } from '../model/ExerciseModel';
import { getExerciseSummary } from './common';
import TargetHeader from './TargetHeader';

interface ExerciseListProps {
    loading?: boolean;
    error?: string;
    target?: ITarget;
    onClick?: (elem: IExercise) => void;
    noDataMsg?: string
}


const getId = (exercise: IExercise) => {
    return exercise._id;
}

export const getSecondary = (exercise: IExercise) => {
    return getExerciseSummary(exercise);
}
export const getPrimary = (exercise: IExercise) => {
    return exercise.name; 
 };

export default class ExerciseList extends Component<ExerciseListProps> {
    
    render() {
        const emptyTarget: ITarget = {_id:'', name:'', exercises: []}
        const { target = emptyTarget, loading, error, noDataMsg = "No exercises", 
            onClick = ()=>{} } = this.props;
        return (
            <ElemList loading={loading} data={target.exercises}
                getPrimary={getPrimary} 
                getSecondary={getSecondary}
                getId={getId}
                subHeader={(<TargetHeader target={target}/>)}
                error={error ? "Error loading exercises" : undefined}
                noDataMsg={noDataMsg}
                onClick={onClick}
            >
            </ElemList>
        )
    }
}