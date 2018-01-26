//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let config = require('../configs/env');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');

// require packages here
let should = chai.should();
let async = require('async');
var moment = require('moment-timezone');

var User      = require('.'+'/../models/user');
var Mechanic  = require('.'+'/../models/mechanic')
var Part      = require('.'+'/../models/part')
var Car       = require('.'+'/../models/car')
var Request   = require('.'+'/../models/request')
var Billing   = require('.'+'/../models/billing')
var Garage    = require('.'+'/../models/garage')
var Service   = require('.'+'/../models/service')
var Promotion = require('.'+'/../models/promotion')

// global variable section here
// end of global variable section here

// start of test function section here
module.exports.testDropModel = function(callback,modelName)
{
  let Model, modelList = {user:User,mechanic:Mechanic,part:Part,car:Car,billing:Billing,garage:Garage,promotion:Promotion,service:Service,request:Request};
  if(!modelList.hasOwnProperty(modelName)){ callback(true,arg); return 0; }
  else
  {
    Model = modelList[modelName];
    Model.remove({}, (err) =>{if(err) callback(err); else callback();});
  }
}
module.exports.testGetModel = function(callback,arg,modelName,isDebug)
{
  let Model, modelList = {user:User,mechanic:Mechanic,part:Part,car:Car,billing:Billing,garage:Garage,promotion:Promotion,service:Service,request:Request};
  if(!modelList.hasOwnProperty(modelName)){ callback(true,arg); return 0; }
  else
  {
    Model=modelList[modelName];
    Model.findOne({},function(err,docs)
    {
      //(!err).should.be.true;
      arg.output[arg.count]={err:err,docs:docs};
      // before increment, you can print debug messages like this
      if(isDebug) console.log ('[debug] checkModel, arg.count = '+arg.count);
      if(isDebug) module.exports.testGetModel(docs,modelName);
      //*/
      arg.count+=1;
      callback(null,arg);
    });
  }
}
module.exports.testGetModelMultiple = function(callback,arg,modelName,isDebug)
{
  let Model, modelList = {user:User,mechanic:Mechanic,part:Part,car:Car,billing:Billing,garage:Garage,promotion:Promotion,service:Service,request:Request};
  if(!modelList.hasOwnProperty(modelName)){ callback(true,arg); return 0; }
  else
  {
    Model=modelList[modelName];
    Model.find({},function(err,docs)
    {
      //(!err).should.be.true;
      arg.output[arg.count]={err:err,docs:docs};
      // before increment, you can print debug messages like this
      if(isDebug) console.log ('[debug] checkModel, arg.count = '+arg.count);
      if(isDebug) module.exports.testGetModel(docs,modelName);
      //*/
      arg.count+=1;
      callback(null,arg);
    });
  }
}
module.exports.testCheckResponse_2 = function(res,arg,isDebug,obj)
{
  if(res!="mongo")
  {
    res.should.have.status(200);
    res.body.should.be.a('Object');
  }
  let target = arg;
  for (var k in target)
  {
    if (typeof target[k] !== 'function')
    {
      obj.should.have.property(k);
      obj[k].should.be.eql(target[k])
    }
  }
}
module.exports.testGetAPI = function(callback,arg,route,tmpRequest,isDebug)
{
  tmpRequest.end((err, res) =>
  {
    arg.output[arg.count]={err:err,res:res};
    if(isDebug) module.exports.debugRes(route,res);
    arg.count+=1;
    callback(null,arg); // the command to end the function
  });
}

// end of test function section here
