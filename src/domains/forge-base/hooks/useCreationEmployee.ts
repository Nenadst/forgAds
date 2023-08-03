import { createEmployee } from "lib/api";
import { useMutation, useQueryUSER } from "react-query";
import CacheKeyTypes from "./cacheKeyTypes";

const useCreationEmployee = () => {
    const queryUSER = useQueryUSER();
    const { mutate } = useMutation(createEmployee, {
        onSuccess: () => queryUSER.invalidateQueries(CacheKeyTypes.Employees),
    });

    return { mutate };
};

export { useCreationEmployee };
