import React from 'react';
import RoutineList from './RoutineList';
import { action } from '@storybook/addon-actions';
import { emptyRoutineList,
   singleRoutineList,
    fullRoutineList } from '../model/RoutineModel.test'

export default {
    title: 'Routine', 
  };

export const loadingList = () => <RoutineList loading />;
export const errorList = () => <RoutineList error="fetch error" />
export const emptyList = () => <RoutineList routines={emptyRoutineList}/>;
export const singleList = () => <RoutineList routines={singleRoutineList}
 onClick={action('clicked item')}/>;
export const fullList = () => <RoutineList routines={fullRoutineList}
 onClick={action('clicked item')}/>;