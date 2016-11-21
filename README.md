## Yo Generator Project underway [here](https://github.com/JCThomas4214/GOAT-yeoman)
### Possible generators

  + yo goat-stack [?name]
  + yo goat-stack:component [?name]
  + yo goat-stack:service [?name]
  + yo goat-stack:directive [?name]
  + yo goat-stack:pipe [?name]
  + yo goat-stack:actions [?name]
  + yo goat-stack:store-item [?name]
  + yo goat-stack:endpoint [?name]
  
### All generators finished (11/19) merge of GOAT-stack & GOAT-yeoman underway...
  
___

![Main Banner](https://github.com/JCThomas4214/Documentation/blob/master/GOAT/assets/GOAT-banner.jpg?raw=true)

> Version 1.0.0

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
  
###Table of Contents

1. [What's new?](#whatsnew)
2. [Follow the GOAT](#followtheGOAT)
3. [Problem](#problem)
4. [Solution](#solution)
5. [Technologies used to build the GOAT stack](#allTech)
  * [Main Technologies](#tech)
  * [Integrated Libraries and Modules](#libs)
7. [Required Technologies for your Development Environment](#reqs)
8. [Quick Start](#quickstart)
  * [Windows](#windows)
  * [Linux](#linux)
9. [Support The GOAT](#supportGOAT) 
10. [Made with GOAT stack](#madewith)
11. [Contributing](#contributing)
12. [Creators](#creators)

<a name="whatsnew"></a>
#What's new?

 December 1st - This is launch day, the GOAT Stack is finally closing in on release!
 
 The final items left on our todo list are polishing items, which include:
 - ~~Implementation of AOT(Ahead-of-Time) rendering.~~
 - Finishing the Demonstration webapp.
 - Creating thorough, and well structured documentation.
 - Finishing our [Facebook page](https://www.facebook.com/goatstack/).
 - Finishing our [Reddit page](https://www.reddit.com/r/GOATStack/).
 - ~~Making sure SEO and webcrawlers are optimized.~~
 - Making sure all the Goats are well fed and happy!
 
<a name="followtheGOAT"></a>
#Follow the GOAT

If you like our Fullstack make sure to stay informed and [get involved!](#contributing) 

Follow us on [Facebook page](https://www.facebook.com/goatstack/) to receive the latest news and updates!

# [![Facebook Page][FacebookBanner]](https://www.facebook.com/goatstack/)

If you end up not liking the GOAT Stack, that's ok too! Please drop by our [Reddit page](https://www.reddit.com/r/GOATStack/) and tell us why! We're always interested in new points of view, even the greatest can get better! 
# [![Reddit Page][RedditBanner]](https://www.reddit.com/r/GOATStack/)


![Houston we have a problem](https://github.com/JCThomas4214/Documentation/blob/master/GOAT/assets/Houston-we-have-a-problem-banner.jpg?raw=true)

<a name="problem"></a>
#Problem

<img src="https://github.com/JCThomas4214/Documentation/blob/master/GOAT/assets/critical-space-ship.png?raw=true" align="right">

### 1. Initial page load speed 
 * 40% of users leave a webpage that takes more than 3 seconds to load
 
### 2. Scaleable resources
 * If an App's resources cannot scale with real time user traffic it will crash during traffic spikes, and be wasteful when there is low user activity

### 3. Scaleable Architecture
 * If a program's dataflow is not structured conicously a once easily managed program made of 10,000 lines of code becomes read-only once it reaches 100,000 lines of code. data flows become unruley and nested, and unintended dependencies occur in the application tree. This makes maintainability a mess, and refactoring a nightmare.

### 4. User to User real time interaction
 * User interaction is a key success factor in regards to having a community adopt, and grow wih your projet. The more seamless user interaction with your website, and with each other, the better chance the project has at success.


<a name="solution"></a>
#Solution

<img src="https://github.com/JCThomas4214/Documentation/blob/master/GOAT/assets/optimized-space-ship.png?raw=true" align="right">

### 1. Initial page load speed 
 * The GOAT stack capitilizes on Angular2's [Ahead-of-Time](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html) server side rendering. Having the server do the heavy lifting at build time allows us to serve a pre-rendered file to the client. Instantly serving the client a visual while capturing user events which are then que'd up to execute as soon as the app becomes functional further closes the gap between the web and native applications.
 
### 2. Scaleable resources
 * MongoDB fits the developer paradigm very well. with proper [indexing](https://docs.mongodb.com/manual/indexes/) and [schema design](https://docs.mongodb.com/v3.2/core/data-model-design/) daabase response times will be linear, or consant. Also, the apability of [sharding](https://docs.mongodb.com/manual/sharding/) removes the bottle-neck of datasize. 

### 3. Scaleable Architecture
 * [Immmutability](https://en.wikipedia.org/wiki/Immutable_object) makes app data predictable at any scale, and [redux](http://redux.js.org/docs/introduction/) makes dataflow manageble by eliminating many-to-many relationships, this completely eliminates tangled nests of components, making them more modular. Redux places the entire app's [state tree](http://redux.js.org/docs/Glossary.html#state) in one focal area which is the [store](http://redux.js.org/docs/api/Store.html). 

### 4. User to User real time interaction
 * Angular2's [two way data binding](https://angular.io/docs/ts/latest/guide/template-syntax.html#!#two-way) and [Socket.io](http://socket.io/) is an effective combination. Two way data binding allows real time interaction between the website and a single client without the need for that user to ever reload a page. Socket.io takes this one step further and automatically updates any one user's changes on every other connected device in real time without anyone ever needing to refrsh their browser. 

<a name="allTech"></a>
# Technologies used to build the GOAT stack
<a name="tech"></a>
## Main Technologies

[![MongoDB Logo][MongoDB]](https://www.mongodb.com/)[![ExpressJS Logo][ExpressJS]](http://expressjs.com/)[![Angular2 Logo][Angular2]](https://angular.io/)[![NodeJS Logo][NodeJS]](https://nodejs.org/en/)

[MongoDB](https://www.mongodb.org/), [Express](http://expressjs.com/), [Angular2](https://angular.io/), and [Node.js](http://www.nodejs.org/) are the primary technologies utilized in this purpose built stack. Inspired by [MeanJS](https://github.com/meanjs/mean) and [AngularFullstack](https://github.com/angular-fullstack/generator-angular-fullstack), GOAT has been built to give you an organized and efficient way to start developing secure MEAN web apps with scalability and efficiency in mind.

### MongoDB
MongoDB is an open sourced database which uses a flexible document data model, similar to JSON. Instead of using tables and rows, MongoDB uses key-value pairs to achieve fast, and efficient querying capabilities. This flexibility allows development teams to evolve the data model rapidly as their application requirements change. 

Read the [MongoDB documentaion](https://docs.mongodb.com/) in order to get a better understanding to how this scaleable database can benefit your team!

<a href="https://www.mongodb.com/mongodb-architecture">
  <img alt="MongoDB Architecture" src="https://www.mongodb.com/assets/images/products/nexus-architecture.png" width="100%">
</a>
> The architecture, and core concepts behind MongoDB

### Express.js
Express.js is a web application framework for NodeJS. This framework comes with a robust set of HTTP utility's and middleware aimed at helping you develop stable, efficient, and predictable API's quickly and easily. This framework takes the focus off of boilerplate code, and let's the developer focus on more important design aspects such as data flows.

Read the [Express.js documentation](http://expressjs.com/en/api.html)  in order to get a better understanding on how to responsibly manage and direct data from one point to another in a secure and efficient manner.

<img alt="Express Middleware Pattern" src="http://image.slidesharecdn.com/introtonode-140914093424-phpapp01/95/intro-to-nodejs-14-638.jpg?cb=1410687757" width="100%">
> Above is a visual representation of the HTTP dataflow which gets filtered, altered, and/or sanitized before it reaches the main task created by you.

### Angular2
Angular2 is a frontend framework which aims to close the gap between native application and website.

Read the [Angular2 documentation](https://angular.io/docs/ts/latest/) in order to get a better understanding on how to create a seamless user experience which feels more like a native app.

<a href="https://angular.io/docs/ts/latest/guide/architecture.html">
  <img alt="Angular2 Architecture" src="https://angular.io/resources/images/devguide/architecture/overview2.png" width="100%">
</a>
> Angular2 emphasizes on modularity, which increases stability and ease of testing. This is accomplished by their eight main building blocks which are defined in the above infographic; click on the image to learn more.

### NodeJS
Node.js is a javascript server that is runtime built and runs on [Chrome's V8 Javascript engine](https://developers.google.com/v8/)

We chose Node.js for two reasons:

1. Node.js uses something called the event-driven model; it is a non-blocking I/O model, which is depicted below.
2. Node.js uses [npm](https://www.npmjs.com/), which is the largest package ecosystem in the world. This means there are countless open sourced libraries your team can capitaliize on to accomplish your goals and realize your visions.

  <img alt="The EventDriven model" src="http://image.slidesharecdn.com/nodejsslideshare-121104022408-phpapp01/95/nodejs-event-driven-concurrency-for-web-applications-51-638.jpg?cb=1351996088" width="100%">
> Read the [Node.js documentation](https://nodejs.org/en/docs/) in order to get a better understanding on how to utilize this server to make your website lightweight and efficient.

<a name="libs"></a>
## Integrated Libraries and Modules

[![Redux Logo][Redux]](http://redux.js.org/)[![Immutable Logo][Immutable]](https://facebook.github.io/immutable-js/)[![SocketIO Logo][SocketIO]](http://socket.io/)[![Mongoose Logo][Mongoose]](http://mongoosejs.com/)[![Passport Logo][Passport]](http://passportjs.org/)[![Jasmine Logo][Jasmine]](http://jasmine.github.io/)[![Karma Logo][Karma]](https://karma-runner.github.io/1.0/index.html)[![Protractor Logo][Protractor]](http://www.protractortest.org/#/)
___

GOAT includes the [Redux](http://redux.js.org/) architechture, [Immutable](https://facebook.github.io/immutable-js/) data structuring, [SocketIO](http://socket.io/), [Mongoose](http://mongoosejs.com/), [Passport](http://passportjs.org/), [Jasmine](http://jasmine.github.io/), [Karma](https://karma-runner.github.io/1.0/index.html), and [Protractor](http://www.protractortest.org/#/) out of the box. These extra libraries have been added to address common boilerplate needs; such as server and client testing, user login, authentication, and communication between client and server, etc.

### Redux
__What it does:__ 

__Why we use it:__

### Immutable
__What it does:__

__Why we use it:__

### SocketIO
__What it does:__ "Socket.IO enables real-time bidirectional event-based communication.
It works on every platform, browser or device, focusing equally on reliability and speed." - [Socket IO](http://socket.io/)

__Why we use it:__ Socket IO takes the web one step closer to the territory of native applications. It gives our users the capability of seeing update information on the website without the need to reload the page. It also gives users the ability to interact with other users in real time, utilizing technologies like live chat.

### Mongoose
__What it does:__ "Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box." - [Mongoose](http://mongoosejs.com/)

__Why we use it:__ Mongoose is a framework that makes modeling MongoDB Documents a breeze. Mongoose handles a majority of the boilerplate needed in schema design letting the developer concentrate on more important concepts.

### Passport
__What it does:__ "Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more." -  [Passport](http://passportjs.org/)

__Why we use it:__ We decided to use Passport due to its modular architecture its sole purpose is authentication, and it seperates all other concerns delegating them to the application. This makes Passport maintainable, and keeps code clean. Also, passport has a variety of over 300 different authentication strategies, meaning developers will not be limited on how they authenticate their users.

### Jasmine
__What it does:__ "Jasmine is a behavior-driven development framework for testing JavaScript code. It does not depend on any other JavaScript frameworks. It does not require a DOM. And it has a clean, obvious syntax so that you can easily write tests." - [Jasmine](https://jasmine.github.io/)

__Why we use it:__ Jasmine is fast, and has no third party dependencies. This means there is less varience between stack implementations when compared to a framework like Mocha which could utilize any assertion library. The increased predictability of a static assertion library without compromise to performance or functionality made Jasmine more stable in our eyes.

### Karma
__What it does:__ Karma is a test runner used for unit testing. Created by the Angular team it is "essentially a tool which spawns a web server that executes source code against test code for each of the browsers connected. The results of each test against each browser are examined and displayed via the command line to the developer such that they can see which browsers and tests passed or failed." -[Karma](https://karma-runner.github.io/1.0/intro/how-it-works.html)

__Why we use it:__ Karma was developed by the Angular team specifically for Angular unit testing. Karma also seamelessly integrates with the Jasmine testing framework. Since both Karma and Protractor use Jasmine this lets us test the whole stack with a single framework, making the developer's  workflow more consistent.

### Protractor

__What it does:__ "Protractor is an end-to-end test framework for AngularJS applications. Protractor runs tests against your application running in a real browser, interacting with it as a user would." -[Protractor](http://www.protractortest.org/#/)

__Why we use it:__ We chose Protractor for E2E testing because it allows the developer to test Angular-specific elements in an efficient manner out of the box. Less set-up work and more concise code means more concentration on developing and testing what matters, and less time wasted on tedious boilerplate code. On a side note both Protractor and Karma use Jasmine this lets us test the whole stack with a single framework, making the developer's  workflow more consistent.


<a name="reqs"></a>
# Required Technologies for your Development Environment

  * [gulp](http://gulpjs.com/) (standard privileges required)
  * [typescript](https://www.typescriptlang.org/)
  * [nodejs](https://nodejs.org/en/)
  * [mongodb](https://docs.mongodb.com/)
  * Your favorite browser
  * [Redux DevTools for Google Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
   * If you would like to develop on a browser which is not Chrome, then disable Redux DevTools, otherwise the app will fail to compile. In your project folder navigate to `app/app.module.ts`, then delete the argument `devTool.enhancer()` inside of the `this.ngRedux.configureStore()` method located in the constructor.

<a name="quickstart"></a>
# Quick Start
<a name="windows"></a>
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

<a name="linux"></a>
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
$ gulp
```

<a name="supportGOAT"></a>
#Support the GOAT

<a name="madewith"></a>
#Made with GOAT Stack

Goatstack.com


<a name="contributing"></a>
#How to contribute

<a name="creators"></a>
#Created By

##[Jason Thomas](https://github.com/JCThomas4214)

##[Christopher Haugen](https://github.com/projectSHAI)

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
