import React from 'react';
import SwipeableItem from './SwipeableItem';
import { action } from '@storybook/addon-actions';

export default {
    title: 'logPage/SwipeableItem',
  };

const background = <div>Delete this</div>

export const swipeableItem = () => 
      <SwipeableItem onSwipe={action('delete')} background={background}>
        <h1>Hello World</h1>
      </SwipeableItem>;  