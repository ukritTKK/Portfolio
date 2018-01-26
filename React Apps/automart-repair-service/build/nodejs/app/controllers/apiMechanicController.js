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
//                the mechanic verification method give you
//
//              - decoded token           via    req.decodedJWT
//              - mechanicOID             via    req.mechanicID
//              - stationed garageOID     via    req.garageID
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


//////////////////////////////////Content////////////////////////////////////////
//////////////////////////////////Content////////////////////////////////////////
//////////////////////////////////Content////////////////////////////////////////
//
//      -- Generate Mechanic Section
//
//      -- Firebase Mechanic Listener Section
//
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////





//===============================Generate Mechanic Section===================================
//===============================Generate Mechanic Section===================================
//===============================Generate Mechanic Section===================================

module.exports.setMechanic = (req, res, next) => {
    let Messages = [];
    setData('user_id', req.decodedJWT['id'], req.body, Mechanic, null,
        (err) => {
            if (err) {
                res.end();
            } else {
                module.exports.ValidationMechanic('user_id', req.decodedJWT['id'],
                    (error, result) => {
                        if (error) {
                            Messages.push("Mechanic Validation Fail : " + error);
                            saveMessageLog(Messages, "SystemLog.txt", "D");
                            res.end();
                        } else {
                            Messages.push("Validation Result : " + result);
                            saveMessageLog(Messages, "SystemLog.txt", "D");
                            res.end();
                        }
                    }
                );

            }
        }
    )

};

module.exports.createMechanic = (req, res, next) => {
    ///////Req body can be use in this method   ///////
    ///////                                     ///////
    ///////                                     ///////
    ///////  -  req.body.name               ///////
    ///////  -  req.body.tel                   ///////
    ///////  -  req.body.image_url                  ///////

    ///////You can create your own validation before put your req.body to specialOptions


    /////////Declare Global Method Variable///////////
    let Messages = [];
    let userObjectID;
    let Model = Mechanic;

    //////////////////////////////////////////////////
    Messages.push('------------Start create new Fake Mechanic-------------');

    series([
        ////////////////////////////////////////////////////////////////
        //////////////////////////First Block///////////////////////////
        ////////////////////////////////////////////////////////////////
        (done) => {
            ////////////////////////////add new user///////////////////////////

            //This UserGenerator can be use too, to create new mechanic user
            UserGenerator(8,1,1,null,
                (err, usersObjectID) => {
                    if (err) {
                        return done(new Error("Add user fail : " + err));
                    } else if (usersObjectID) {
                        if (usersObjectID.length > 0) {
                            userObjectID = usersObjectID[0];
                            Messages.push("Add new user objectid : " + userObjectID + " completed");
                            return done();
                        }
                        else
                            return done(new Error("Random the same as previous firebase uid  try create again"));
                    } else {
                        return done(new Error("Random the same as previous firebase uid  try create again"));
                    }
                }
            );
        },
        ////////////////////////////////////////////////////////////////
        ////////////////////////////Second Block////////////////////////
        ////////////////////////////////////////////////////////////////

        (done) => {
            ////////////////////////////add new garage///////////////////////////
            let newMechanic = new Model(req.body);
            newMechanic.user_id = userObjectID;
            newMechanic.save(
                (err, newlysaved) => {
                    if (err)
                        return done(new Error("Can't save Mechanic (critial warning, you must delete hangling user object id: " + userObjectID + " type 2 that already created) : " + err));
                    else if (newlysaved){
                        Messages.push("Mechanic Object ID : " + newlysaved._id + " created successfully");
                        return done();
                    } else
                        return done(new Error("Undefined Error Occured (critial warning, you must delete hangling user object id: " + userObjectID + "  type 2 that already created) : " + err));
                }
            );

        },
        ////////////////////////////////////////////////////////////////
        ////////////////////////////Last Block//////////////////////////
        ////////////////////////////////////////////////////////////////
        () => {
            Messages.push('------------------------------------------------');
            saveMessageLog(Messages, "SystemLog.txt", "D");
            //MessagePrint(Messages, "G");
            res.end();
        }
        ////////////////////////////////////////////////////////////////
        ////////////////////////////Error Block//////////////////////////
        ////////////////////////////////////////////////////////////////
    ], (error) => {
        Messages.push(error);
        Messages.push('------------------------------------------------');
        saveMessageLog(Messages, "SystemLog.txt", "D");
        //MessagePrint(Messages, "R");
        res.end();
        //console.log("Found Error : " +  error);
    });

};

