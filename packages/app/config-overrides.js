const {
  addWebpackAlias,
  override,
  addBundleVisualizer,
} = require('customize-cra');

const isProd = process.env.NODE_ENV === 'production';

module.exports = override(
  isProd &&
    addWebpackAlias({
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    }),
  addBundleVisualizer({}, true),
);
