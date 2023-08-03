import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { modals } from 'modals';
import { SnackbarProvider } from 'notistack';
import renderModals, { IModal } from 'renderModals';
import MainRouter from 'router/router';
import { customTheme } from 'themes/global';

const App = () => (
    <ThemeProvider theme={customTheme}>
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <CssBaseline />
            <MainRouter />
            {renderModals(modals as IModal[])}
        </SnackbarProvider>
    </ThemeProvider>
);

export default App;
