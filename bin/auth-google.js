#!/usr/bin/env node
'use strict';

const quickstart = require('../src/quickstart.js');

quickstart.login({}, null, (err, callback) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(callback);
});
