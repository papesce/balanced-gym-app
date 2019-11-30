import React, { Component } from 'react'
import ElemList from './ElemList';
import { IRoutine } from '../model/RoutineModel'
import { getRoutineSummary } from './common';

interface RoutineListProps {
    loading?: boolean;
    error?: string;
    routines?: IRoutine[];
    onClick?: (elem: IRoutine) => void;
    noDataMsg?: string
}

const getId = (routine: IRoutine) => {
    return routine._id;
}

const getSecondary = (routine: IRoutine) => {
    return getRoutineSummary(routine);
}
const getPrimary = (elem: IRoutine) => {
    return elem.name; 
 };

export default class RoutineList extends Component<RoutineListProps> {
    
    render() {
        const { routines = [], loading, error, noDataMsg = "No routines", 
            onClick = ()=>{} } = this.props;
        return (
            <ElemList loading={loading} data={routines}
                getPrimary={getPrimary} 
                getSecondary={getSecondary}
                getId={getId}
                error={error ? "Error loading routines" : undefined}
                noDataMsg={noDataMsg}
                onClick={onClick}
            >
            </ElemList>
        )
    }
}
