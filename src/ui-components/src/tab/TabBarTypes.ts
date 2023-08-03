import React, { SyntheticEvent } from "react";

export interface TabBarProps {
    children: React.ReactNode;
    handleChangeTab: (event: SyntheticEvent, tabId: string) => void;
    activeTabId: string;
    tabBarName: string;
}