const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin')
  .default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// @ts-ignore
const OfflinePlugin = require('offline-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// @ts-ignore
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin');
const webpackBase = require('./webpack-base');

const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: '[name].[hash].css',
  chunkFilename: '[id].[hash].css',
});

const offlinePlugin = new OfflinePlugin({
  excludes: ['**/.*', '**/*.gz', 'CNAME'],
  externals: [...webpackBase.FAVICONS, webpackBase.MANIFEST],
});

module.exports = {
  mode: 'production',
  bail: true,
  devtool: '',

  target: webpackBase.target,
  entry: webpackBase.entry,
  resolve: webpackBase.resolve,
  output: webpackBase.output.prod,

  module: {
    rules: [webpackBase.babelLoader, webpackBase.cssLoader],
  },

  plugins: [
    webpackBase.copyPlugin,
    new OptimizeCSSAssetsPlugin(),
    webpackBase.htmlPlugin('index'),
    webpackBase.htmlPlugin('404'),
    miniCssExtractPlugin,
    new HTMLInlineCSSWebpackPlugin({
      filter(fileName) {
        return fileName.includes('index');
      },
    }),
    new ResourceHintWebpackPlugin(),
    offlinePlugin,
  ],
};
