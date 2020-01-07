import React, { Component } from 'react'
import { IMuscleGroup } from '../../model/MuscleGroupModel';
import { IHeaderRow } from '../headerRowList/HeaderRow';
import HeaderRowList from '../headerRowList/HeaderRowList';
import { getMuscleGroupHeaderRow, getRoutineHeaderRow, getRoutineURL } from '../../utils/routes';

interface  MuscleGroupHeaderProps {
    muscleGroup: IMuscleGroup;
}

export default class MuscleGroupHeader extends Component<MuscleGroupHeaderProps> {
    render() {
        const { muscleGroup: { routineName = '', routineId = '', name } } = this.props;
        const headers: IHeaderRow[] = [
            getMuscleGroupHeaderRow(name),
            getRoutineHeaderRow(routineName, getRoutineURL(routineId))
        ];
        return (<HeaderRowList headers={headers} listTitle={'Targets:'} />)
    }
}
