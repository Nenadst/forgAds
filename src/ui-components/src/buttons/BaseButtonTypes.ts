import { ButtonProps } from '@mui/material';

export interface BaseButtonProps extends ButtonProps {
    label?: React.ReactNode;
    iconComponent?: React.ReactNode;
    color: ButtonColorTypes;
    onClick?: (value?: any) => void;
    type?: 'button' | 'reset' | 'submit';
    startIcon?: boolean;
    form?: string;
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
