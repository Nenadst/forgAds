import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import { Box, Typography } from '@mui/material';
import IconButton from 'ui-components/src/buttons/IconButton';
import TableToolbar from './TableToolbar';

interface TableSearchFilterProps {
    title?: string;
}

const TableSearchFilter = ({ title }: TableSearchFilterProps) => (
    <TableToolbar
        data-test-id='table-toolbar'
        color='background.paper'
        sx={{
            display: 'flex',
            bgcolor: 'background.paper',
            justifyContent: 'space-between',
            position: 'sticky' || '-webkit-sticky',
            top: 0,
            padding: '26px',
            zIndex: 11,
            flexGrow: 1,
        }}
    >
        <Typography variant='tableTitle'>{title}</Typography>
        <Box sx={{ display: 'grid', gridAutoFlow: 'column', gap: '12px' }}>
            <IconButton data-test-id='table-search-button' color='secondary'>
                <SearchRoundedIcon sx={{ color: 'primary' }} />
            </IconButton>
            <IconButton data-test-id='table-filter-button' color='secondary'>
                <SortRoundedIcon sx={{ color: 'primary' }} />
            </IconButton>
        </Box>
    </TableToolbar>
);

TableSearchFilter.displayName = 'TableSearchFilter';

export default TableSearchFilter;
