module.exports = {
  stories: ['../src/**/*.stories.(tsx)'],
  presets: ['@storybook/addon-docs/preset'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
  ],

  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [['react-app', { flow: false, typescript: true }]],
          },
        },
        require.resolve('react-docgen-typescript-loader'),
      ],
    });

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
