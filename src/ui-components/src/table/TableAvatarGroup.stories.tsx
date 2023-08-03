import { StoryFn, Meta } from '@storybook/react';
import TableAvatarGroup from './TableAvatarGroup';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'table/TableAvatarGroup',
    component: TableAvatarGroup,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
} as Meta<typeof TableAvatarGroup>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof TableAvatarGroup> = () => (
    <TableAvatarGroup
        avatars={[
            { src: '', alt: '' },
            { src: '', alt: '' },
            { src: '', alt: '' },
            { src: '', alt: '' },
        ]}
    />
);

export const DefaultStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultStory.args = {};
