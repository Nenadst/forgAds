import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider } from 'emotion-theming';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#ff00ff',
        },
    },
});

export const decorators = [
    (Story) => (
        <MUIThemeProvider theme={theme}>
            <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
        </MUIThemeProvider>
    ),
];
