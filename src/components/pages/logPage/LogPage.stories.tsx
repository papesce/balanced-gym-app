import React from 'react';
import LogPage from './LogPage';
import { sampleExerciseSeries2, sampleExerciseSeries8 } from '../../../model/ExerciseModel.sample';

export default {
    title: 'pages/LogPage',
  };
 

export const series2 = () => 
      <LogPage exercise={sampleExerciseSeries2} />;   
export const series8 = () =>  
      <LogPage exercise={sampleExerciseSeries8} />;   