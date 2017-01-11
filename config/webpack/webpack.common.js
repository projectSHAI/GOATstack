var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var helpers = require('../helpers');

module.exports = function(options) {
  const prod = options.env === 'prod';

  var config = {
    entry: {
      'polyfills': './client/polyfills.ts',
      'vendor': './client/vendor.ts',
      'main': './client/main.ts'
    },

    module: {
      rules: [
        {
          test: /component\.ts/,
          loader: 'string-replace-loader',
          query: {
            search: '.css',
            replace: '.scss'
          }
        },
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
          test: /\.scss/,
          include: helpers.root('client/styles.scss'),
          loader: ExtractTextPlugin.extract({ 
            fallbackLoader: 'style-loader', 
            loader: 'css-loader?sourceMap!sass-loader?sourceMap'
          })
        },
        {
          test: /\.scss/,
          exclude: helpers.root('client/styles.scss'),
          loader: 'to-string-loader!css-loader?sourceMap!sass-loader?sourceMap'
        },
      ]
    },

    resolve: {
      extensions: ['.ts', '.js', '.scss']
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

  if (prod) {
    config.entry.main = './client/main-aot.ts'; 

    config.module.rules[5] = {
      test: /\.css$/,
      exclude: helpers.root('client/styles.css'),
      loader: 'raw-loader'
    };

    config.module.rules.splice(0,1);
  }

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