import { useLocation, useSearchParams } from "react-router-dom";

const useModal = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { search } = useLocation();

    interface IActiveItem {
        [key: string]: string;
    }

    const handleOpenModal = (activeModalId: string, activeItem?: IActiveItem) => {
        if (!activeModalId || search.includes(activeModalId)) return;

        if (activeItem?.key && activeItem?.value) {
            searchParams.set(activeItem?.key, activeItem?.value);
            setSearchParams(searchParams);
        }

        if (search.includes('activeModalId')) {
            searchParams.append('activeModalId', activeModalId);
            setSearchParams(searchParams);
            return;
        }
        searchParams.set('activeModalId', activeModalId);
        setSearchParams(searchParams);
    }

    const handleCloseModal = (activeModalId: string, activeItem?: IActiveItem) => {
        if (!activeModalId) return;

        const params = search?.split('?')[1]?.split('&');

        if (searchParams.getAll('activeModalId').length === 1) {
            searchParams.delete('activeModalId');
            searchParams.delete(activeItem?.key!);
            setSearchParams(searchParams);
            return;
        }

        const filteredActiveModalIdParams = params?.filter(param => param.includes('activeModalId') && !param.includes(activeModalId))

        filteredActiveModalIdParams?.forEach((filteredParam, index) => {
            const splitedFilteredParam = filteredParam.split('=')
            const [key, value] = splitedFilteredParam;
            if (index > 0) {
                searchParams.append(key, value);
                setSearchParams(searchParams);
                return
            }
            searchParams.set(key, value);
            setSearchParams(searchParams);
        });
    }

    return { handleOpenModal, handleCloseModal }
}

export { useModal };
