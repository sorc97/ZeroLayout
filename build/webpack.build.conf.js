const baseWebpackConfig = require('./webpack.base.conf');
const merge = require('webpack-merge');

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production'
});

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig);
});
