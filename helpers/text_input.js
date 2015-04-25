'use strict';

var React = require('react');
var Assign = require('react/lib/Object.assign');

var TextInput = function(label, name, options, error) {
  var classNames = 'form-field';

  options = Assign({
    type: 'text',
    autofocus: false,
    required: false
  }, options)

  if (error) {
    classNames = classNames + ' form-field-error';
    error = <div className="form-error-message">{error}</div>;
  }

  return (
    <div className={classNames}>
      <label>{label}</label>
      <input 
        ref={name} 
        name={name} 
        type={options.type}
        autoFocus={options.autofocus} 
        required={options.required} 
      />
      {error}
    </div>
  );
};

module.exports = {
  render: TextInput
};
