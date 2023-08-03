import { Box, Divider, Tabs } from '@mui/material';
import { SyntheticEvent } from 'react';
import { useTheme } from '@mui/material/styles';
import { TabBarProps } from './TabBarTypes';

const TabBar = ({ children, handleChangeTab, tabBarName, activeTabId }: TabBarProps) => {
    const { typography, palette } = useTheme();

    const handleChange = (_event: SyntheticEvent, newTabId: string) => {
        handleChangeTab(_event, newTabId);
    };

    return (
        <Box>
            <Tabs
                sx={{
                    '& .MuiTabs-flexContainer': {
                        gap: '35px',
                    },
                    '& button': {
                        fontSize: '16px',
                        fontFamily: typography.fontFamilySecondary,
                        padding: 0,
                    },
                    '& button.Mui-selected': {
                        color: palette.text.primary,
                    },
                }}
                value={activeTabId}
                onChange={handleChange}
                aria-label={tabBarName}
            >
                {children}
            </Tabs>
            <Divider sx={{ color: 'divider' }} />
        </Box>
    );
};

TabBar.displayName = 'TabBar';

export default TabBar;
