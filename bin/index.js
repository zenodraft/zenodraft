#! /usr/bin/env node
const { zenodraft_command } = require('../dist/cli')



zenodraft_command().parse(process.argv)
