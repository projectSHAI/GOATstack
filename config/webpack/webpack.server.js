var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var WebpackShellPlugin = require('webpack-shell-plugin');

const helpers = require('../helpers');
const cmd = require('../scripts').cmd;

module.exports = function(options) {

  const ENV = process.env.ENV = process.env.NODE_ENV = options.env === 'dev' ? 'development' :
    options.env === 'prod' ? 'production' : 'test';
  const METADATA = {
    ENV: ENV,
  };

  return {
    entry: {
      'server': './server/server.ts',
    }, 

    output: {
      path: helpers.root('dist'),
      filename: 'index.js'
    },

    stats: 'none',
    target: 'node',
    externals: [nodeExternals()],

    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'awesome-typescript-loader'
        }
      ]
    },

    resolve: {
      extensions: ['.ts', '.js']
    },

    plugins: options.env === 'dev' ? [
      // Dev Plugins
      new webpack.DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV)
        }
      }),
      new WebpackShellPlugin({
        // onBuildEnd:[`${cmd.webpackDevServer} --inline --env dev`]
      })
    ] : options.env === 'test' ? [
      // Test Plugins
      new webpack.DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV)
        }
      })
    ] : options.env === 'prod' ? [
      // Prod Plugins
      new webpack.optimize.UglifyJsPlugin({
        mangle: {
          keep_fnames: true
        }
      }),
    ] : [
      new webpack.optimize.UglifyJsPlugin({
        mangle: {
          keep_fnames: true
        }
      }),
      new webpack.DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV)
        }
      })
    ]
  };
}