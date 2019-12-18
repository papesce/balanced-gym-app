import React, { Component } from 'react'
import ElemList from '../elemList/ElemList';
import { IRoutine } from '../../model/RoutineModel'
import { getRoutineSummary } from '../common';
import './RoutineList.css';

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
        const subHeader = <div className='routine-list-subheader'>Routines:</div>;
        return (
            <ElemList loading={loading} data={routines}
                getPrimary={getPrimary} 
                getSecondary={getSecondary}
                getId={getId}
                error={error ? "Error loading routines" : undefined}
                subHeader={subHeader}
                noDataMsg={noDataMsg}
                onClick={onClick}
            >
            </ElemList>
        )
    }
}
