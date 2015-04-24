'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'Dashboard',

  render: function() {
    return (
      <div>
        <div className="cards">
          <div className="cards-filter">
            <a href="#" className="filter">Filter</a>
            <a href="#" className="filter">Filter</a>
            <a href="#" className="filter">Filter</a>
          </div>
          <div className="add-card">
            <a href="#" className="btn btn-primary">Add a new property</a>
          </div>
          <div className="card">
            <div className="card-inner">
              <div className="card-image">
                <img src="http://placehold.it/350x250" alt="" />
              </div>
              <div className="card-content">
                <header className="card-name"><a href="#">Galena Park Place</a></header>
                <div className="card-heading2">Draper, UT 84020</div>
                <div className="card-heading3">$219,990</div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-inner">
              <div className="card-image">
                <img src="http://placehold.it/350x250" alt="" />
              </div>
              <div className="card-content">
                <header className="card-name"><a href="#">Galena Park Place</a></header>
                <div className="card-heading2">Draper, UT 84020</div>
                <div className="card-heading3">$219,990</div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-inner">
              <div className="card-image">
                <img src="http://placehold.it/350x250" alt="" />
              </div>
              <div className="card-content">
                <header className="card-name"><a href="#">Galena Park Place</a></header>
                <div className="card-heading2">Draper, UT 84020</div>
                <div className="card-heading3">$219,990</div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-inner">
              <div className="card-image">
                <img src="http://placehold.it/350x250" alt="" />
              </div>
              <div className="card-content">
                <header className="card-name"><a href="#">Galena Park Place</a></header>
                <div className="card-heading2">Draper, UT 84020</div>
                <div className="card-heading3">$219,990</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
