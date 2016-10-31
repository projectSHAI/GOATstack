/*
======================================================================================
Used when process.env.NODE_ENV is equal to anything besides 'production', or 'development'
======================================================================================
//This file adds assets and overwrites assets in the ./default.ts file
//process.env.NODE_ENV is utilized in config/config.ts
*/

export const testAssets = {
  tests: {
  	client: [],
  	server: []
  }
};
