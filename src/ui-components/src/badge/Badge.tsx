import { Box, Typography } from '@mui/material';
import { BadgeProps } from './BadgeTypes';

const Badge = ({ label, status, size }: BadgeProps) => (
    <Box
        color='red'
        sx={{
            width: 'max-content',
            backgroundColor: status === 'active' ? 'tertiary.main' : 'secondary.main',
            color: 'secondary.contrastText',
            textTransform: 'uppercase',
            fontWeight: 700,
            padding: '2px 3px',
            borderRadius: '2px',
        }}
    >
        <Typography sx={{ fontSize: size !== 'sm' ? 12 : 8 }}>{label || 'Label'}</Typography>
    </Box>
);

Badge.displayName = 'Badge';

export default Badge;
