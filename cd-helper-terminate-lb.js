#!/usr/bin/env node
var program = require('commander')

program.option('-l, --lb <lb>', 'terminate lb')
.parse(process.argv); 
console.log('program.lb:',program.lb)
