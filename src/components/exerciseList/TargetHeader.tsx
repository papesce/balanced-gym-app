import React, { Component } from "react";
import { ITarget } from "../../model/TargetModel";
import { IHeaderRow } from "../headerRowList/HeaderRow";
import HeaderRowList from "../headerRowList/HeaderRowList";
import {
  getTargetHeaderRow,
  getRoutineHeaderRow,
  getRoutineURL,
  getMuscleGroupHeaderRow,
  getMuscleGroupURL
} from "../../utils/routes";

interface TargetHeaderProps {
  target: ITarget;
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
