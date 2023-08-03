import { Box, Icon } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import { useState } from 'react';

interface TableLabelWithIconProps {
    children: React.ReactNode;
}

const TableLabelWithIcon = ({ children }: TableLabelWithIconProps) => {
    const [active, setActive] = useState(true);

    return (
        <Box sx={{ display: 'flex', gap: '12px', cursor: 'pointer' }} onClick={() => setActive(!active)}>
            {children}
            <Icon>{active ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}</Icon>
        </Box>
    );
};

TableLabelWithIcon.displayName = 'TableLabelWithIcon';

export default TableLabelWithIcon;
