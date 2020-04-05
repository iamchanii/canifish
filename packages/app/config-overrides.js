const {
  addWebpackAlias,
  override,
  addBundleVisualizer,
} = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    react: 'preact/compat',
    'react-dom': 'preact/compat',
  }),
  addBundleVisualizer({}, true),
);
