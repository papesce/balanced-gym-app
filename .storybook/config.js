import { addParameters, configure } from '@storybook/react';

addParameters({
    name: 'Balanced Gym App',
    showPanel: false,
    panelPosition: 'right',
});
// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.tsx$/), module);
// Option defaults:
