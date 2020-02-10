import React, { Component } from "react";
import ElemCardList, { ISecondaryCardText } from "../../generic/cardList/ElemCardList";
import { IMuscle, IMuscleGroup, IMuscleSummary } from "balanced-gym-model";
import { getTargetSummary1, getTargetSummary2, getTargetSummary3 } from "./summary.target";
import MuscleGroupHeader from "./MuscleGroupHeader";
import { isToday } from "../../../utils/dateUtils";
import { DEFAULT_LIST_BLUE } from "../../generic/elemList/ElemList";

interface TargetListProps {
  loading?: boolean;
  error?: string;
  muscleGroup?: IMuscleGroup;
  onClick?: (elem: IMuscle) => void;
  noDataMsg?: string;
}

// TODO do i really need the muscle group or just the [targets]

const getId = (target: IMuscle): string => {
  return target._id;
};

export const getSecondary1 = (target: IMuscleSummary): ISecondaryCardText => {
  const line2: string = getTargetSummary1(target);
  return { text: line2 };
};

export const getSecondary2 = (target: IMuscleSummary): ISecondaryCardText => {
    const { doneToday } = target;
    const line2 = getTargetSummary2(target);
    const wasToday: boolean = doneToday !== undefined && doneToday > 0;
    const colorClass = wasToday ? DEFAULT_LIST_BLUE : undefined;
    return ({ text: line2, colorClass });
};

export const getSecondary3 = (target: IMuscleSummary): ISecondaryCardText => {
  const line3: string = getTargetSummary3(target);
  return { text: line3 };
};

export const getImage = (target: IMuscle) => {
  return target.muscleURL || "";
};

export const getPrimary = (target: IMuscle) => {
  return target.name;
};

export default class TargetList extends Component<TargetListProps> {
  render() {
    const emptyMuscleGroup: IMuscleGroup = { _id: "", name: "", targets: [] };
    const {
      muscleGroup = emptyMuscleGroup,
      loading,
      error,
      noDataMsg = "No targets",
      onClick = () => {}
    } = this.props;
    return (
      <ElemCardList
        loading={loading}
        data={muscleGroup.targets}
        getPrimary={getPrimary}
        getSecondary1={getSecondary1}
        getSecondary2={getSecondary2}
        getSecondary3={getSecondary3}
        getImage={getImage}
        getId={getId}
        subHeader={<MuscleGroupHeader muscleGroup={muscleGroup} />}
        error={error ? "Error loading the muscle group" : undefined}
        noDataMsg={noDataMsg}
        onClick={onClick}
      ></ElemCardList>
    );
  }
}
