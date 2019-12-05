import { ITarget } from './TargetModel';
import { sampleExercise1, sampleExercise2, sampleExercise3, sampleExercise4 } from './ExerciseModel.sample';

export const sampleTarget: ITarget = {
    "_id": "5a551582d9b8730014575796",
    "name": "Quadriceps",
    "exercisesCount": 21,
    lastUpdated: "2018-03-02T00:21:55.118Z",
    doneToday: 2,
    "muscleURL": "/QuadricepsAnteriorSmall.png",
} 

export const sampleTarget1: ITarget = {
    "_id": "5a55151fd9b873001457578e",
    "name": "Gluteus Maximus",
    "exercisesCount": 11,
    "muscleURL": "/GluteusMaximus.png",
} 

export const sampleTarget2: ITarget = {
    "_id": "5a55152ad9b873001457578f",
    "name": "Hamstrings",
    "exercisesCount": 6,
    "synergistsCount": 3,
    "stabilizersCount": 0,
    "muscleURL": "/Hamstring.png",
} 

export const sampleTarget3: ITarget = {
    "_id": "5a551347620ca90014df37a6",
    "name": "Adductors, Hip",
    "exercisesCount": 1,
    "synergistsCount": 16,
    "stabilizersCount": 5,
    "muscleURL": "/AdductorAnteriorSmall.png",
} 

export const sampleTargetWithSingleExercise: ITarget = {
    "_id": "5a551347620ca90014df37a6",
    "name": "Adductors, Hip",
    exercises: [sampleExercise1]
} 

export const sampleTargetWithFullExercise: ITarget = {
    "_id": "5a551347620ca90014df37a6",
    "name": "Adductors, Hip",
    exercises: [sampleExercise2, sampleExercise3, sampleExercise4]
} 
