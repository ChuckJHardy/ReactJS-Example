'use strict';

import React from 'react';
import Router from 'react-router';

import Routes from './config/routes';

window.React = React;

Router.run(Routes, Router.HistoryLocation, function (Handler) {
  React.render(
    <Handler/>, 
    document.getElementsByTagName('root')[0]
  );
});
