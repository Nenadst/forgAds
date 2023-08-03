import {
    Box,
    ListItemIcon,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme,
} from '@mui/material';
import DropdownMenuIcon from 'ui-components/src/dropdown/DropdownMenuIcon';
import TableLabelWithIcon from 'ui-components/src/table/TableLabelWithIcon';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PeopleIcon from '@mui/icons-material/People';
import { Column } from './USERRepresentativesTableTypes';

const columns: Column[] = [
    { id: 'name', label: 'Full Name', minWidth: 100 },
    { id: 'position', label: 'Position', minWidth: 100 },
    {
        id: 'email',
        label: 'Email Address',
        minWidth: 100,
    },
    {
        id: 'actions',
        label: '',
        minWidth: 70,
    },
];

const USERRepresentativesTable = ({ fields }: any) => {
    const { palette } = useTheme();

    return (
        <Paper
            sx={{
                width: '100%',
                overflow: 'auto',
                borderRadius: 2,
                boxShadow: 'none',
            }}
        >
            <TableContainer sx={{ height: '325px', overflowY: 'auto' }}>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            {columns?.map((column) => (
                                <TableCell
                                    key={column.id}
                                    sx={{
                                        top: 0,
                                        minWidth: column.minWidth,
                                        background: palette.background.paper,
                                        borderBottom: `none`,
                                        fontWeight: 600,
                                    }}
                                >
                                    {column?.label?.length > 0 && (
                                        <TableLabelWithIcon>{column?.label}</TableLabelWithIcon>
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fields.length ? (
                            // NOTE reminder for refactoring in the future of any type here.
                            fields?.map((user: any) => (
                                <TableRow key={user.id}>
                                    <TableCell align='left' sx={{ borderBottom: `none`, padding: '12px 16px' }}>
                                        {user?.fullName ? user.fullName : ''}
                                    </TableCell>
                                    <TableCell align='left' sx={{ borderBottom: `none`, padding: '12px 16px' }}>
                                        {user?.position ? user.position : ''}
                                    </TableCell>
                                    <TableCell align='left' sx={{ borderBottom: `none`, padding: '12px 16px' }}>
                                        {user?.email ? user.email : ''}
                                    </TableCell>
                                    <TableCell align='left' sx={{ borderBottom: `none`, padding: '12px 16px' }}>
                                        <DropdownMenuIcon>
                                            <MenuItem onClick={() => {}}>
                                                <ListItemIcon sx={{ color: 'text.primary' }}>
                                                    <EditRoundedIcon />
                                                </ListItemIcon>
                                                <Typography>Edit User Representative</Typography>
                                            </MenuItem>
                                            <MenuItem onClick={() => {}}>
                                                <ListItemIcon sx={{ color: 'error.main' }}>
                                                    <DeleteOutlineRoundedIcon />
                                                </ListItemIcon>
                                                <Typography color='error.main'>Remove User Representative</Typography>
                                            </MenuItem>
                                        </DropdownMenuIcon>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow
                                sx={{
                                    position: 'absolute',
                                    padding: '0 18px 18px 18px',
                                    height: '100%',
                                    width: `100%`,
                                    maxHeight: '270px',
                                    maxWidth: '630px',
                                }}
                            >
                                <TableCell
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        height: '100%',
                                        background: palette.divider,
                                    }}
                                >
                                    <Box sx={{ position: 'relative' }}>
                                        <PeopleIcon sx={{ height: '53px', width: '53px' }} />
                                        <Box
                                            component='span'
                                            sx={{
                                                position: 'absolute',
                                                bottom: '5px',
                                                right: '-15px',
                                                height: '25px',
                                                width: '25px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                background: palette.primary.contrastText,
                                                borderRadius: '50%',
                                                fontSize: '14px',
                                            }}
                                        >
                                            0
                                        </Box>
                                    </Box>
                                    <Typography>No User Representatives added yet</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default USERRepresentativesTable;
