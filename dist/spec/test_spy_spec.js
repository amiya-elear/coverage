'use strict';

/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview  Sample Jasmine Unit Test for Mocking
 * @author Manjunath Subramanyam, manjunaths@elear.solutions
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

describe("A spy", function () {
  var foo = void 0,
      bar = null;
  beforeEach(function () {
    foo = {
      setBar: function setBar(value) {
        bar = value;
      }
    };
    spyOn(foo, 'setBar'); //Syntax for spyOn: spyOn(object, 'method');
    foo.setBar(123);
    foo.setBar(456, 'another param');
  });

  it("tracks that the spy was called", function () {
    expect(foo.setBar).toHaveBeenCalled();
  });

  it("tracks its number of calls", function () {
    expect(foo.setBar.calls.length).toEqual(2);
  });

  it("tracks all the arguments of its calls", function () {
    expect(foo.setBar).toHaveBeenCalledWith(123);
    expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
  });

  it("allows access to the most recent call", function () {
    expect(foo.setBar.mostRecentCall.args[0]).toEqual(456);
  });

  it("allows access to other calls", function () {
    expect(foo.setBar.calls[0].args[0]).toEqual(123);
  });

  it("stops all execution on a function", function () {
    expect(bar).toBeNull();
  });
});