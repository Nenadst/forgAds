import {
    Box,
    Divider,
    ListItemIcon,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    useTheme,
} from '@mui/material';
import { usePagination } from 'hooks/usePagination';
import { ModalIds } from 'modalIds';
import Badge from 'ui-components/src/badge/Badge';
import { useSearchParams } from 'react-router-dom';
import DropdownMenuIcon from 'ui-components/src/dropdown/DropdownMenuIcon';
import Modal from 'ui-components/src/modal/Modal';
import TableLabelWithIcon from 'ui-components/src/table/TableLabelWithIcon';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

import TableLabelAvatarWithBadge from 'ui-components/src/table/TableLabelAvatarWithBadge';
import TableSearchFilter from 'ui-components/src/table/TableSearchFilter';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import IconButton from 'ui-components/src/buttons/IconButton';
import { useModal } from 'hooks/useModal';
import { useUSERRepresentatives } from '../hooks/useUSERRepresentatives';

interface Column {
    id: 'name' | 'position' | 'email' | 'Adsponsor' | 'usersCompany' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left';
}

const columns: Column[] = [
    { id: 'name', label: 'Full Name', minWidth: 150 },
    { id: 'position', label: 'Position', minWidth: 170 },
    {
        id: 'email',
        label: 'Email Address',
        minWidth: 100,
    },
    {
        id: 'Adsponsor',
        label: 'Project Sponsor',
        minWidth: 190,
    },
    {
        id: 'usersCompany',
        label: 'Users Company',
        minWidth: 150,
    },
    {
        id: 'actions',
        label: '',
        minWidth: 70,
    },
];

interface USERModalProps {
    hideBackdrop: boolean;
}

interface IUsersRepresentatives {
    id: string;
    fullName: string;
    email: string;
    position: string;
    companyName: string;
    location: string;
}

const USERRepresentativesViewModal = ({ hideBackdrop }: USERModalProps) => {
    const { handleCloseModal } = useModal();
    const [searchParams] = useSearchParams();
    const USERId = searchParams.get('USERRepresentativesId');
    const pageNumber = searchParams.get('page') ? +searchParams.get('page')! - 1 : 0;
    const pageSize = searchParams.get('pageSize') ? +searchParams.get('pageSize')! : 10;
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination(
        'pageUSERRepresentatives',
        pageNumber,
        pageSize
    );
    const {
        isLoading,
        data: USERRepresentatives,
        isFetching,
    } = useUSERRepresentatives(+USERId!, page, rowsPerPage);
    const { palette } = useTheme();

    return (
        <Modal
            modalId={ModalIds.USER_REPRESENTATIVES_VIEW}
            hideBackdrop={hideBackdrop}
            callback={() => {
                handleCloseModal(ModalIds.USER_REPRESENTATIVES_VIEW, {
                    key: 'USERRepresentativesId',
                });
            }}
            sx={{
                '& .MuiDialog-paper': {
                    maxWidth: '1100px !important',
                    minWidth: '1100px !important',
                    padding: '20px',
                    overflowY: 'hidden',
                },
            }}
        >
            <Paper
                sx={{
                    width: '100%',
                    borderRadius: 2,
                    boxShadow: 'none',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TableSearchFilter title='Users Representatives' />
                    <Box sx={{ height: '48px', marginRight: '12px' }}>
                        <Divider
                            orientation='vertical'
                            flexItem
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                height: '48px',
                                borderColor: `${palette.divider}`,
                            }}
                        />
                    </Box>
                    <IconButton
                        color='primary'
                        sx={{ height: '48px', width: '40px', fontSize: '30px', textTransform: 'initial' }}
                    >
                        <AddRoundedIcon />
                    </IconButton>
                </Box>
                <TableContainer sx={{ height: { xl: '600px', md: '400px' }, overflow: 'auto' }}>
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
                            {isLoading || isFetching ? (
                                <TableRow>
                                    <TableCell>Loading ...</TableCell>
                                </TableRow>
                            ) : USERRepresentatives?.values?.length ? (
                                USERRepresentatives?.values?.map((USERRepresentative: IUsersRepresentatives) => (
                                    <TableRow key={USERRepresentative.id}>
                                        <TableCell align='left' sx={{ borderBottom: `none` }}>
                                            {USERRepresentative?.fullName ? USERRepresentative.fullName : ''}
                                        </TableCell>
                                        <TableCell align='left' sx={{ borderBottom: `none` }}>
                                            {USERRepresentative?.position ? USERRepresentative.position : ''}
                                        </TableCell>
                                        <TableCell align='left' sx={{ borderBottom: `none` }}>
                                            {USERRepresentative?.email ? USERRepresentative.email : ''}
                                        </TableCell>
                                        <TableCell align='left' sx={{ borderBottom: `none` }}>
                                            No
                                        </TableCell>
                                        <TableCell align='left' sx={{ borderBottom: `none` }}>
                                            <TableLabelAvatarWithBadge
                                                label={
                                                    USERRepresentative?.companyName
                                                        ? USERRepresentative.companyName
                                                        : ''
                                                }
                                            >
                                                <Badge
                                                    label={
                                                        USERRepresentative?.location
                                                            ? USERRepresentative.location
                                                            : ''
                                                    }
                                                    size='sm'
                                                />
                                            </TableLabelAvatarWithBadge>
                                        </TableCell>
                                        <TableCell align='left' sx={{ borderBottom: `none` }}>
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
                                                    <Typography color='error.main'>
                                                        Remove User Representative
                                                    </Typography>
                                                </MenuItem>
                                            </DropdownMenuIcon>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : null}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    SelectProps={{
                        IconComponent: KeyboardArrowDownRoundedIcon,
                    }}
                    rowsPerPageOptions={[10, 25, 100]}
                    component='div'
                    count={USERRepresentatives?.totalCount ? USERRepresentatives.totalCount : 0}
                    rowsPerPage={rowsPerPage}
                    page={page > 0 && USERRepresentatives?.totalCount < rowsPerPage ? 0 : page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeRowsPerPage(event, 0)
                    }
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
        </Modal>
    );
};

USERRepresentativesViewModal.displayName = 'USERRepresentativesViewModal';

export default USERRepresentativesViewModal;
