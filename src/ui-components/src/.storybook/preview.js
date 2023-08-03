// .storybook/preview.js

import { ThemeProvider } from '@material-ui/core';
import { addDecorator } from '@storybook/react';
import { customTheme } from '../../../themes/global';

// pass ThemeProvider and array of your themes to decorator
addDecorator((story) => <ThemeProvider theme={customTheme}>{story()}</ThemeProvider>);
