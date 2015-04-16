'use strict';

import React from 'react';
import Router from 'react-router';

var Link = Router.Link;

export default class Home extends React.Component {
  render () {
    return (
      <div>
        <Link to='login'>Login</Link>
        <Link to='register'>Register</Link>
      </div>
    );
  }
}

Home.displayName = 'Home';
