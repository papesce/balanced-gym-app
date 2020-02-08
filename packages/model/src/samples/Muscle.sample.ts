import { IMuscle, IMuscleDao } from '../metamodel/Muscle.metamodel';
import { sampleExercise1, sampleExercise2, sampleExercise3, sampleExercise4 } from './Exercise.sample';

export const sampleTarget: IMuscle = {
    "_id": "5a551582d9b8730014575796",
    "name": "Quadriceps",
    "exercisesCount": 21,
    lastUpdated: "2018-03-02T00:21:55.118Z",
    doneToday: 2,
    "muscleURL": "/QuadricepsAnteriorSmall.png",
} 

export const sampleTarget1: IMuscle = {
    "_id": "5a55151fd9b873001457578e",
    "name": "Gluteus Maximus",
    "exercisesCount": 11,
    "muscleURL": "/GluteusMaximus.png",
} 

export const sampleTarget2: IMuscle = {
    "_id": "5a55152ad9b873001457578f",
    "name": "Hamstrings",
    "exercisesCount": 6,
    "synergistsCount": 3,
    "stabilizersCount": 0,
    "muscleURL": "/Hamstring.png",
} 

export const sampleTarget3: IMuscle = {
    "_id": "5a551347620ca90014df37a6",
    "name": "Adductors, Hip",
    "exercisesCount": 1,
    "synergistsCount": 16,
    "stabilizersCount": 5,
    "muscleURL": "/AdductorAnteriorSmall.png",
} 

export const sampleTarget4: IMuscleDao = {
    "_id": "5a551347620ca90014df37a6",
    "name": "Adductors, Hip",
}

export const sampleTargetWithSingleExercise: IMuscle = {
    "_id": "5a551347620ca90014df37a6",
    "name": "Adductors, Hip",
    routineId: "5dde9b568603d000157b6285",
    routineName: "Chest Shoulder Biceps",
    muscleGroupId: "5dde9b568603d000157b6287",
    muscleGroupName: "Chest",
    exercises: [sampleExercise1]
} 

export const sampleTargetWithFullExercise: IMuscle = {
    "_id": "5a551347620ca90014df37a6",
    "name": "Adductors, Hip",
    exercises: [sampleExercise2, sampleExercise3, sampleExercise4]
} 


