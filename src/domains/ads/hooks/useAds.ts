import { getAds } from "lib/api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import AdsTabs from "../adsTabs";
import CacheKeyTypes from "./cacheKeyTypes";

const useAds = (accountId: string, page: number, rowsPerPage: number) => {
    const location = useLocation();
    const {
        isLoading,
        data,
        isFetching,
    } = useQuery([CacheKeyTypes.AllAds, page, rowsPerPage], () => getAds(accountId, page * rowsPerPage, rowsPerPage), {
        keepPreviousData: true,
        staleTime: 300000,
        enabled: !!location?.pathname?.includes(AdsTabs.ALL_Ads)
    });

    return { data, isLoading, isFetching };
};

export { useAds };
