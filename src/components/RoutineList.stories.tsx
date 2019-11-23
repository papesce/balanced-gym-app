import React from 'react';
import RoutineList from './RoutineList';
import { action } from '@storybook/addon-actions';
import { emptydataList,
   singledataList,
    fulldataList } from '../model/RoutineModel.test'

export default {
    title: 'Routine', 
  };

export const loadingList = () => <RoutineList loading />;
export const errorList = () => <RoutineList error="fetch error" />
export const emptyList = () => <RoutineList data={emptydataList}/>;
export const singleList = () => <RoutineList data={singledataList}
 onClick={action('clicked item')}/>;
export const fullList = () => <RoutineList data={fulldataList}
 onClick={action('clicked item')}/>;