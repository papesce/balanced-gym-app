import React from 'react'
import { IRoutine } from 'balanced-gym-model';
import { IHeaderRow } from '../../generic/headerRowList/HeaderRow';
import HeaderRowList from '../../generic/headerRowList/HeaderRowList';
import { getRoutineHeaderRow, getRoutinesHeaderRow } from '../../../utils/routes';


interface  RoutineHeaderProps {
    routine: IRoutine;
}

const RoutineHeader: React.FC<RoutineHeaderProps> = ({ routine }) => {
    const headers: IHeaderRow[] = [
        getRoutineHeaderRow(routine.name),
        getRoutinesHeaderRow()
    ];
    return (<HeaderRowList headers={headers} listTitle={'Muscle Groups:'} />)
};

export default RoutineHeader;
