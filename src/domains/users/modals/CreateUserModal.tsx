import { SyntheticEvent, useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { ModalIds } from 'modalIds';
import { useLocation } from 'react-router-dom';
import Modal from 'ui-components/src/modal/Modal';
import TabBar from 'ui-components/src/tab/TabBar';
import Tab from '@mui/material/Tab';
import TabPanel from 'ui-components/src/tab/TabPanel';
import { useForm } from 'hooks/useForm';
import USERModalTabs from '../USERModalTabs';
import CreateUSERModalUsersInformationTab from '../CreateUSERModalUsersInformationTab';
import CreateUSERModalUsersRepresentativesTab, {
    USERRepresentativesFieldsTypes,
} from '../CreateUSERModalUsersRepresentativesTab';

interface USERModalProps {
    hideBackdrop: boolean;
}

export interface USERInformationData {
    companyName?: string;
    companySize?: string;
    companyLogo?: string;
    location?: string;
    website?: string;
    email?: string;
    industryAndDomain?: string;
    divisionId?: number;
    USERRepresentatives?: USERRepresentativesFieldsTypes;
}

const CreateUSERModal = ({ hideBackdrop }: USERModalProps) => {
    const location = useLocation();
    const tabIntialState = USERModalTabs.Users_INFORMATION;
    const [modalTabId, setModalTabId] = useState<string>(tabIntialState);
    const [USERInformationFormData, setUSERInformationFormData] = useState({});
    // NOTE reminder for refactoring in the future of any type here.
    const [USERRepresentativesFormData, setUSERRepresentativesFormData] = useState<
        USERRepresentativesFieldsTypes[] | []
    >([]);
    const [isDisabledUSERRepresentativesTab, setIsDisabledUSERRepresentativesTab] = useState(true);
    const { palette } = useTheme();

    const USERInformationInitialState = {
        companyName: '',
        companySize: '',
        companyLogo: '',
        website: '',
        email: '',
        divisionId: '',
        location: '',
        industryAndDomain: '',
    };

    const USERRepresentativesInitialState = {
        id: Math.random().toString(),
        fullName: '',
        position: '',
        email: '',
    };

    const {
        fields: USERInformationFields,
        onChange: onChangeUSERInformationData,
        onReset: onResetUSERInformationFormData,
        errors: USERInformationErrors,
    } = useForm(USERInformationInitialState);

    const {
        fields: USERRepresentativesFields,
        onChange: onChangeUSERRepresentativesData,
        onReset: onResetUSERRepresentativesData,
        errors: USERRepresentativesErrors,
        setErrors: setErrorsUSERRepresentativesData,
    } = useForm(USERRepresentativesInitialState);

    useEffect(() => {
        setModalTabId(tabIntialState);
    }, [location.pathname]);

    const handleChangeModalTab = (_event: SyntheticEvent, newModalTabId: string) => {
        setModalTabId(newModalTabId);
    };

    const handleChangeUSERInformationFields = (fields: USERInformationData) => {
        setUSERInformationFormData(fields);
    };

    return (
        <Modal
            title='Add User'
            modalId={ModalIds.CREATE_USER}
            hideBackdrop={hideBackdrop}
            callback={() => {
                setUSERInformationFormData({});
                onResetUSERInformationFormData();
                onResetUSERRepresentativesData();
                setModalTabId(USERModalTabs.Users_INFORMATION);
                setIsDisabledUSERRepresentativesTab(true);
                setUSERRepresentativesFormData([]);
            }}
            sx={{
                '& .MuiDialog-paper': {
                    maxWidth: '1000px !important',
                    overflowY: 'hidden',
                },
            }}
        >
            <Box
                sx={{
                    paddingInline: '24px',
                }}
            >
                <TabBar
                    activeTabId={modalTabId}
                    handleChangeTab={handleChangeModalTab}
                    tabBarName='create-user-modal-tabs'
                >
                    <Tab
                        id={`create-user-modal-tab-${USERModalTabs.Users_INFORMATION}`}
                        value={USERModalTabs.Users_INFORMATION}
                        sx={{ textTransform: 'capitalize' }}
                        label='Users Information'
                    />
                    <Tab
                        id={`create-user-modal-tab-${USERModalTabs.Users_REPRESENTATIVES}`}
                        value={USERModalTabs.Users_REPRESENTATIVES}
                        sx={{ textTransform: 'capitalize' }}
                        label='User Representatives'
                        disabled={isDisabledUSERRepresentativesTab}
                    />
                </TabBar>
            </Box>
            <TabPanel value={modalTabId} index={USERModalTabs.Users_INFORMATION}>
                <CreateUSERModalUsersInformationTab
                    setIsDisabledUSERRepresentativesTab={setIsDisabledUSERRepresentativesTab}
                    setModalTabId={setModalTabId}
                    USERInformationData={{
                        USERInformationFields,
                        onChangeUSERInformationData,
                        onResetUSERInformationFormData,
                        USERInformationErrors,
                        handleChangeUSERInformationFields,
                    }}
                />
            </TabPanel>
            <TabPanel value={modalTabId} index={USERModalTabs.Users_REPRESENTATIVES}>
                <Box
                    component='span'
                    sx={{
                        position: 'absolute',
                        left: '36.5%',
                        top: '0',
                        width: '1px',
                        height: 'calc(100% - 85.5px)',
                        background: palette.divider,
                    }}
                />
                <CreateUSERModalUsersRepresentativesTab
                    USERInformationData={{ USERInformationFormData, onResetUSERInformationFormData }}
                    setModalTabId={setModalTabId}
                    USERRepresentativesData={{
                        USERRepresentativesFormData,
                        USERRepresentativesFields,
                        onResetUSERRepresentativesData,
                        USERRepresentativesErrors,
                        setErrorsUSERRepresentativesData,
                        onChangeUSERRepresentativesData,
                        setUSERRepresentativesFormData,
                        setIsDisabledUSERRepresentativesTab,
                    }}
                />
            </TabPanel>
        </Modal>
    );
};

CreateUSERModal.displayName = 'CreateUSERModal';

export default CreateUSERModal;
