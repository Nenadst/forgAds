import { StoryFn, Meta } from '@storybook/react';
import UploadImage from './UploadImage';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'file-inputs/UploadImage',
    component: UploadImage,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
} as Meta<typeof UploadImage>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof UploadImage> = (args) => <UploadImage {...args} />;

export const DefaultStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultStory.args = {
    title: 'Employee Logo',
    text: 'Image file size must be < 2 MB',
};
