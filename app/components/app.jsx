'use strict';

import React from 'react';
import Router from 'react-router';

import Cards from './cards';

var RouteHandler = Router.RouteHandler;

export default class App extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <RouteHandler />
      </div>
    );
  }
}

App.displayName = 'Application';
