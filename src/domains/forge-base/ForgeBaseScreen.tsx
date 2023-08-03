import { Box, Tab } from '@mui/material';
import { useModal } from 'hooks/useModal';
import { usePagination } from 'hooks/usePagination';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import BaseButton from 'ui-components/src/buttons/BaseButton';
import Heading from 'ui-components/src/heading/Heading';
import TabBar from 'ui-components/src/tab/TabBar';
import TabPanel from 'ui-components/src/tab/TabPanel';
import { ModalIds } from 'modalIds';
import ForgBaseDivisionsTab from './ForgBaseDivisionsTab';
import ForgBaseEmployeesTab from './ForgBaseEmployeesTab';
import ForgBaseTabs from './forgBaseTabs';
import { useDivisions } from './hooks/useDivisions';
import { useEmployees } from './hooks/useEmployees';
import { IDivision } from './ui-elements/ForgBaseDivisionsTableTypes';
import { IEmployee } from './ui-elements/ForgBaseEmployeesTableTypes';

export interface IEmployeeData {
    totalCount: number;
    values: IEmployee[];
}

export interface IEmployeesData {
    employees: IEmployeeData;
    isLoadingEmployees: boolean;
    isFetchingEmployees: boolean;
}
export interface IDivisionData {
    totalCount: number;
    values: IDivision[];
}

export interface IDivisionsData {
    divisions: IDivisionData;
    isLoadingDivisions: boolean;
    isFetchingDivisions: boolean;
}

export interface IPaginationData {
    page: number;
    rowsPerPage: number;
    handleChangePage: () => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>, pageNumber: number) => void;
}

const ForgBaseScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const tabIntialState = location.pathname.split('/')[2] || ForgBaseTabs.EMPLOYEES;
    const [tabId, setTabId] = useState(tabIntialState);
    const [searchParams] = useSearchParams();
    const pageNumber = searchParams.get('page') ? +searchParams.get('page')! - 1 : 0;
    const pageSize = searchParams.get('pageSize') ? +searchParams.get('pageSize')! : 10;
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination(pageNumber, pageSize);
    const {
        isLoading: isLoadingEmployees,
        data: employees,
        isFetching: isFetchingEmployees,
    } = useEmployees(page, rowsPerPage);
    const {
        isLoading: isLoadingDivisions,
        data: divisions,
        isFetching: isFetchingDivisions,
    } = useDivisions(page, rowsPerPage);
    const { handleOpenModal } = useModal();

    useEffect(() => {
        setTabId(tabIntialState);
    }, [location.pathname]);

    const handleChangeTab = (_event: SyntheticEvent, newTabValue: string) => {
        setTabId(newTabValue);
    };

    const handleClickTab = (path: string) => {
        navigate(path);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Heading title='Forg base'>Base with all information and details around Employees and Divisions</Heading>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 170px', gap: 6 }}>
                <TabBar activeTabId={tabId} handleChangeTab={handleChangeTab} tabBarName='forg-base-tabs'>
                    <Tab
                        id={`forg-base-tab-${ForgBaseTabs.EMPLOYEES}`}
                        value={ForgBaseTabs.EMPLOYEES}
                        sx={{ textTransform: 'capitalize' }}
                        label='Employees'
                        onClick={() => handleClickTab(ForgBaseTabs.EMPLOYEES)}
                    />
                    <Tab
                        value={ForgBaseTabs.DIVISIONS}
                        sx={{ textTransform: 'capitalize' }}
                        label='Divisions'
                        id={`forg-base-tab-${ForgBaseTabs.DIVISIONS}`}
                        onClick={() => handleClickTab(ForgBaseTabs.DIVISIONS)}
                    />
                </TabBar>
                {tabId === 'employees' ? (
                    <BaseButton
                        color='primary'
                        startIcon
                        label='Add Employee'
                        onClick={() => handleOpenModal(ModalIds.CREATE_EMPLOYEE)}
                    />
                ) : (
                    <BaseButton color='primary' startIcon label='Add Division' onClick={() => {}} />
                )}
            </Box>
            <TabPanel value={tabId} index={ForgBaseTabs.EMPLOYEES}>
                <ForgBaseEmployeesTab
                    employeesData={{ employees, isLoadingEmployees, isFetchingEmployees } as IEmployeesData}
                    paginationData={{ page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } as IPaginationData}
                />
            </TabPanel>
            <TabPanel value={tabId} index={ForgBaseTabs.DIVISIONS}>
                <ForgBaseDivisionsTab
                    divisionsData={{ divisions, isLoadingDivisions, isFetchingDivisions } as IDivisionsData}
                    paginationData={{ page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } as IPaginationData}
                />
            </TabPanel>
        </Box>
    );
};

ForgBaseScreen.displayName = 'ForgBaseScreen';

export default ForgBaseScreen;
