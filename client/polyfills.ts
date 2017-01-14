import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');

if (process.env.ENV === 'production') {
  // Production
} else {
  // Development  
  require('zone.js/dist/long-stack-trace-zone');
  Error.stackTraceLimit = Infinity;
}