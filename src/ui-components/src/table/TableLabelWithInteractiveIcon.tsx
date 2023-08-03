import { Avatar, Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import { TableLabelInteractiveIconProps } from './TableLabelWithInteractiveIconTypes';

const TableLabelInteractiveIcon = ({ avatarSource, label, icon }: TableLabelInteractiveIconProps) => (
    <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'underline',
            cursor: 'pointer',
        }}
    >
        {avatarSource ? (
            <Avatar sx={{ marginRight: '12px' }} src={avatarSource} />
        ) : (
            <Avatar
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    backgroundColor: 'transparent',
                    color: 'text.primary',
                }}
            >
                {icon || <PeopleIcon />}
            </Avatar>
        )}
        {label}
    </Box>
);

TableLabelInteractiveIcon.displayName = 'TableLabelInteractiveIcon';

export default TableLabelInteractiveIcon;
