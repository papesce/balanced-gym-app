import { IExercise } from './ExerciseModel';

export const sampleExercise1: IExercise = {
    "_id": "59f0c59d4e55c40d38868035",
    "name": "Barbell Squats",
    "lastReps": 1,
    "lastWeight": 2,
    "normalizedWeight": 0,
    "seriesCount": 3,
    suggestedSerie: {
        "reps": 13,
        "weight": 27.5
      },
    "gifURL": "/BBSquatHigh.gif"
} 

export const sampleExercise2: IExercise = {
    "_id": "59f0c59f4e55c40d38868038",
      "name": "Dumbbell short Lunge",
      "lastUpdated": "2017-11-01T19:45:35.761Z",
      "lastReps": 10,
      "lastWeight": 7.5,
      "normalizedWeight": 7.5,
      "seriesCount": 4,
      "gifURL": "/DBLungeQuad.gif",
      suggestedSerie: {
        "reps": 13,
        "weight": 27.5
      },
      synergistsCount: 4,
      stabilizersCount: 7
} 

export const sampleExercise3: IExercise = {
    "_id": "5a3809c670ddd40014934e8f",
      "name": "Barbell Rear short Lunge",
      "lastReps": 0,
      "lastWeight": 0,
      "normalizedWeight": 0,
      "seriesCount": 0,
      "gifURL": "/BBRearLunge.gif",
      suggestedSerie: {
        "reps": 13,
        "weight": 27.5
      },
      
} 

export const sampleExercise4: IExercise = {
    "_id": "5a380a8d70ddd40014934e94",
    "name": "Barbell Split Squat",
    "lastUpdated": "2017-12-18T23:44:01.393Z",
    "lastReps": 12,
    "lastWeight": 25,
    "normalizedWeight": 25,
    "seriesCount": 1,
    "gifURL": "/DBSplitSquat.gif",
    "suggestedSerie": {
        "reps": 13,
        "weight": 27.5
      },
    synergistsCount: 2,
    
} 