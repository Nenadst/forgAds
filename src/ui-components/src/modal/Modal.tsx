import CloseIcon from '@mui/icons-material/Close';
import { Box, SxProps, Theme } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled, useTheme } from '@mui/material/styles';
import { useModal } from 'hooks/useModal';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;

    onClose?: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;
    const { palette, typography } = useTheme();

    return (
        <DialogTitle
            sx={{
                m: 0,
                p: 4,
                borderBottom: `1px solid ${palette.divider}`,
                fontFamily: typography.fontFamilySecondary,
                fontWeight: 600,
            }}
            {...other}
        >
            {children}
            {onClose ? (
                <IconButton
                    aria-label='close'
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

interface ActiveItem {
    [key: string]: string;
}

interface ModalProps {
    children: React.ReactNode;
    component?: React.ElementType;
    modalId: string;
    activeItem?: ActiveItem;
    title?: string;
    sx?: SxProps<Theme>;
    hideBackdrop: boolean;
    callback?: () => void;
}

const Modal = ({ children, modalId, activeItem, title, component, callback, hideBackdrop, sx }: ModalProps) => {
    const { handleCloseModal } = useModal();
    const [searchParams] = useSearchParams();

    return (
        <Box {...(component && { component })}>
            <BootstrapDialog
                onClose={() => {
                    handleCloseModal(modalId, activeItem || {});
                    if (callback) {
                        callback();
                    }
                }}
                open={searchParams.getAll('activeModalId').includes(modalId)}
                hideBackdrop={hideBackdrop}
                {...(sx && { sx })}
            >
                {title && <BootstrapDialogTitle id='customized-dialog-title'>{title}</BootstrapDialogTitle>}
                {children}
            </BootstrapDialog>
        </Box>
    );
};

Modal.displayName = 'Modal';

export default Modal;
