import React from 'react'
import { IMuscleGroup } from 'balanced-gym-model';
import { IHeaderRow } from '../../generic/headerRowList/HeaderRow';
import HeaderRowList from '../../generic/headerRowList/HeaderRowList';
import { getMuscleGroupHeaderRow, getRoutineHeaderRow, getRoutineURL } from '../../../utils/routes';

interface  MuscleGroupHeaderProps {
    muscleGroup: IMuscleGroup;
}

const MuscleGroupHeader: React.FC<MuscleGroupHeaderProps> = ({ muscleGroup: { routineName = '', routineId = '', name } }) => {
    const headers: IHeaderRow[] = [
        getMuscleGroupHeaderRow(name),
        getRoutineHeaderRow(routineName, getRoutineURL(routineId))
    ];
    return (<HeaderRowList headers={headers} listTitle={'Targets:'} />)
};

export default MuscleGroupHeader;
