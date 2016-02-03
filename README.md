# react-markdown-gen
use [react-docgen](https://github.com/reactjs/react-docgen/) extract information from React component, and convert to markdown.

## Install

```
npm install -g react-markdown-gen
```

##Usage: 
```
rmd <component_name> <input_file> [output_file]
```

##example
```sh
rmd Calendar index.js readme.md

#If no output file exists, markdown string will be printed out.
rmd Calendar index.js
```

