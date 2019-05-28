const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin')
  .default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
// @ts-ignore
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const webpackBase = require('./webpack-base');

const addAssetHtmlPlugin = new AddAssetHtmlPlugin({
  filepath: require.resolve('./build/dll.js'),
});

const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: '[id].css',
});

const dllReferencePlugin = new webpack.DllReferencePlugin({
  context: __dirname,
  // @ts-ignore
  manifest: require('./build/dll.json'),
});

const writeFileWebpackPlugin = new WriteFileWebpackPlugin({
  force: true,
});

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  bail: false,

  devServer: {
    inline: true,
    contentBase: path.resolve(__dirname, '..', 'build'),
    open: false,
    overlay: true,
    progress: true,
    historyApiFallback: true,
    hot: false,
  },

  entry: webpackBase.entry,
  target: webpackBase.target,
  resolve: webpackBase.resolve,
  output: webpackBase.output.dev,

  module: {
    rules: [webpackBase.babelLoader, webpackBase.cssLoader],
  },

  plugins: [
    dllReferencePlugin,
    webpackBase.htmlPlugin('index'),
    addAssetHtmlPlugin,
    miniCssExtractPlugin,
    new HTMLInlineCSSWebpackPlugin(),
    webpackBase.copyPlugin,
    writeFileWebpackPlugin,
  ],
};
