import { Box, Typography } from '@mui/material';
import { HeadingProps } from './HeadingTypes';
import { useStyles } from './Heading.styles';

const Heading = ({ title, children }: HeadingProps) => {
    const classes = useStyles();

    return (
        <Box className={classes.box}>
            <Typography variant='h1' className={classes.title}>
                {title}
            </Typography>
            <Typography variant='h4' className={classes.text}>
                {children}
            </Typography>
        </Box>
    );
};

Heading.displayName = 'Heading';

export default Heading;
