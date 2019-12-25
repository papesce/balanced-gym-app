import React from 'react';
import Serie from './Serie';
import { action } from '@storybook/addon-actions';
import { serie1 } from '../../../model/SerieModel.sample';
export default {
    title: 'logPage/Serie',
  };
 
  
export const serieInitialSerie = () => 
      <Serie initialSerie={serie1} />;  
export const serieCancel = () => 
      <Serie handleCancel={action('cancel')} />;
export const serieDelete = () => 
      <Serie handleDelete={action('deleted')} />;
export const serieDone = () => 
      <Serie handleDone={action('done')}/>;            