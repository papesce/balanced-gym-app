import React from 'react';
import SeriesGraph from './SeriesGraph';
import { sampleExerciseSeries, sampleExerciseSeries1, sampleExerciseSeries2, sampleExerciseSeries8 } from '../../../model/ExerciseModel.sample';
import { action } from '@storybook/addon-actions';

export default {
    title: 'logPage/Graph',
  };

export const graphSeries0 = () => 
      <SeriesGraph exercise={sampleExerciseSeries} />;    
export const graphSeries1 = () => 
      <SeriesGraph exercise={sampleExerciseSeries1} />; 
export const graphSeries2 = () => 
      <SeriesGraph exercise={sampleExerciseSeries2} />; 
export const graphSeries8 = () => 
      <SeriesGraph exercise={sampleExerciseSeries8} isNavigable 
      handleSelected={action('selected')}/>; 