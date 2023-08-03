import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
    box: {
        marginBottom: '35px',
    },
    title: {
        marginBottom: '10px !important',
        fontFamily: `${theme.typography.fontFamilySecondary}`,
        textTransform: 'capitalize',
        color: theme.palette.text.primary,
    },
    text: {
        fontFamily: `${theme.typography.fontFamilySecondary}`,
        color: theme.palette.text.primary,
    },
}));
