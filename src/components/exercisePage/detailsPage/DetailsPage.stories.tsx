import React from 'react';
import DetailsPage from './DetailsPage';
import { fullExerciseSample } from '../../../model/ExerciseModel.sample';

export default {
    title: 'exercisePage/DettailsPage',
};
  
export const detailsPage = () => 
      <DetailsPage exercise={fullExerciseSample}/>;     