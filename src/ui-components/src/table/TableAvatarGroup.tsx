import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import { Avatar, AvatarGroup } from '@mui/material';
import config from 'config';
import { snakeCase } from 'change-case';
import { baseColors } from 'themes/colors';

interface AvatarItem {
    [key: string]: string;
}

interface TableAvatarGroupProps {
    avatars: AvatarItem[];
}

const avatarColors: { [key: string]: any } = {
    0: baseColors.tertiary,
    1: baseColors.secondary,
};

const TableAvatarGroup = ({ avatars }: TableAvatarGroupProps) => {
    let avatarColorMap;
    const renderAvatarsList = avatars.map((avatar: AvatarItem, index) => {
        const { alt, src } = avatar;
        avatarColorMap = avatarColors[index as number];

        const renderAvatar = (
            <Avatar
                key={snakeCase(`${alt}${src}`)}
                {...(src && { src })}
                {...(alt && { alt })}
                sx={{ bgcolor: avatarColorMap }}
            >
                <ImageRoundedIcon />
            </Avatar>
        );

        return renderAvatar;
    });

    return (
        <AvatarGroup
            max={config.NUMBER_OF_MAX_AVATARS}
            sx={{
                justifyContent: 'flex-end',
                '& .MuiAvatar-colorDefault': { color: 'quatinary.main' },
                '& .css-1bksic3-MuiAvatar-root-MuiAvatarGroup-avatar': { bgcolor: baseColors.disabled },
            }}
        >
            {renderAvatarsList}
        </AvatarGroup>
    );
};

export default TableAvatarGroup;
