import React, { Component } from "react";
import { IMuscle } from "balanced-gym-model";
import { IHeaderRow } from "../../generic/headerRowList/HeaderRow";
import HeaderRowList from "../..//generic/headerRowList/HeaderRowList";
import {
  getTargetHeaderRow,
  getRoutineHeaderRow,
  getRoutineURL,
  getMuscleGroupHeaderRow,
  getMuscleGroupURL
} from "../../../utils/routes";

interface TargetHeaderProps {
  target: IMuscle;
}

export default class TargetHeader extends Component<TargetHeaderProps> {
  render() {
    const {
      target: {
        routineName = "",
        routineId = "",
        muscleGroupName = "",
        muscleGroupId = "",
        name
      }
    } = this.props;
    const headers: IHeaderRow[] = [
      getTargetHeaderRow(name),
      getRoutineHeaderRow(routineName, getRoutineURL(routineId)),
      getMuscleGroupHeaderRow(
        muscleGroupName,
        getMuscleGroupURL(routineId, muscleGroupId)
      )
    ];
    return <HeaderRowList headers={headers} listTitle={"Exercises:"} />;
  }
}
