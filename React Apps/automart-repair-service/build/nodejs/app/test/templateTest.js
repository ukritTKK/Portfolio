//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let config = require('../configs/env');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
// let server = require('../app');
let server = config.test_protocol+config.test_host+":"+config.test_port//require('../app');
let should = chai.should();
let async = require('async');
let isDebugTest = false;
let isDebugTest2 = false; // debug message after refactor
let testController = require('../controllers/testController')
let token;
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRldiIsInR5cGUiOjAsImlhdCI6MTQ3Njg1MzcyMywiZXhwIjoxNDc2ODYwOTIzfQ.BC06ghxbzXs_xIyPHtCSYQXxiJKZpwerFOWjBloHbRQ'


chai.use(chaiHttp);
// start of parent block
describe('Templates', () =>
{
  beforeEach((done) =>
  {
    let Model, modelList = {mechanic:'',part:'',car:'',user:'',service:'',request:'',billing:'',promotion:'',garage:''};//modelList = {client:'',user:'',code:'',mechanic:''};
    for(var modelName in modelList)
      if(testController.testDropModel(function(){},modelName)==0) console.log("ERROR: can't delete database "+modelName);
    done();
  });
  //start template here
  describe('? show template function', () =>
  {
    // start of variable here
    let request={ // just add the required input variable here, and we can put the output in the output section
                  account : {username:"test",password:"12345"},
                  config: [
                            {name:'isRegisterWorkingStatus',status:'1'}, // request0
                            {name: 'ticketMaxSaleCount',status:'1000'}, // request1
                          ],
                  configCount: 0,
                  count: 0,
                  output: {},
                  payMethod: "omise"
                };
    // end of variable here
    // start of before function here
    before(function(done)
    {
      async.waterfall
      (// start of functions flow here
        [// arrange the argument in the same order as much as possible
        //callback(err,arg); // the command to end the function
          function(callback)
          {
            let arg = request, route = '/registerAdmin',obj=request.account;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
            // callback(null,request)
          }, // request0
          function(arg,callback)
          {
            let route = '/login',obj=request.account;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
            // callback(callback,arg)
          }, // request1
          function(arg,callback){ callback(callback,arg) } // request...
        ],// end of functions flow here
        function(err,result) // last function
        {
          request = result; // save all requests to request variable
          done();
        }
      )
    });
    // end of before function here
    // start of test here
    it('this is a template function, to be prepared for a new file. You can left it as false to prevent you from forget this', (done) =>
    {
      //TODO: remove 2 lines below and add the code to test finish payment by Omise
      //console.log('this is a placeholder, please edit this out as this will always return as a failed test.');
      //"1".should.be.eql("0"); // placeholder, default return is false;
      done();
    });
    // end of test here
  }); //*/ //end of template here
});
