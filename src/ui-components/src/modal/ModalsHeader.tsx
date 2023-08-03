import { Avatar, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getIntials } from 'utils/utils';

interface ModalsHeaderProps {
    subtitle: string;
    label: React.ReactNode;
    fullName: string;
    avatarSource?: string;
}

const ModalsHeader = ({ subtitle, label, fullName, avatarSource }: ModalsHeaderProps) => {
    const { palette } = useTheme();
    return (
        <Box
            sx={{
                position: 'relative',
                backgroundColor: 'divider',
                height: '100px',
                mb: 24,
                background: avatarSource
                    ? `url(${avatarSource})`
                    : `linear-gradient(216.95deg, ${palette.primary.main} 21.47%, ${palette.secondary.main} 141.77%)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: "blur('5px')",
            }}
        >
            <Box sx={{ width: '100%', height: '100px', backdropFilter: 'blur(49px)' }} />
            <Box sx={{ paddingInline: '24px' }}>
                <Avatar
                    sx={{
                        position: 'absolute',
                        top: '40%',
                        width: '120px',
                        height: '120px',
                        backgroundColor: 'secondary.main',
                        color: 'primary.main',
                        fontSize: '45px',
                        letterSpacing: -5,
                        marginRight: '12px',
                        border: `3px solid ${palette.secondary.main}`,
                    }}
                    {...(avatarSource && { src: avatarSource })}
                    {...(avatarSource && { alt: fullName })}
                >
                    {fullName ? getIntials(fullName) : ''}
                </Avatar>
                <Typography variant='modalsText' sx={{ position: 'absolute', top: 'calc(100% + 40%)', right: '24px' }}>
                    <b>{subtitle}:</b> {label || ''}.
                </Typography>
            </Box>
        </Box>
    );
};

export default ModalsHeader;
