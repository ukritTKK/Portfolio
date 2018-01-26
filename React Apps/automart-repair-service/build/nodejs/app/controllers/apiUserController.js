///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
////////////////////Requirement Section/////////////////////
///////////////////////////////////////////////////////////
//**//This code require javascript version 6 or newer//**//
////////////////////////miscellaneous//////////////////////
const async = require('async');
const series = require('async-series');
const chalk = require('chalk');
const jwt = require('jsonwebtoken');
const fs = require('fs');
//const path = require('path');
//some version 1 of code use this name of variable that
//cause conflict.
const moment = require('moment-timezone');
///////////////////////From Configs////////////////////////
const config = require('../configs/env');
const db = require('../configs/db');

//////////////////From Other Controllers///////////////////
const toolController = require('./toolController');
    const UserGenerator = toolController.UserGenerator;
    const saveMessageLog = toolController.saveMessageLog;
    const MessagePrint = toolController.MessagePrint;
    const randomString = toolController.randomString;
    const setData = toolController.setData;
////////////////////////From Mongo/////////////////////////

const Garage = require('mongoose').model('Garage');
const Mechanic =  require('mongoose').model('Mechanic');
const User = require('mongoose').model('User');
const Part = require('mongoose').model('Part');
const Car = require('mongoose').model('Car');
const Service = require('mongoose').model('Car');
const Request = require('mongoose').model('Request');
const Promotion = require('mongoose').model('Promotion');
const Billing = require('mongoose').model('Billing');

///////////////////////From Firebase///////////////////////
const admin = require('firebase-admin');

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

/////////////////////////Guildline to write new API////////////////////////////
/////////////////////////Guildline to write new API////////////////////////////
/////////////////////////Guildline to write new API////////////////////////////
//
//
//               This module now using new verification method
//    that will give some information that not require to re-quary again
//
//                  the user verification method give you
//
//              - decoded token           via    req.decodedJWT
//                  (contain user-OID and usertype)
//
//
//         notice that "verifyTokenDummyCallback" method should not
//     use with the new API, it's only use for support legacy code only
//
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////Version 2 API Add by Chee///////////////////////
///////////////////Version 2 API Add by Chee///////////////////////
///////////////////Version 2 API Add by Chee///////////////////////
///////////////////Version 2 API Add by Chee///////////////////////
///////////////////Version 2 API Add by Chee///////////////////////
///////////////////Version 2 API Add by Chee///////////////////////
///////////////////Version 2 API Add by Chee///////////////////////
///////////////////Version 2 API Add by Chee///////////////////////
///////////////////Version 2 API Add by Chee///////////////////////
///////////////////Version 2 API Add by Chee///////////////////////
///////////////////Version 2 API Add by Chee///////////////////////
///////////////////Version 2 API Add by Chee///////////////////////
///////////////////Version 2 API Add by Chee///////////////////////
///////////////////Version 2 API Add by Chee///////////////////////
///////////////////////////Section/////////////////////////////////
///////////////////////////////////////////////////////////////////


/////Warning this module is only for backend testing only
/////because it generate fake firebase ID

/////real user must be register via firebase and this backend
/////will automatically generate new user for that

module.exports.createUser = (req, res, next) => {
    ///////Req body can be use in this method   ///////
    ///////                                     ///////
    ///////                                     ///////
    ///////  -  req.body.username               ///////
    ///////  -  req.body.name                   ///////
    ///////  -  req.body.email                  ///////
    ///////  -  req.body.home_address           ///////
    ///////  -  req.body.home_lat               ///////
    ///////  -  req.body.home_lng               ///////
    ///////  -  req.body.tel                    ///////

    ///////You can create your own validation before put your req.body to specialOptions

    let specialOptions = {
        "userinfo" : [ req.body ]
    };
    ///UserGenerator normally generate log to itself but not gen response to client
    ///But you can specify how backend sent response to client
    UserGenerator (8,0,1,specialOptions,
        (error, newlycreated)=> {
            if (error) {
                // res.status(400).json({"message": "you can replace res.end with json messages"});
                res.end();
            } else if (newlycreated) {
                //console.log("Print new user ID : " + newlycreated[0]);
                res.end();
            } else {
                res.end();
            }
        }
    );
};

