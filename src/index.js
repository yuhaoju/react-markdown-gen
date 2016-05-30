"use strict";

var fs = require('fs')
var path = require('path')
var program = require('commander')
var reactDocs = require('react-docgen')

var markdown = require('../markdown')

module.exports = function(name, input, output) {
    fs.readFile(input, function(err, data) {
        if (err) throw err;

        var componentInfo = reactDocs.parse(data)
        var markdownString = markdown(name, componentInfo, input)

        if (typeof output === 'string') {
            fs.writeFile(output, markdownString, function(err) {
                if (err) throw err;

                console.log("markdown saved in " + output);
            })
        } else {
            console.log(markdownString)
        }
    });
}
