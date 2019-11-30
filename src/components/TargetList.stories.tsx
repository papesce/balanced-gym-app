import React from 'react';
import TargetList from './TargetList';
import { action } from '@storybook/addon-actions';
import { muscleGroupWithEmptyTargetList, muscleGroupWithSingleTarget, 
  muscleGroupWithFullTargetList } from '../model/MuscleGroupModel.sample'

export default {
    title: 'Targets', 
  };

export const loadingList = () => <TargetList loading />;
export const errorList = () => <TargetList error="fetch error message ignored" />;
export const noTargetsList = () => <TargetList muscleGroup={muscleGroupWithEmptyTargetList}/>;
export const singleTargetList = () => <TargetList muscleGroup={muscleGroupWithSingleTarget}
 onClick={action('clicked item')}/>;
export const fullGroupList = () => <TargetList muscleGroup={muscleGroupWithFullTargetList}
  onClick={action('clicked item')}/>;