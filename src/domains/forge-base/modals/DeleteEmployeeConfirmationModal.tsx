import { Box, DialogActions, TextField, Typography } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import { useModal } from 'hooks/useModal';
import { ModalIds } from 'modalIds';
import { useSearchParams } from 'react-router-dom';
import BaseButton from 'ui-components/src/buttons/BaseButton';
import Modal from 'ui-components/src/modal/Modal';
import ModalsHeader from 'ui-components/src/modal/ModalsHeader';
import { format, parseISO } from 'date-fns';
import { useDeleteEmployee } from '../hooks/useDeleteEmployee';
import { useEmployee } from '../hooks/useEmployee';

interface DeleteEmployeeConfirmationModalProps {
    hideBackdrop: boolean;
}

const DeleteEmployeeConfirmationModal = ({ hideBackdrop }: DeleteEmployeeConfirmationModalProps) => {
    const [searchParams] = useSearchParams();
    const employeeId = searchParams.get('employeeId');
    const { handleCloseModal } = useModal();
    const { data: employee } = useEmployee(+employeeId!);
    const { mutate } = useDeleteEmployee(+employeeId!);

    const handleSubmitDeletion = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await mutate();
            handleCloseModal(ModalIds.DELETE_EMPLOYEE);
        } catch (error) {
            // TODO: Error handling of the form
        }
    };

    return (
        <Modal
            title='Remove Employee'
            modalId={ModalIds.DELETE_EMPLOYEE}
            hideBackdrop={hideBackdrop}
            activeItem={{ key: 'employeeId' }}
            sx={{
                '& .MuiDialog-paper': {
                    width: '445px',
                },
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
                onSubmit={(event) => handleSubmitDeletion(event)}
            >
                <ModalsHeader
                    subtitle='Employee Added'
                    label={(employee?.createdAt && format(parseISO(employee?.createdAt), 'dd.mm.yyyy')) || ''}
                    fullName={employee?.fullName || ''}
                />
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
                        inputProps={{
                            readOnly: true,
                        }}
                        type='text'
                        name='fullName'
                        label='Full Name'
                        variant='outlined'
                        value={employee?.fullName || ''}
                    />
                    <Typography variant='modalsText' marginY={4}>
                        If you remove this employee, she/he will not be shown anywhere on the platform, and will be
                        removed from all the ads she/he worked on.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 6 }}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <BaseButton
                            color='secondary'
                            label='Cancel'
                            onClick={() => {
                                handleCloseModal(ModalIds.DELETE_EMPLOYEE, {
                                    key: 'employeeId',
                                });
                            }}
                            disabled={!employeeId}
                        />
                        <BaseButton color='error' label='Remove Employees' type='submit' />
                    </Box>
                </DialogActions>
            </Box>
        </Modal>
    );
};

DeleteEmployeeConfirmationModal.displayName = 'DeleteEmployeeConfirmationModal';

export default DeleteEmployeeConfirmationModal;