module.exports.ValidationMechanic = (searchtype, searchID, callback/* error, data */) => {
    /////////Declare Global Method Variable///////////
    let Messages = [];
    let mechanicfindkey;
    let setObject;
    let DocsPointer;
    let AllTrue;
    //////////////////////////////////////////////////
    Messages.push('------------Start set mechanic data-------------');

    series([
        ////////////////////////////////////////////////////////////////
        //////////////////////////First Block///////////////////////////
        ////////////////////////////////////////////////////////////////
        (done) => {
            try {
                if (!searchtype)
                    return done(new Error("searchtype not found"));
                //////////////////Can search in two type. by object _id or user_id//////////////////
                if (searchtype === "_id") {
                    if (searchID)
                        mechanicfindkey = {"_id": searchID};
                    else
                        return done(new Error("_id not found"));
                } else if (searchtype === "user_id") {
                    if (searchID)
                        mechanicfindkey = {"user_id": searchID};
                    else
                        return done(new Error("user_id not found"));
                } else {
                    return done(new Error("searchtype founded, but not true"));
                }
                done(); //place done here becasue it's syncronous code
            } catch (unhandleError) {
                done (new Error('UnhaddleError Occured : ' + unhandleError));
                //console.log("UnhaddleError Occured : " + unhandleError);
            }
        },
        ////////////////////////////////////////////////////////////////
        //////////////////////////Second Block//////////////////////////
        ////////////////////////////////////////////////////////////////

        (done) => {
            ////////////////////////////Save Data///////////////////////////

            //////////////////Find Mechanic to change data////////////////////
            Mechanic
                .findOne(mechanicfindkey,
                    (err, docs) => {
                        if (err)
                            return done(new Error("Database Error : " + err));
                        else if (docs) {
                            DocsPointer = docs;
                            return done();
                        } else {
                            return done(new Error("Can't find mechanic " + searchtype + " : " + searchID));
                        }
                    }
                );

        },
        ////////////////////////////////////////////////////////////////
        ////////////////////////////third Block//////////////////////////
        ////////////////////////////////////////////////////////////////
        (done) => {
            AllTrue = 1;
            //////////////Multi Check////////////
            if (DocsPointer.name && DocsPointer.tel && DocsPointer.image_url && DocsPointer.garage_id) {
                if (DocsPointer.name.length > 0 && DocsPointer.tel.length > 0 && DocsPointer.image_url.length > 0 && DocsPointer.garage_id.toString().length > 0) {
                } else {
                    AllTrue = 0;
                }
            } else {
                AllTrue = 0;
            }

            Mechanic.findOneAndUpdate(mechanicfindkey, {$set: {information_completed: AllTrue}},{projection: {"_id": 1}},
                (err, newlyupdated) => {
                    if (err)
                        return done (new Error("Database Error : " + err));
                    else if (newlyupdated) {
                        //console.log('check newlyupdated : ' + JSON.stringify(newlyupdated, null, 4));
                        return done();
                    }
                    else
                        return done (new Error("Can't find mechanic with that id"));
                }
            )

        },
        ////////////////////////////////////////////////////////////////
        ////////////////////////////Last Block//////////////////////////
        ////////////////////////////////////////////////////////////////
        () => {
            Messages.push("Validation mechanic data completed");
            Messages.push('------------------------------------------------');
            saveMessageLog(Messages, "SystemLog.txt", "D");
            //MessagePrint(Messages, "G");
            callback(null, AllTrue);
            //res.end();
        }
        ////////////////////////////////////////////////////////////////
        ////////////////////////////Error Block//////////////////////////
        ////////////////////////////////////////////////////////////////
    ], (error) => {
        Messages.push(error);
        Messages.push('------------------------------------------------');
        saveMessageLog(Messages, "SystemLog.txt", "D");
        //MessagePrint(Messages, "R");
        callback(error, null);
        //res.end();
        //console.log("Found Error : " +  error);
    });

};






//==========================Firebase Mechanic Listener Section================================
//==========================Firebase Mechanic Listener Section================================
//==========================Firebase Mechanic Listener Section================================

//////////////////////Firebase Mechanic Matching State/////////////////////////
//////////////////////Firebase Mechanic Matching State/////////////////////////
//////////////////////Firebase Mechanic Matching State/////////////////////////
//
//               State
//
//                 0  --  not attach with user yet
//                 1  --  attach with user, but wait for backend operation
//                 2  --  start back end operation <if this hang for long time
//                        there must be roll-back backend operation>
//
//                 3  --  backend operation completed
//                        and wait for mechanic to agree on matching
//
//                 4  --  mechanic agree on matching (this is match complete)
//
//////////////////////////////Process of Listening/////////////////////////////
//////////////////////////////Process of Listening/////////////////////////////
//////////////////////////////Process of Listening/////////////////////////////
//
//
//           --  listen for mechanic in firebase for state change
//           --  if backend found that user is attach to mechanic, it's
//               start to do operation in backend
//           --  when backend complete operation, it's sent complete to
//               firebase, and change state to completed
//
//
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

module.exports.StartMechanicFirebaseListener = () => {
    //////////////////////Firebase Reference Pointer/////////////////////
    let rootRef = admin.database().ref();
    //let mechanicRef = rootRef.child("MechanicCheeTest/Mechanics");
    let mechanicRef = rootRef.child("mechanic");

    ///////////////////////////////////////////////////////////////////////
    /////////////////////////////Start Listener////////////////////////////
    ///////////////////////////////////////////////////////////////////////

    saveMessageLog(["Start firebase mechanic matching listener (by Child changed)"],"SystemLog.txt", "D");
    mechanicRef.on("child_changed", MechanicMatching, (errorObject) => {
        saveMessageLog(["Firebase listener Error! : " + errorObject.message],"SystemLog.txt", "D");
    });

    saveMessageLog(["Start firebase mechanic matching listener (by Child added)"],"SystemLog.txt", "D");
    mechanicRef.on("child_added", MechanicMatching, (errorObject) => {
        saveMessageLog(["Firebase listener Error! : " + errorObject.message],"SystemLog.txt", "D");
    });


};

/////////////////////////////////////////////////////////////////////
////////////We declare as function to easily controll listener///////
////////////We declare as function to easily controll listener///////
/////////////////////////////////////////////////////////////////////


