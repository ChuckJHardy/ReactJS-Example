var React = require('react');

var Cards = require('./cards');

module.exports = React.createClass({
  displayName: 'Application',

  render: function() {
    return <div>
      <header>
        <h1>Smart Pickings</h1>
        <button>Add Property</button>
      </header>
      <nav>
        Nav Bar 
      </nav>
      <section>
        Map
      </section>
      <main>
        <Cards />
      </main>
      <aside>
        Filters
      </aside>
      <footer>
        Footer 
      </footer>
    </div>;
  }
});
