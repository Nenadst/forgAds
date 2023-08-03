import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import { Avatar, Box, Icon, Typography } from '@mui/material';
import { getIntials } from 'utils/utils';

interface TableLabelAvatarWithBadgeProps {
    avatarSource?: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    label: string;
    subLabel?: string;
}

const TableLabelAvatarWithBadge = ({
    avatarSource,
    icon,
    children,
    label,
    subLabel,
}: TableLabelAvatarWithBadgeProps) => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
            {...(avatarSource && { src: avatarSource })}
            sx={{ marginRight: '12px', backgroundColor: 'secondary.main', color: 'primary.main', letterSpacing: -2 }}
        >
            {!avatarSource && label ? (
                getIntials(label)
            ) : (
                <Icon sx={{ color: 'quatinary.main' }}>{icon || <ImageRoundedIcon />}</Icon>
            )}
        </Avatar>
        <Box>
            <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>{label}</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                {subLabel ? (
                    <Typography sx={{ fontSize: '12px', color: 'quatinary.main' }}>{subLabel}</Typography>
                ) : null}
                <Box sx={{ alignSelf: 'flex-end' }}>{children}</Box>
            </Box>
        </Box>
    </Box>
);

TableLabelAvatarWithBadge.displayName = 'TableLabelAvatarWithBadge';

export default TableLabelAvatarWithBadge;
