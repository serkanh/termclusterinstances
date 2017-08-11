#!/usr/bin/env node
var program = require('commander')

program
	.command('cluster', 'terminates a given cluster')
	.command('lb', 'terminates a given elb')
	.parse(process.argv);