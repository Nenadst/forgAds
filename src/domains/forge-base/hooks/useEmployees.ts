import { getEmployees } from "lib/api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import ForgBaseTabs from "../forgBaseTabs";
import CacheKeyTypes from "./cacheKeyTypes";

const useEmployees = (page: number, rowsPerPage: number) => {
    const location = useLocation();
    const {
        isLoading,
        data,
        isFetching,
    } = useQuery([CacheKeyTypes.Employees, page, rowsPerPage], () => getEmployees(page * rowsPerPage, rowsPerPage), {
        keepPreviousData: true,
        staleTime: 300000,
        enabled: !!location?.pathname?.includes(ForgBaseTabs.EMPLOYEES)
    });

    return { data, isLoading, isFetching };
};

export { useEmployees };
