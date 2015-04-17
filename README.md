# Washington

This README outlines the details of collaborating on this application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `bin/setup`

## Running / Development

* `npm start`
* Visit your app at [http://localhost:8080/webpack-dev-server/](http://localhost:8080/webpack-dev-server/).

### Running Tests

* `npm test`

[Test Coverage](./coverage/lcov-report/index.html)

### Building

* `webpack` (development)
* `webpack -p --environment production` (production)

### Deploying

Set `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` within `env.js`

Develoment

    $ ember deploy:s3
    $ open dev.smartpickings.com

## Further Reading / Useful Links
