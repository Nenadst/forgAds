import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { BaseButtonProps } from './BaseButtonTypes';

const BaseButton = ({ label, iconComponent, color, startIcon, type, form, onClick, ...rest }: BaseButtonProps) => {
    const theme = useTheme();

    return (
        <Button
            onClick={onClick}
            color={color}
            size='medium'
            variant='contained'
            type={type || 'button'}
            {...(form && { form })}
            sx={{
                textTransform: 'capitalize',
                fontFamily: theme.typography.fontFamilySecondary,
                fontWeight: 400,
            }}
            {...(startIcon && { startIcon: iconComponent || <AddRoundedIcon /> })}
            {...rest}
        >
            {label}
        </Button>
    );
};

BaseButton.displayName = 'BaseButton';

export default BaseButton;
