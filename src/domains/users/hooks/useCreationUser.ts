import { createUSER } from 'lib/api';
import { useMutation, useQueryUSER } from 'react-query';
import CacheKeyTypes from './cacheKeyTypes';

const useCreationUSER = () => {
    const queryUSER = useQueryUSER();
    const { mutate } = useMutation(createUSER, {
        onSuccess: () => queryUSER.invalidateQueries(CacheKeyTypes.Users),
    });

    return { mutate };
};

export { useCreationUSER };
