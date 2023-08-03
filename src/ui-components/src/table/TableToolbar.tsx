import { Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';

const TableToolbar = styled(Toolbar)(() => ({
    color: 'black',
    fontSize: '16px',
    '@media(min-width:600px)': {
        paddingLeft: '16px',
    },
}));

TableToolbar.displayName = 'TableToolbar';

export default TableToolbar;
