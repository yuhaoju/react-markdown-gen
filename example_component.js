import React, { Component } from 'react';

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
