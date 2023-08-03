module.exports = {
    stories: ['../src/**/**.stories.mdx', '../src/**/**.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
    vite(config) {
        delete config.resolve.alias['emotion-theming'];
        delete config.resolve.alias['@emotion/styled'];
        delete config.resolve.alias['@emotion/core'];
        return config;
    },
};