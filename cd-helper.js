#!/usr/bin/env node
var program = require('commander');

program
  .version('0.0.1')
	.command('terminate', 'cluster commands')
	.parse(process.argv);