let MechanicMatching = (snapshot) => {

    let myref = snapshot.ref;
    //let stateref = myref.child("state");
    let stateref = myref.child("reserved/state");

    stateref.transaction((snap) => {
        if (typeof snap !== 'undefined') {
            //////////////////////////////////////////////////////////////////////
            ////////////If Backend found the user is attach to mechanic///////////
            //////////////////////////////////////////////////////////////////////
            if (String(snap) === "1") {
                snap = 2;

            } else if (String(snap) === "2") {
                //////////////////////////////////////////////////////////////////////
                ///////////////If Backend guarantee the starting state////////////////
                ///////////////The Backend will call operation method/////////////////
                //
                //                              \\
                //                              \\   Call Your Operation Method Here
                //                             VVVV
                //                              VV
                //                               V
                //////////////////////////////////////////////////////////////////////
                DummyBackEndOperation(stateref);
            }
        } else {
            saveMessageLog(["MechanicListener->transection error: can't get snapshot"],"SystemLog.txt", "D");
        }
        return snap;
    });

    //////////////////////////////////////////////////////////////////////
    ///////////////////This is firebase getdata Example///////////////////
    //////////////////////////////////////////////////////////////////////

    //console.log("Mechanic firebase ID: " + myref.key); this return mechanic key.

    //console.log("user attach : " + JSON.stringify(snapshot.val()["attach"], null, 4));
    //console.log("location lat : " + JSON.stringify(snapshot.val()["location"]["latitude"], null, 4));
    //console.log("location lng : " + JSON.stringify(snapshot.val()["location"]["longitude"], null, 4));
    //console.log("y : " + JSON.stringify(snapshot.val()["y"], null, 4));
};

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

let changeFirebaseMechanicState = (reference, newState /*number*/) => {
    /////////////////////////////////Use of this Method////////////////////////////
    /////////////////////////////////Use of this Method////////////////////////////
    /////////////////////////////////Use of this Method////////////////////////////
    //
    //
    //           reference -- is the firebase database reference
    //           newState  -- is the firebase new data
    //
    //
    ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    try {
        reference.transaction((snap) => {
            if (typeof snap !== 'undefined') {
                snap = newState;
            } else {
                throw new Error("can't find firebase field data");
            }
            return snap;
        });
    } catch (error) {
        saveMessageLog(["Firebase set state error : " + error + " .because backend operation is completed, you must set mechanic state to 2 manually"],"SystemLog.txt", "D");
    }
};

