import { Button, Stack } from '@mui/material';
import { UploadButtonProps } from './UploadButtonTypes';

const UploadButton = ({ label, color }: UploadButtonProps) => (
    <Stack direction='row' alignItems='center' spacing={2}>
        <Button sx={{ textTransform: 'capitalize' }} variant='contained' component='label' color={color || 'primary'}>
            {label}
            <input hidden accept='image/*' multiple type='file' />
        </Button>
    </Stack>
);

export default UploadButton;
