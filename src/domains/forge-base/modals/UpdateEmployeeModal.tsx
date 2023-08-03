import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { Box, DialogActions, Divider, MenuItem, TextField } from '@mui/material';
import Chip from '@mui/material/Chip';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { format, parseISO } from 'date-fns';
import { useForm } from 'hooks/useForm';
import { useModal } from 'hooks/useModal';
import { validateInfo } from 'hooks/validateInfo';
import { getDivisions, getPositions } from 'lib/api';
import { ModalIds } from 'modalIds';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import BaseButton from 'ui-components/src/buttons/BaseButton';
import Modal from 'ui-components/src/modal/Modal';
import ModalsHeader from 'ui-components/src/modal/ModalsHeader';
import CacheKeyTypes from '../hooks/cacheKeyTypes';
import { useEmployee } from '../hooks/useEmployee';
import { useUpdateEmployee } from '../hooks/useUpdateEmployee';
import { IPosition } from '../ui-elements/ForgBaseEmployeesTableTypes';

interface UpdateEmployeeModalProps {
    hideBackdrop: boolean;
}

const UpdateEmployeeModal = ({ hideBackdrop }: UpdateEmployeeModalProps) => {
    const [searchParams] = useSearchParams();
    const employeeId = searchParams.get('employeeId');
    const { handleCloseModal } = useModal();
    const { data: employee } = useEmployee(+employeeId!);
    const { data: positionsList } = useQuery([CacheKeyTypes.Positions], getPositions);
    const { fields, onChange, onReset, setErrors, errors } = useForm({ fullName: '', email: '', divisionId: '' });
    const employeePositionIds = employee?.positions?.map((pos: IPosition) => `${pos.id}`) || [];
    // NOTE: hardcoded to getAll division always, this should be temporary solution, while BE create endpoint for divisions list
    const { data: divisionsList } = useQuery([CacheKeyTypes.Divisions], () => getDivisions(0, 1000), {
        keepPreviousData: true,
        staleTime: 300000,
    });
    const [positionIds, setPositionIds] = useState<string[]>([]);
    const formData = {
        fullName: fields?.fullName || employee?.fullName,
        email: fields?.email || employee?.email,
        positions: positionIds?.map((positionId: string) => +positionId),
        ...(fields?.divisionId !== '' ? { divisionId: +fields.divisionId } : { divisionId: employee?.divisionId }),
    } as const;
    const { mutate } = useUpdateEmployee(+employeeId!, formData);

    useEffect(() => {
        setPositionIds(employeePositionIds);

        return () => {
            setPositionIds([]);
        };
    }, [employee]);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const handleChange = (event: SelectChangeEvent<typeof positionIds>) => {
        const {
            target: { value },
        } = event;

        if (value) {
            setPositionIds([...value]);
        }
    };

    const handleSubmitUpdate = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            if (Object.keys(validateInfo(fields))?.length) {
                setErrors(validateInfo(fields));
                return;
            }

            try {
                mutate();
                handleCloseModal(ModalIds.UPDATE_EMPLOYEE);
            } catch (error) {
                // TODO: Error handling of the form
            }
        },
        [fields.fullName, fields.email, fields.divisionId, positionIds]
    );

    const handleDeleteJobTitleOption = useCallback(
        (positionId: string) => {
            const positionIdsList = [...positionIds];
            const postionIndex = positionIds.findIndex((posId) => posId === positionId);
            positionIdsList.splice(postionIndex, 1);

            setPositionIds(positionIdsList);
        },
        [positionIds]
    );

    const isDisabledSubmitButton = () => {
        let isDisabled = false;
        let isPositionIncluded = false;
        let isPositionEmpty = false;
        const currentEmployeePositions = employee?.positions?.map((employeePosition: IPosition) => employeePosition.id);

        positionIds?.forEach((positionId: string) => {
            isPositionIncluded = currentEmployeePositions?.includes(+positionId);
        });

        if (!positionIds?.length) {
            isPositionEmpty = true;
        }

        if (positionIds?.length !== employee?.positions?.length) {
            isPositionIncluded = false;
        }

        if (
            ((fields?.fullName === '' || fields?.fullName === employee?.fullName) &&
                (fields?.email === '' || fields?.email === employee?.email) &&
                (fields?.divisionId === '' || fields?.divisionId === employee?.divisionId) &&
                isPositionIncluded) ||
            isPositionEmpty
        ) {
            isDisabled = true;
        }

        return isDisabled;
    };

    return (
        <Modal
            title='Edit Employee'
            modalId={ModalIds.UPDATE_EMPLOYEE}
            hideBackdrop={hideBackdrop}
            activeItem={{ key: 'employeeId' }}
            sx={{
                '& .MuiDialog-paper': {
                    width: '445px',
                },
            }}
            callback={useCallback(() => {
                onReset();
                setPositionIds([]);
            }, [positionIds])}
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
                onSubmit={(event) => handleSubmitUpdate(event)}
            >
                <ModalsHeader
                    subtitle='Employee Added'
                    label={(employee?.createdAt && format(parseISO(employee?.createdAt), 'dd.MM.yyyy')) || ''}
                    fullName={fields.fullName || employee?.fullName || ''}
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
                        type='text'
                        name='fullName'
                        label='Full Name'
                        variant='outlined'
                        value={fields.fullName || employee?.fullName || ''}
                        onChange={onChange}
                        error={!!errors.fullName}
                        helperText={errors.fullName}
                    />
                    <FormControl>
                        <InputLabel id='multiple-job-title-label'>Job Title</InputLabel>
                        <Select
                            name='positions'
                            labelId='multiple-job-title-label'
                            id='multiple-job-itle'
                            multiple
                            value={positionIds}
                            onChange={handleChange}
                            input={<OutlinedInput label='Job Title' />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((positionId) => (
                                        <Chip
                                            key={positionId}
                                            color='secondary'
                                            label={
                                                positionsList?.find(
                                                    (position: IPosition) => `${position.id}` === positionId
                                                ).name
                                            }
                                            deleteIcon={
                                                <CancelRoundedIcon
                                                    onMouseDown={(event: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
                                                        event.stopPropagation()
                                                    }
                                                />
                                            }
                                            onDelete={() => handleDeleteJobTitleOption(positionId)}
                                        />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {positionsList?.length
                                ? positionsList?.map((employeePosition: IPosition) => (
                                      <MenuItem
                                          key={employeePosition.id}
                                          value={employeePosition && `${employeePosition?.id}`}
                                      >
                                          {employeePosition.name}
                                      </MenuItem>
                                  ))
                                : null}
                        </Select>
                    </FormControl>

                    <TextField
                        type='email'
                        name='email'
                        label='Email Address'
                        variant='outlined'
                        value={fields.email || employee?.email || ''}
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
                            value={fields?.divisionId ? fields.divisionId : employee?.divisionId || ''}
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
                                handleCloseModal(ModalIds.UPDATE_EMPLOYEE, {
                                    key: 'employeeId',
                                });
                                onReset();
                                setPositionIds([]);
                            }}
                            disabled={!employeeId}
                        />
                        <BaseButton
                            color='primary'
                            label='Save Changes'
                            type='submit'
                            disabled={isDisabledSubmitButton()}
                        />
                    </Box>
                </DialogActions>
            </Box>
        </Modal>
    );
};

UpdateEmployeeModal.displayName = 'UpdateEmployeeModal';

export default UpdateEmployeeModal;
