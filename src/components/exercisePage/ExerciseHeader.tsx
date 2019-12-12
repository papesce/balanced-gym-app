import React, { Component } from 'react'
import { IExercise } from '../../model/ExerciseModel';
import { IRoutine } from '../../model/RoutineModel';
import { IMuscleGroup } from '../../model/MuscleGroupModel';
import { IHeaderRow } from '../headerRowList/HeaderRow';
import { ITarget } from '../../model/TargetModel';
import HeaderRowList from '../headerRowList/HeaderRowList';

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
            name,
            _id } } = this.props;
        const headers: IHeaderRow[] = [
            {_id: '0',  title: "", value: name, 
            url:`/exercise/${_id}`},
            {_id: '1',  title: "Routine:", value: routineId.name, 
            url:`/routine/${routineId._id}`},
            {_id: '2',  title: "Muscle Group:", value: muscleGroup.name, 
            url:`/routine/${routineId._id}/muscleGroup/${muscleGroup._id}`},
            {_id: '3',  title: "Target:", value: target.name, 
            url:`/routine/${routineId._id}/muscleGroup/${muscleGroup._id}/target/${target._id}`},
        ];
        return (<HeaderRowList headers={headers} listTitle={''} />)
    }
}
