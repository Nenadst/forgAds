import { StoryFn, Meta } from '@storybook/react';
import { Tab } from '@mui/material';
import ForgBaseTabs from 'domains/forg-base/forgBaseTabs';
import TabBar from './TabBar';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Tab/TabBar',
    component: TabBar,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
} as Meta<typeof TabBar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof TabBar> = (args) => (
    <TabBar {...args} activeTabId={ForgBaseTabs.EMPLOYEES}>
        <Tab
            id={`forg-base-tab-${ForgBaseTabs.EMPLOYEES}`}
            value={ForgBaseTabs.EMPLOYEES}
            sx={{ textTransform: 'capitalize' }}
            label='Employees'
        />
        <Tab
            value={ForgBaseTabs.DIVISIONS}
            sx={{ textTransform: 'capitalize' }}
            label='Divisions'
            id={`forg-base-tab-${ForgBaseTabs.DIVISIONS}`}
        />
    </TabBar>
);

export const DefaultStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultStory.args = {};
