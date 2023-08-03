import { useMutation, useQueryUSER } from "react-query";
import { updateEmployee } from "lib/api";
import CacheKeyTypes from "./cacheKeyTypes";

const useUpdateEmployee = (employeeId: number, employeeData: any) => {
    const queryUSER = useQueryUSER();
    const { mutate, mutateAsync } = useMutation(() => updateEmployee(employeeId, employeeData), {
        onSuccess: () => queryUSER.invalidateQueries(CacheKeyTypes.Employees),
    });

    return { mutate, mutateAsync };
};

export { useUpdateEmployee };
