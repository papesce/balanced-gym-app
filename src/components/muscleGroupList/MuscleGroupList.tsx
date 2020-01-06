import React, { Component } from 'react'
import ElemList from '../elemList/ElemList';
import { IRoutine } from '../../model/RoutineModel';
import { IMuscleGroup } from '../../model/MuscleGroupModel';
import { getRoutineSummary1, getRoutineSummary2 } from '../common';
import RoutineHeader from './RoutineHeader';

interface MuscleGroupListProps {
    loading?: boolean;
    error?: string;
    routine?: IRoutine;
    onClick?: (elem: IMuscleGroup) => void;
    noDataMsg?: string
}

const getId = (muscleGroup: IMuscleGroup) => {
    return muscleGroup._id;
}

export const getSecondary = (routine: IRoutine) => {
    const { doneToday } = routine;
  const line1 = getRoutineSummary1(routine);
  let text: any = line1;
  const line2 = getRoutineSummary2(routine);
  const color = doneToday && doneToday > 0 ? { color: "blue" } : {};
  if (line2) {
    text = (
      <div>
        <div>{text}</div>
        <div style={color}>{line2}</div>
      </div>
    );
  }
  return text;
}
export const getPrimary = (muscleGroup: IMuscleGroup) => {
    return muscleGroup.name; 
 };

export default class MuscleGroupList extends Component<MuscleGroupListProps> {
    
    render() {
        const emptyRoutine: IRoutine = {_id:'', name:'', muscleGroups: []}
        const { routine = emptyRoutine, loading, error, noDataMsg = "No muscle groups", 
            onClick = ()=>{} } = this.props;
        return (
            <ElemList loading={loading} data={routine.muscleGroups}
                getPrimary={getPrimary} 
                getSecondary={getSecondary}
                getId={getId}
                subHeader={(<RoutineHeader routine={routine}/>)}
                error={error ? "Error loading muscle groups" : undefined}
                noDataMsg={noDataMsg}
                onClick={onClick}
            >
            </ElemList>
        )
    }
}