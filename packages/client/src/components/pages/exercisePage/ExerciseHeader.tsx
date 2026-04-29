import React from "react";
import { IExercise, IRoutine, IMuscleGroup, IMuscle } from "balanced-gym-model";
import { IHeaderRow } from "../../generic/headerRowList/HeaderRow";
import HeaderRowList from "../../generic/headerRowList/HeaderRowList";
import "./ExerciseHeader.css";
import {
  getExerciseHeaderRow,
  getRoutineURL,
  getRoutineHeaderRow,
  getMuscleGroupHeaderRow,
  getMuscleGroupURL,
  getTargetHeaderRow,
  getTargetURL
} from "../../../utils/routes";

interface ExerciseHeaderProps {
  exercise: IExercise;
}

const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({
  exercise: {
    routineId = { _id: "", name: "" },
    muscleGroup = { _id: "", name: "" },
    target = { _id: "", name: "" },
    name
  }
}) => {
  const headers: IHeaderRow[] = [
    getExerciseHeaderRow(name),
    getRoutineHeaderRow(routineId.name, getRoutineURL(routineId._id)),
    getMuscleGroupHeaderRow(
      muscleGroup.name,
      getMuscleGroupURL(routineId._id, muscleGroup._id)
    ),
    getTargetHeaderRow(
      target.name,
      getTargetURL(routineId._id, muscleGroup._id, target._id)
    )
  ];
  return (
    <div className="exercise-header">
      <HeaderRowList headers={headers} listTitle={""} />
    </div>
  );
};

export default ExerciseHeader;
