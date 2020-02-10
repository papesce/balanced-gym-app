import React, { Component } from 'react'
import ElemCardList from '../../generic/cardList/ElemCardList';
import { IMuscle, IExerciseSummary } from 'balanced-gym-model';
import { getExerciseSummary1, getExerciseSummary2 } from './summary.exercise';
import TargetHeader from './TargetHeader';
import { isToday } from '../../../utils/dateUtils';
import { DEFAULT_LIST_BLUE } from '../../generic/elemList/ElemList';

interface ExerciseListProps {
    loading?: boolean;
    error?: string;
    target?: IMuscle;
    onClick?: (elem: IExerciseSummary) => void;
    noDataMsg?: string
}


const getId = (exercise: IExerciseSummary) => {
    return exercise._id;
}

const wasDoneToday = (exercise: IExerciseSummary) : boolean => {
    const { lastUpdated } = exercise;
    if (lastUpdated) {
        return isToday(new Date(lastUpdated));
    }
    return false;
}

export const getSecondary1 = (exercise: IExerciseSummary) => {
    const line2: string = getExerciseSummary1(exercise); 
    const colorClass = wasDoneToday(exercise) ? DEFAULT_LIST_BLUE : undefined;
    return ({ text: line2, colorClass });
}

export const getSecondary2 = (exercise: IExerciseSummary) => {
    const line2: string = getExerciseSummary2(exercise);
    return { text: line2 };
}

export const getImage = (exercise: IExerciseSummary) => {
    return exercise.gifURL || '';
}
export const getPrimary = (exercise: IExerciseSummary) => {
    return exercise.name; 
 };

export default class ExerciseList extends Component<ExerciseListProps> {
    
    render() {
        const emptyTarget: IMuscle = {_id:'', name:'', exercises: []}
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