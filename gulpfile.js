/*
==============================================================================================
Gulfile js
==============================================================================================
// There are many benifits to using typescript and es6 so we've extended
// gulpfile to typescript
//
// Although gulp cannot read typescript files, we are able to overcome this
// by evaluating a typescript compile of the .ts version of the gulpfile
// This .ts file can be found in config/gulp/gulpclass.ts
*/
'use strict';

eval(require('typescript')
  .transpile(require('graceful-fs')
  .readFileSync('./config/gulp/gulpclass.ts')
  .toString()));
