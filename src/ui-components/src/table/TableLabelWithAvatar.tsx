import { Avatar, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { getIntials } from 'utils/utils';

interface TableLabelWithAvatarProps {
    label: React.ReactNode;
    avatarSource?: string;
    icon?: React.ReactNode;
}

const TableLabelWithAvatar = ({ avatarSource, label, icon }: TableLabelWithAvatarProps) => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {avatarSource ? (
            <Avatar sx={{ marginRight: '12px' }} src={avatarSource} />
        ) : (
            <Avatar
                sx={{
                    marginRight: '12px',
                    backgroundColor: 'secondary.main',
                    color: 'primary.main',
                    fontSize: '18px',
                    letterSpacing: -2,
                }}
            >
                {label ? getIntials(label as string) : icon || <PersonIcon />}
            </Avatar>
        )}
        {label}
    </Box>
);

TableLabelWithAvatar.displayName = 'TableLabelWithAvatar';

export default TableLabelWithAvatar;
