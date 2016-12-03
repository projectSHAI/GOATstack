/*
===============================================================================
These assets get called no matter what Node's process.env.NODE_ENV is set to.
===============================================================================
*/

export const defaultAssets = {
  client: {
    dist: {
      js: [
        'dist/app/*.js',
        'dist/app/**/**/*.js'
      ],
      css: [
        'dist/app/styles.css',
      ],
      assets: [
        'dist/app/assets/*jpg',
        'dist/app/assets/*.png',
        'dist/app/assets/*.svg'
      ],
      views: [
        'dist/app/index.html',
      ]
    },
    scss: [
      'app/styles.scss',
      'app/**/**/*.scss'
    ],
    css: [
      'app/**/**/*.css'
    ],
    ts: [
      'app/*.ts',
      'app/actions/**/*.ts',
      'app/pipes/**/*.ts',
      'app/services/**/*.ts',
      'app/store/**/*.ts',
      'app/components/**/*.ts',
      'app/directives/**/*.ts'
    ],
    assets: [
      'app/assets/*jpg',
      'app/assets/*.png',
      'app/assets/*.svg'
    ],
    views: [
      'config/env/development/index.html',
      'app/**/**/*.html'
    ],
    spec: [
      'app/**/**/*.spec.ts'
    ],
    e2e: [
      'e2e/**/*.e2e-spec.js'
    ],
    system: ['config/env/development/systemjs.config.js']
  },
  server: {
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
      'dist/server/*.js',
      'dist/server/api/**/*.controller.js',
      'dist/server/api/**/*.events.js',
      'dist/server/api/**/*.model.js',
      'dist/server/api/**/*.router.js',
      'dist/server/auth/*.js',
      'dist/server/auth/**/*.js',
      'dist/config/assets/*.js',
      'dist/config/env/**/*.js',
      'dist/config/lib/*.js'
    ],
    tests: {
      integration: ['dist/server/api/user/user.integration.js', 'dist/server/api/**/*.integration.js'],
      unit: 'dist/server/api/**/*.spec.js'
    }
  },
  config: {
    allTS: [
      'config/assets/*.ts',
      'config/env/**/*.ts',
      'config/lib/*.ts',
    ]
  }
};
