import React, { Component } from 'react'
import ElemCardList from '../../generic/cardList/ElemCardList';
import { ITarget } from '../../../model/TargetModel';
import { IExercise } from '../../../model/ExerciseModel';
import { getExerciseSummary1, getExerciseSummary2 } from './summary.exercise';
import TargetHeader from './TargetHeader';
import { getColoredTextFromDateString } from '../common';

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
export const getSecondary1 = (exercise: IExercise) => {
    const { lastUpdated } = exercise;
    const text: any = getExerciseSummary1(exercise);
    return getColoredTextFromDateString(text, lastUpdated);
}

export const getSecondary2 = (exercise: IExercise) => {
  return getExerciseSummary2(exercise);
}

export const getImage = (exercise: IExercise) => {
    return exercise.gifURL || '';
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
            <ElemCardList loading={loading} data={target.exercises}
                getPrimary={getPrimary} 
                getSecondary1={getSecondary1}
                getSecondary2={getSecondary2}
                getId={getId}
                getImage={getImage}
                subHeader={(<TargetHeader target={target}/>)}
                error={error ? "Error loading exercises" : undefined}
                noDataMsg={noDataMsg}
                onClick={onClick}
            >
            </ElemCardList>
        )
    }
}