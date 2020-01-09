import React from 'react';
import SerieInput from './SerieInput';
import { action } from '@storybook/addon-actions';
import { serie1, serieI } from '../../../model/SerieModel.sample'

export default {
    title: 'logPage/SerieInput',
  };
  
export const doneOnChange = () => 
      <SerieInput handleDoneClick={action('done click')}
        handleCancelClick={action('cancel click')}/>;  
export const initialSerie = () => 
        <SerieInput handleDoneClick={action('done click')}
          handleCancelClick={action('cancel click')}
          initialSerie={serie1}
          />;
export const invalidNumber = () => 
          <SerieInput handleDoneClick={action('done click')}
            handleCancelClick={action('cancel click')}
            initialSerie={serieI}
            />;                      
        