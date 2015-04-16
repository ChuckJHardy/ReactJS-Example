'use strict';

var ReactTools = require('react-tools');

module.exports = {
  process: function(src, filename) {
    if (filename.match(/\.png$/)) {
      return '';
    }

    return ReactTools.transform(src);
  }
};
