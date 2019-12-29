import React from 'react';
import Graph2 from './Graph2';
import { sampleExerciseSeries,
  sampleExerciseSeries1 } from '../../../model/ExerciseModel.sample';

export default {
    title: 'logPage/Graph2',
  };

export const graphSeries0 = () => 
      <Graph2 exercise={sampleExerciseSeries} />;    
      export const graphSeries1 = () => 
      <Graph2 exercise={sampleExerciseSeries1} />;    