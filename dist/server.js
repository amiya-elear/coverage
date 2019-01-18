'use strict';

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _errorhandler = require('errorhandler');

var _errorhandler2 = _interopRequireDefault(_errorhandler);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _lusca = require('lusca');

var _lusca2 = _interopRequireDefault(_lusca);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _shrinkRay = require('shrink-ray');

var _shrinkRay2 = _interopRequireDefault(_shrinkRay);

var _constants = require('./utils/constants');

var _customApiErrors = require('./utils/custom-api-errors');

var _environment = require('./config/environment');

var _logger = require('./utils/logger');

var _routes = require('./routes/routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview server - Server to start service.
 * @author ABHISHEK SHARMA, abhisheks@elear.solutions
 * @copyright Copyright (c) 2017 Elear Solutions Tech Private Limited. All rights
 * reserved.
 * @license To any person (the "Recipient") obtaining a copy of this software and
 * associated documentation files (the "Software"):
 *
 * All information contained in or disclosed by this software is confidential
 * and proprietary information of Elear Solutions Tech Private Limited and all
 * rights therein are expressly reserved. By accepting this material the
 * recipient agrees that this material and the information contained therein is
 * held in confidence and in trust and will NOT be used, copied, modified,
 * merged, published, distributed, sublicensed, reproduced in whole or in part,
 * nor its contents revealed in any manner to others without the express
 * written permission of Elear Solutions Tech Private Limited.
 */
/*********************************************************************************/
/*===============================================================================*/

var app = (0, _express2.default)();

// Parsers for POST data

// uncomment below to access mongodb
// import './config/mongoose.js';
// Get our API routes
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

// parse cookie header and populate req.cookies
app.use((0, _cookieParser2.default)());

// Lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it.
app.use((0, _methodOverride2.default)());

// compression middleware
app.use((0, _shrinkRay2.default)());

// creates a session middleware
app.use((0, _expressSession2.default)({
  secret: _constants.SECRET,
  resave: true,
  saveUninitialized: true
}));

// webapp security middleware
app.use((0, _lusca2.default)({
  csp: { policy: { 'default-src': '*' } }, // TODO: Update this once the domain name is known
  xframe: 'DENY',
  hsts: { // TODO: Testing is pending after https certificate is obtained
    maxAge: _constants.HTTPS_AGE,
    includeSubDomains: true,
    preload: true
  },
  nosniff: true,
  xssProtection: true
}));

// Set our api routes
app.use('/api', _routes.router);

// error-handler to be used last and in dev only
if (process.env.NODE_ENV == 'dev') {
  app.use((0, _errorhandler2.default)());
}
// Catch all other routes and return the NOT_FOUND
app.get('*', function (req, res) {
  res.status(_customApiErrors.HttpStatus.NOT_FOUND).send();
});

/**
 * Create HTTP server.
 */
var server = _http2.default.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(_environment.Environment.NODE_SERVER, function () {
  _logger.logger.info('Boilerplate Server is up and running on localhost:' + _environment.Environment.NODE_SERVER);
});