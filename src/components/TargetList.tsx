import React, { Component } from 'react'
import ElemCardList from './ElemCardList';
import { ITarget } from '../model/TargetModel';
import { IMuscleGroup } from '../model/MuscleGroupModel';
import { getTargetSummary1, getTargetSummary2  } from './summary.target';

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

export const getSecondary1 = (target: ITarget) => {
    return getTargetSummary1(target);
}
export const getSecondary2 = (target: ITarget) => {
    return getTargetSummary2(target);
}
export const getImage = (target: ITarget) => {
    return target.muscleURL || '';
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
            <ElemCardList loading={loading} data={muscleGroup.targets}
                getPrimary={getPrimary} 
                getSecondary1={getSecondary1}
                getSecondary2={getSecondary2}
                getImage={getImage}
                getId={getId}
                error={error ? "Error loading the muscle group" : undefined}
                noDataMsg={noDataMsg}
                onClick={onClick}
            >
            </ElemCardList>
        )
    }
}