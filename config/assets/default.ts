export const defaultAssets = {
  client: {
    dist: {
      js: [
        'dist/app/app.js'
      ],
      css: [
        'dist/styles.css',
        'dist/components/**/*.css'
      ],
      assets: [
        'dist/app/assets/*jpg',
        'dist/app/assets/*.png',
        'dist/app/assets/*.svg'
      ],
      views: [
        'dist/app/index.html'
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
      'client/app/**/**/*.ts'
    ],
    assets: [
      'client/assets/*jpg',
      'client/assets/*.png',
      'client/assets/*.svg'
    ],
    views: [
      'client/index.html',
      'client/app/components/**/*.html'
    ],
    spec: [
      'client/app/**/**/*.spec.ts'
    ],
    e2e: [
      'client/e2e/**/*.e2e-spec.js'
    ],
    system: ['config/sys/systemjs.config.js']
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
      'dist/server.js'
    ],
    tests: {
      integration: 'dist/server/api/**/*.integration.js',
      unit: 'dist/server/api/**/*.spec.js'
    },
    system: ['config/sys/index.js']
  },
  config: {
    allTS: [
      'config/assets/*.ts',
      'config/env/*.ts',
      'config/lib/*.ts',
    ]
  }
};
