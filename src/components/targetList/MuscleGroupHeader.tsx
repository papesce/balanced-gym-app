import React, { Component } from 'react'
import { IMuscleGroup } from '../../model/MuscleGroupModel';
import { IHeaderRow } from '../headerRowList/HeaderRow';
import HeaderRowList from '../headerRowList/HeaderRowList';

interface  MuscleGroupHeaderProps {
    muscleGroup: IMuscleGroup;
}

export default class MuscleGroupHeader extends Component<MuscleGroupHeaderProps> {
    render() {
        const { muscleGroup: { routineName = '', routineId, name } } = this.props;
        const headers: IHeaderRow[] = [
            {_id: '2',  title: "Muscle Group:", value: name}, 
            {_id: '1',  title: "Routine:", value: routineName, 
            url:`/routine/${routineId}`}
        ];
        return (<HeaderRowList headers={headers} listTitle={'Targets:'} />)
    }
}
