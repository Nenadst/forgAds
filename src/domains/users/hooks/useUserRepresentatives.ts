import { getUSERRepresentatives } from 'lib/api';
import { useQuery } from 'react-query';
import CacheKeyTypes from './cacheKeyTypes';

const useUSERRepresentatives = (USERId: number, page: number, rowsPerPage: number) => {
    const { isLoading, data, isFetching } = useQuery(
        [CacheKeyTypes.USERRepresentatives, USERId, page, rowsPerPage],
        () => getUSERRepresentatives(USERId, page * rowsPerPage, rowsPerPage),
        {
            cacheTime: 300000,
            enabled: !!USERId,
            refetchOnMount: true,
        }
    );

    return { data, isLoading, isFetching };
};

export { useUSERRepresentatives };
