#!/usr/bin/env node
var program = require('commander');
var terminate = require('./cd-terminate')


program
 .arguments('<cluster>')
//  .option('-d, --dryrun)
 .action(function(cluster) {
	 console.log('Terminating: %s cluster',cluster);
	 terminate(cluster)
 })
 .parse(process.argv);