import { IRoutineDao, IRoutine, IRoutineSummary } from '../metamodel/Routine.metamodel';
import { muscleGroupWithEmptyTargets, muscleGroupWithNoTargets,
  muscleGroupWithSingleTargets, muscleGroupWithFullTargets } from './MuscleGroup.sample';

export const emptyRoutineDao: IRoutineDao = {
  "_id": "",
  "name": ""
};

export const sampleRoutine1: IRoutineSummary = {
  "_id": "59f0c59d4e55c40d38868034",
  "name": "Thighs Shoulders Calves",
  targetsCount:0,
  exercisesCount: 10,
  doneToday: 0,
};

export const sampleRoutine2: IRoutineSummary = {
  "_id": "59ee3ddc243a5977dab96c2b",
  "name": "Chest Triceps Waist Hips",
  targetsCount:15,
  exercisesCount: 19,
  doneToday: 1,
  lastUpdated: "2017-12-22T22:10:53.373Z"
};

export const emptyRoutineList: IRoutine[] = [];
export const singleRoutineList : IRoutine[] = [ sampleRoutine1 ];
export const fullRoutineList : IRoutine[] = [ sampleRoutine1, sampleRoutine2 ];

export const routineWithEmptyGroup: IRoutine = {
  ...sampleRoutine1,
 muscleGroups: []};

 export const routineWithSingleGroup: IRoutine = {
  ...sampleRoutine1,
 muscleGroups: [muscleGroupWithEmptyTargets]};

 export const routineWithFullGroup: IRoutine = {
  ...sampleRoutine2,
 muscleGroups: [muscleGroupWithNoTargets,
  muscleGroupWithSingleTargets,
 muscleGroupWithFullTargets]};
