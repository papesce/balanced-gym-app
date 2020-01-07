import React, { Component } from 'react'
import { IExercise } from '../../model/ExerciseModel';
import { IRoutine } from '../../model/RoutineModel';
import { IMuscleGroup } from '../../model/MuscleGroupModel';
import { IHeaderRow } from '../headerRowList/HeaderRow';
import { ITarget } from '../../model/TargetModel';
import HeaderRowList from '../headerRowList/HeaderRowList';
import './ExerciseHeader.css';
import { getExerciseHeaderRow, getRoutineURL, getRoutineHeaderRow, getMuscleGroupHeaderRow, getMuscleGroupURL, getTargetHeaderRow, getTargetURL } from '../../utils/routes';

interface  ExerciseHeaderProps {
    exercise: IExercise;
}

export default class ExerciseHeader extends Component<ExerciseHeaderProps> {
    render() {
        const emptyRoutine: IRoutine = { _id: '', name: ''};
        const emptyMuscleGroup: IMuscleGroup = { _id: '',  name: ''};
        const emptyTarget: ITarget = { _id: '', name: ''};
        const { exercise: { 
            routineId = emptyRoutine, 
            muscleGroup = emptyMuscleGroup,
            target = emptyTarget,
            name} } = this.props;
        const headers: IHeaderRow[] = [
            getExerciseHeaderRow(name),
            getRoutineHeaderRow(routineId.name, getRoutineURL(routineId._id)),
            getMuscleGroupHeaderRow(muscleGroup.name, getMuscleGroupURL(routineId._id, muscleGroup._id)),
            getTargetHeaderRow(target.name, getTargetURL(routineId._id, muscleGroup._id, target._id))
        ];
        return (
            <div className='exercise-header'>
             <HeaderRowList headers={headers} listTitle={''} />
            </div>)

    }
}
