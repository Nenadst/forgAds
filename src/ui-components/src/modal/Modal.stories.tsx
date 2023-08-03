import { StoryFn, Meta } from '@storybook/react';
import Modal from './Modal';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Modal/Modal',
    component: Modal,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
} as Meta<typeof Modal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Modal> = (args) => <Modal {...args} />;

export const DefaultStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultStory.args = {};
