
![Main Banner](https://github.com/JCThomas4214/Documentation/blob/master/GOAT/assets/GOAT-banner.jpg?raw=true)

# Quick Start 

```sh
$ npm install -g yo generator-goat-stack
$ mkdir [dirName] && cd [dirName]
$ yo goat-stack [name?]
$ npm install
$ # mongod runs as a child process!
$ gulp
```

## Yo Generator Project [here](https://github.com/JCThomas4214/GOAT-yeoman)
  
___

# Documentation Wiki

  * [Home](https://github.com/projectSHAI/GOAT-stack/wiki)
  * [FAQ](https://github.com/projectSHAI/GOAT-stack/wiki/FAQ)
  * [Dev-Tools](https://github.com/projectSHAI/GOAT-stack/wiki/Dev-Tools)
  * [Gulp Tasks](https://github.com/projectSHAI/GOAT-stack/wiki/Gulp-Tasks)
  * [Client Side Docs](https://github.com/projectSHAI/GOAT-stack/wiki/Client-Side-Docs)
  * [Server Side Docs](https://github.com/projectSHAI/GOAT-stack/wiki/Server-Side-Docs)
  * [End to End Testing](https://github.com/projectSHAI/GOAT-stack/wiki/End-to-End-Testing)
  * [Client Side Testing](https://github.com/projectSHAI/GOAT-stack/wiki/Client-Side-Testing)
  * [Server Side Testin](https://github.com/projectSHAI/GOAT-stack/wiki/Server-Side-Testing)
 
#Follow the GOAT

If you like our Fullstack make sure to stay informed and [get involved!](#contributing) 

Follow us on [Facebook page](https://www.facebook.com/goatstack/) to receive the latest news and updates!

# [![Facebook Page][FacebookBanner]](https://www.facebook.com/goatstack/)

If you end up not liking the GOAT Stack, that's ok too! Please drop by our [Reddit page](https://www.reddit.com/r/GOATStack/) and tell us why! We're always interested in new points of view, even the greatest can get better! 
# [![Reddit Page][RedditBanner]](https://www.reddit.com/r/GOATStack/)


<a name="reqs"></a>
# Required Technologies for your Development Environment

  * [gulp](http://gulpjs.com/) (standard privileges required)
  * [typescript](https://www.typescriptlang.org/)
  * [nodejs](https://nodejs.org/en/)
  * [mongodb](https://docs.mongodb.com/)
  * Your favorite browser
  * [Redux DevTools for Google Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
   * If you would like to develop on a browser which is not Chrome, then disable Redux DevTools, otherwise the app will fail to compile. In your project folder navigate to `app/app.module.ts`, then delete the argument `devTool.enhancer()` inside of the `this.ngRedux.configureStore()` method located in the constructor.

# Installation

## Windows

### 1) Install [Git](https://git-scm.com/downloads)
  * Note: You may need to configure system PATH to appropriate git command

### 2) Install [NodeJS](https://nodejs.org/en/)
  * Note: You may need to configure system PATH to appropriate node command

### 3) Install [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community)
  * Note: You may need to configure system PATH to appropriate mongod command

### 4) Install [Python](https://www.python.org/downloads/release/python-2712/) and C++ compiler
  * Note: Installing [Visual Studios Community](https://www.visualstudio.com/downloads/) will be a sufficiant compiler
    * if you do not want the full blown Visual Studios IDE then you can also download a standalone version of Visual Studio's build tools [here](http://landinghub.visualstudio.com/visual-cpp-build-tools)
     * Make sure to configure npm to use the correct c++ compiler using the following command `npm config set msvs_version 2015` 2015 is the version linked above, replace this number with your version if it differs. If you still have issues during npm install follow the install instructions [here](https://www.npmjs.com/package/node-gyp) for node-gyp.

### 5) Clone and Run

```sh
$ git clone https://github.com/projectSHAI/GOAT-stack # or clone your own fork
$ cd GOAT-stack
$ npm install -g gulp-cli typescript
$ npm install
$ # mongod runs as a child process!
$ gulp
```

## Linux

### 1) Install Git

```sh
$ sudo apt-get install git
```

### 2) Install [NodeJS](https://nodejs.org/en/download/package-manager/)

```sh
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

  or 7.x

```sh
$ curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

### 3) Install [MongoDB](https://docs.mongodb.com/manual/administration/install-on-linux/)

### 4) Clone and Run

```sh
$ git clone https://github.com/projectSHAI/GOAT-stack # or clone your own fork
$ cd GOAT-stack
$ npm install -g gulp-cli typescript
$ npm install
$ # mongod runs as a child process!
$ sudo gulp
```
> Note: gulp needs to be elevated with `sudo`, otherwise the mongod process which is executed in the gulp task runner will throw an error stating the port is already in use, even if it is free. This happens even when running mongod in its own terminal.

#Support the GOAT

#Made with GOAT Stack

Goatstack.com


#How to contribute

## Created By
 + [Jason Thomas](https://github.com/JCThomas4214)
 + [Christopher Haugen](https://github.com/projectSHAI)

<!--
# Deploying to Heroku

Make sure you have [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Heroku Documentation

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
-->



<!-- image references -->
[MongoDB]: https://github.com/JCThomas4214/Documentation/blob/master/GOAT/assets/mongo_logo_square.png?raw=true
[ExpressJS]: https://github.com/JCThomas4214/Documentation/blob/master/GOAT/assets/expressjs.png?raw=true
[Angular2]: https://github.com/JCThomas4214/Documentation/blob/master/GOAT/assets/angular2-logo.png?raw=true
[NodeJS]: https://github.com/JCThomas4214/Documentation/blob/master/GOAT/assets/nodejs-logo.png?raw=true
[Redux]: https://github.com/JCThomas4214/Documentation/blob/master/GOAT/assets/logo-redux.png?raw=true 
[Immutable]: https://github.com/JCThomas4214/Documentation/blob/master/GOAT/assets/Immutable-logo.png?raw=true 
[SocketIO]: https://github.com/JCThomas4214/Documentation/blob/master/GOAT/assets/SOCKETIOICON.png?raw=true
[Mongoose]: https://github.com/JCThomas4214/Documentation/blob/master/GOAT/assets/mongoose.png?raw=true
[Passport]: https://github.com/JCThomas4214/Documentation/blob/master/GOAT/assets/passport.png?raw=true
[Jasmine]: https://github.com/JCThomas4214/Documentation/blob/master/GOAT/assets/jasmine.png?raw=true
[Karma]: https://github.com/JCThomas4214/Documentation/blob/master/GOAT/assets/karma.png?raw=true
[Protractor]: https://github.com/JCThomas4214/Documentation/blob/master/GOAT/assets/protractor-logo.png?raw=true
[FacebookBanner]: https://github.com/JCThomas4214/Documentation/blob/master/GOAT/assets/facebook.png?raw=true
[RedditBanner]: https://github.com/JCThomas4214/Documentation/blob/master/GOAT/assets/Reddit-Logo-Transparent.png?raw=true

<!-- webpage links -->
[Reddit]: https://www.reddit.com/
[Facebook]: https://www.facebook.com/goatstack/