let DummyBackEndOperation = (stateRef) => {
    ////////////////////////////////Method Notice//////////////////////////////////
    ////////////////////////////////Method Notice//////////////////////////////////
    ////////////////////////////////Method Notice//////////////////////////////////
    //
    //
    //           This method is Example method
    //
    //           it's is dummy method that simulate the time use in backend
    //           operation. After the operation, the backend will call method
    //           to set firebase mechanic state to 3 (completed)
    //
    //
    ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    setTimeout(
        () => {
            //console.log("Complete Backend Operation ");
            //////////////////////////////////////////////////////////////////////
            //////////////////////////Call Set State Method///////////////////////
            //////////////////////////////////////////////////////////////////////
            changeFirebaseMechanicState(stateRef, 3);
        }
    ,1000)
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
{
  //var token = req.headers.authorization;
  toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
  {
    Mechanic.find({user_id:db.mongo.mongo.ObjectId(decoded.id)}, function(err, docs)
    {
      toolController.showModel(res,err,docs)
    }).populate('user_id',{password:0}).populate('garage_id')
  })
};
module.exports.putMechanic = function(req,res,next)
{
  var updateObj = req.body;
  var id = req.params.id;
  //var token = req.headers.authorization;
  toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
  {
    Mechanic.update({user_id:db.mongo.mongo.ObjectId(decoded.id)}, updateObj, function(err,docs)
    {
  		toolController.showUpdate(res,err,docs)
  	});
  })
};
exports.putMechanicImg = function(req,res,next)
{
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
        if(arg && arg.hasOwnProperty('type') && arg.type==1 )
        {
          User.findOne({username:arg.username},{ "password": 0 },function(err,docs)
          {
            if(err)
            {
              res.status(400).json({message:"error, something happened",error_message:err})
              return -1
            }
            else if(!docs)
            {
              res.status(401).json({message:"unable to find your username"})
              return -1;
            }
            else if(docs.enabled != 1)
            {
              res.status(403).json({message: "error, your account got disabled, please contact the garage you are in or the administrator."})
              return 0;
            }
            callback(null,{user:docs,decoded:arg})
          })
        }
        else if(arg && arg.hasOwnProperty('type') && (arg.type==0 || arg.type==2 || arg.type==3))
        {
          res.status(403).json({message:"forbidden"})
          return -1;
        }
        else
        {
          res.status(401).json({message:"unauthorized"})
          return -1;
        }
      },
      function(arg,callback)
      {
        if(!req.file || !req.file.hasOwnProperty('mimetype'))
        {
          res.status(400).json({message:"error, incorrect input for uploading"});
          return -1;
        }
        Mechanic.findOne({user_id:db.mongo.mongo.ObjectId(arg.decoded.id)},function(err,docs)
        {
          if(docs)
          {
            if(docs.user_id = db.mongo.mongo.ObjectId(arg.decoded.id))
            {
              docs.image_url = '/uploads/mechanic/images/' + docs._id +'.'+ req.file.mimetype.split('/')[1];
              callback(null,{arg:arg,newMechanic:docs})
            }
            else
            {
              res.status(403).json({message: "forbidden from changing another mechanic's profile"})
              return 0;
            }
          }
          else
          {
            res.status(401).json({message:"error, mechanic not found from the token"})
            return 0;
          }

        })
      },
    ],
    function(err,result) // last function
    {
      let arg = result;
      arg.newMechanic.save(function(err,docs)
      {
        if(err)
        {
          res.status(400).json({message:"error, something happened",error_message:err});
          return 0;
        }
        else
        {
          toolController.renameFile(req, docs._id,docs,res,path = './public/uploads/mechanic/images') //'../public/uploads/mechanic/images' //old code for debugging, use with __dirname in toolController
          return 1;
        }
      })
    }
  );
}
module.exports.getClassDataWithUser = function(req,res,next)
{
  //var token = req.headers.authorization;
  async.waterfall
  (// start of functions flow here
    [// arrange the argument in the same order as much as possible
    //callback(err,arg); // the command to end the function
      function(callback)
      {
        if(req.params.userType!="service" && req.params.userType!="mechanic")
        {
          res.status(400).json({message: "please input proper userType of getClassDataWithUser"})
          return 0;
        }

        let arg = {};
        toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
        {
          arg.query = {user_id:db.mongo.mongo.ObjectId(decoded.id)};
          arg.decoded = decoded;
          callback(null,arg);
        });

      },
      function(arg,callback)
      {
        Mechanic.find(arg.query, function(err, docs)
        {
          if(err)
          {
            res.status(400).json({message:"error, unable to query the database for classData",error_message:err})
            return 0;
          }
          if(docs && Object.prototype.toString.call(docs)=="[object Array]" && docs.length>0)
          {
            arg.mechanic = docs;
            callback(null,arg)
          }
          else
          {
            res.status(404).json({message:"error, unable to find classData"})
            return 0;
          }
        }).lean()
      },
      function(arg,callback)
      {
        if(req.params.userType=="service")
        {
          Service.find({mechanic_id:arg.mechanic[0]._id}, function(err,docs)
          {
            if(err)
            {
              res.status(400).json({message:"error, unable to call Service collection",error_message: err})
              return 0;
            }
            if(docs && Object.prototype.toString.call(docs)=="[object Array]" && docs.length>0)
            {
              arg.service = docs;
            }
            else arg.service = [];
            callback(null,arg);
          }).lean()
        }
        else callback(null,arg)
      }
    ],
    function(err,result)
    {
      let arg = result, query;
      // i.e. result = mechanic, docs = user, for easier code reading, I guess
      if(req.params.userType=="service") query = {_id:{$in: arg.service.map(function(a) {return a.user_id})}};
      else if(req.params.userType=="mechanic")  query = {_id: {$in:arg.mechanic.map(function(a) {return a.user_id;})}};
      User.find(query,{ "password": 0 },function(err,docs)
      {
        if(err)
        {
          res.status(400).json({message:"error, unable to call User collection",error_message: err})
          return 0;
        }
        let user = docs;
        if(user && Object.prototype.toString.call(docs)=="[object Array]" && docs.length>0) //exists!
        {
          let classData = user;
          if(req.params.userType=="service")
          {
            classData = result.service;
            classData.user = user;
            for(let i=0;i<classData.length;i++)
            {
              if(user[i]._id==classData[i].user_id)
              {
                classData[i]["userName"] = user[i].name;
                classData[i]["username"] = user[i].username;
              }
              else
              {
                for(let j=0;j<user.length;j++)
                {
                  if(user[j]._id==classData[i].user_id)
                  {
                    classData[i]["userName"] = user[i].name;
                    classData[i]["username"] = user[i].username;
                  }
                }
              }
            }
          }
          else if(req.params.userType=="mechanic") classData = classData[0]; // for mechanic to search for himself, if garage view multiple mechanics, please remove this
          res.json(classData)
          return 1;
        }
        else
        {
          res.status(404).json({message:"error, unable to find user from classDataMechanic"})
          return 0;
        }
      })
    }
  )
  return 0;
}
module.exports.showClassDataWithUser = function(req,res,next)
{
  async.waterfall
  (// start of functions flow here
    [// arrange the argument in the same order as much as possible
    //callback(err,arg); // the command to end the function
      function(callback)
      {
        Mechanic.findOne({_id:req.params.id}, function(err, docs)
        {
          callback(null,docs)
        }).lean()
      }
    ],
    function(err,result)
    {
      let arg = result;
      // i.e. result = mechanic, docs = user
      User.findOne({_id: arg.user_id},{ "password": 0 },function(err,docs)
      {
        let classData = arg, user = docs;
        if(user) //exists!
        {
          if(user._id==classData.user_id)
          {
            classData["enabled"] = user.enabled;
            classData["username"] = user.username;
          }
          res.json(classData)
          return 1;
        }
        else
        {
          res.status(404).json({message:"error, unable to find user from classData"})
          return 0;
        }
      })
    }
  )
  return 0;
}

