const { override, addBundleVisualizer } = require('customize-cra');

const isProd = process.env.NODE_ENV === 'production';

module.exports = override(addBundleVisualizer({}, true));
