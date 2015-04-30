'use strict';

var React = require('react');

var DestroyCard = require('./destroy_card');

var confirmationText = 'confirm';

function canDestroy(text) { return text.toLowerCase() === confirmationText; }

module.exports = React.createClass({
  displayName: 'DestroyCardContainer',

  contextTypes: {
    router: React.PropTypes.func
  },

  propTypes: {
    setAlert: React.PropTypes.func.isRequired,
  },

  setAlert: function(typedText) {
    this.props.setAlert(
      'You typed ' +
      typedText +
      '. You should have typed ' +
      confirmationText +
      '.'
    );
  },
  getCardId: function() {
    return this.context.router.getCurrentParams().cardId;
  },
  destroy: function(typedText) {
    if (canDestroy(typedText)) {
      this.context.router.replaceWith('dashboard');
    } else {
      this.setAlert(typedText);
    }
  },

  render: function() {
    return <DestroyCard
      destroy={this.destroy}
      confirmationText={confirmationText}
    />;
  }
});
