import { Box } from '@mui/material';
import { usePagination } from 'hooks/usePagination';
import { useSearchParams } from 'react-router-dom';
import Heading from 'ui-components/src/heading/Heading';
import BaseButton from 'ui-components/src/buttons/BaseButton';
import { useModal } from 'hooks/useModal';
import { ModalIds } from 'modalIds';
import UsersTable from './ui-elements/UsersTable';
import { useUsers } from './hooks/useUsers';
import { IUSER } from './ui-elements/UsersTableTypes';

export interface IUSERData {
    totalCount: number;
    values: IUSER[];
}

export interface IUsersData {
    users: IUSERData;
    isLoading: boolean;
    isFetching: boolean;
}

export interface IPaginationData {
    page: number;
    rowsPerPage: number;
    handleChangePage: () => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>, pageNumber: number) => void;
}

const UsersScreen = () => {
    const [searchParams] = useSearchParams();
    const pageNumber = searchParams.get('page') ? +searchParams.get('page')! - 1 : 0;
    const pageSize = searchParams.get('pageSize') ? +searchParams.get('pageSize')! : 10;
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination(
        'pageUsers',
        pageNumber,
        pageSize
    );
    const { isLoading, data: users, isFetching } = useUsers(page, rowsPerPage);
    const { handleOpenModal } = useModal();

    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Heading title='Users'>Information and details around Users, Accounts and Ads</Heading>
                <BaseButton
                    color='primary'
                    startIcon
                    label='Add User'
                    sx={{ height: '40px', width: '142px', textTransform: 'initial' }}
                    onClick={() => handleOpenModal(ModalIds.CREATE_USER)}
                />
            </Box>
            <UsersTable
                usersData={{ users, isLoading, isFetching } as IUsersData}
                paginationData={{ page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } as IPaginationData}
            />
        </Box>
    );
};

UsersScreen.displayName = 'UsersScreen';

export default UsersScreen;