module.exports.setUser = (req, res, next) => {
    ///////Req body can be use in this method   ///////
    ///////                                     ///////
    ///////                                     ///////
    ///////  -  req.body.username               ///////
    ///////  -  req.body.name                   ///////
    ///////  -  req.body.email                  ///////
    ///////  -  req.body.home_address           ///////
    ///////  -  req.body.home_lat               ///////
    ///////  -  req.body.home_lng               ///////
    ///////  -  req.body.tel                    ///////

    delete req.body._id;
    delete req.body.user_type;
    ///////You can create your own validation before put your req.body
    setData('_id', req.decodedJWT['id'], req.body, User, null,
        (err) => {
            if (err) {
                res.status(400).json({"message":"error, something happened while query",error_message:err});
            } else {
                res.status(200).json({"message":"User has been updated."});
            }
        }
    )
};


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
/////////////////////////Version 1 API/////////////////////////////
/////////////////////////Version 1 API/////////////////////////////
/////////////////////////Version 1 API/////////////////////////////
/////////////////////////Version 1 API/////////////////////////////
/////////////////////////Version 1 API/////////////////////////////
/////////////////////////Version 1 API/////////////////////////////
/////////////////////////Version 1 API/////////////////////////////
/////////////////////////Version 1 API/////////////////////////////
/////////////////////////Version 1 API/////////////////////////////
/////////////////////////Version 1 API/////////////////////////////
/////////////////////////Version 1 API/////////////////////////////
/////////////////////////Version 1 API/////////////////////////////
/////////////////////////Version 1 API/////////////////////////////
/////////////////////////Version 1 API/////////////////////////////
///////////////////////////Section/////////////////////////////////
///////////////////////////////////////////////////////////////////




////////////////////Critical Warning of using Version 1 API////////////////////
////////////////////Critical Warning of using Version 1 API////////////////////
////////////////////Critical Warning of using Version 1 API////////////////////
//
//
//            This version 1 API was changed some code to support
//            new version 2 verification method, by example below
//
/*

        module.exports.putUser = function(req,res,next)
        {
            var token = req.headers.authorization; //We recomment to remove this, because it doesn't use anymore

     ****   toolController.verifyToken(token, res, function(err, decoded)  *****  Old
     ===>   toolController.verifyTokenDummyCallback(req, res, function(err, decoded)  <=== New
            {
                User.update({_id:db.mongo.mongo.ObjectId(decoded.id)},

                            ..................

*/
//            This new dummy method will require req instead of token
//               In the past, version 1 code decoded token 2 time
// but in version 2 it's decoded only one time and save the decoded in req.decodedJWT
//
//        because the token already decoded in previous verification method
//          this dummy method will not redecode but sent back decoded JWT
//
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////



exports.getMechanic = function(req,res,next)
{//TODO: check if the user should only view the mechanic that related to the user by request, service only or not
  //var token = req.headers.authorization;

  async.waterfall
  (// start of functions flow here
    [// arrange the argument in the same order as much as possible
      //callback(err,arg); // the command to end the function
      function(callback)
      {
        toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
        {
          callback(null,decoded)
        });
      }, // request0
      function(arg,callback)
      {
        Service.find({user_id:db.mongo.mongo.ObjectId(arg.id)},function(err,docs)
        {
          if(docs) callback(null,{service:docs})
          else if(err)
          {
            res.status(401).json({message:"error, something happened when try to find service from token",error_message:err})
            return 0;
          }
        })
      }
    ],
      function(err,arg)
      {
        tmpMechList = [];
        arg.service.forEach(function(x)
        {
          tmpMechList.push(x.mechanic_id)
        })
        Mechanic.find({_id:{$in:tmpMechList}}, function(err, docs)
        {
          toolController.showModel(res,err,docs);
        }).populate('user_id',{password:0}).populate('garage_id')
      }
    );
};

exports.getPart = function(req,res,next)
{
  Part.find({}, function(err, docs)
  {
    toolController.showModel(res,err,docs);
  })
};

