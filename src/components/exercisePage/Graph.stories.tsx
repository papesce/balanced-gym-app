import React from 'react';
import Graph from './Graph';
import { sampleExerciseSeries, sampleExerciseSeries1, sampleExerciseSeries2, sampleExerciseSeries8 } from '../../model/ExerciseModel.sample';

export default {
    title: 'exercisePage/Graph',
  };

export const graphSeries0 = () => 
      <Graph exercise={sampleExerciseSeries} />;    
export const graphSeries1 = () => 
      <Graph exercise={sampleExerciseSeries1} />; 
export const graphSeries2 = () => 
      <Graph exercise={sampleExerciseSeries2} />; 
export const graphSeries8 = () => 
      <Graph exercise={sampleExerciseSeries8} />; 