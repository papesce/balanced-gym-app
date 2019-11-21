import React from 'react';
import RoutineList from './RoutineList';
import { emptydataList,
   singledataList,
    fulldataList } from '../model/RoutineModel.test'

export default {
    title: 'Routine', 
  };

export const loadingList = () => <RoutineList loading />;
export const errorList = () => <RoutineList error="fetch error" />
export const emptyList = () => <RoutineList data={emptydataList} />;
export const singleList = () => <RoutineList data={singledataList} />;
export const fullList = () => <RoutineList data={fulldataList} />;