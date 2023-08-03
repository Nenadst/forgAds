import { StoryFn, Meta } from '@storybook/react';
import TableSearchFilter from './TableSearchFilter';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Table/TableSearchFilter',
    component: TableSearchFilter,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
} as Meta<typeof TableSearchFilter>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof TableSearchFilter> = (args) => <TableSearchFilter {...args} />;

export const DefaultStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultStory.args = {
    title: 'Example List',
};
