import { StoryFn, Meta } from '@storybook/react';
import BaseButton from './BaseButton';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Buttons/BaseButton',
    component: BaseButton,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        label: { control: 'text' },
    },
} as Meta<typeof BaseButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof BaseButton> = (args) => <BaseButton {...args} />;

export const Primary = ({ label }: any) => (
    <BaseButton
        color='primary'
        sx={{
            color: 'white',
            backgroundColor: '#222124',
            '&:hover': { background: '#222124' },
            textTransform: 'capitalize',
        }}
        label={label || 'Primary'}
    />
);

export const Secondary = ({ label }: any) => (
    <BaseButton
        color='secondary'
        sx={{
            color: 'white',
            backgroundColor: '#cbcbcb',
            '&:hover': { background: '#cbcbcb' },
            textTransform: 'capitalize',
        }}
        label={label || 'Secondary'}
    />
);

export const Tertiary = ({ label }: any) => (
    <BaseButton
        color='secondary'
        sx={{
            color: 'white',
            backgroundColor: '#a1a0a3',
            '&:hover': { background: '#a1a0a3' },
            textTransform: 'capitalize',
        }}
        label={label || 'Tertiary'}
    />
);

export const Quatinary = ({ label }: any) => (
    <BaseButton
        color='secondary'
        sx={{
            color: 'white',
            backgroundColor: '#5a5c60',
            '&:hover': { background: '#5a5c60' },
            textTransform: 'capitalize',
        }}
        label={label || 'Quatinary'}
    />
);

export const DefaultStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultStory.args = {
    color: 'primary',
    label: 'BaseButton',
};
