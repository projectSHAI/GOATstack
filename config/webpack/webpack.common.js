var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AotPlugin = require('@ngtools/webpack').AotPlugin;

var helpers = require('../helpers');

module.exports = function(options) {
  const prod = options.env === 'prod';

  var config = {
    entry: {
      'polyfills': './client/polyfills.ts',
      'vendor': './client/vendor.ts',
      'app': './client/app.ts'
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
          loader: 'html-loader?-attrs'
        },
        {
          test: /\.(png|svg|jpg)$/,
          loader: 'file-loader',
          query: {
            'name': 'public/assets/[name].[ext]'
          }
        },
        {
          test: /\.scss/,
          include: [helpers.root('client/styles.scss'), helpers.root('client/loader.scss')],
          loader: ExtractTextPlugin.extract({ 
            fallbackLoader: 'style-loader', 
            loader: 'css-loader?sourceMap!sass-loader?sourceMap'
          })
        },
        {
          test: /\.scss/,
          exclude: [helpers.root('client/styles.scss'), helpers.root('client/loader.scss')],
          loader: 'to-string-loader!css-loader?sourceMap!sass-loader?sourceMap'
        },
      ]
    },

    resolve: {
      extensions: ['.ts', '.js', '.scss']
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: ['app', 'vendor', 'polyfills']
      }),

      new HtmlWebpackPlugin({
        template: 'client/index.html'
      })
    ]
  };

  if (prod) {
    config.entry.app = './client/app-aot.ts';

    config.module.rules[1].use = ['@ngtools/webpack', 'angular2-template-loader'];

    config.module.rules[5] = {
      test: /\.css$/,
      exclude: [helpers.root('client/styles.css'), helpers.root('client/loader.css')],
      loader: 'raw-loader'
    };

    config.module.rules.splice(0,1);

    config.plugins.push(
      new AotPlugin({
        tsConfigPath: './tsconfig-aot.json',
        entryModule: helpers.root('client/modules/app.module#AppModule')
      }));
  }

  if (options.env === 'karma') {
    delete config.entry;
    // delete config.entry.polyfills;
    delete config.plugins;
    config.devtool = 'inline-source-map';
    config.stats = { warnings: false };

    config.module.rules[3].loader = 'null-loader';
    config.module.rules[4].loader = 'null-loader';
  }

  return config;
}