const webpackProdConfig = require('./webpack-dev');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = Object.assign({}, webpackProdConfig, {
  plugins: [...webpackProdConfig.plugins, new BundleAnalyzerPlugin()],
});
