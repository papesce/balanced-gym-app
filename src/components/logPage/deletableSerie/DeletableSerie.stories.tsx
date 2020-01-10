import React from 'react';
import Serie from './DeletableSerie';
import { action } from '@storybook/addon-actions';
import { serie1 } from '../../../model/SerieModel.sample';
export default {
    title: 'logPage/DeletableSerie',
  };
 
  
export const deletableSerie = () => 
      <Serie initialSerie={serie1} handleDelete={action('deleted')} />;
export const withRestTime = () => 
      <Serie initialSerie={serie1} handleDelete={action('deleted')} restTime={"2:05"} />;
       