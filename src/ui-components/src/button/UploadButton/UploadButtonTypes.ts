import { ButtonProps } from '@mui/material';

export interface UploadButtonProps extends ButtonProps {
    label: string;
    color?: ButtonColorTypes;
}

export type ButtonColorTypes =
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | 'tertiary'
    | 'quatinary';
