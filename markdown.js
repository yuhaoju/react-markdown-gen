'use strict'
var VerEx = require('verbal-expressions')
var fs = require('fs')

function stringOfLength(string, length) {
    var newString = ''
    for (var i = 0; i < length; i++) {
        newString += string;
    }
    return newString;
}

function generateTitle(name) {
    return name + '\n' + stringOfLength('=', name.length) + '\n';
}

function generateDesciption(description) {
    return description ? description + '\n' : '';
}

function generatePropType(type) {
    var values;
    if (Array.isArray(type.value)) {
        values = '(' +
            type.value.map(function(typeValue) {
                return typeValue.name || typeValue.value;
            }).join('|') +
            ')';
    } else {
        values = type.value;
    }

    return type.name + (values ? values : '');
}

function generatePropDefaultValue(value) {
    return value.value;
}

function generateProp(propName, prop) {
    prop.defaultValue = prop.defaultValue ? generatePropDefaultValue(prop.defaultValue) : ''
    prop.description = prop.description ? prop.description : ''
    prop.type = prop.type ? generatePropType(prop.type) : ''
    prop.required = prop.required ? 'Yes' : 'No'

    return (
        propName +
        '|' + prop.type +
        '|' + prop.defaultValue +
        '|' + prop.required +
        '|' + prop.description
    );
}

function generateProps(props) {
    var propsTitle = 'Props'

    return (
        propsTitle + '\n' + stringOfLength('-', propsTitle.length) + '\n' +
        'Prop                  | Type     | Default                   | Required | Description' + '\n' +
        '--------------------- | -------- | ------------------------- | -------- | -----------' + '\n' +
        Object.keys(props).map(function(propName) {
            return generateProp(propName, props[propName]);
        }).join('\n')
    );
}

function generateExample(description) {
    var exampleLineReg = VerEx()
        .startOfLine()
        .anything()
        .then('@example ')
        .anythingBut('\n')

    var result = exampleLineReg.exec(description)
    if(result){
        var exampleContent = result[0].replace('@example ', ''),
            examplePath = VerEx().startOfLine().anythingBut('[').exec(exampleContent),
            exampleLines = VerEx().then('[').word().then('-').word().then(']').exec(exampleContent)

            console.log(examplePath);
        if(examplePath && exampleLines) {
            var exampleFile = fs.readFileSync(examplePath[0], {encoding: 'utf8'}),
                startLineNo = exampleLines[0].split('-')[0].slice(1),
                endLineNo = exampleLines[0].split('-')[1].slice(0, -1)

            var lines = exampleFile.split('\n'),
                lineNo = 0,
                copiedExampleContent = ''

            while(lineNo < lines.length) {
                if(lineNo >= startLineNo && lineNo < endLineNo) {
                    copiedExampleContent += lines[lineNo] + '\n'
                }
                lineNo ++
            }

            var exampleTitle = 'Example:'
            return '\n' + exampleTitle + '\n' + stringOfLength('-', exampleTitle.length) + '\n' + copiedExampleContent
        }
    }

    return ''
}

function generateMarkdown(name, reactAPI) {
    var markdownString =
        generateTitle(name) + '\n' +
        generateDesciption(reactAPI.description) + '\n' +
        generateProps(reactAPI.props) + '\n' +
        generateExample(reactAPI.description);

    return markdownString;
}

module.exports = generateMarkdown;
