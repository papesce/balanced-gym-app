import React from 'react';
import LogPage from './LogPage';
import { sampleExerciseSeries2 } from '../../../model/ExerciseModel.sample';

export default {
    title: 'logPage/LogPage',
  };
 

export const logPage = () => 
      <LogPage exercise={sampleExerciseSeries2} />;    