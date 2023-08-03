import { StoryFn, Meta } from '@storybook/react';
import TableLabelAvatarWithBadge from './TableLabelAvatarWithBadge';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Table/TableLabelAvatarWithBadge',
    component: TableLabelAvatarWithBadge,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
} as Meta<typeof TableLabelAvatarWithBadge>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof TableLabelAvatarWithBadge> = (args) => <TableLabelAvatarWithBadge {...args} />;

export const DefaultStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultStory.args = {};
