# react-markdown-gen
use [react-docgen](https://github.com/reactjs/react-docgen/) extract information from React component, and convert to markdown.

## Install

```sh
npm install -g react-markdown-gen
```

##Usage: 
```sh
rmd <component_name> <input_file> [output_file]
```

##example
```sh
rmd Calendar index.js readme.md
# If no output file exists, information will be printed out on your terminal.
rmd Calendar index.js
```

