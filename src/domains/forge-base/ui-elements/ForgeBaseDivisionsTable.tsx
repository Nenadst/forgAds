import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import DropdownMenuIcon from 'ui-components/src/dropdown/DropdownMenuIcon';
import TableAvatarGroup from 'ui-components/src/table/TableAvatarGroup';
import TableLabelWithIcon from 'ui-components/src/table/TableLabelWithIcon';
import TableSearchFilter from 'ui-components/src/table/TableSearchFilter';
import TableLabelWithAvatar from 'ui-components/src/table/TableLabelWithAvatar';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { ListItemIcon, MenuItem, Typography } from '@mui/material';
import { Column, IDivision, ForgBaseDivisionsTableProps } from './ForgBaseDivisionsTableTypes';

const columns: Column[] = [
    { id: 'name', label: 'Division Name', minWidth: 180 },
    { id: 'employees', label: 'Employees', minWidth: 100 },
    {
        id: 'USERCompanies',
        label: 'User Companies',
        minWidth: 110,
    },
    {
        id: 'divisionLeader',
        label: 'Division Leader',
        minWidth: 150,
        align: 'left',
    },
    {
        id: 'divisionHeadOfPM',
        label: 'Division Head of PM',
        minWidth: 150,
        align: 'left',
    },
    {
        id: 'actions',
        label: '',
        minWidth: 70,
    },
];

const ForgBaseDivisionsTable = ({ divisionsData, paginationData }: ForgBaseDivisionsTableProps) => {
    const { palette } = useTheme();
    const { isLoadingDivisions, divisions, isFetchingDivisions } = divisionsData;
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = paginationData;

    return (
        <Paper
            sx={{
                width: '100%',
                overflow: 'auto',
                borderRadius: 2,
                boxShadow: 'none',
            }}
        >
            <TableSearchFilter title='Divisions List' />
            <TableContainer sx={{ maxHeight: 'calc(100vh - 420px)' }}>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    sx={{
                                        top: 0,
                                        minWidth: column.minWidth,
                                        background: palette.background.paper,
                                        borderBottom: `1px solid ${palette.divider}`,
                                        fontWeight: 600,
                                    }}
                                >
                                    {column.label.length > 0 && <TableLabelWithIcon>{column.label}</TableLabelWithIcon>}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoadingDivisions || isFetchingDivisions ? (
                            <TableRow>
                                <TableCell>Loading ...</TableCell>
                            </TableRow>
                        ) : (
                            divisions?.values?.map((division: IDivision) => (
                                <TableRow key={division.id}>
                                    <TableCell align='left' sx={{ borderBottom: `1px solid ${palette.divider}` }}>
                                        {division?.name ? division.name : ''}
                                    </TableCell>
                                    <TableCell align='left' sx={{ borderBottom: `1px solid ${palette.divider}` }}>
                                        {division?.numberOfEmployees ? division.numberOfEmployees : 0}
                                    </TableCell>
                                    <TableCell align='left' sx={{ borderBottom: `1px solid ${palette.divider}` }}>
                                        {division.employees?.length > 0 ? (
                                            <TableAvatarGroup avatars={division.employees} />
                                        ) : (
                                            <p>No Users</p>
                                        )}
                                    </TableCell>
                                    <TableCell align='left' sx={{ borderBottom: `1px solid ${palette.divider}` }}>
                                        <TableLabelWithAvatar label={division.divisionLead?.fullName} />
                                    </TableCell>
                                    <TableCell align='left' sx={{ borderBottom: `1px solid ${palette.divider}` }}>
                                        <TableLabelWithAvatar label={division.headOfPM?.fullName} />
                                    </TableCell>
                                    <TableCell align='left' sx={{ borderBottom: `1px solid ${palette.divider}` }}>
                                        <DropdownMenuIcon>
                                            <MenuItem onClick={() => {}}>
                                                <ListItemIcon sx={{ color: 'text.primary' }}>
                                                    <EditRoundedIcon />
                                                </ListItemIcon>
                                                <Typography>Edit Division</Typography>
                                            </MenuItem>
                                            <MenuItem onClick={() => {}}>
                                                <ListItemIcon sx={{ color: 'error.main' }}>
                                                    <DeleteOutlineRoundedIcon />
                                                </ListItemIcon>
                                                <Typography color='error'>Remove Division</Typography>
                                            </MenuItem>
                                        </DropdownMenuIcon>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                SelectProps={{
                    IconComponent: KeyboardArrowDownRoundedIcon,
                }}
                rowsPerPageOptions={[10, 25, 100]}
                component='div'
                count={divisions?.totalCount || 0}
                rowsPerPage={rowsPerPage}
                page={page > 0 && divisions?.totalCount < rowsPerPage ? 0 : page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeRowsPerPage(event, 0)}
                sx={{
                    position: 'sticky' || '-webkit-sticky',
                    bottom: 0,
                    zIndex: 11,
                    borderTop: `1px solid ${palette.divider}`,
                    '& .MuiTablePagination-selectLabel': {
                        fontWeight: 600,
                    },
                    '& .MuiTablePagination-select': {
                        fontWeight: 600,
                    },
                    '& .MuiTablePagination-displayedRows': {
                        fontWeight: 600,
                    },
                }}
            />
        </Paper>
    );
};

ForgBaseDivisionsTable.displayName = 'ForgBaseDivisionsTable';

export default ForgBaseDivisionsTable;
