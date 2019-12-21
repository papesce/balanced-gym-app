import React from 'react';
import SwipeableItem from './SwipeableItem';
import { action } from '@storybook/addon-actions';

export default {
    title: 'logPage/SwipeableItem',
  };
  
export const swipeableItem = () => 
      <SwipeableItem onSwipe={action('delete')}>
        <h1>Hello World</h1>
      </SwipeableItem>;  