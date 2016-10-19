'use strict';

eval(require("typescript")
  .transpile(require("fs")
  .readFileSync("./config/gulp/gulpclass.ts")
  .toString()));
