import { Dispatch, SetStateAction } from 'react';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

export interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    avatarSource?: string;
}

export interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}
