/*
==============================================================================================
Gulfile js
==============================================================================================
// The gulp compiler cannot read typescript files.
// In order to overcome this the heart of our gulpfile has been outsourced into a typescript file
// This .ts file can be found in root/conig/gulp/gulpclass.ts
// we then transpile it into javascript and include it into this file in buildtime
// this way the gulp compiler receives js code, and we can benefit from writing in typescript!
*/
'use strict';

eval(require("typescript")
  .transpile(require("fs")
  .readFileSync("./config/gulp/gulpclass.ts")
  .toString()));
