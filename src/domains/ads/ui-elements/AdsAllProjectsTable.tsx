import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { ListItemIcon, MenuItem, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import DropdownMenuIcon from 'ui-components/src/dropdown/DropdownMenuIcon';
import TableLabelAvatarWithBadge from 'ui-components/src/table/TableLabelAvatarWithBadge';
import TableLabelWithAvatar from 'ui-components/src/table/TableLabelWithAvatar';
import TableLabelWithIcon from 'ui-components/src/table/TableLabelWithIcon';
import TableSearchFilter from 'ui-components/src/table/TableSearchFilter';
import { IPaginationData, IAdsData } from '../AdsScreen';
import { Column, IProject } from './AdsAllAdsTableTypes';

const columns: Column[] = [
    { id: 'account', label: 'Account', minWidth: 180 },
    { id: 'projectName', label: 'Project Name', minWidth: 100 },
    { id: 'team', label: 'Team', minWidth: 100 },
    {
        id: 'division',
        label: 'Division',
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

interface AdsAllAdsTableProps {
    adsData: IAdsData;
    paginationData: IPaginationData;
}

const AdsAllAdsTable = ({ adsData, paginationData }: AdsAllAdsTableProps) => {
    const { palette } = useTheme();
    const { isLoadingAds, ads, isFetchingAds } = adsData;
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
            <TableSearchFilter title='Ads List' />
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
                        {isLoadingAds || isFetchingAds ? (
                            <TableRow>
                                <TableCell>Loading ...</TableCell>
                            </TableRow>
                        ) : (
                            ads?.values?.map((project: IProject) => (
                                <TableRow key={project.id}>
                                    <TableCell align='left' sx={{ borderBottom: `1px solid ${palette.divider}` }}>
                                        <TableLabelAvatarWithBadge
                                            label={project.accountName ? project.accountName : ''}
                                            subLabel={project.accountTier ? project.accountTier : ''}
                                        />
                                    </TableCell>
                                    <TableCell align='left' sx={{ borderBottom: `1px solid ${palette.divider}` }}>
                                        <TableLabelWithAvatar label={project.projectName} icon={<ImageRoundedIcon />} />
                                    </TableCell>
                                    <TableCell align='left' sx={{ borderBottom: `1px solid ${palette.divider}` }}>
                                        {project.projectTeam ? project.projectTeam : 'No members'}
                                    </TableCell>
                                    <TableCell align='left' sx={{ borderBottom: `1px solid ${palette.divider}` }}>
                                        {project.divisionName ? project.divisionName : ''}
                                    </TableCell>
                                    <TableCell align='left' sx={{ borderBottom: `1px solid ${palette.divider}` }}>
                                        <TableLabelWithAvatar
                                            label={project.divisionLead ? project.divisionLead : ''}
                                            icon={<ImageRoundedIcon />}
                                        />
                                    </TableCell>
                                    <TableCell align='left' sx={{ borderBottom: `1px solid ${palette.divider}` }}>
                                        <TableLabelWithAvatar
                                            label={project.divisionHeadOfPM ? project.divisionHeadOfPM : ''}
                                            icon={<ImageRoundedIcon />}
                                        />
                                    </TableCell>
                                    <TableCell align='left' sx={{ borderBottom: `1px solid ${palette.divider}` }}>
                                        <DropdownMenuIcon>
                                            <MenuItem>
                                                <ListItemIcon sx={{ color: 'text.primary' }}>
                                                    <FavoriteRoundedIcon />
                                                </ListItemIcon>
                                                <Typography>Save Project</Typography>
                                            </MenuItem>
                                            <MenuItem>
                                                <ListItemIcon sx={{ color: 'text.primary' }}>
                                                    <EditRoundedIcon />
                                                </ListItemIcon>
                                                <Typography>Edit Project</Typography>
                                            </MenuItem>
                                            <MenuItem>
                                                <ListItemIcon sx={{ color: 'error.main' }}>
                                                    <DeleteOutlineRoundedIcon />
                                                </ListItemIcon>
                                                <Typography color='error'>Remove Project</Typography>
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
                count={ads?.totalCount || 0}
                rowsPerPage={rowsPerPage}
                page={page > 0 && ads?.totalCount < rowsPerPage ? 0 : page}
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

AdsAllAdsTable.displayName = 'AdsAllAdsTable';

export default AdsAllAdsTable;