exports.getPart = function(req,res,next)
{
  Part.find({}, function(err, docs)
  {
    toolController.showModel(res,err,docs);
  })
};
exports.showPart = function(req,res,next)
{
  Part.findOne({_id:req.params.id}, function(err, docs)
  {
    toolController.showModel(res,err,docs);
  })
};
exports.getPartListExist = function(req,res,next)
{
  //var token = req.headers.authorization;
  async.waterfall
  (// start of functions flow here
    [// arrange the argument in the same order as much as possible
    //callback(err,arg); // the command to end the function
      function(callback)
      {
        toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
        {
          callback(null,{decoded:decoded})
        });
      }, // request0
      function(arg,callback)
      {
        Mechanic.findOne({user_id:db.mongo.mongo.ObjectId(arg.decoded.id)},function(err,docs)
        {
          arg.garage_id = docs.garage_id;
          if(docs) callback(null,arg)
          else
          {
            res.status(401).json({message:"error, unable to find your mechanic from the token"})
            return 0;
          }
        })
      },
      function(arg,callback)
      {
        Garage.findOne({_id:arg.garage_id},function(err,docs)
        {
          arg.garage = docs;
          if(docs) callback(null,arg)
          else
          {
            res.status(401).json({message:"error, unable to find your garage from the token"})
            return 0;
          }
        })
      }
    ],
      function(err,arg)
      {
        Part.find({_id:{$in:arg.garage.part_id_list}}, function(err, docs)
        {
          if(docs)
          {
            docs.forEach(function(x)
            {
              x.exist=true;
            })
            Part.find({_id:{$nin:arg.garage.part_id_list}},function(err2,docs2)
            {
              docs2.forEach(function(x)
              {
                x.exist=false;
              })
              docs=docs.concat(docs2);
              toolController.showModel(res,err,docs);
            }).lean()
          }
          else
          {
            res.status(400).json({message:"error, something happened while try to find the parts",error_message:err})
            return 0;
          }
        }).lean()
      }
    )
}

exports.getCar = function(req,res,next)
{
  Car.find({}, function(err, docs)
  {
    toolController.showModel(res,err,docs)
  })
};
exports.showCar = function(req,res,next)
{
  // TODO: check that the code is safe to run and will not cause an interruption to the server (all the file in the project)
  Car.findOne({_id:req.params.id}, function(err, docs)
  {
    toolController.showModel(res,err,docs)
  })
};
exports.getUser = function(req,res,next)
{
  //var token = req.headers.authorization;
  toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
  {
    User.find({_id:db.mongo.mongo.ObjectId(decoded.id)},{ "password": 0 }, function(err, docs)
    {
      toolController.showModel(res,err,docs)
    })
  });
};
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
  			res.status(400).json({"message":err});
        return 0;
  		}
  		else
      {
  			res.json({"message":"User has been updated."});
        return 1;
  		}
  	});
  });
}

exports.getGarage = function(req,res,next)
{
  Garage.find({}, function(err, docs)
  {
    toolController.showModel(res,err,docs)
  }).populate('user_id',{password:0}).populate('mechanic_id_list').populate('part_id_list')
};
exports.showGarage = function(req,res,next)
{
  Garage.findOne({_id:req.params.id}, function(err, docs)
  {
    toolController.showModel(res,err,docs)
  }).populate('user_id',{password:0}).populate('mechanic_id_list').populate('part_id_list')
};


