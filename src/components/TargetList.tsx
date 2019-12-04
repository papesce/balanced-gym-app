import React, { Component } from 'react'
import ElemList from './ElemList';
import { ITarget } from '../model/TargetModel';
import { IMuscleGroup } from '../model/MuscleGroupModel';
import { getTargetSummary } from './common';

interface TargetListProps {
    loading?: boolean;
    error?: string;
    muscleGroup?: IMuscleGroup;
    onClick?: (elem: ITarget) => void;
    noDataMsg?: string
}

// TODO do i really need the muscle group or just the [targets]

const getId = (target: ITarget) => {
    return target._id;
}

export const getSecondary = (target: ITarget) => {
    return getTargetSummary(target);
}
export const getPrimary = (target: ITarget) => {
    return target.name; 
 };

export default class TargetList extends Component<TargetListProps> {
    
    render() {
        const emptyMuscleGroup: IMuscleGroup = {_id:'', name:'', targets: []}
        const { muscleGroup = emptyMuscleGroup, loading, error, noDataMsg = "No targets", 
            onClick = ()=>{} } = this.props;
        return (
            <ElemList loading={loading} data={muscleGroup.targets}
                getPrimary={getPrimary} 
                getSecondary={getSecondary}
                getId={getId}
                error={error ? "Error loading the muscle group" : undefined}
                noDataMsg={noDataMsg}
                onClick={onClick}
            >
            </ElemList>
        )
    }
}