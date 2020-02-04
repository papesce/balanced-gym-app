import React from 'react';
import MuscleGroupList from './MuscleGroupList';
import { action } from '@storybook/addon-actions';
import { sampleRoutine1, routineWithEmptyGroup, routineWithSingleGroup, 
  routineWithFullGroup } from 'balanced-gym-model'
import { BrowserRouter as Router } from 'react-router-dom';

  export default {
    title: 'lists/muscleGroupList/Muscle Group', 
  };

export const loadingList = () => <MuscleGroupList loading />;
export const errorList = () => <MuscleGroupList error="fetch error message ignored" />;
export const noGroupList = () => <MuscleGroupList routine={sampleRoutine1}/>;
export const emptyGroupList = () => <MuscleGroupList routine={routineWithEmptyGroup}/>;
export const singleGroupList = () => <Router><MuscleGroupList routine={routineWithSingleGroup}
onClick={action('clicked item')}/></Router>;
export const fullGroupList = () => <Router><MuscleGroupList routine={routineWithFullGroup}
  onClick={action('clicked item')}/></Router>;