exports.getService = function(req,res,next)
{
  //var token = req.headers.authorization;
  async.waterfall
  (// start of functions flow here
    [// arrange the argument in the same order as much as possible
      //callback(err,arg); // the command to end the function
      function(callback)
      {
        // 1
        // callback(null,null) // in case you want to send nothing to the next process
        toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
        {
          callback(null,decoded)
        });
      },
      function(arg,callback)
      {
        // 2
        Mechanic.findOne({user_id:db.mongo.mongo.ObjectId(arg.id)},function(err,docs)
        {
          if(docs)
          {
            callback(null,docs)
          }
          else
          {
            res.status(401).json({message:"error, mechanic not found from your token"});
            return 0;
          }
        })
      }
    ],
    function(err,result)
    {
      // 3
      let arg = result;
      Service.find({mechanic_id:arg._id}, function(err2, docs2)
      {
        toolController.showModel(res,err2,docs2)
      }).populate('user_id',{password:0}).populate('mechanic_id').populate('part_id_list').populate('promotion_id')
    }
  )
}
exports.showService = function(req,res,next)
{
  //var token = req.headers.authorization;
  async.waterfall
  (// start of functions flow here
    [// arrange the argument in the same order as much as possible
      //callback(err,arg); // the command to end the function
      function(callback)
      {
        // 1
        // callback(null,null) // in case you want to send nothing to the next process
        toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
        {
          callback(null,decoded)
        });
      },
      function(arg,callback)
      {
        // 2
        Mechanic.findOne({user_id:db.mongo.mongo.ObjectId(arg.id)},function(err,docs)
        {
          if(docs)
          {
            callback(null,docs)
          }
          else
          {
            res.status(401).json({message:"error, mechanic not found from your token"});
            return 0;
          }
        })
      }
    ],
    function(err,result)
    {
      // 3
      let arg = result;
      Service.findOne({$and:[{_id:req.params.id},{mechanic_id:arg._id}]}, function(err, docs)
      {
        toolController.showModel(res,err,docs)
      }).populate('user_id',{password:0}).populate('mechanic_id').populate('part_id_list').populate('promotion_id')
    }
  )
};
module.exports.putService = function(req,res,next)
{//TODO: add the test that the car got serviced, requested by a mechanic and garage properly (check that when postGarage, there should be request first or something? this needed to be checked sometimes)
  var updateObj = req.body;
  var id = req.params.id;
  delete updateObj.id;

  //var token = req.headers.authorization;
  async.waterfall
  (// start of functions flow here
    [// arrange the argument in the same order as much as possible
      //callback(err,arg); // the command to end the function
      function(callback)
      {
        // 1
        // callback(null,null) // in case you want to send nothing to the next process
        toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
        {
          callback(null,decoded)
        });
      },
      function(arg,callback)
      {
        // 2
        Mechanic.findOne({user_id:db.mongo.mongo.ObjectId(arg.id)},function(err,docs)
        {
          if(docs)
          {
            callback(null,docs)
          }
          else
          {
            res.status(401).json({message:"error, mechanic not found from your token"});
            return 0;
          }
        })
      }
    ],
    function(err,result)
    {
      // 3
      let arg = result;
      Service.update({$and:[{_id:req.params.id},{mechanic_id:arg._id}]}, updateObj, function(err,docs)
      {
    		toolController.showUpdate(res,err,docs);
    	});
    }
  )
};
module.exports.deleteService = function(req,res,next)
{//TODO: add the test that the car got serviced, requested by a mechanic and garage properly (check that when postGarage, there should be request first or something? this needed to be checked sometimes)
  var updateObj = req.body;
  var id = req.params.id;
  delete updateObj.id;

  //var token = req.headers.authorization;
  async.waterfall
  (// start of functions flow here
    [// arrange the argument in the same order as much as possible
      //callback(err,arg); // the command to end the function
      function(callback)
      {
        // 1
        // callback(null,null) // in case you want to send nothing to the next process
        toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
        {
          callback(null,decoded)
        });
      },
      function(arg,callback)
      {
        // 2
        Mechanic.findOne({user_id:db.mongo.mongo.ObjectId(arg.id)},function(err,docs)
        {
          if(docs)
          {
            callback(null,docs)
          }
          else
          {
            res.status(401).json({message:"error, mechanic not found from your token"});
            return 0;
          }
        })
      }
    ],
    function(err,result)
    {
      // 3
      let arg = result;
      Service.remove({$and:[{_id:req.params.id},{mechanic_id:arg._id}]}).exec(function(err,docs)
      {
        toolController.showDeleteModel(res,err,docs)
      });
    }
  )
};
module.exports.postService = function(req,res,next)
{
  //var token = req.headers.authorization;
  async.waterfall
  (// start of functions flow here
    [// arrange the argument in the same order as much as possible
    //callback(err,arg); // the command to end the function
      function(callback)
      {
        toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
        {
          callback(null,{decoded:decoded});
        })
      },
      function(arg,callback)
      {
        Service.count({},function(err,docs)
        {
          if(!err)
          {
            arg.service_count = docs;
            callback(null,{decoded:arg.decoded,service_count:arg.service_count})
          }
          else
          {
            res.status(400).json({message:"error, something happened",error_message:err})
            return -1;
          }
        })
      },
      function(arg,callback)
      {
        // var tmpStatusList = req.body.status_list;
        // delete req.body.status_list;
        var tmpServiceDate = req.body.service_date;
        delete req.body.service_date;
        var newService = new Service(req.body);

        try
        {
          newService.service_date = new Date(tmpServiceDate);
        }
        catch (e)
        {
          newService.service_date = new Date();
        }
        if(!tmpServiceDate || typeof tmpServiceDate == "undefined") newService.service_date = new Date();
        newService.id_number = arg.service_count + 1;
        try
        {
          tmpStatusList.length

          // TODO: should be able to initiate statusList with the default data if the data does not got sent here and check if their format are correct, else go with default value
          // TODO: add validator for multiple input before the form got interrupted
          for(var i=0;i<tmpStatusList.length;i++)
          {
            try
            {
              tmpStatusList[i] = JSON.parse(tmpStatusList[i])
            } catch (e) {
              console.log('no need to convert')
            }
            try
            {
              tmpStatusList[i].date = new Date(tmpStatusList[i].date);
            }
            catch (e)
            {
              tmpStatusList[i].date = new Date();
            }
            if(!tmpStatusList[i].date || typeof tmpStatusList[i].date == "undefined")
              tmpStatusList[i].date = new Date();
          }

          newService.status_list = arg.tmpStatusList;
        }
        catch (e)
        {
          delete tmpStatusList
        }

        callback(null,{decoded:arg.decoded,newService:newService})
      },
      function(arg,callback)
      {
        Mechanic.findOne({user_id:db.mongo.mongo.ObjectId(arg.decoded.id)},function(err,docs)
        {
          if(docs)
          {
            arg.newService.mechanic_id = docs._id;
            callback(null,arg)
          }
          else
          {
            res.status(401).json({message: "error, mechanic not found from the token"})
            return 0;
          }
        })
      }
    ],
    function(err,result)
    {
      let arg = result;

      arg.newService.save(function(err,docs)
      {
        if(err)
        {
          res.status(400).json({message:"error, something happened",error_message:err});
          return 0;
        }
        res.json({message:"Service has been updated."});
        return 1;
      })
    }
  )
};
module.exports.putServiceStatus = function(req,res,next)
{
  //var token = req.headers.authorization;
  async.waterfall
  (// start of functions flow here
    [// arrange the argument in the same order as much as possible
    //callback(err,arg); // the command to end the function
      function(callback)
      {
        toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
        {
          callback(null,{decoded:decoded});
        })
      },
      function(arg,callback)
      {
        Mechanic.findOne({user_id:db.mongo.mongo.ObjectId(arg.decoded.id)},function(err,docs)
        {
          if(docs)
          {
            arg.mechanic_id = docs._id;
            callback(null,arg)
          }
          else
          {
            res.json({message: "error, mechanic not found from the token"})
            return 0;
          }
        })
      },
      function(arg,callback)
      {
        Service.findOne({$and:[{mechanic_id:arg.mechanic_id},{_id:req.params.id}]},function(err,docs)
        {
          if(err)
          {
            res.status(400).json({message:"error, something happened while try to find a service",error_message:err})
            return 0;
          }
          else if(docs)
          {
            arg.docs = docs;
            callback(null,arg);
          }
          else
          {
            res.status(404).json({message:"error, service not found"})
            return 0;
          }
        })
      },
      function(arg,callback)
      {
        if(req.params.step=="4" && arg.docs.status_list[arg.docs.status_list.length-1].status=="เสนอราคา")
        {
          Billing.findOne({service_id:req.params.id},function(err,docs)
          {
            if(docs)
            {
              arg.fourCheck = true;
              arg.docs.status_list.push({status:"ซ่อม",date:new Date()})
              callback(null,arg)
            }
            else
            {
              res.status(404).json({message:"error, billing not found"})
              return 0;
            }
          })
        }
        else callback(null,arg)
      }
    ],
      function(err,arg)
      {
        // if(req.params.step=="1" && arg.docs.status_list[arg.docs.status_list.length-1].status!="เปิดงาน" && arg.docs.status_list[arg.docs.status_list.length-1].status!="ยกเลิกงาน")
        //   arg.docs.status_list.push({status:"เปิดงาน",date:new Date()})
        if(req.params.step=="4" && arg.hasOwnProperty('fourCheck') && arg.fourCheck){}
        else if(req.params.step=="2" && arg.docs.status_list[arg.docs.status_list.length-1].status=="เปิดงาน")
          arg.docs.status_list.push({status:"ประเมินงาน",date:new Date()})
        else if(req.params.step=="3" && arg.docs.status_list[arg.docs.status_list.length-1].status=="ประเมินงาน")
          arg.docs.status_list.push({status:"เสนอราคา",date:new Date()})
        else if(req.params.step=="5" && arg.docs.status_list[arg.docs.status_list.length-1].status=="ซ่อม")
          arg.docs.status_list.push({status:"ปิดงาน",date:new Date()})
        else if(req.params.step=="0" && arg.docs.status_list[arg.docs.status_list.length-1].status!="ยกเลิกงาน" && arg.docs.status_list[arg.docs.status_list.length-1].status!="ปิดงาน")
          arg.docs.status_list.push({status:"ยกเลิกงาน",date:new Date()})
        else
        {
          res.status(400).json({message:"error, incorrect step, please input the data correctly"})
          return 0;
        }
        arg.docs.save(function(err,docs)
        {
          if(err)
          {
            res.status(400).json({message:"error, something happened",error_message:err})
            return 0;
          }
          else if(docs)
          {
            res.json({message:"update data successful"})
            return 1;
          }
          else
          {
            res.status(400).json({message:"error, something happened"})
            return 0;
          }
        })
      }
    )

}

