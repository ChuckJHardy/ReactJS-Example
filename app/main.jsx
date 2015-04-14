var React = window.React = require('react');

var __REACT_DEVTOOLS_GLOBAL_HOOK__ = window.parent.__REACT_DEVTOOLS_GLOBAL_HOOK__;

var mountNode = document.getElementsByTagName('root')[0];

var App = require('./components/App');

React.render(
  <App mountNode={mountNode} />,
  mountNode
);
