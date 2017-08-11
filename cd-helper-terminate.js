#!/usr/bin/env node
var program = require('commander')

program
	.command('cluster', 'terminates a given cluster')
	.parse(process.argv);