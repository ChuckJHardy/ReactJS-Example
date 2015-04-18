'use strict';

var React = require('react');
var Router = require('react-router');

var Routes = require('./config/routes');

window.React = React;

require('normalize.css/normalize.css');
require('./styles/main.scss');

Router.run(Routes, function (Handler) {
  React.render(
    <Handler/>,
    document.getElementsByTagName('root')[0]
  );
});
