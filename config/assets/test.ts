/*
======================================================================================
Used when process.env.NODE_ENV is equal to 'test'
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
