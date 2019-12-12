import React from 'react';
import TargetList from './TargetList';
import { action } from '@storybook/addon-actions';
import { muscleGroupWithEmptyTargetList, muscleGroupWithSingleTarget, 
  muscleGroupWithFullTargetList } from '../../model/MuscleGroupModel.sample'
  import { BrowserRouter as Router } from 'react-router-dom';

export default {
    title: 'targetList/Targets', 
  };

export const loadingList = () => <TargetList loading />;
export const errorList = () => <TargetList error="fetch error message ignored" />;
export const noTargetsList = () => <TargetList muscleGroup={muscleGroupWithEmptyTargetList}/>;
export const singleTargetList = () => <Router><TargetList muscleGroup={muscleGroupWithSingleTarget}
 onClick={action('clicked item')}/></Router>;
export const fullGroupList = () => <Router><TargetList muscleGroup={muscleGroupWithFullTargetList}
  onClick={action('clicked item')}/></Router>;