exports.getRequest = function(req,res,next)
{
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
        Mechanic.findOne({user_id:db.mongo.mongo.ObjectId(arg.id)},function(err,docs)
        {
          if(err)
          {
            res.status(400).json({message:"error, something happened",error_message:err})
            return 0;
          }
          else if(docs)
          {
            callback(null,docs);
          }
          else
          {
            res.status(401).json({message:"error, mechanic not found from your token"});
            return 0;
          }
        })
      }
    ],
      function(err,result)
      {
        let arg = result;
        Request.find({mechanic_id:arg._id}, function(err, docs)
        {
          toolController.showModel(res,err,docs)
        }).populate('user_id',{password:0},{password:0}).populate('mechanic_id')
      }
    )
}
exports.showRequest = function(req,res,next)
{
  // TODO: check if we should really prevent bruteforcing id or not, by use token to authen?
  Request.findOne({_id:req.params.id}, function(err, docs)
  {
    toolController.showModel(res,err,docs)
  }).populate('user_id',{password:0},{password:0}).populate('mechanic_id')
};
module.exports.putRequest = function(req,res,next)
{
  var updateObj = req.body;
  var id = req.params.id;
  delete updateObj.id;

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
        Mechanic.findOne({user_id:db.mongo.mongo.ObjectId(arg.id)},function(err,docs)
        {
          if(err)
          {
            res.status(400).json({message:"error, something happened",error_message:err})
            return 0;
          }
          else if(docs)
          {
            callback(null,docs);
          }
          else
          {
            res.status(401).json({message:"error, mechanic not found from your token"});
            return 0;
          }
        })
      }
    ],
      function(err,result)
      {
        let arg = result;
        Request.update({$and:[{_id:id},{mechanic_id:arg._id}]}, updateObj, function(err,docs)
        {
      		if(err)
          {
      			res.status(400).json({message:"error, something happened while query",error_message:err});
            return 0;
      		}
      		else if(docs)
          {
      			res.status(200).json({"message":"Request has been updated."});
            return 1;
      		}
          else
          {
            res.status(404).json({message:"error, data not found"});
            return 0;
          }
      	});
      }
    )


};

