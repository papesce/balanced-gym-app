import React, { Component } from 'react'
import { IRoutine } from '../../model/RoutineModel';
import { IHeaderRow } from '../headerRowList/HeaderRow';
import HeaderRowList from '../headerRowList/HeaderRowList';
import { getRoutineHeaderRow, getRoutinesHeaderRow } from '../../utils/routes';


interface  RoutineHeaderProps {
    routine: IRoutine;
}

export default class RoutineHeader extends Component<RoutineHeaderProps> {
    render() {
        const { routine } = this.props;
        const headers: IHeaderRow[] = [
            getRoutineHeaderRow(routine.name),
            getRoutinesHeaderRow()
        ];
        return (<HeaderRowList headers={headers} listTitle={'Muscle Groups:'} />)
    }
}

