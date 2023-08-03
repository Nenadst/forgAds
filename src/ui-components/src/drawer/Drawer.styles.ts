import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { CSSObject, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const drawerWidth = 272;
const drawerWidthClosed = 80;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: drawerWidthClosed,
    },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '24px 28px 16px 24px !important',
    alignItems: 'center',
    '@media (min-width: 600px)': {
        minHeight: '79px !important',
    },
    ...theme.mixins.toolbar,
}));

export const DrawerComponent = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

export const useStyles = makeStyles(({ palette }: Theme) => ({
    defaultIcon: {
        '& .MuiSvgIcon-root': {
            height: '24px',
            width: '24px',
        },
    },
    box: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '15px 0 !important',
    },
    btn: {
        display: 'flex',
        gap: '25px',
        padding: '16px 29px !important',
    },
    link: {
        position: 'relative',
        textDecoration: 'none',
    },
    indicator: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '3px',
        height: '100%',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgoundColor: palette.primary.main
    }
}));
