'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'ShowCard',

  render: function() {
    return (
      <section className="card-detail">
        <div className="card-detail-gallery"></div>
        <div className="card-detail-info">
          <div className="card-detail-price">$200,000</div>
          <a href="#" className="btn btn-default btn-mini pull-right">edit</a>
          <header className="card-detail-name">location</header>
          <ul className="card-detail-features">
            <li className="card-detail-feature"><span>bedrooms</span> 2</li>
            <li className="card-detail-feature"><span>bathrooms</span> 2</li>
          </ul>
          <div className="card-detail-descrip">lorem ipsum dolor sit amet, consectetur adipiscing elit. nulla lorem quam, efficitur at ligula non, suscipit accumsan mauris. nam efficitur quam in volutpat pellentesque. etiam consequat nunc urna, pellentesque lobortis sem blandit vel. vivamus quis mauris a elit interdum gravida ac nec mi. in id porta erat. morbi at imperdiet nisl.</div>
        </div>
      </section>
    );
  }
});
