import { Box, DialogActions, Divider, MenuItem, TextField } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import { useForm } from 'hooks/useForm';
import { useModal } from 'hooks/useModal';
import { validateInfo } from 'hooks/validateInfo';
import { getDivisions, getPositions } from 'lib/api';
import { ModalIds } from 'modalIds';
import { useQuery } from 'react-query';
import BaseButton from 'ui-components/src/buttons/BaseButton';
import Modal from 'ui-components/src/modal/Modal';
import { useCallback } from 'react';
import CacheKeyTypes from '../hooks/cacheKeyTypes';
import { useCreationEmployee } from '../hooks/useCreationEmployee';

interface CreateEmployeeModalProps {
    hideBackdrop: boolean;
}

const CreateEmployeeModal = ({ hideBackdrop }: CreateEmployeeModalProps) => {
    const { handleCloseModal } = useModal();
    const { data: positions } = useQuery([CacheKeyTypes.Positions], () => getPositions(), {
        keepPreviousData: true,
        staleTime: 300000,
    });
    // NOTE: hardcoded to getAll division always, this should be temporary solution, while BE create endpoint for divisions list
    const { data: divisionsList } = useQuery([CacheKeyTypes.Divisions], () => getDivisions(0, 1000), {
        keepPreviousData: true,
        staleTime: 300000,
    });
    const initialState = {
        fullName: '',
        email: '',
        positions: '',
        divisionId: '',
    };
    const { fields, onChange, onReset, errors, setErrors } = useForm(initialState);
    const { mutate } = useCreationEmployee();

    const handleSubmit = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            if (Object.keys(validateInfo(fields))?.length) {
                setErrors(validateInfo(fields));
                return;
            }

            const formData = {
                employee: {
                    fullName: fields.fullName,
                    email: fields.email,
                    positions: fields.positions !== '' && [+fields.positions],
                    ...(fields?.divisionId !== '' ? { divisionId: +fields.divisionId } : null),
                },
            };

            try {
                await mutate(formData);
                onReset();
                handleCloseModal(ModalIds.CREATE_EMPLOYEE);
            } catch (error) {
                // TODO: Error handling of the form
            }
        },
        [fields?.fullName, fields?.email, fields?.positions, fields?.divisionId]
    );

    const isSubmitButtonDisabled = !fields.fullName || !fields.email || !fields.positions;

    return (
        <Modal
            title='Add Employee'
            modalId={ModalIds.CREATE_EMPLOYEE}
            hideBackdrop={hideBackdrop}
            callback={() => {
                onReset();
            }}
        >
            <Box
                component='form'
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
                noValidate
                autoComplete='off'
                onSubmit={(event) => handleSubmit(event)}
            >
                <DialogContent
                    sx={{
                        position: 'relative',
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
                        value={fields?.fullName ? fields.fullName : ''}
                        onChange={onChange}
                        error={!!errors.fullName}
                        helperText={errors.fullName}
                    />
                    <TextField
                        name='positions'
                        select
                        label='Job Title*'
                        value={fields?.positions ? fields.positions : ''}
                        onChange={onChange}
                    >
                        {positions?.length
                            ? (positions || [])?.map((position: any) =>
                                  position?.name ? (
                                      <MenuItem key={position.id} value={position.id || ''}>
                                          {position.name}
                                      </MenuItem>
                                  ) : null
                              )
                            : null}
                    </TextField>
                    <TextField
                        type='email'
                        name='email'
                        label='Email Address*'
                        variant='outlined'
                        value={fields?.email ? fields.email : ''}
                        onChange={onChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <Box pt={3}>
                        <Divider sx={{ position: 'absolute', width: '100%', left: 0 }} />
                        <TextField
                            name='divisionId'
                            select
                            label='Division'
                            value={fields?.divisionId ? fields.divisionId : ''}
                            onChange={onChange}
                            sx={{ width: '100%', marginTop: '36px' }}
                        >
                            {(divisionsList?.values || [])?.map((division: any) =>
                                division?.name ? (
                                    <MenuItem key={division.id} value={division.id || ''}>
                                        {division.name}
                                    </MenuItem>
                                ) : null
                            )}
                        </TextField>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 6 }}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <BaseButton
                            color='secondary'
                            label='Cancel'
                            onClick={() => {
                                handleCloseModal(ModalIds.CREATE_EMPLOYEE);
                                onReset();
                            }}
                        />
                        <BaseButton
                            color='primary'
                            label='Add Employees'
                            startIcon
                            type='submit'
                            disabled={isSubmitButtonDisabled}
                        />
                    </Box>
                </DialogActions>
            </Box>
        </Modal>
    );
};

CreateEmployeeModal.displayName = 'CreateEmployeeModal';

export default CreateEmployeeModal;
