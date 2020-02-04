import React from 'react';
import DetailsPage from './DetailsPage';
import { fullExerciseSample } from 'balanced-gym-model';

export default {
    title: 'pages/DetailsPage',
};
  
export const detailsPage = () => 
      <DetailsPage exercise={fullExerciseSample}/>;     