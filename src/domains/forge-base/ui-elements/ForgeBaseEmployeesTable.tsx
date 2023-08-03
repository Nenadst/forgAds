import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { ListItemIcon, MenuItem, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import { useModal } from 'hooks/useModal';
import { ModalIds } from 'modalIds';
import * as React from 'react';
import DropdownMenuIcon from 'ui-components/src/dropdown/DropdownMenuIcon';
import TableAvatarGroup from 'ui-components/src/table/TableAvatarGroup';
import TableLabelWithAvatar from 'ui-components/src/table/TableLabelWithAvatar';
import TableLabelWithIcon from 'ui-components/src/table/TableLabelWithIcon';
import TableSearchFilter from 'ui-components/src/table/TableSearchFilter';
import { IEmployeesData, IPaginationData } from '../ForgBaseScreen';
import ForgBaseEmployeesPositions from './ForgBaseEmployeesPositions';
import { Column, IEmployee } from './ForgBaseEmployeesTableTypes';

const columns: Column[] = [
    { id: 'name', label: 'Employee Name', minWidth: 180 },
    { id: 'positions', label: 'Job Title', minWidth: 100 },
    { id: 'division', label: 'Division', minWidth: 100 },
    {
        id: 'email',
        label: 'Email Address',
        minWidth: 110,
    },
    {
        id: 'ads',
        label: 'Ads',
        minWidth: 150,
        align: 'left',
    },
    {
        id: 'actions',
        label: '',
        minWidth: 70,
    },
];

interface ForgBaseEmployeesTableProps {
    employeesData: IEmployeesData;
    paginationData: IPaginationData;
}

const ForgBaseEmployeesTable = ({ employeesData, paginationData }: ForgBaseEmployeesTableProps) => {
    const { palette } = useTheme();
    const { handleOpenModal } = useModal();
    const { isLoadingEmployees, employees, isFetchingEmployees } = employeesData;
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
            <TableSearchFilter title='Employees List' />
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
                        {isLoadingEmployees || isFetchingEmployees ? (
                            <TableRow>
                                <TableCell>Loading ...</TableCell>
                            </TableRow>
                        ) : (
                            employees?.values?.map((employee: IEmployee) => (
                                <TableRow key={employee.id}>
                                    <TableCell align='left' sx={{ borderBottom: `1px solid ${palette.divider}` }}>
                                        <TableLabelWithAvatar label={employee?.fullName ? employee.fullName : ''} />
                                    </TableCell>
                                    <TableCell align='left' sx={{ borderBottom: `1px solid ${palette.divider}` }}>
                                        {employee.positions?.map(({ id, name }: any) => (
                                            <ForgBaseEmployeesPositions name={name} key={`${id}-${name}`} />
                                        ))}
                                    </TableCell>
                                    <TableCell align='left' sx={{ borderBottom: `1px solid ${palette.divider}` }}>
                                        {employee?.divisionName ? employee.divisionName : ''}
                                    </TableCell>
                                    <TableCell
                                        align='left'
                                        sx={{
                                            borderBottom: `1px solid ${palette.divider}`,
                                            color: 'primary.main',
                                            textDecoration: 'underline',
                                        }}
                                    >
                                        {employee?.email ? employee.email : ''}
                                    </TableCell>
                                    <TableCell align='left' sx={{ borderBottom: `1px solid ${palette.divider}` }}>
                                        {employee.ads?.length > 0 ? (
                                            <TableAvatarGroup avatars={employee.ads} />
                                        ) : (
                                            <p>Unassignee</p>
                                        )}
                                    </TableCell>
                                    <TableCell align='left' sx={{ borderBottom: `1px solid ${palette.divider}` }}>
                                        <DropdownMenuIcon>
                                            <MenuItem
                                                onClick={() => {
                                                    handleOpenModal(ModalIds.UPDATE_EMPLOYEE, {
                                                        key: 'employeeId',
                                                        value: `${employee.id}`,
                                                    });
                                                }}
                                                sx={{ color: 'primary' }}
                                            >
                                                <ListItemIcon sx={{ color: 'text.primary' }}>
                                                    <EditRoundedIcon />
                                                </ListItemIcon>
                                                <Typography>Edit Employee</Typography>
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => {
                                                    handleOpenModal(ModalIds.DELETE_EMPLOYEE, {
                                                        key: 'employeeId',
                                                        value: `${employee.id}`,
                                                    });
                                                }}
                                                sx={{ color: 'primary' }}
                                            >
                                                <ListItemIcon sx={{ color: 'error.main' }}>
                                                    <DeleteOutlineRoundedIcon />
                                                </ListItemIcon>
                                                <Typography color='error.main'>Remove Employee</Typography>
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
                count={employees?.totalCount ? employees.totalCount : 0}
                rowsPerPage={rowsPerPage}
                page={page > 0 && employees?.totalCount < rowsPerPage ? 0 : page}
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

ForgBaseEmployeesTable.displayName = 'ForgBaseEmployeesTable';

export default ForgBaseEmployeesTable;
