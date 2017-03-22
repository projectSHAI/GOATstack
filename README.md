yarn start + successfully builds and runs devServer

yarn prod - fusebox needs angular2 components to be "require()", so ngc will currently not compile without further involvement

yarn test - Jasmine can be done easily but fusebox will most likely not work with karma for the time being.

yarn e2e - should be as simple as fusing the project in the 'test' environment and running protractor on port 7001.   