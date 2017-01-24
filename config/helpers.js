var path = require('path');
var del = require('del');

var client = [
	'client/**/**/**/**/**/*.css*',
	'client/**/**/**/**/**/*.js*',
	'client/**/**/**/**/**/*.shim*',
	'client/**/**/**/**/**/*.ngfactory.ts',
	'client/**/**/**/**/**/*.ngstyle.ts',
	'client/**/**/**/**/**/*.ngsummary.json',
	'ngc-aot/**',
	'.com*/**',
	'.org*/**'
];

var all = client.concat([
	'dist/**',
	'dist/.git/**'
]);

var _root = path.resolve(process.cwd());

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

function cleanup(option) {
	switch (option) {
		case 'client':
			return del.sync(client);
			break;
		default:
			return del.sync(all);
			break;
	}
}

exports.root = root;
exports.cleanup = cleanup;
