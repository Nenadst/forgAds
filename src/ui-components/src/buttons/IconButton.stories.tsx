import { StoryFn, Meta } from '@storybook/react';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import IconButton from './IconButton';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Buttons/IconButton',
    component: IconButton,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
} as Meta<typeof IconButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof IconButton> = (args) => <IconButton {...args} />;

export const Primary = (args: any) => (
    <IconButton sx={{ p: 4, backgroundColor: '#222124', '&:hover': { background: '#222124' } }} {...args}>
        <AddCircleIcon />
    </IconButton>
);

export const DefaultStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultStory.args = {
    color: 'primary',
    children: <AddCircleIcon />,
};
