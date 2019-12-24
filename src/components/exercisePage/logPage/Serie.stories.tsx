import React from 'react';
import Serie from './Serie';
import { action } from '@storybook/addon-actions';

export default {
    title: 'logPage/Serie',
  };
 
  
export const serieInitialValue = () => 
      <Serie />;  
export const serieCancel = () => 
      <Serie />;
export const serieDelete = () => 
      <Serie handleDelete={action('deleted')} />;
export const serieDone = () => 
      <Serie />;            