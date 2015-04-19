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

* Access Key: `...`
* Secret Key: `...`
* Default Region: `eu-west-1`
* Encryption password: `None`
* Path to GPG program: `None`
* Use HTTPS protocol: `False`
* HTTP Proxy server name: `None`
* HTTP Proxy server port: 0

Install `s3cmd`

	$ brew install s3cmd

Configure `s3cmd` and follow the instructions

	$ s3cmd --configure
	
Deploy to Live Development Servers

	$ npm run deploy:dev
	
Visit	

    $ open dev.smartpickings.com

## Further Reading / Useful Links
