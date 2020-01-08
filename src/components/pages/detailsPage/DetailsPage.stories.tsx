import React from 'react';
import DetailsPage from './DetailsPage';
import { fullExerciseSample } from '../../../model/ExerciseModel.sample';

export default {
    title: 'pages/DetailsPage',
};
  
export const detailsPage = () => 
      <DetailsPage exercise={fullExerciseSample}/>;     