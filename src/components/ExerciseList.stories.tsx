import React from 'react';
import ExerciseList from './ExerciseList';
import { action } from '@storybook/addon-actions';
import { sampleTarget1, sampleTargetWithSingleExercise, sampleTargetWithFullExercise } from '../model/TargetModel.sample'

export default {
    title: 'Exercises', 
  };

export const loadingList = () => <ExerciseList loading />;
export const errorList = () => <ExerciseList error="fetch error message ignored" />;
export const noExercises = () => <ExerciseList target={sampleTarget1}/>;
export const singleExercisesList = () => <ExerciseList target={sampleTargetWithSingleExercise}
  onClick={action('clicked item')}/>;
export const fullGroupList = () => <ExerciseList target={sampleTargetWithFullExercise}
   onClick={action('clicked item')}/>;