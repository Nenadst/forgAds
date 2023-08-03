import { getUsers } from 'lib/api';
import { useQuery } from 'react-query';
import CacheKeyTypes from './cacheKeyTypes';

const useUsers = (page: number, rowsPerPage: number) => {
    const { isLoading, data, isFetching } = useQuery(
        [CacheKeyTypes.Users, page, rowsPerPage],
        () => getUsers(page * rowsPerPage, rowsPerPage),
        {
            keepPreviousData: true,
            staleTime: 300000,
        }
    );

    return { data, isLoading, isFetching };
};

export { useUsers };