exports.getCar = function(req,res,next)
{
  Car.find({}, function(err, docs)
  {
    toolController.showModel(res,err,docs)
  })
};
exports.showCar = function(req,res,next)
{
  Car.findOne({_id:req.params.id}, function(err, docs)
  {
    toolController.showModel(res,err,docs)
  })
};

///////////////////////Testing Dummy Verify Token////////////////////////////
exports.getUser = function(req,res,next)
{
  //var token = req.headers.authorization;

  toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
  {
    User.find({_id:db.mongo.mongo.ObjectId(decoded.id)},{ "password": 0 }, function(err, docs)
    {
      toolController.showModel(res,err,docs)
    })
  })

};
///////////Replace with setUser///////////
/*
module.exports.putUser = function(req,res,next)
{
  var updateObj = req.body;
  var id = req.params.id;
  delete updateObj.id;
  delete updateObj.user_type;
  //var token = req.headers.authorization;

  toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
  {
    User.update({_id:db.mongo.mongo.ObjectId(decoded.id)}, updateObj, function(err,docs)
    {
  		if(err)
      {
  			res.status(400).json({message:"error, something happened while query",error_message:err});
        return 0;
  		}
  		else
      {
  			res.status(200).json({"message":"User has been updated."});
        return 1;
  		}
  	});
  });
}
*/
exports.getGarage = function(req,res,next)
{
  Garage.find({}, function(err, docs)
  {
    toolController.showModel(res,err,docs)
  }).populate('user_id',{password:0}).populate('mechanic_id_list').populate('part_id_list')
};

exports.getService = function(req,res,next)
{
  //var token = req.headers.authorization;
  toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
  {
    Service.find({user_id:db.mongo.mongo.ObjectId(decoded.id)}, function(err, docs)
    {
      toolController.showModel(res,err,docs)
    }).populate('user_id',{password:0}).populate('mechanic_id').populate('part_id_list').populate('promotion_id')
  })
}

module.exports.postRequest = function(req,res,next)
{
  tmpRequestTime = req.body.request_time
  delete req.body.request_time;
  //var token = req.headers.authorization;

  async.waterfall
  (// start of functions flow here
    [// arrange the argument in the same order as much as possible
      //callback(err,arg); // the command to end the function
      function(callback)
      {
        toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
        {
          callback(null,decoded)
        });
      }, // request0
      function(arg,callback)
      {
        var newRequest = new Request(req.body);
        newRequest.user_id = arg.id;
        newRequest.request_time = new Date(tmpRequestTime)

        if(req.body.hasOwnProperty('reach_time'))
        {
          tmpReachTime = req.body.reach_time
          delete req.body.reach_time
          newRequest.reach_time = new Date(tmpReachTime)
        }
        callback(null,{decoded:arg,newRequest:newRequest})
      }
    ],
    function(err,result)
    {
      result.newRequest.save(function(err,docs)
      {
        if(err)
        {
          res.status(400).json({message:"error, something happened",error_message:err});
          return 0;
        }
        res.json(docs);
        return 1;
      })
    }
  )
};
exports.getRequest = function(req,res,next)
{
  var token = req.headers.authorization;
  toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
  {
    Request.find({user_id:db.mongo.mongo.ObjectId(decoded.id)}, function(err, docs)
    {
      toolController.showModel(res,err,docs)
    }).populate('user_id',{password:0},{password:0}).populate('mechanic_id')
  });
};

exports.getBilling = function(req,res,next)
{
  // TODO: I think we should check the data before we show them.
  //var token = req.headers.authorization;
  toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
  {
    Billing.find({user_id:db.mongo.mongo.ObjectId(decoded.id)}, function(err, docs)
    {
      toolController.showModel(res,err,docs)
    }).populate('service_id').populate('user_id',{password:0})
  });
}

exports.getPromotion = function(req,res,next)
{
  //var token = req.headers.authorization;
  toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
  {
    Promotion.find({}, function(err, docs)
    {
      toolController.showModel(res,err,docs)
    })
  });
}
