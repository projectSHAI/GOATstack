# This Stack is Currently in Development

# [![MongoDB Logo](http://www.mfactorengineering.com/img/mongo_logo_square.png)](https://www.mongodb.com/)[![ExpressJS Logo](http://nodejs-cloud.com/img/128px/expressjs.png)](http://expressjs.com/)[![Angular2 Logo](http://www.opinya.co.il/assets/angularjs-logo-36eaa6e1dedf111b67ced19c73d21851.png)](https://angular.io/)[![NodeJS Logo](http://www.alex-arriaga.com/wp-content/uploads/2015/10/nodejs-logo.png)](https://nodejs.org/en/) MEA2N Stack

#### Main Technologies
[![MongoDB](https://www.mongodb.org/), [![Express](http://expressjs.com/), [Angular2](https://angular.io/), and [Node.js](http://www.nodejs.org/) are the primary technologies utilized in this purpose built stack. Inspired by [MeanJS](https://github.com/meanjs/mean) and [AngularFullstack](https://github.com/angular-fullstack/generator-angular-fullstack), MEA2N has been built to give you an organized and efficient way to start developing secure MEAN web apps. 
#### Integrated Libraries and Modules
MEA2N includes SocketIO, Mongoose, Passport out of the box. These extra libraries have been added to address common boilerplate needs; such as user login, authentication, security, and communication between client and server, etc.

##required technologies for your development environment
  * Gulp
  * typescript
  * npm
  * nodejs
  * mongodb

# Getting-started

## Windows

### 1) Install [![Git](https://git-scm.com/downloads)
  * Note: You may need to configure system PATH to appropriate git command 

### 2) Install [NodeJS](https://nodejs.org/en/)
  * Note: You may need to configure system PATH to appropriate node command 
  
### 3) Install [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community)
  * Note: You may need to configure system PATH to appropriate mongod command 
  
### 4) Install [Python](https://www.python.org/downloads/release/python-2712/) and C++ compiler
  * Note: Installing [Visual Studios Community](https://www.visualstudio.com/downloads/) will be a sufficiant compiler 
  
### 5) Clone and Run

```sh
$ git clone https://github.com/projectSHAI/mea2n-full-stack # or clone your own fork
$ cd mea2n-full-stack
$ npm install -g gulp-cli typescript
$ npm install
$ # mongod in a different cmd prompt
$ gulp
```

## Linux

### 1) Install Git

```sh
$ sudo apt-get install git
```

### 2) Install [NodeJS](https://nodejs.org/en/download/package-manager/)

```sh
$ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

  or 6.x

```sh
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

### 3) Install [MongoDB](https://docs.mongodb.com/manual/administration/install-on-linux/)

### 4) Clone and Run

```sh
$ git clone https://github.com/projectSHAI/mea2n-full-stack # or clone your own fork
$ cd mea2n-full-stack
$ npm install -g gulp-cli typescript
$ npm install
$ # mongod in a different terminal
$ gulp
```

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
