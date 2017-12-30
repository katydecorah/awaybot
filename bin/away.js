#!/usr/bin/env node
'use strict';

const bot = require('../index.js');

bot.away({}, null, (err, callback) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(callback);
});
