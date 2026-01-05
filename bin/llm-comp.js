#!/usr/bin/env node
'use strict';

const path = require('path');

function main() {
  const cliPath = path.join(__dirname, '..', 'dist', 'cli.js');
  // eslint-disable-next-line import/no-dynamic-require
  require(cliPath);
}

main();
