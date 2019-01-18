'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = exports.getRequestID = exports.createRequestID = undefined;

var _clsHooked = require('cls-hooked');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _uniqid = require('uniqid');

var _uniqid2 = _interopRequireDefault(_uniqid);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*===============================================================================*/
/*********************************************************************************/
/**
  * @fileOverview logger - File for generic logger
  * @author Kishor Hibare, kishor.hibare@elear.solutions
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

var createRequestID = exports.createRequestID = function createRequestID(req, res, next) {
  var session = (0, _clsHooked.createNamespace)(_constants.SERVICE_NAME);
  session.run(function () {
    //create new request id if incoming request does not have it
    if (req.headers[_constants.REQUEST_ID_HEADER] === undefined) {
      var requestId = (0, _uniqid2.default)();
      req.headers[_constants.REQUEST_ID_HEADER] = requestId;
      logger.info('Created a request id and is: ' + requestId);
    }
    session.set('requestId', req.headers[_constants.REQUEST_ID_HEADER]);
    next();
  });
};

var getRequestID = exports.getRequestID = function getRequestID() {
  var ns = (0, _clsHooked.getNamespace)(_constants.SERVICE_NAME);
  var requestId = ns ? ns.get('requestId') : '';
  return requestId;
};

var logger = exports.logger = new _winston2.default.Logger({
  level: 'debug',
  transports: [new _winston2.default.transports.Console({
    formatter: function formatter(options) {
      var requestId = getRequestID() || '';
      var logLevel = options.level.toUpperCase();
      var time = (0, _moment2.default)();
      var message = options.message || '';

      return JSON.stringify({
        timestamp: time.utc(),
        service: _constants.SERVICE_NAME,
        requestId: requestId,
        logLevel: logLevel,
        message: message
      });
    }
  })]
});