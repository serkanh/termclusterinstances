#!/usr/bin/env node
var program = require('commander');

program
  .version('0.0.1')
	.command('terminate', 'terminate a given cluster instances')
	.parse(process.argv);