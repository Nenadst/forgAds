import { getEmployee } from "lib/api";
import { useQuery } from "react-query";
import CacheKeyTypes from "./cacheKeyTypes";

const useEmployee = (employeeId: number) => {
    const {
        isLoading,
        data,
        isFetching,
    } = useQuery([CacheKeyTypes.Employees, employeeId], () => getEmployee(employeeId), {
        cacheTime: 300000,
        enabled: !!employeeId,
        refetchOnMount: true,
    });

    return { data, isLoading, isFetching };
};

export { useEmployee };
