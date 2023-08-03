import { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '../drawer/Drawer';
import AppBar from '../appbar/AppBar';
import { LayoutProps } from './LayoutTypes';

const Layout = ({ children }: LayoutProps) => {
    const [open, setOpen] = useState(true);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box>
                <AppBar open={open} setOpen={setOpen} />
                <Drawer open={open} setOpen={setOpen} />
            </Box>
            {/* TODO: integration of content */}
            <Box component='main' sx={{ position: 'relative', width: '100%', top: 100, padding: '36px' }}>
                {children}
            </Box>
        </Box>
    );
};

Layout.displayName = 'Layout';

export default Layout;
