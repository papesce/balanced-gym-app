import React, { Component } from "react";
import ElemList, {
  ISecondaryText,
  DEFAULT_LIST_BLUE
} from "../../generic/elemList/ElemList";
import { IRoutine, IRoutineSummary } from "balanced-gym-model";
import { getRoutineSummary1, getRoutineSummary2 } from "../common";
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

const getSecondary1 = (routine: IRoutineSummary): ISecondaryText => {
  const line1: string = getRoutineSummary1(routine);
  return { text: line1 };
};
const getSecondary2 = (routine: IRoutineSummary): ISecondaryText => {
  const { doneToday } = routine;
  const line2: string = getRoutineSummary2(routine);
  const wasToday: boolean = doneToday !== undefined && doneToday > 0;
  const colorClass = wasToday ? DEFAULT_LIST_BLUE : undefined;
  return { text: line2, colorClass };
};

const getPrimary = (elem: IRoutine): string => {
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
        getSecondary1={getSecondary1}
        getSecondary2={getSecondary2}
        getId={getId}
        error={error ? "Error loading routines" : undefined}
        subHeader={subHeader}
        noDataMsg={noDataMsg}
        onClick={onClick}
      ></ElemList>
    );
  }
}
