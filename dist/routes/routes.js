'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = undefined;

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _constants = require('../utils/constants');

var _customApiErrors = require('../utils/custom-api-errors');

var _logger = require('../utils/logger');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*===============================================================================*/
/*********************************************************************************/
/**
  * @fileOverview routes - file for all the routes
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

var router = exports.router = _express2.default.Router();

// defining cors options and using it
var corsOptions = {
  origin: '*', // TODO: to replace * with the domain name
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  preflightContinue: false,
  maxAge: _constants.PREFLIGHT_CACHE_AGE,
  optionsSuccessStatus: _customApiErrors.HttpStatus.OK
};
router.use((0, _cors2.default)(corsOptions));

// create requestID for requests
router.use(_logger.createRequestID);

/** define routes for the service */
router.get('/', function (req, res) {
  _logger.logger.debug('api works---------------');
  res.status(200).send('api works !');
});

router.get('/mock', function (req, res) {
  _logger.logger.debug('mock api works---------------');
  (0, _request2.default)({
    uri: 'https://api.github.com/users/ashishbajaj99/followers',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'Awesome-Elear-App'
    }
  }, function (err, response, body) {
    if (!err) {
      res.status(response.statusCode).send(body);
    } else {
      res.status(500).send('error');
    }
  });
});

router.post('/login', function (req, res) {
  if (JSON.parse(req.body.key1 == 'value1')) {
    res.send('/api/login post request is called');
  } else {
    res.status(400).send('/api/login post request error');
  }
});