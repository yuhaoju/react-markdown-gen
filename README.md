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

For the following component

```js
import React, {Component} from 'react';

/**
 * General component description.
 */
export default class MyComponent extends Component {
    render() {
        // ...
    }
}

MyComponent.defaultProps = {
    showPagination: true,
    paginationColor: '#09c',
    paginationSpace: 20
}

MyComponent.propTypes = {
    /** Description of prop "children". */
    children: React.PropTypes.node.isRequired,
    showPagination: React.PropTypes.bool,
    paginationColor: React.PropTypes.string,
    paginationSpace: React.PropTypes.number,
}
```

we are getting this output:

MyComponent
========

General component description.

Props
-----
Prop                  | Type     | Default                   | Required | Description
--------------------- | -------- | ------------------------- | -------- | -----------
children|node||Yes|Description of prop "children".
showPagination|bool|true|No|
paginationColor|string|'#09c'|No|
paginationSpace|number|20|No|
