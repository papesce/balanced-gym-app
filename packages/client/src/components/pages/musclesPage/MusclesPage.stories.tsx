import React from "react";
import MusclesPage from "./MusclesPage";
import {
  onlyTargetSample,
  withSynergystsSample,
  sampleExercise1
} from "balanced-gym-model";

export default {
  title: "pages/MusclePage"
};

export const emptyPage = () => <MusclesPage exercise={sampleExercise1} />;
export const onlyTarget = () => <MusclesPage exercise={onlyTargetSample} />;
export const withSynergists = () => (
  <MusclesPage exercise={withSynergystsSample} />
);
