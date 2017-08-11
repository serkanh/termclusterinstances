#!/usr/bin/env node
var program = require('commander')

program
	.command('terminate', 'terminates a given cluster')
	.parse(process.argv);