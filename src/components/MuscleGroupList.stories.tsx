import React from 'react';
import MuscleGroupList from './MuscleGroupList';
import { action } from '@storybook/addon-actions';
import { sampleRoutine1, routineWithEmptyGroup, routineWithSingleGroup, 
  routineWithFullGroup } from '../model/RoutineModel.test'

export default {
    title: 'Muscle Group', 
  };

export const loadingList = () => <MuscleGroupList loading />;
export const errorList = () => <MuscleGroupList error="fetch error message ignored" />;
export const noGroupList = () => <MuscleGroupList routine={sampleRoutine1}/>;
export const emptyGroupList = () => <MuscleGroupList routine={routineWithEmptyGroup}/>;
export const singleGroupList = () => <MuscleGroupList routine={routineWithSingleGroup}
onClick={action('clicked item')}/>;
export const fullGroupList = () => <MuscleGroupList routine={routineWithFullGroup}
  onClick={action('clicked item')}/>;