import React from 'react';
import ExerciseList from './ExerciseList';
import { action } from '@storybook/addon-actions';
import { sampleTarget1, sampleTargetWithSingleExercise, sampleTargetWithFullExercise } from '../../model/TargetModel.sample'
import { BrowserRouter as Router } from 'react-router-dom';

export default {
    title: 'exerciseList/Exercises', 
  };

export const loadingList = () => <ExerciseList loading />;
export const errorList = () => <ExerciseList error="fetch error message ignored" />;
export const noExercises = () => <ExerciseList target={sampleTarget1}/>;
export const singleExercisesList = () => <Router><ExerciseList target={sampleTargetWithSingleExercise}
  onClick={action('clicked item')}/></Router>;
export const fullGroupList = () => <Router><ExerciseList target={sampleTargetWithFullExercise}
   onClick={action('clicked item')}/></Router>;