'use strict';

module.exports = {
  client: {
    dist: {
      js: [
        'dist/app/*.js*',
        'dist/app/**/*.js*'
      ],
      css: [
        'dist/styles.css',
        'dist/components/**/*.css'
      ],
      assets: [
        'dist/assets/*.jpg',
        'dist/assets/*.png',
        'dist/assets/*.svg',
      ],
      views: [
        'dist/index.html',
        'dist/components/**/*.html'
      ]
    },
    scss: [
      'client/styles.scss'
    ],
    css: [
      'client/styles.css',
      'client/app/components/**/*.css'
    ],
    ts: [
      'client/app/*.ts',
      'client/app/**/*.ts',
      'client/app/**/**/*.ts',
    ],
    assets: [
      'client/assets/*.jpg',
      'client/assets/*.png',
      'client/assets/*.svg',
    ],
    views: [
      'client/index.html',
      'client/app/components/**/*.html'
    ],
    spec: [
      'client/app/**/**/*.spec.ts'
    ],
    e2e: [
      'client/e2e/*.e2e-spec.js'
    ]
  },
  server: {
    gulpConfig: ['gulpfile.js'],
		allTS: [
			'server/*.ts',
      'server/api/**/*.controller.ts',
      'server/api/**/*.events.ts',
      'server/api/**/*.model.ts',
      'server/api/**/*.router.ts',
      'server/auth/*.ts',
      'server/auth/**/*.ts'
    ],
    allJS: [
      'dist/*.js',
      'dist/api/**/*.controller.js',
      'dist/api/**/*.events.js',
      'dist/api/**/*.model.js',
      'dist/api/**/*.router.js',
      'dist/auth/*.js',
      'dist/auth/**/*.js'
    ],
    models: 'dist/api/**/*.model.js',
    routes: 'dist/api/**/*.router.js',
    sockets: 'dist/api/**/*.socket.js',
    tests: {
      integration: 'dist/api/**/*.integration.js',
      unit: 'dist/api/**/*.spec.js'
    }
  },
  config: {
    allJS: [
      'config/**/*.js',
    ]
  }
};
