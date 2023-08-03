import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import { AppBarProps } from './AppBarTypes';

const drawerWidthClosed = 80;
const drawerWidth = 272;

export const AppBarComponent = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    height: '80px',
    boxShadow: 'none',
    borderBottom: ' 1px solid #DDDADA',
    background: theme.palette.background.paper,
    padding: '0 35px',
    zIndex: theme.zIndex.drawer + 1,
    width: `calc(100% - ${drawerWidthClosed}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        '& .MuiBreadcrumbs-ol': {
            gap: '2px',
        },
        '& .MuiBreadcrumbs-separator': {
            color: theme.palette.text.secondary,
            fontSize: '20px',
        },
    },
    toolbar: {
        height: '100%',
    },
    openIcon: { height: '24px', width: '24px' },
    avatarBox: {
        display: 'flex',
        height: '100%',
        marginLeft: 'auto',
        borderInline: `1px solid ${theme.palette.divider}`,
    },
    avatar: {
        alignSelf: 'center',
        marginInline: '18px'
    },
}));
