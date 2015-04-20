'use strict';

var React = require('react');
var Router = require('react-router');
var Airbrake = require('airbrake-js');

var Routes = require('./config/routes');

window.React = React;

window.airbrake = new Airbrake({
  projectId: __AIRBRAKE_PRODUCT_ID__,
  projectKey: __AIRBRAKE_PRODUCT_KEY__
});

require('normalize.css/normalize.css');
require('./styles/main.scss');

Router.run(Routes, Router.HistoryLocation, function (Handler) {
  React.render(
    <Handler/>,
    document.getElementsByTagName('root')[0]
  );
});
