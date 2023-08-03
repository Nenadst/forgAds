import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import UploadButton from '../button/UploadButton/UploadButton';
import { UploadImageProps } from './UploadImageTypes';

const UploadImage = ({ title, text }: UploadImageProps) => {
    const { palette } = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                background: palette.background.default,
                padding: '26px',
                borderRadius: '4px',
                border: `1px dashed ${palette.divider}`,
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <Typography variant='h3'>{title}</Typography>
                {text}
            </Box>
            <UploadButton label='Browse' color='secondary' />
        </Box>
    );
};

export default UploadImage;
