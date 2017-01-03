// Look in ./config/webpack folder for webpack.client.x.js

module.exports = function(env) {
	// use webpack --env to change environment
	switch (env) {
	  case 'server:prod:e2e':
	    return require('./config/webpack/webpack.server')({ env: 'prod:e2e' });
		break;	
	  case 'prod:e2e':
	    return require('./config/webpack/webpack.client')({ env: 'prod', e2e: true });
		break;	  
	  case 'server:prod':
		return require('./config/webpack/webpack.server')({ env: 'prod' });
		break;
	  case 'prod':
	  case 'production':
	    return require('./config/webpack/webpack.client')({ env: 'prod' });
	    break;
	  case 'server:test':
		return require('./config/webpack/webpack.server')({ env: 'test' });
		break;
	  case 'test':
	  case 'testing':
	    return require('./config/webpack/webpack.client')({ env: 'test' });
		break;
	  case 'server:dev':
		return require('./config/webpack/webpack.server')({ env: 'dev' });
		break;
	  case 'dev':
	  case 'development':
	  default:
	    return require('./config/webpack/webpack.client')({ env: 'dev' });
	}
}
