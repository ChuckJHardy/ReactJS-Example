'use strict';

import React from 'react';
import Cards from './cards';

export default class App extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div>
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
      </div>
    );
  }
}

App.displayName = 'Application';
