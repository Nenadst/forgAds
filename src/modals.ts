import CreateEmployeeModal from 'domains/forg-base/modals/CreateEmployeeModal';
import DeleteEmployeeConfirmationModal from 'domains/forg-base/modals/DeleteEmployeeConfirmationModal';
import UpdateEmployeeModal from 'domains/forg-base/modals/UpdateEmployeeModal';
import USERRepresentativesViewModal from 'domains/users/modals/USERRepresentativesViewModal';
import CreateUSERModal from 'domains/users/modals/CreateUSERModal';
import { ModalIds } from 'modalIds';
/*
 * Modal configuration
 */
export const modals = [
    {
        id: ModalIds.CREATE_EMPLOYEE,
        component: CreateEmployeeModal,
        hideBackdrop: false,
    },
    {
        id: ModalIds.DELETE_EMPLOYEE,
        component: DeleteEmployeeConfirmationModal,
        hideBackdrop: false,
    },
    {
        id: ModalIds.UPDATE_EMPLOYEE,
        component: UpdateEmployeeModal,
        hideBackdrop: false,
    },
    {
        id: ModalIds.CREATE_USER,
        component: CreateUSERModal,
        hideBackdrop: false,
    },
    {
        id: ModalIds.USER_REPRESENTATIVES_VIEW,
        component: USERRepresentativesViewModal,
        hideBackdrop: false,
    },
];
