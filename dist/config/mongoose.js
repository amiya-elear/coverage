'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _environment = require('../config/environment');

var _logger = require('../utils/logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Connecting MongoDB through mongoose */
_mongoose2.default.connect(_environment.Environment.MONGOOSE_URL, function (error, response) {
  if (error) {
    _logger.logger.error('Boilerplate Server failed to connect db with error = ' + error);
    throw error;
  } else {
    _logger.logger.info('Boilerplate Server connected successfully to the db');
  }
}); /*===============================================================================*/
/*********************************************************************************/
/**
  * @fileOverview Security view - File to setup MongoDb
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