# Check out the [Demo App](http://www.goatstack.com/)!

![build](https://circleci.com/gh/JCThomas4214/GOAT-stack/tree/master.svg?style=shield)
[![npm version](https://img.shields.io/npm/v/generator-goatstack.svg)](https://www.npmjs.com/package/generator-goatstack)
[![Dependency Status](https://img.shields.io/david/projectSHAI/GOATstack.svg)](https://david-dm.org/projectSHAI/GOAT-stack/tree/master.svg)
[![Dev-Dependency Status](https://img.shields.io/david/dev/projectSHAI/GOATstack.svg)](https://david-dm.org/projectSHAI/GOAT-stack/tree/master.svg#info=devDependencies)

![Main Banner](https://github.com/JCThomas4214/Documentation/blob/master/GOAT/assets/GOAT-banner.jpg?raw=true)

# Quick Start 

```sh
$ [sudo] npm install -g yo generator-goatstack
$ mkdir [dirName] && cd [dirName]
$ [sudo] yo goatstack [name?]
$ # [sudo] mongod in another terminal!
$ [sudo] npm start
$ # dev environment served to http://localhost:1701
```

# What's new? v2.x

* ~~SystemJS~~ => Webpack
  * client-side and server-side bundling with Webpack
  * removal of gulp task runner / moved to npm scripts
  * simplified config folder structure
* Expanded the GOAT universe (client-side demo)
  * explore the depths of the ocean to learn more about the stack
  * mobile compatable

# Future updates

* Server-side render with Angular2 Universal


# Documentation Wiki

  * [Home](https://github.com/projectSHAI/GOAT-stack/wiki)
  * [FAQ](https://github.com/projectSHAI/GOAT-stack/wiki/FAQ)
  * [Dev-Tools](https://github.com/projectSHAI/GOAT-stack/wiki/Dev-Tools)
  * [NPM Scripts](https://github.com/projectSHAI/GOAT-stack/wiki/NPM-Scripts)
  * [Client Side Docs](https://github.com/projectSHAI/GOAT-stack/wiki/Client-Side-Docs)
  * [Server Side Docs](https://github.com/projectSHAI/GOAT-stack/wiki/Server-Side-Docs)
  * [End to End Testing](https://github.com/projectSHAI/GOAT-stack/wiki/End-to-End-Testing)
  * [Client Side Testing](https://github.com/projectSHAI/GOAT-stack/wiki/Client-Side-Testing)
  * [Server Side Testing](https://github.com/projectSHAI/GOAT-stack/wiki/Server-Side-Testing)
 
### **For more information about the stack click [here](https://github.com/projectSHAI/GOAT-stack/wiki)**
___

# Why GOAT-stack?

![Houston we have a problem](https://github.com/JCThomas4214/Documentation/blob/master/GOAT/assets/Houston-we-have-a-problem-banner.jpg?raw=true)

<a name="problem"></a>
## Problem

<img src="https://github.com/JCThomas4214/Documentation/blob/master/GOAT/assets/critical-space-ship.png?raw=true" align="right">

### 1. Initial page load speed 
 * 40% of users leave a webpage that takes more than 3 seconds to load
 
### 2. Scaleable resources
 * If an App's resources cannot scale with real time user traffic it will crash during traffic spikes, and be wasteful when there is low user activity

### 3. Scaleable Architecture
 * If a program's dataflow is not structured conicously a once easily managed program made of 10,000 lines of code becomes a hinderance once it reaches 100,000 lines of code. Data flows become unruley and nested, and unintended dependencies occur in the application tree. This makes maintainability a mess, and refactoring a nightmare.

### 4. User to User real time interaction
 * User interaction is a key success factor in regards to having a community adopt, and grow with your projet. The more seamless user interaction is with your website, and with each other, the better chance the project has at success.


<a name="solution"></a>
## Solution

<img src="https://github.com/JCThomas4214/Documentation/blob/master/GOAT/assets/optimized-space-ship.png?raw=true" align="right">

### 1. Initial page load speed 
 * The GOAT stack capitilizes on Angular2's [Ahead-of-Time](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html) server-side compilation. Having the server do the heavy lifting at build time allows us to serve pre-compiled views for the client to load. This dramatically decreases initial load time.
 
### 2. Scaleable resources
 * MongoDB fits the developer paradigm very well. with proper [indexing](https://docs.mongodb.com/manual/indexes/) and [schema design](https://docs.mongodb.com/v3.2/core/data-model-design/) database response times will be linear, or consant. Also, the capability of [sharding](https://docs.mongodb.com/manual/sharding/) removes the bottle-neck of datasize. 

### 3. Scaleable Architecture
 * [Immmutable](https://en.wikipedia.org/wiki/Immutable_object) makes app data predictable at any scale, and [redux](http://redux.js.org/docs/introduction/) makes dataflow manageble by eliminating many-to-many relationships, this completely removes tangled nests of components, making them more modular. Redux places the entire app's [state tree](http://redux.js.org/docs/Glossary.html#state) in one focal area which is the [store](http://redux.js.org/docs/api/Store.html). 

### 4. User to User real time interaction
 * Angular2's [two way data binding](https://angular.io/docs/ts/latest/guide/template-syntax.html#!#two-way) and [Socket.io](http://socket.io/) is an effective combination. Two way data binding allows real time interaction between website and client without the need to reload pages. Socket.io takes this one step further and automatically updates changes on every connected device in real time without the need to refresh the browser. This feature can be narrowed or widened.
 

# Follow the GOAT

If you like our Fullstack make sure to stay informed and [get involved!](#contributing) 

Follow us on [Facebook page](https://www.facebook.com/goatstack/) to receive the latest news and updates!

[![Facebook Page][FacebookBanner]](https://www.facebook.com/goatstack/)

If you end up not liking the GOAT Stack, that's ok too! Please drop by our [Reddit page](https://www.reddit.com/r/GOATStack/) and tell us why! We're always interested in new points of view, even the greatest can get better! 

[![Reddit Page][RedditBanner]](https://www.reddit.com/r/GOATStack/)


<a name="reqs"></a>
# Required Technologies for your Development Environment

  * [typescript](https://www.typescriptlang.org/)
  * [nodejs](https://nodejs.org/en/)
  * [mongodb](https://docs.mongodb.com/)
  * Your favorite browser (Chrome is prefered because of Devtools)
  * [Redux DevTools for Google Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

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
$ npm install -g yo generator-goatstack
$ mkdir GOATstack && cd GOATstack
$ yo goatstack [name?]
$ # mongod in another terminal!
$ npm start
$ # dev environment served to http://localhost:1701
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
$ sudo npm install -g yo generator-goatstack
$ mkdir GOATstack && cd GOATstack 
$ sudo yo goatstack [name?]
$ # sudo mongod in another terminal!
$ sudo npm start
$ # dev environment served to http://localhost:1701
```
> Note: npm needs to be elevated with `sudo`, otherwise child_process will throw errors and/or webpack-dev-server will not serve.

# Deploying to Heroku
![Deployment Banner](https://github.com/JCThomas4214/Documentation/blob/master/GOAT/assets/goat-deploy-banner.png)

Make sure you have [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

### 1) Login with your Heroku credentials

```sh
$ heroku login
```

### 2) Run the gulp task

```sh
$ [sudo] npm run deploy:heroku
```

## Yo Generator Project [here](https://github.com/JCThomas4214/GOAT-yeoman)

## Created By
 + [Jason Thomas](https://github.com/JCThomas4214)
 + [Christopher Haugen](https://github.com/projectSHAI)


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
