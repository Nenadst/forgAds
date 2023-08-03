import { StoryFn, Meta } from '@storybook/react';
import ModalsHeader from './ModalsHeader';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Modal/ModalsHeader',
    component: ModalsHeader,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
} as Meta<typeof ModalsHeader>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof ModalsHeader> = (args) => <ModalsHeader {...args} />;

export const DefaultStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultStory.args = {
    subtitle: 'User Added',
    label: '21.Nov.2022',
    fullName: 'Petar Petrovic',
    avatarSource: '',
};
