import React, { Component } from 'react'
import { IRoutine } from '../model/RoutineModel';
import { IHeaderRow } from './HeaderRow';
import HeaderRowList from './HeaderRowList';


interface  RoutineHeaderProps {
    routine: IRoutine;
}

export default class RoutineHeader extends Component<RoutineHeaderProps> {
    render() {
        const { routine } = this.props;
        const headers: IHeaderRow[] = [
            {_id: '1',  title: "Routine:", value: routine.name, 
            url:`/routine/${routine._id}`}
        ];
        return (<HeaderRowList headers={headers} listTitle={'Muscle Groups:'} />)
    }
}

