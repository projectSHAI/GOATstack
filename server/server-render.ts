import * as express from "express";
import * as fs from "graceful-fs";

// Universal
import { platformServer, renderModuleFactory } from "@angular/platform-server";

let AppServerModuleNgFactory = require("../ngc-aot/client/modules/app.server.module.ngfactory").AppServerModuleNgFactory;

// engine
const templateCache  = {};

function ngExpressEngine(setupOptions) {

  return function(filePath, options, callback){
    if (!templateCache[filePath]) {
      let file = fs.readFileSync(filePath);
      templateCache[filePath] = file.toString();
    }
    renderModuleFactory(AppServerModuleNgFactory, {
      document: this.fs.readFileSync(filePath).toString(),
      url: "http://localhost:8443"
    })
    .then( str => {
      callback(null, str);
    });
  };
}

// Initialize express

export function serverSideRendering(app) {
  // Universal set express engine  to bootstrap the app on the server

    app.engine("html", ngExpressEngine({
      baseUrl: "http://localhost:8443",
      bootstrap: [AppServerModuleNgFactory]
    }));

    app.set("view engine", "html");
}
