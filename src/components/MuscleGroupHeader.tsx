import React, { Component } from 'react'
import { IMuscleGroup } from '../model/MuscleGroupModel';
import { IHeaderRow } from './HeaderRow';
import HeaderRowList from './HeaderRowList';

interface  MuscleGroupHeaderProps {
    muscleGroup: IMuscleGroup;
}

export default class MuscleGroupHeader extends Component<MuscleGroupHeaderProps> {
    render() {
        const { muscleGroup: { routineName = '', routineId, name, _id } } = this.props;
        const headers: IHeaderRow[] = [
            {_id: '1',  title: "Routine:", value: routineName, 
            url:`/routine/${routineId}`},
            {_id: '2',  title: "Muscle Group:", value: name, 
            url:`/routine/${routineId}/muscleGroup/${_id}`},
        ];
        return (<HeaderRowList headers={headers} listTitle={'Targets:'} />)
    }
}
