import React from "react";
import MusclesPage from "./MusclesPage";
import {
  onlyTargetSample,
  withSynergystsSample,
  sampleExercise1
} from "../../../model/ExerciseModel.sample";

export default {
  title: "pages/musclePage"
};

export const emptyPage = () => <MusclesPage exercise={sampleExercise1} />;
export const onlyTarget = () => <MusclesPage exercise={onlyTargetSample} />;
export const withSynergists = () => (
  <MusclesPage exercise={withSynergystsSample} />
);
