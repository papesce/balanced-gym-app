import { IMuscleGroup } from './MuscleGroupModel';


export const emptyMuscleGroupList: IMuscleGroup[] = [];
export const singleMuscleGroupList: IMuscleGroup[] = [];
export const fullMuscleGroupList: IMuscleGroup[] = [];


export const emptyMuscleGroup: IMuscleGroup =  {
  "_id": "",
  name: ''
};

export const muscleGroupWithNoTargets: IMuscleGroup = {
  "_id":"5dde9b568603d000157b627f",
  "name":"Calves"
}

export const muscleGroupWithEmptyTargets: IMuscleGroup = {
  "_id":"5dde9b568603d000157b6284",
  "name":"Hips",
  // "lastUpdated": "2018-03-02T00:21:55.118Z",
  // targetsCount:0,
  // exercisesCount: 10,
  // doneToday: 0,
}
export const muscleGroupWithSingleTargets: IMuscleGroup = {
   "_id":"5dde9b568603d000157b6284",
   "name":"Chest",
   targetsCount: 1 
}

export const muscleGroupWithFullTargets: IMuscleGroup = {
  "_id":"5dde9b568603d000157b6284",
  "name":"Chest",
  targetsCount: 6,
  exercisesCount: 10,
  lastUpdated: "2018-03-02T00:21:55.118Z",
  doneToday: 2,

}