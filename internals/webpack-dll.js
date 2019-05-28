const path = require('path');
const webpack = require('webpack');
const pkg = require('../package.json');

module.exports = {
  context: process.cwd(),
  mode: 'development',

  entry: {
    dll: Object.keys(pkg.dependencies).filter(
      (dependency) => !['normalize.css'].includes(dependency),
    ),
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'build'),
    library: '[name]',
    sourceMapFilename: '[name].map',
  },

  resolve: {
    modules: [__dirname, 'node_modules'],
  },

  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      context: __dirname,
      path: path.join(__dirname, 'build', '[name].json'),
    }),
  ],
};
