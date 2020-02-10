import React, { Component } from 'react'
import ElemList, {ISecondaryText, DEFAULT_LIST_BLUE} from '../../generic/elemList/ElemList';
import { IRoutine, IRoutineSummary, IMuscleGroup } from 'balanced-gym-model';
import { getRoutineSummary1, getRoutineSummary2 } from '../common';
import RoutineHeader from './RoutineHeader';

interface MuscleGroupListProps {
    loading?: boolean;
    error?: string;
    routine?: IRoutine;
    onClick?: (elem: IMuscleGroup) => void;
    noDataMsg?: string
}

const getId = (muscleGroup: IMuscleGroup) => {
    return muscleGroup._id;
}

const getSecondary1 = (routine: IRoutineSummary): ISecondaryText => {
    const line1: string = getRoutineSummary1(routine);
    return { text: line1 };
  }
  const getSecondary2 = (routine: IRoutineSummary): ISecondaryText => {
    const { doneToday } = routine;
    const line2: string = getRoutineSummary2(routine);
    const wasToday: boolean = doneToday !== undefined && doneToday > 0;
    const colorClass = wasToday ? DEFAULT_LIST_BLUE : undefined;
    return ({ text: line2, colorClass });
  }

export const getPrimary = (muscleGroup: IMuscleGroup): string => {
    return muscleGroup.name; 
 };

export default class MuscleGroupList extends Component<MuscleGroupListProps> {
    
    render() {
        const emptyRoutine: IRoutine = {_id:'', name:'', muscleGroups: []}
        const { routine = emptyRoutine, loading, error, noDataMsg = "No muscle groups", 
            onClick = ()=>{} } = this.props;
        return (
            <ElemList loading={loading} data={routine.muscleGroups}
                getPrimary={getPrimary} 
                getSecondary1={getSecondary1}
                getSecondary2={getSecondary2}
                getId={getId}
                subHeader={(<RoutineHeader routine={routine}/>)}
                error={error ? "Error loading muscle groups" : undefined}
                noDataMsg={noDataMsg}
                onClick={onClick}
            >
            </ElemList>
        )
    }
}