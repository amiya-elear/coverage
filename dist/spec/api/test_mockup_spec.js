'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _nock = require('nock');

var _nock2 = _interopRequireDefault(_nock);

var _environment = require('../../config/environment');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var base_url = 'http://localhost:' + _environment.Environment.NODE_SERVER;

// below url is being used in the /api/mock to get followers
/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview  Unit Test demo for mocking http requests using nock
 * @author Narendra Agarwal, narendra@elear.solutions
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
var git_base_url = 'https://api.github.com';

// nock options to allow unmocked requests
var nock_options = { "allowUnmocked": "true" };

describe('test mockup ', function () {

  var git_mockup = (0, _nock2.default)(git_base_url, nock_options).persist(); // to make the interceptor persistent

  it('test unmocked api returns 200', function (done) {
    _request2.default.get(base_url + '/api/mock', function (err, response, body) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it('test mocked api to return 500', function (done) {
    git_mockup.get('/users/ashishbajaj99/followers').reply(500, 'mocked internal server error');
    _request2.default.get(base_url + '/api/mock', function (err, response, body) {
      expect(response.statusCode).toBe(500);
      done();
    });
  });
});