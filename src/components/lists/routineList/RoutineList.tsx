import React, { Component } from "react";
import ElemList from "../../generic/elemList/ElemList";
import { IRoutine } from "../../../model/RoutineModel";
import { getRoutineSummary1, getRoutineSummary2, getColoredTextFromBoolean } from "../common";
import "./RoutineList.css";

interface RoutineListProps {
  loading?: boolean;
  error?: string;
  routines?: IRoutine[];
  onClick?: (elem: IRoutine) => void;
  noDataMsg?: string;
}

const getId = (routine: IRoutine) => {
  return routine._id;
};

const getSecondary = (routine: IRoutine) => {
  const { doneToday } = routine;
  const line1 = getRoutineSummary1(routine);
  let text: any = line1;
  const line2 = getRoutineSummary2(routine);
  const wasToday: boolean = doneToday !== undefined && doneToday > 0;
  const colorLine2 = getColoredTextFromBoolean(line2, wasToday)
  if (line2) {
    text = (
      <div>
        <div>{text}</div>
        {colorLine2}
      </div>
    );
  }
  return text;
};
const getPrimary = (elem: IRoutine) => {
  return elem.name;
};

export default class RoutineList extends Component<RoutineListProps> {
  render() {
    const {
      routines = [],
      loading,
      error,
      noDataMsg = "No routines",
      onClick = () => {}
    } = this.props;
    const subHeader = <div className="routine-list-subheader">Routines:</div>;
    return (
      <ElemList
        loading={loading}
        data={routines}
        getPrimary={getPrimary}
        getSecondary={getSecondary}
        getId={getId}
        error={error ? "Error loading routines" : undefined}
        subHeader={subHeader}
        noDataMsg={noDataMsg}
        onClick={onClick}
      ></ElemList>
    );
  }
}
