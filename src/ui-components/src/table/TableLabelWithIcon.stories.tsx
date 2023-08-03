import { StoryFn, Meta } from '@storybook/react';
import TableLabelWithIcon from './TableLabelWithIcon';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Table/TableLabelWithIcon',
    component: TableLabelWithIcon,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
} as Meta<typeof TableLabelWithIcon>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof TableLabelWithIcon> = (args) => <TableLabelWithIcon {...args} />;

export const DefaultStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultStory.args = {
    children: 'Account Name',
};
