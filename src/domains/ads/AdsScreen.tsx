import { Box, Tab } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import BaseButton from 'ui-components/src/buttons/BaseButton';
import Heading from 'ui-components/src/heading/Heading';
import TabBar from 'ui-components/src/tab/TabBar';
import TabPanel from 'ui-components/src/tab/TabPanel';
import { usePagination } from 'hooks/usePagination';
import AdsAllAdsTab from './AdsAllAdsTab';
import AdsSavedAdsTab from './AdsSavedAdsTab';
import AdsTabs from './adsTabs';
import { useAds } from './hooks/useAds';
import { IProject } from './ui-elements/AdsAllAdsTableTypes';

export interface IProjectData {
    totalCount: number;
    values: IProject[];
}

export interface IAdsData {
    ads: IProjectData;
    isLoadingAds: boolean;
    isFetchingAds: boolean;
}

export interface IPaginationData {
    page: number;
    rowsPerPage: number;
    handleChangePage: () => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>, pageNumber: number) => void;
}

const AdsScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const tabIntialState = location.pathname.split('/')[2] || AdsTabs.ALL_Ads;
    const [tabId, setTabId] = useState(tabIntialState);
    const [searchParams] = useSearchParams();
    const pageNumber = searchParams.get('page') ? +searchParams.get('page')! - 1 : 0;
    const pageSize = searchParams.get('pageSize') ? +searchParams.get('pageSize')! : 10;
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination(pageNumber, pageSize);
    const {
        isLoading: isLoadingAds,
        data: ads,
        isFetching: isFetchingAds,
    } = useAds('', page, rowsPerPage);

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
            <Heading title='Ads'>List of all available ads inside Forg</Heading>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 170px', gap: 6 }}>
                <TabBar activeTabId={tabId} handleChangeTab={handleChangeTab} tabBarName='ads-tabs'>
                    <Tab
                        id={`ads-tab-${AdsTabs.ALL_Ads}`}
                        value={AdsTabs.ALL_Ads}
                        sx={{ textTransform: 'capitalize' }}
                        label='All ads'
                        onClick={() => handleClickTab(AdsTabs.ALL_Ads)}
                    />
                    <Tab
                        value={AdsTabs.SAVED_Ads}
                        sx={{ textTransform: 'capitalize' }}
                        label='Saved ads'
                        id={`ads-tab-${AdsTabs.SAVED_Ads}`}
                        onClick={() => handleClickTab(AdsTabs.SAVED_Ads)}
                    />
                </TabBar>
                {tabId === AdsTabs.ALL_Ads ? (
                    <BaseButton color='primary' startIcon label='New project' />
                ) : (
                    <BaseButton color='primary' startIcon label='Saved project' onClick={() => {}} />
                )}
            </Box>
            <TabPanel value={tabId} index={AdsTabs.ALL_Ads}>
                <AdsAllAdsTab
                    adsData={{ ads, isLoadingAds, isFetchingAds } as IAdsData}
                    paginationData={{ page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } as IPaginationData}
                />
            </TabPanel>
            <TabPanel value={tabId} index={AdsTabs.SAVED_Ads}>
                <AdsSavedAdsTab />
            </TabPanel>
        </Box>
    );
};

AdsScreen.displayName = 'ForgBaseScreen';

export default AdsScreen;
