'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*===============================================================================*/
/*********************************************************************************/
/**
  * @fileOverview constants - File for defining constants
  * @author Narendra Kumar Agarwal, narendra@elear.solutions
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

// service name to be used in logs
var SERVICE_NAME = exports.SERVICE_NAME = "BOILERPLATE";

// secret to be used in express session
var SECRET = exports.SECRET = 'secret';

// HTTPS Age used while configuring lusca
var HTTPS_AGE = exports.HTTPS_AGE = 31536000;

// CORS preflight cache time
var PREFLIGHT_CACHE_AGE = exports.PREFLIGHT_CACHE_AGE = 3600;

// Request ID Header
var REQUEST_ID_HEADER = exports.REQUEST_ID_HEADER = 'elear-request-id';