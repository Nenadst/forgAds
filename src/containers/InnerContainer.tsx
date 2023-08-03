import { Box } from '@mui/material';
import withLayout from 'hocs/Layout';
import { Outlet } from 'react-router-dom';

const InnerContainer = () => (
    <Box>
        <Outlet />
    </Box>
);

export default withLayout(InnerContainer);
