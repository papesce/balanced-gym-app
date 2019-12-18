import React, { Component } from 'react'
import { IRoutine } from '../../model/RoutineModel';
import { IHeaderRow } from '../headerRowList/HeaderRow';
import HeaderRowList from '../headerRowList/HeaderRowList';


interface  RoutineHeaderProps {
    routine: IRoutine;
}

export default class RoutineHeader extends Component<RoutineHeaderProps> {
    render() {
        const { routine } = this.props;
        const headers: IHeaderRow[] = [
            {_id: '1',  title: "Routine:", value: routine.name},
            {_id: '2',  title: "", value: 'Routines', 
            url:`/routines`},
        ];
        return (<HeaderRowList headers={headers} listTitle={'Muscle Groups:'} />)
    }
}

