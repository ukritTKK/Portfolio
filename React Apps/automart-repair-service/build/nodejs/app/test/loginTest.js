//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let config = require('../configs/env');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
//let server = require('../app');
let server = config.test_protocol+config.test_host+":"+config.test_port//require('../app');
let should = chai.should();
let async = require('async');

let testController = require('../controllers/testController')

let isDebugTest = false;
let isDebugTest2 = false; // debug message after refactor
chai.use(chaiHttp);
// start of parent block
describe('Login', () =>
{
  before((done) =>
  {
    let Model, modelList = {mechanic:'',part:'',car:'',user:'',service:'',request:'',billing:'',promotion:'',garage:''};//modelList = {client:'',user:'',code:'',mechanic:''};
    for(var modelName in modelList)
      if(testController.testDropModel(function(){},modelName)==0) console.log("ERROR: can't delete database "+modelName);
    done();
  });
  //start template here
  describe('? checkLogin: ', () =>
  {
    // start of variable here
    let request={ // just add the required input variable here, and we can put the output in the output section
                  adminAccount : {username:"test",password:"12345"},
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
            let arg = request, route = '/register',obj=request.adminAccount;
            obj.user_type = 3;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
            // callback(null,request)
          }, // request0
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='user',isDebug=isDebugTest)
          }, // request1
          function(arg,callback)
          {
            let route = '/login',obj=request.adminAccount;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
            // callback(callback,arg)
          }, // request2
          function(arg,callback)
          {
            let route = '/testLogin', reqNo = 3, token = arg.output[reqNo-1].res.body.token;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
            // callback(callback,arg)
          } // request3
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
    it('it should be able to login properly', (done) =>
    {
      let reqNo = 0;
      // console.log(request.output)
      request.output[reqNo].res.body.obj.message.should.be.eql("sign up and generate link successfully");
      reqNo = 1;
      request.output[reqNo].docs.username.should.be.eql(request.adminAccount.username)
      request.output[reqNo].docs.should.have.property('password');
      request.output[reqNo].docs.user_type.should.be.eql(0);
      reqNo = 2;
      request.output[reqNo].res.body.should.have.property('token');
      request.output[reqNo].res.body.type.should.be.eql(0);
      request.output[reqNo].res.body.username.should.be.eql(request.adminAccount.username);
      reqNo = 3;
      request.output[reqNo].res.body.message.should.be.eql("you passed the passport-local test and jsonwebtoken test");
      request.output[reqNo].res.body.username.should.be.eql(request.adminAccount.username)
      request.output[reqNo].res.body.type.should.be.eql(0)
      done();
    });
    // end of test here
    afterEach((done) =>
    {
      let Model, modelList = {mechanic:'',part:'',car:'',user:'',service:'',request:'',billing:'',promotion:'',garage:''};//modelList = {client:'',user:'',code:'',mechanic:''};
      for(var modelName in modelList)
        if(testController.testDropModel(function(){},modelName)==0) console.log("ERROR: can't delete database "+modelName);
      done();
    });
  }); //*/ //end of template here
});
