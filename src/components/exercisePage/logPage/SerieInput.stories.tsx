import React from 'react';
import SerieInput from './SerieInput';
import { action } from '@storybook/addon-actions';

export default {
    title: 'logPage/SerieInput',
  };
  
export const seriesInput = () => 
      <SerieInput handleDoneClick={action('done click')}
        handleCancelClick={action('cancel click')}/>;  
        