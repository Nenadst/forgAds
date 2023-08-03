import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
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
import * as React from 'react';
import Badge from 'ui-components/src/badge/Badge';
import DropdownMenuIcon from 'ui-components/src/dropdown/DropdownMenuIcon';
import TableLabelAvatarWithBadge from 'ui-components/src/table/TableLabelAvatarWithBadge';
import TableLabelWithIcon from 'ui-components/src/table/TableLabelWithIcon';
import TableSearchFilter from 'ui-components/src/table/TableSearchFilter';
import TableAvatarGroup from 'ui-components/src/table/TableAvatarGroup';
import TableLabelWithInteractiveIcon from 'ui-components/src/table/TableLabelWithInteractiveIcon';
import { ListItemIcon, MenuItem, Typography } from '@mui/material';
import { ModalIds } from 'modalIds';
import { useModal } from 'hooks/useModal';
import Box from '@mui/material/Box/Box';
import { IUSER, Column, UsersTableProps } from './UsersTableTypes';
import { companySizes } from '../CreateUSERModalUsersInformationTab';

const columns: Column[] = [
    { id: 'USERCompany', label: 'User Company', minWidth: 210 },
    { id: 'companySize', label: 'Company Size', minWidth: 100 },
    {
        id: 'website',
        label: 'Website',
        minWidth: 180,
    },
    {
        id: 'USERRepresentatives',
        label: 'User Representatives',
        minWidth: 180,
    },
    {
        id: 'accounts',
        label: 'Accounts',
        minWidth: 150,
        align: 'left',
    },
    {
        id: 'division',
        label: 'Division',
        minWidth: 70,
    },
    {
        id: 'actions',
        label: '',
        minWidth: 70,
    },
];

const UsersTable = ({ usersData, paginationData }: UsersTableProps) => {
    const { palette } = useTheme();
    const { isLoading, users, isFetching } = usersData;
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = paginationData;
    const { handleOpenModal } = useModal();

    return (
        <Paper
            sx={{
                width: '100%',
                overflow: 'auto',
                borderRadius: 2,
                boxShadow: 'none',
            }}
        >
            <TableSearchFilter title='Users List' />
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
                        {isLoading || isFetching ? (
                            <TableRow>
                                <TableCell>Loading ...</TableCell>
                            </TableRow>
                        ) : (
                            users?.values?.map((user: IUSER) => (
                                <TableRow
                                    hover
                                    key={user.id}
                                    sx={{ border: 1, '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell sx={{ borderBottom: `1px solid ${palette.divider}` }} align='left'>
                                        <TableLabelAvatarWithBadge
                                            label={user?.companyName ? user.companyName : ''}
                                        >
                                            <Badge label={user?.location ? user.location : ''} size='sm' />
                                        </TableLabelAvatarWithBadge>
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: `1px solid ${palette.divider}` }} align='left'>
                                        {user?.companySize ? companySizes?.[user.companySize]?.name : ''}
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: `1px solid ${palette.divider}` }} align='left'>
                                        {user?.website ? user.website : ''}
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: `1px solid ${palette.divider}` }} align='left'>
                                        <Box
                                            onClick={() =>
                                                handleOpenModal(ModalIds.USER_REPRESENTATIVES_VIEW, {
                                                    key: 'USERRepresentativesId',
                                                    value: `${user.id}`,
                                                })
                                            }
                                        >
                                            <TableLabelWithInteractiveIcon
                                                label='View representatives'
                                                avatarSource=''
                                            />
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: `1px solid ${palette.divider}` }} align='left'>
                                        {user?.accounts?.length > 0 ? (
                                            // NOTE: This should be changed to user.accounts when the backend implements
                                            <TableAvatarGroup avatars={user?.accounts} />
                                        ) : (
                                            <p>Unassignee</p>
                                        )}
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: `1px solid ${palette.divider}` }} align='left'>
                                        {user?.division.name ? user.division.name : ''}
                                    </TableCell>
                                    <TableCell align='left' sx={{ borderBottom: `1px solid ${palette.divider}` }}>
                                        <DropdownMenuIcon>
                                            <MenuItem onClick={() => {}}>
                                                <ListItemIcon sx={{ color: 'text.primary' }}>
                                                    <EditRoundedIcon />
                                                </ListItemIcon>
                                                <Typography>Edit User</Typography>
                                            </MenuItem>
                                            <MenuItem onClick={() => {}}>
                                                <ListItemIcon sx={{ color: 'error.main' }}>
                                                    <DeleteOutlineRoundedIcon />
                                                </ListItemIcon>
                                                <Typography color='error.main'>Remove User</Typography>
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
                count={users?.totalCount || 0}
                rowsPerPage={rowsPerPage}
                page={users?.totalCount ? page : 0}
                onPageChange={handleChangePage}
                onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeRowsPerPage(event, 0)}
                sx={{
                    position: 'sticky' || '-webkit-sticky',
                    bottom: 0,
                    zIndex: 11,
                    backgroundColor: palette.background.paper,
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

UsersTable.displayName = 'UsersTable';

export default UsersTable;
