import { ButtonProps } from "@mui/material";

export interface IconButtonProps extends ButtonProps {
    children?: React.ReactNode;
    color?: IconButtonColorTypes;
    onClick?: () => void;
}

export type IconButtonColorTypes = 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | 'tertiary'
    | 'quatinary';