import { removeEmployee } from "lib/api";
import { useMutation, useQueryUSER } from "react-query";
import CacheKeyTypes from "./cacheKeyTypes";

const useDeleteEmployee = (employeeId: number) => {
    const queryUSER = useQueryUSER();
    const { mutate } = useMutation(() => removeEmployee(employeeId), {
        onSuccess: () => queryUSER.invalidateQueries(CacheKeyTypes.Employees),
    });

    return { mutate };
};

export { useDeleteEmployee };
