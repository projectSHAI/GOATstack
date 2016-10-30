"use strict";

(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // angular bundles
      '@angular/core':                      'npm:@angular/core/bundles/core.umd.js',
      '@angular/common':                    'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler':                  'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser':          'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic':  'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http':                      'npm:@angular/http/bundles/http.umd.js',
      '@angular/router':                    'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms':                     'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade':                   'npm:@angular/upgrade/bundles/upgrade.umd.js',
      '@angular/material':                  'npm:@angular/material/material.umd.js',


      // other libraries
      'rxjs':                               'npm:rxjs',
      'ng2-cookies':                        'npm:ng2-cookies',
      'socket.io-client':                   'npm:socket.io-client',
      'lodash':                             'npm:lodash',
      'gsap':                               'custom_modules/greensock',
      'ng2-redux':                          'npm:ng2-redux/lib',
      'redux':                              'npm:redux/dist/redux.min.js',

      'redux-logger':                       'npm:redux-logger/dist',
      'redux-localstorage':                 'npm:redux-localstorage/lib'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      rxjs: {
        defaultExtension: 'js'
      },
      'ng2-cookies': {
        defaultExtension: 'js'
      },
      'socket.io-client': {
        main: 'socket.io.js',
        defaultExtension: 'js'
      },
      lodash: {
        main: 'lodash.js',
        defaultExtension: 'js'
      },
      gsap: {
        main: 'TweenMax.min.js',
        defaultExtension: 'js'
      },
      'ng2-redux': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      'redux-logger': {
        main: 'index.min.js',
        defaultExtension: 'js'
      },
      'redux-localstorage': {
        main: 'persistState.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);