module.exports.postBilling = function(req,res,next)
{
  //var token = req.headers.authorization;
  async.waterfall
  (// start of functions flow here
    [// arrange the argument in the same order as much as possible
    //callback(err,arg); // the command to end the function
      function(callback)
      {
        toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
        {
          callback(null,decoded);
        })
      },
      function(arg,callback)
      {
        Mechanic.findOne({user_id:db.mongo.mongo.ObjectId(arg.id)},function(err,docs)
        {
          if(err)
          {
            res.status(400).json({message:"error, something happened",error_message:err})
            return 0;
          }
          else if(docs) callback(null,docs)
          else
          {
            res.status(401).json({message:"error, data not found when try to find a mechanic from a token"})
            return 0;
          }
        })
      },
      function(arg,callback)
      {
        Service.find({mechanic_id:arg._id},function(err,docs)
        {
          if(docs) callback(null,docs)
          else if(err)
          {
            res.status(400).json({message:"error, unable to find service from mechanic token",error_message:err})
            return 0;
          }
          else
          {
            res.status(404).json({message:"error, unable to find service from mechanic token"})
            return 0;
          }
        });
      },
    ],
      function(err,arg)
      {
        let tmpServiceList = []
        arg.forEach(function(x)
        {
          tmpServiceList.push(x._id.toString())
        })

        let tmpUserList = []
        arg.forEach(function(x)
        {
          tmpUserList.push(x.user_id.toString())
        })

        var newBilling = new Billing(req.body);
        if(req.body.hasOwnProperty("service_id") && typeof req.body.service_id!="undefined" &&  tmpServiceList.indexOf(req.body.service_id)==-1)
        {
          res.status(400).json({message:"error, this service not found from the mechanic"})
          return 0;
        }
        if(req.body.hasOwnProperty("user_id") && typeof req.body.user_id!="undefined" &&  tmpUserList.indexOf(req.body.user_id)==-1)
        {
          res.status(400).json({message:"error, this user_id not found from the service work by the mechanic"})
          return 0;
        }
        newBilling.save(function(err,docs)
        {
          if(err)
          {
      			res.status(400).json({message:"error, something happened while query",error_message:err});
            return 0;
      		}
          res.json(docs);
          return 1;
        })
      }
    )
};
exports.getBilling = function(req,res,next)
{
  //var token = req.headers.authorization;
  async.waterfall
  (// start of functions flow here
    [// arrange the argument in the same order as much as possible
    //callback(err,arg); // the command to end the function
      function(callback)
      {
        toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
        {
          callback(null,decoded);
        })
      },
      function(arg,callback)
      {
        Mechanic.findOne({user_id:db.mongo.mongo.ObjectId(arg.id)},function(err,docs)
        {
          if(docs) callback(null,docs)
          else
          {
            res.status(401).json({message:"error, data not found when try to find a mechanic from a token"})
            return 0;
          }
        })
      },
      function(arg,callback)
      {
        Service.find({mechanic_id:arg._id},function(err,docs)
        {
          if(docs && docs.length>0)
          {
            let tmpList = [];
            for(let i = 0;i<docs.length;i++)
              tmpList.push(docs[i]._id)
            callback(null,{decoded:arg,serviceList:tmpList})
          }
          else
          {
            res.status(404).json({message:"error, data not found when try to find a service from a mechanic"})
            return 0;
          }
        })
      },
    ],
      function(err,result)
      {
        let arg = result;
        Billing.find({service_id:{$in:arg.serviceList}}, function(err, docs)
        {
          toolController.showModel(res,err,docs)
        }).populate('service_id').populate('user_id',{password:0})
      }
    )
};
exports.showBilling = function(req,res,next)
{
  Billing.findOne({_id:req.params.id}, function(err, docs)
  {
    toolController.showModel(res,err,docs)
  }).populate('service_id').populate('user_id',{password:0})
};
module.exports.putBilling = function(req,res,next)
{
  var updateObj = req.body;
  var id = req.params.id;
  delete updateObj.id;

  //var token = req.headers.authorization;
  async.waterfall
  (// start of functions flow here
    [// arrange the argument in the same order as much as possible
    //callback(err,arg); // the command to end the function
      function(callback)
      {
        toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
        {
          callback(null,decoded);
        })
      },
      function(arg,callback)
      {
        Mechanic.findOne({user_id:db.mongo.mongo.ObjectId(arg.id)},function(err,docs)
        {
          if(docs) callback(null,docs)
          else
          {
            res.status(401).json({message:"error, data not found when try to find a mechanic from a token"})
            return 0;
          }
        })
      },
      function(arg,callback)
      {
        Service.find({mechanic_id:arg._id},function(err,docs)
        {
          if(docs && docs.length>0)
          {
            let tmpList = [];
            for(let i = 0;i<docs.length;i++)
              tmpList.push(docs[i]._id)
            callback(null,{decoded:arg,serviceList:tmpList})
          }
          else
          {
            res.status(404).json({message:"error, data not found when try to find a service from a mechanic"})
            return 0;
          }
        })
      },
    ],
      function(err,result)
      {
        let arg = result;
        Billing.update({$and:[{_id:id},{service_id:{$in:arg.serviceList}}]}, updateObj, function(err,docs)
        {
      		if(err)
          {
      			res.json({"message":"error, unable to update","error_message":err});
            return 0;
      		}
      		else if(docs)
          {
      			res.status(200).json({"message":"Billing has been updated."});
            return 1;
      		}
          else
          {
            res.status(404).json({message:"error, data not found"});
            return 0;
          }
      	});
      }
    )


};

exports.getPromotion = function(req,res,next)
{
  Promotion.find({}, function(err, docs)
  {
    toolController.showModel(res,err,docs)
  })
};
exports.showPromotion = function(req,res,next)
{
  Promotion.findOne({_id:req.params.id}, function(err, docs)
  {
    toolController.showModel(res,err,docs)
  })
};
