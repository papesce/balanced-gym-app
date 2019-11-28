import React, { Component } from 'react'
import ElemList from './ElemList';
import { IRoutine } from '../model/RoutineModel';
import { IMuscleGroup } from '../model/MuscleGroupModel';
import { getSummary } from './common';

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

export const getSecondary = (routine: IRoutine) => {
    const { targetsCount, exercisesCount, lastUpdated, doneToday } = routine;
    return getSummary(targetsCount, exercisesCount, lastUpdated, doneToday);
}
export const getPrimary = (muscleGroup: IMuscleGroup) => {
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
                getSecondary={getSecondary}
                getId={getId}
                error={error ? "Error loading muscle groups" : undefined}
                noDataMsg={noDataMsg}
                onClick={onClick}
            >
            </ElemList>
        )
    }
}