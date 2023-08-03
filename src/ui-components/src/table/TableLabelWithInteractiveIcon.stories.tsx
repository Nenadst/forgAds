import { StoryFn, Meta } from '@storybook/react';
import PeopleIcon from '@mui/icons-material/People';
import TableLabelWithInteractiveIcon from './TableLabelWithInteractiveIcon';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Table/TableLabelWithInteractiveIcon',
    component: TableLabelWithInteractiveIcon,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
} as Meta<typeof TableLabelWithInteractiveIcon>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof TableLabelWithInteractiveIcon> = (args) => <TableLabelWithInteractiveIcon {...args} />;

export const DefaultStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultStory.args = {
    label: 'Joe Done',
    icon: <PeopleIcon />,
    avatarSource:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
};
