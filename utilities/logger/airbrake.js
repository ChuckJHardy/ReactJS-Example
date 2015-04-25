'use strict';

module.exports = function(error, component, params) {
  window.airbrake.push({
    error: error,
    context: { component: component },
    environment: { navigator_vendor: window.navigator.vendor },
    params: params
  });
};
