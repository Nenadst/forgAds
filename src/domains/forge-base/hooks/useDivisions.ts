import { getDivisions } from 'lib/api';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import CacheKeyTypes from './cacheKeyTypes';
import ForgBaseTabs from '../forgBaseTabs';

const useDivisions = (page: number, rowsPerPage: number) => {
    const location = useLocation();
    const { isLoading, data, isFetching } = useQuery(
        [CacheKeyTypes.Divisions, page, rowsPerPage],
        () => getDivisions(page * rowsPerPage, rowsPerPage),
        {
            keepPreviousData: true,
            staleTime: 300000,
            enabled: !!location?.pathname?.includes(ForgBaseTabs.DIVISIONS)
        }
    );

    return { data, isLoading, isFetching };
};

export { useDivisions };
