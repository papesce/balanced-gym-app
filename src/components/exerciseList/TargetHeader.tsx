import React, { Component } from 'react'
import { ITarget } from '../../model/TargetModel';
import { IHeaderRow } from '../headerRowList/HeaderRow';
import HeaderRowList from '../headerRowList/HeaderRowList';

interface  TargetHeaderProps {
    target: ITarget;
}

export default class TargetHeader extends Component<TargetHeaderProps> {
    render() {
        const { target: { 
            routineName = '', 
            routineId,
            muscleGroupName = '',
            muscleGroupId, 
            name} } = this.props;
        const headers: IHeaderRow[] = [
            {_id: '3',  title: "Target:", value: name},
            {_id: '1',  title: "Routine:", value: routineName, 
            url:`/routine/${routineId}`},
            {_id: '2',  title: "Muscle Group:", value: muscleGroupName, 
            url:`/routine/${routineId}/muscleGroup/${muscleGroupId}`}
        ];
        return (<HeaderRowList headers={headers} listTitle={'Exercises:'} />)
    }
}
