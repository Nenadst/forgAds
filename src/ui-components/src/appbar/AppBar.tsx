import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import PersonIcon from '@mui/icons-material/PersonRounded';
import { Avatar, Box, Breadcrumbs, IconButton, Toolbar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { capitalCase, snakeCase } from 'change-case';
import { NavLink, useLocation } from 'react-router-dom';
import { AppBarComponent, useStyles } from './AppBar.styles';
import { Props } from './AppBarTypes';

const AppBar = ({ open, setOpen, avatarSource }: Props) => {
    const location = useLocation();
    const routes = location.pathname.split('/').filter(Boolean);
    const theme = useTheme();
    const classes = useStyles();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    return (
        <AppBarComponent data-test-id='app-bar' position='fixed' open={open} className={classes.root}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    color='inherit'
                    aria-label='open drawer'
                    onClick={handleDrawerOpen}
                    edge='start'
                    sx={{
                        marginRight: '40px',
                        ...(open && { display: 'none' }),
                        color: theme.palette.text.secondary,
                    }}
                >
                    <MenuOpenIcon className={classes.openIcon} />
                </IconButton>
                <Breadcrumbs
                    aria-label='breadcrumb'
                    sx={{
                        fontSize: '16px',
                        '& .MuiBreadcrumbs-separator': {
                            fontSize: '16px',
                            color: theme.palette.tertiary.main,
                        },
                    }}
                >
                    {routes.map((route, index) => (
                        <Box key={snakeCase(`key-${route}`)}>
                            {routes?.length > 2 && routes.length - 1 !== index ? (
                                <NavLink className='breadcrumb-nav-link' to={route}>
                                    {capitalCase(route)}
                                </NavLink>
                            ) : (
                                <Typography variant='h4' sx={{ color: 'tertiary.main' }}>
                                    {capitalCase(route)}
                                </Typography>
                            )}
                        </Box>
                    ))}
                </Breadcrumbs>
                <Box className={classes.avatarBox}>
                    <Avatar
                        data-test-id='avatar'
                        className={classes.avatar}
                        {...(avatarSource && { src: avatarSource })}
                        sx={{ backgroundColor: 'secondary.main', color: 'tertiary.main' }}
                    >
                        {avatarSource ? null : <PersonIcon />}
                    </Avatar>
                </Box>
            </Toolbar>
        </AppBarComponent>
    );
};

AppBar.displayName = 'AppBar';

export default AppBar;
