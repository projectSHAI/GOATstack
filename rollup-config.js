import rollup from 'rollup'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';

export default {
  entry: 'app/main-aot.js',
  dest: 'dist/app/app.js', // output a single application bundle
  format: 'iife',
  plugins: [
    nodeResolve({
      jsnext: true,
      module: true,
      browser: true
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        // left-hand side can be an absolute path, a path
        // relative to the current directory, or the name
        // of a module in node_modules
        'node_modules/ng2-cookies/ng2-cookies.js': ['Cookie'],
        'node_modules/immutable/dist/immutable.js': ['Map', 'List', 'Record'],
        'node_modules/redux-logger/dist/index.js': ['createLogger'],
        'node_modules/lodash/lodash.js': ['find', 'remove']
      }
    }),
    uglify()
  ]
}
