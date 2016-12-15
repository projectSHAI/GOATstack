/*
===============================================================================
These assets get called no matter what Node's process.env.NODE_ENV is set to.
===============================================================================
*/

export const defaultAssets = {
  client: {
    dist: {
      js: [
        'dist/client/**/*.js',
        'dist/client/**/**/**/*.js'
      ],
      css: [
        'dist/client/styles.css',
      ],
      assets: [
        'dist/public/assets/*jpg',
        'dist/public/assets/*.png',
        'dist/public/assets/*.svg'
      ],
      views: [
        'dist/client/index.html',
      ]
    },
    scss: [
      'client/styles.scss',
      'client/**/**/**/*.scss'
    ],
    css: [
      'client/**/**/**/*.css'
    ],
    ts: [
      'client/**/*.ts',
      'client/**/actions/**/*.ts',
      'client/**/pipes/**/*.ts',
      'client/**/services/**/*.ts',
      'client/**/store/**/*.ts',
      'client/**/components/**/*.ts',
      'client/**/directives/**/*.ts'
    ],
    assets: [
      'public/assets/*jpg',
      'public/assets/*.png',
      'public/assets/*.svg'
    ],
    views: [
      'config/env/development/index.html',
      'client/**/**/**/*.html'
    ],
    spec: [
      'client/**/**/**/*.spec.ts'
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
      integration: [
        'dist/server/api/user/user.integration.js', 
        'dist/server/api/wonder/wonder.integration.js',
        'dist/server/api/**/*.integration.js'
      ],
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
