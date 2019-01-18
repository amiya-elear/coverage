'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorCodes = exports.HttpStatus = exports.CustomApiError = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _es6Error = require('es6-error');

var _es6Error2 = _interopRequireDefault(_es6Error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview Provides basic error framework for backend services with basic
 *               error codes, which can be extended to define custom error codes.
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

/**
 * Class representing a CustomApiError
 * @extends ExtendableError
 */
var CustomApiError = exports.CustomApiError = function (_ExtendableError) {
  _inherits(CustomApiError, _ExtendableError);

  /**
   * Creates a CustomApiError object
   * @param {ErrorCodes} errCode - the custom api error code
   * @param {string} [extra] - the reason related information
  */
  function CustomApiError(errCode) {
    var extra = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    _classCallCheck(this, CustomApiError);

    var _this = _possibleConstructorReturn(this, (CustomApiError.__proto__ || Object.getPrototypeOf(CustomApiError)).call(this, errCode.message));

    _this.name = _this.constructor.name;
    _this.errorInfo = errCode;
    _this.errorInfo.reason += extra;
    return _this;
  }

  /**
  * Get the error info to be passed to client
  * @return {Object} the error info in json format
  */


  _createClass(CustomApiError, [{
    key: 'getErrorInfo',
    value: function getErrorInfo() {
      return { "error": {
          "code": this.errorInfo.code,
          "message": this.errorInfo.message,
          "reason": this.errorInfo.reason
        }
      };
    }

    /**
    * Get the http status to be passed to client
    * @return {HttpStatus} the http status
    */

  }, {
    key: 'getHttpStatus',
    value: function getHttpStatus() {
      return this.errorInfo.httpstatus;
    }
  }]);

  return CustomApiError;
}(_es6Error2.default);

/** List of Http Status Codes */


var HttpStatus = exports.HttpStatus = {
  // HttpStatus for Success
  "OK": 200,

  // HttpStatus for Client Error
  "BAD_REQUEST": 400,
  "UNAUTHORIZED": 401,
  "FORBIDDEN": 403,
  "NOT_FOUND": 404,

  // HttpStatus for Server Error
  "INTERNAL_SERVER_ERROR": 500,
  "SERVICE_UNAVAILABLE": 503

  /** List of Custom API ErrorCodes */
};var ErrorCodes = exports.ErrorCodes = {

  // HTTP Status 400 - BAD_REQUEST
  "BAD_REQUEST": {
    "httpstatus": HttpStatus.BAD_REQUEST,
    "code": 40000,
    "message": "Bad Request",
    "reason": "Reason not specified"
  },
  "MISSING_PARAM": {
    "httpstatus": HttpStatus.BAD_REQUEST,
    "code": 40001,
    "message": "Required Parameter not present",
    "reason": "Missing parameter "
  },
  "INVALID_INPUT": {
    "httpstatus": HttpStatus.BAD_REQUEST,
    "code": 40002,
    "message": "Input Param is not valid",
    "reason": "InCorrect Param "
  },

  // HTTP Status 401 - ACCESS_DENIED
  "AUTH_REQUIRED": {
    "httpstatus": HttpStatus.UNAUTHORIZED,
    "code": 40101,
    "message": "Authentication Required",
    "reason": "User not logged in "
  },
  "SESSION_EXPIRED": {
    "httpstatus": HttpStatus.UNAUTHORIZED,
    "code": 40102,
    "message": "Session Expired",
    "reason": "The access token is Invalid "
  },

  // HTTP Status 403 - FORBIDDEN
  "ACCESS_RESTRICTED": {
    "httpstatus": HttpStatus.FORBIDDEN,
    "code": 40301,
    "message": "Access Restricted",
    "reason": "User is not allowed to access this "
  },

  // HTTP Status 404 - NOT_FOUND
  "NOT_FOUND": {
    "httpstatus": HttpStatus.NOT_FOUND,
    "code": 40401,
    "message": "Not Found",
    "reason": "The requested page is not found "
  },

  // HTTP Status 500 - INTERNAL_SERVER_ERROR
  "INTERNAL_SERVER_ERROR": {
    "httpstatus": HttpStatus.INTERNAL_SERVER_ERROR,
    "code": 50001,
    "message": "Internal Server Error",
    "reason": "Internal Server Error "
  },

  // HTTP Status 503 - SERVICE_UNAVAILABLE
  "DATABASE_ERROR": {
    "httpstatus": HttpStatus.SERVICE_UNAVAILABLE,
    "code": 50101,
    "message": "Database Error",
    "reason": "Database temporarily unavailable "
  },
  "SERVER_ERROR": {
    "httpstatus": HttpStatus.SERVICE_UNAVAILABLE,
    "code": 50110,
    "message": "Server Error",
    "reason": "Server is temporarily unavailable "
  }
};