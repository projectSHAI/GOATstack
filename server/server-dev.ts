var WebpackDevServer = require("webpack-dev-server");
var webpackMerge = require('webpack-merge');
var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackShellPlugin = require('webpack-shell-plugin');

var chalk = require('chalk');
var helpers = require('../config/helpers');
var commonConfig = require('../config/webpack/webpack.common');

import config from '../config';
import {connect, disconnect} from './mongoose';
import expressInit from './express';
import socketInit from './socketio';

function devServer() {
  var compiler = webpack(webpackMerge(commonConfig({ env: 'dev' }), {
    devtool: 'cheap-module-eval-source-map',
    output: {
      path: helpers.root('dist/client'),
      filename: '[name].js',
      chunkFilename: '[id].chunk.js'
    },
    devServer: {
      historyApiFallback: true,
      stats: {
        warnings: false,
        chunks: false
      }
    },
    plugins: [
      new ExtractTextPlugin('styles.css')
    ]
  }));

  var server = new WebpackDevServer(compiler, {
    // webpack-dev-server options

    contentBase: helpers.root('dist/client'),
    // Can also be an array, or: contentBase: "http://localhost/",

    hot: true,
    // Enable special support for Hot Module Replacement
    // Page is no longer updated, but a "webpackHotUpdate" message is sent to the content
    // Use "webpack/hot/dev-server" as additional module in your entry point
    // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does. 

    historyApiFallback: true,
    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.

    compress: false,
    // Set this if you want to enable gzip compression for assets

    proxy: {
      // "**": "http://localhost:9090"
    },
    // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
    // Use "**" to proxy all paths to the specified server.
    // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
    // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).

    setup: function(app, server) {
      // Initialize express features
      expressInit(app);

      let socketio = require('socket.io')(server.app, {
        // serveClient: process.env.NODE_ENV !== 'production',
        path: '/client.io'
      });

      // Start configure the socketio
      socketInit(socketio);
    },

    // pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server
    staticOptions: {
    },

    clientLogLevel: "info",
    // Control the console log messages shown in the browser when using inline mode. Can be `error`, `warning`, `info` or `none`.

    // webpack-dev-middleware options
    quiet: false,
    noInfo: false,
    lazy: false,
    filename: "bundle.js",
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    // It's a required option.
    publicPath: "http://localhost:8080",
    // headers: { "X-Custom-Header": "yes" },
    stats: { colors: true }
  });

  connect();

  server.listen(8080, 'localhost', () => {
    // Logging initialization
    console.log(chalk.bold.cyan(`\tDatabase:\t\t\t ${ config.db.uri }`));
  });
  

}

export default devServer;