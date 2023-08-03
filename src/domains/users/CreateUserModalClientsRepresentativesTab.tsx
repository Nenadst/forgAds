import { Box, DialogActions, DialogContent, TextField } from '@mui/material';
import { useModal } from 'hooks/useModal';
import { ModalIds } from 'modalIds';
import BaseButton from 'ui-components/src/buttons/BaseButton';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { validateInfo } from 'hooks/validateInfo';
import USERRepresentativesTable from './ui-elements/USERRepresentativesTable';
import { USERInformationData } from './modals/CreateUSERModal';
import { useCreationUSER } from './hooks/useCreationUSER';
import USERModalTabs from './USERModalTabs';

export interface USERRepresentativesFieldsTypes {
    fullName: string;
    email: string;
    position: string;
    id: string;
}

interface USERRepresentativesDataProps {
    USERRepresentativesFields: USERRepresentativesFieldsTypes;
    USERRepresentativesErrors: USERRepresentativesFieldsTypes;
    onResetUSERRepresentativesData: () => void;
    onChangeUSERRepresentativesData: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setErrorsUSERRepresentativesData: (value: {}) => void;
    USERRepresentativesFormData: USERRepresentativesFieldsTypes[];
    setUSERRepresentativesFormData: (
        value:
            | USERRepresentativesFieldsTypes[]
            | ((prevState: USERRepresentativesFieldsTypes[]) => USERRepresentativesFieldsTypes[])
    ) => void;

    setIsDisabledUSERRepresentativesTab: Dispatch<SetStateAction<boolean>>;
}

interface USERInformationDataProps {
    USERInformationFormData: USERInformationData;
    onResetUSERInformationFormData: () => void;
}

interface USERModalDataProps {
    USERInformationData: USERInformationDataProps;
    USERRepresentativesData: USERRepresentativesDataProps;
    setModalTabId: (value: string) => void;
}

const CreateUSERModalUsersRepresentativesTab = ({
    USERInformationData,
    USERRepresentativesData,
    setModalTabId,
}: USERModalDataProps) => {
    const { handleCloseModal } = useModal();

    const {
        USERRepresentativesFields: fields,
        onResetUSERRepresentativesData,
        USERRepresentativesErrors: errors,
        setErrorsUSERRepresentativesData: setErrors,
        onChangeUSERRepresentativesData: onChange,
        USERRepresentativesFormData: formUSERRepresentativesData,
        setUSERRepresentativesFormData,
        setIsDisabledUSERRepresentativesTab,
    } = USERRepresentativesData;

    const { USERInformationFormData, onResetUSERInformationFormData } = USERInformationData;

    const { mutate } = useCreationUSER();

    // NOTE reminder for refactoring in the future of any type here.
    const handleAddUSERRepresentatives = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        // NOTE reminder for refactoring in the future of any type here.
        setUSERRepresentativesFormData((prevState: USERRepresentativesFieldsTypes[]) => [...prevState, fields]);
        onResetUSERRepresentativesData();
    };

    const formUSERData = {
        ...USERInformationFormData,
        USERRepresentatives: formUSERRepresentativesData,
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (Object.keys(validateInfo(fields))?.length) {
            setErrors(validateInfo(fields));
            return;
        }

        try {
            await mutate(formUSERData);
            onResetUSERInformationFormData();
            onResetUSERRepresentativesData();
            setModalTabId(USERModalTabs.Users_INFORMATION);
            setIsDisabledUSERRepresentativesTab(true);
            setUSERRepresentativesFormData([]);
            handleCloseModal(ModalIds.CREATE_USER);
        } catch (error) {
            // TODO: Error handling of the form
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex', width: '1000px' }}>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        flexBasis: '37%',
                    }}
                >
                    <DialogContent
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px',
                            '& .MuiDialogContent-root': {
                                paddingInline: '24px !important',
                            },
                        }}
                    >
                        <TextField
                            type='text'
                            name='fullName'
                            label='Full Name*'
                            variant='outlined'
                            value={fields.fullName || ''}
                            onChange={onChange}
                            error={!!errors.fullName}
                            helperText={errors.fullName}
                        />
                        <TextField
                            type='text'
                            name='position'
                            label='Position in Company*'
                            variant='outlined'
                            value={fields?.position || ''}
                            onChange={onChange}
                            error={!!errors.position}
                            helperText={errors.position}
                        />
                        <TextField
                            type='text'
                            name='email'
                            label='Email Address*'
                            variant='outlined'
                            value={fields?.email || ''}
                            onChange={onChange}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <BaseButton
                                onClick={handleAddUSERRepresentatives}
                                color='primary'
                                label='Add User Representative'
                                startIcon
                            />
                        </Box>
                    </DialogContent>
                </Box>
                <Box sx={{ flexBasis: '63%' }}>
                    <USERRepresentativesTable fields={formUSERRepresentativesData} />
                </Box>
            </Box>
            <DialogActions sx={{ p: 6 }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <BaseButton
                        color='secondary'
                        label='Cancel'
                        onClick={() => {
                            onResetUSERInformationFormData();
                            onResetUSERRepresentativesData();
                            setUSERRepresentativesFormData([]);
                            handleCloseModal(ModalIds.CREATE_USER);
                        }}
                    />
                    <BaseButton
                        color='primary'
                        label='Create User'
                        type='button'
                        onClick={(event) => handleSubmit(event)}
                    />
                </Box>
            </DialogActions>
        </>
    );
};

export default CreateUSERModalUsersRepresentativesTab;
