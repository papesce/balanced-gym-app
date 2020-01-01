import React from 'react';
import Serie from './Serie';
import { action } from '@storybook/addon-actions';
import { serie1 } from '../../../model/SerieModel.sample';
export default {
    title: 'logPage/Serie',
  };
 
  
export const initialSerie = () => 
      <Serie initialSerie={serie1} />;  
export const serieDelete = () => 
      <Serie initialSerie={serie1} handleDelete={action('deleted')} />;
export const serieDone = () => 
      <Serie initialSerie={serie1} handleDone={action('done')}/>;            