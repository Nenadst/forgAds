import { Button } from '@mui/material';
import { IconButtonProps } from './IconButtonTypes';

const IconButton = ({ children, color, onClick, ...rest }: IconButtonProps) => (
    <Button color={color || 'primary'} size='small' variant='contained' sx={{ p: 3 }} onClick={onClick} {...rest}>
        {children}
    </Button>
);

IconButton.displayName = 'IconButton';

export default IconButton;
