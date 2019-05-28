const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const generateFavicons = require('./generate-favicons');
const generateManifest = require('./generate-manifest');
const pkg = require('../package.json');

module.exports = {
  // @ts-ignore
  FAVICONS: generateFavicons(pkg),
  // @ts-ignore
  MANIFEST: generateManifest(pkg),
  target: 'web',

  entry: {
    main: './app/main.ts',
  },

  output: {
    dev: {
      path: path.resolve('./build'),
      filename: '[name].js',
    },

    prod: {
      path: path.resolve('./build'),
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].chunk.js',
    },
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },

  babelLoader: {
    test: /.(js|ts|tsx)$/,
    loader: 'babel-loader',
  },

  cssLoader: {
    test: /\.css$/,
    use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader' }],
  },

  copyPlugin: new CopyWebpackPlugin([
    {
      from: './static',
      to: './',
    },
  ]),

  /**
   * @param {string} filename
   */
  htmlPlugin: (filename) =>
    new HtmlWebpackPlugin({
      filename: `${filename}.html`,
      template: '!!pug-loader!templates/index.pug',
      templateParameters: pkg,
      preload: ['*.js'],
      prefetch: ['*.chunk.js'],
    }),
};
