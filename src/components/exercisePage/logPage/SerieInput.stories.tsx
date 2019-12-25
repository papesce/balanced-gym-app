import React from 'react';
import SerieInput from './SerieInput';
import { action } from '@storybook/addon-actions';
import { serie1 } from '../../../model/SerieModel.sample'

export default {
    title: 'logPage/SerieInput',
  };
  
export const serieInput = () => 
      <SerieInput handleDoneClick={action('done click')}
        handleCancelClick={action('cancel click')}/>;  
export const initialSerie = () => 
        <SerieInput handleDoneClick={action('done click')}
          handleCancelClick={action('cancel click')}
          initialSerie={serie1}
          />;         
        