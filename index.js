#!/usr/bin/env node
"use strict";

var fs = require('fs')
var markdown = require('./markdown')
var path = require('path')
var program = require('commander')
var reactDocs = require('react-docgen')

program
    .version('0.0.1')
    .usage("[options] <name> <input> [output]")
    .action(function(name, input, output) {
        fs.readFile(input, function(err, data) {
            if (err) throw err;

            var componentInfo = reactDocs.parse(data)
            var markdownString = markdown(name, componentInfo)

            if (typeof output === 'string') {
                fs.writeFile(output, markdownString, function(err) {
                    if (err) throw err;

                    console.log("markdown saved in " + output);
                })
            } else {
                console.log(markdownString)
            }
        });
    })
    .parse(process.argv);

if (program.args.length === 0) {
    console.log('no component name')
    process.exit()
} else if (program.args.length === 1) {
    console.log('no input file')
    process.exit()
}
