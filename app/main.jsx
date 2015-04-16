'use strict';

import React from 'react';
import App from './components/app';

window.React = React;

var __REACT_DEVTOOLS_GLOBAL_HOOK__ = window.parent.__REACT_DEVTOOLS_GLOBAL_HOOK__;

var mountNode = document.getElementsByTagName('root')[0];

React.render(
  <App mountNode={mountNode} />,
  mountNode
);
