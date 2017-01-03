var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var helpers = require('../helpers');

module.exports = function(options) {
  var config = {
    entry: {
      'polyfills': './client/polyfills.ts',
      'vendor': './client/vendor.ts',
      'main': options.env === 'prod' ? './client/main-aot.ts' : './client/main.ts'
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          use: ['awesome-typescript-loader', 'angular2-template-loader']
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.(png|jpg|gif|svg|woff|woff2|ttf|eot|ico)$/,
          loader: 'file-loader'
        },
        {
          test: /\.css$/,
          exclude: helpers.root('client'),
          loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
        },
        {
          test: /\.css$/,
          exclude: helpers.root('public'),
          loader: 'raw-loader'
        }
      ]
    },

    resolve: {
      extensions: [".ts", ".js"]
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: ['main', 'vendor', 'polyfills']
      }),

      new HtmlWebpackPlugin({
        template: 'client/index.html'
      })
    ]
  };

  if (options.env === 'karma') {
    delete config.entry;
    delete config.plugins;
    config.devtool = 'inline-source-map';
    config.stats = { warnings: false };

    config.module.rules[2].loader = 'null-loader';
    config.module.rules[3].loader = 'null-loader';
  }

  return config;
}