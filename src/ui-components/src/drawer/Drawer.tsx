import AllInboxIcon from '@mui/icons-material/AllInboxRounded';
import DashboardIcon from '@mui/icons-material/DashboardRounded';
import FlagIcon from '@mui/icons-material/FlagRounded';
import FolderIcon from '@mui/icons-material/FolderRounded';
import MenuOpenIcon from '@mui/icons-material/MenuOpenRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import ReportProblemIcon from '@mui/icons-material/ReportProblemRounded';
import StickyNote2RoundedIcon from '@mui/icons-material/StickyNote2Rounded';
import { Box, Icon, IconButton, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useTheme } from '@mui/material/styles';
import { ReactComponent as LogoSmall } from 'assets/images/forg-logo-small.svg';
import { ReactComponent as Logo } from 'assets/images/forg-logo.svg';
import React, { SyntheticEvent } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { routerPaths } from 'router/routerPaths';
import { DrawerComponent, DrawerHeader, useStyles } from './Drawer.styles';
import { DrawerProps } from './DrawerTypes';

const drawerLinks = [
    { id: 1, path: routerPaths.DASHBOARD, label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 7, path: routerPaths.Users, label: 'Users', icon: <PeopleAltRoundedIcon /> },
    { id: 2, path: routerPaths.Ads, label: 'Ads', icon: <AllInboxIcon /> },
    { id: 3, path: routerPaths.RISK_MANAGEMENT, label: 'Risk Management', icon: <ReportProblemIcon /> },
    { id: 4, path: routerPaths.STAKEHOLDER_MANAGEMENT, label: 'Stakeholder Mgmt', icon: <StickyNote2RoundedIcon /> },
    { id: 5, path: routerPaths.Forg_BASE, label: 'Forg Base', icon: <FolderIcon /> },
    { id: 6, path: routerPaths.HRM_EXTERNAL, label: 'HRM External', icon: <FlagIcon /> },
];

const Drawer = ({ open, setOpen }: DrawerProps) => {
    const location = useLocation();
    const { palette } = useTheme();
    const isActiveLink = (path: string) => location.pathname.includes(path);
    const classes = useStyles({ isActiveLink });

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleClickRouter = (e: SyntheticEvent, currentPath: string) => {
        if (location.pathname.includes(currentPath)) {
            e.preventDefault();
        }
    };

    return (
        <DrawerComponent variant='permanent' anchor='left' open={open}>
            <DrawerHeader>
                {open ? (
                    <>
                        <Logo />
                        <IconButton onClick={handleDrawerClose}>
                            <MenuOpenIcon sx={{ color: 'text.primary' }} />
                        </IconButton>
                    </>
                ) : (
                    <LogoSmall />
                )}
            </DrawerHeader>
            <Divider />
            <List className={classes.box}>
                {drawerLinks.map((link) => (
                    <React.Fragment key={link.id}>
                        <NavLink
                            to={link.path}
                            className={classes.link}
                            onClick={(e) => handleClickRouter(e, link.path)}
                        >
                            {isActiveLink(link.path) && (
                                <Box
                                    className={classes.indicator}
                                    sx={{
                                        backgroundColor: palette.primary.main,
                                    }}
                                />
                            )}
                            <ListItem
                                disablePadding
                                sx={isActiveLink(link.path) ? { backgroundColor: 'secondary.main', zIndex: -1 } : {}}
                            >
                                <ListItemButton disableRipple className={classes.btn}>
                                    <Icon
                                        className={classes.defaultIcon}
                                        sx={{
                                            display: 'flex',
                                            color: isActiveLink(link.path)
                                                ? palette.primary.main
                                                : palette.tertiary?.main,
                                        }}
                                    >
                                        {link.icon}
                                    </Icon>
                                    <Typography
                                        variant={isActiveLink(link.path) ? 'drawerLinkActive' : 'drawerLink'}
                                        sx={{
                                            color: isActiveLink(link.path)
                                                ? palette.primary.main
                                                : palette.quatinary?.main,
                                        }}
                                    >
                                        {link.label}
                                    </Typography>
                                </ListItemButton>
                            </ListItem>
                        </NavLink>
                        {link.id === 2 || (link.id === 4 && drawerLinks.length !== link.id) ? (
                            <Divider sx={{ flex: link.id === 4 ? 1 : 0, marginBlock: 7 }} />
                        ) : null}
                    </React.Fragment>
                ))}
            </List>
        </DrawerComponent>
    );
};

Drawer.displayName = 'Drawer';
export default Drawer;
