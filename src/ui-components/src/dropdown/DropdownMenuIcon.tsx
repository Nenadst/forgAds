import MoreHoriz from '@mui/icons-material/MoreHoriz';
import { IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import * as React from 'react';

interface DropdownMenuIconProps {
    interactiveIcon?: React.ReactNode;
    children: React.ReactNode;
}
const DropdownMenuIcon = ({ interactiveIcon, children }: DropdownMenuIconProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                data-test-id='icon-button'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                    '& .MuiSvgIcon-root': {
                        backgroundColor: open ? 'secondary.main' : '',
                        borderRadius: '4px',
                        color: open ? 'primary.main' : '',
                    },
                }}
            >
                {interactiveIcon || <MoreHoriz sx={{ color: 'text.primary' }} />}
            </IconButton>
            <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {children}
            </Menu>
        </div>
    );
};

DropdownMenuIcon.displayName = 'DropdownMenuIcon';

export default DropdownMenuIcon;
