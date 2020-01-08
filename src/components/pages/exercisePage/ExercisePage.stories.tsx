import React from 'react';
import ExercisePage from './ExercisePage';
import { IExercise } from '../../model/ExerciseModel';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
    title: 'pages/exercisePage',
  };


const sampleExercise: IExercise = {
  "_id": "59ee3ddc243a5977dab96c2c",
  "name": "Suspended Pull Through",
  "muscleGroup": {
    "_id": "5dde9b568603d000157b6280",
    "name": "Back"
  },
  "target": {
    "_id": "5a5514e9d9b873001457578a",
    "name": "Erector Spinae (Iliocastalis)",
    "muscleURL": "/ErectorSpinae.png"
  },
  "routineId": {
    "_id": "59f3a4fb73da258989f47cf0",
    "name": "Back Biceps Forearm Neck"
  },
};  
  
export const loading = () => 
      <ExercisePage loading/>;
export const error = () => 
      <ExercisePage error="fetch error"/>;
  export const exercisePage = () => 
      <Router><ExercisePage exercise={sampleExercise}/></Router>;
  