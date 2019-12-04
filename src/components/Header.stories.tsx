import React from 'react';
import Header from './Header';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Header',
};

export const header = () => <Header handleClick={action('clicked item')}/>;



