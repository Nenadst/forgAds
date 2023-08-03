import { StoryFn, Meta } from '@storybook/react';
import { MenuItem } from '@mui/material';
import DropdownMenuIcon from './DropdownMenuIcon';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Actions/DropdownMenuIcon',
    component: DropdownMenuIcon,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
} as Meta<typeof DropdownMenuIcon>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DropdownMenuIcon> = (args) => (
    <DropdownMenuIcon {...args}>
        <MenuItem>Option 1</MenuItem>
        <MenuItem>Option 2</MenuItem>
        <MenuItem>Option 3</MenuItem>
    </DropdownMenuIcon>
);

export const DefaultStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultStory.args = {};
