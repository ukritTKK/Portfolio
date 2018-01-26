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
//                  the garage verification method give you
//
//              - decoded token           via    req.decodedJWT
//                  (contain user-OID and usertype)
//              - garageOID               via    req.garageID
//                  (of that user-OID)
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

module.exports.createGarage = (req, res, next) => {

    ///////                      <<   Warning   >>                        ///////
    ///////                      <<   Warning   >>                        ///////
    ///////                                                               ///////
    ///////    This method automatically add garage and user of garage,   ///////
    ///////    but only garage  use req.body to save detail information   ///////
    ///////    but if you want to set garage's "User" information,        ///////
    ///////    you need to use method setUser in apiUserController        ///////
    ///////    and use user_id attach in the garage to set by yourself    ///////
    ///////                                                               ///////


    ///////Req body required to use this method ///////
    ///////                                     ///////
    ///////                                     ///////
    ///////  -  req.body.name                   ///////
    ///////  -  req.body.tel                    ///////
    ///////  -  req.body.address                ///////
    ///////  -  req.body.image_url              ///////
    ///////  -  req.body.address_lat            ///////
    ///////  -  req.body.address_lng            ///////


    /////////Declare Global Method Variable///////////
    let Messages = [];
    let userObjectID;
    let setObject;
    let Model = Garage;

    //////////////////////////////////////////////////
    Messages.push('------------Start create new garage-------------');

    series([
        ////////////////////////////////////////////////////////////////
        //////////////////////////First Block///////////////////////////
        ////////////////////////////////////////////////////////////////
        (done) => {
            ////////////////////////////Check data///////////////////////////

            try {
                if (req.body.name && req.body.tel && req.body.address && req.body.image_url &&req.body.address_lat && req.body.address_lng) {
                    if (req.body.name.length > 0 && req.body.tel.length > 0 && req.body.address.length > 0 && req.body.image_url.length > 0 &&req.body.address_lat.length > 0 && req.body.address_lng.length > 0) {
                        setObject = req.body;
                        return done();
                    }
                    else
                        return done (new Error('Some Field has no data'));

                } else {
                    return done (new Error('Some Field is undefined'));
                }
            } catch (UnhandleError) {
                return done (new Error("Unhandle Error Occured : " + UnhandleError))
            }
        },
        ////////////////////////////////////////////////////////////////
        //////////////////////////Second Block//////////////////////////
        ////////////////////////////////////////////////////////////////

        (done) => {
            ////////////////////////////add new user///////////////////////////

            //This UserGenerator can be use too, to create new garage user
            //because garage user is not from firebase registration.
            UserGenerator(0,2,1,null,
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
        ////////////////////////////third Block/////////////////////////
        ////////////////////////////////////////////////////////////////

        (done) => {
            ////////////////////////////add new garage///////////////////////////
            let newGarage = new Model(setObject);
            newGarage.user_id = userObjectID;
            newGarage.save(
                (err, newlysaved) => {
                    if (err)
                        return done(new Error("Can't save garage (critial warning, you must delete hangling user object id: " + userObjectID + " type 2 that already created) : " + err));
                    else if (newlysaved){
                        Messages.push("Garage Object ID : " + newlysaved._id + " created successfully");
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
            res.status(200).json({"message":"add garage completed"});
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
        res.status(400).json({"message":"error, can't add garage"});
        //MessagePrint(Messages, "R");
        res.end();
        //console.log("Found Error : " +  error);
    });

};

module.exports.setGarage = (req, res, next) => {
    ///////Req body can be use in this method   ///////
    ///////                                     ///////
    ///////                                     ///////
    ///////  -  req.body.name                   ///////
    ///////  -  req.body.tel                    ///////
    ///////  -  req.body.address                ///////
    ///////  -  req.body.image_url              ///////
    ///////  -  req.body.address_lat            ///////
    ///////  -  req.body.address_lng            ///////
    ///////  -  req.body.tel                    ///////

    ///////  =  req.garageID is from Verification  ///////

    ///////You can create your own validation before put your req.body

    setData("_id", req.garageID, req.body, Garage, null,
        (err) => {
            if (err) {
                res.status(400).json({"message":"error, can't set garage"});
            } else {
                res.status(200).json({"message":"set garage completed"});
            }
        }
    )
};

module.exports.addMechanic = (req, res, next) => {

    ///////                      <<   Notice   >>                     ///////
    ///////                      <<   Notice   >>                     ///////
    ///////                                                           ///////
    ///////    This method automatically add mechanic ID to garage    ///////
    ///////    and set garage ID to those mechanic who stationed      ///////
    ///////                                                           ///////


    ///////Req body required to use this method ///////
    ///////                                     ///////
    ///////                                     ///////
    ///////  -  req.body.mechanicID             ///////
    ///////  -  req.body.forcestation           ///////
    ///////         set this to "1" will force original Mechanic ///////
    ///////         to change garage to the new garage           ///////
    ///////         .If you set to zero, if This Mechanic       ///////
    ///////         already stationed, it's will return error.  ///////
    ///////  =  req.garageID is from Verification  ///////

    /////////Declare Global Method Variable///////////
    let Messages = [];
    let forcestation = Number(req.body.forcestation);
    let mechanicID = req.body.mechanicID;
    let MainGarageID = req.garageID;
    //console.log("MainGarageID : " + MainGarageID);
    //////////////////////////////////////////////////
    Messages.push('------------Start add Mechanic to Garage-------------');

    series([
        ////////////////////////////////////////////////////////////////
        //////////////////////////First Block///////////////////////////
        ////////////////////////////////////////////////////////////////

        (done) => {
            ////////////Check if Mechanic Already in other garage//////////////////
            Mechanic.findOne({"_id":mechanicID}, /*'garage_id',*/
                (err, docs) => {
                    if (err) {
                        return done(new Error("Database Error : " + err));
                    } else if (docs) {
                        ////////////if found the given mechanic ID//////////////////
                        ////////////check if they already had garage_id//////////////////
                        let garageID = docs.garage_id;
                        if (garageID) {
                            if (garageID.toString().length > 0)
                                if (forcestation === 1) {
                                    return done();
                                }
                                else
                                    return done(new Error("This mechanic OID : " + mechanicID + " already station in garage OID : " + garageID + " ,so .. can't add it to this garage, but you can do it by enable force stationed"));
                            else
                                return done();
                        } else {
                            return done();
                        }
                    } else {
                        return done(new Error("Mechanic not found"));
                    }
                }
            );

        },
        ////////////////////////////////////////////////////////////////
        //////////////////////////Second Block//////////////////////////
        ////////////////////////////////////////////////////////////////

        (done) => {
            ////////////this block is about to add mechanic ID to the garage     /////////////
            ////////////and set newly added mechanic's garage ID                 /////////////
            ////////////this two operation run at the same time, and all must be /////////////
            ////////////success.                                                 /////////////

            const promises = [
                new Promise((resolve, reject) => {

                    setData("_id", MainGarageID, {"mechanic_id_list": mechanicID}, Garage, {"customset":"$addToSet"},
                        (err) => {
                            if (err) {
                                Messages.push("Critical Error, because of this method set data in two documents, if one of saving has error, It will be value hangling");
                                Messages.push("By this, you require to remove hangling value by yourself, because this system is not support rollback operation");
                                Messages.push("Please check garageOID: " + MainGarageID + " if's there's value of mechanicOID : " +mechanicID + " it must be removed, unless other operation add them");
                                Messages.push("Please check mechanicOID: " + mechanicID + " if's there's value of garageOID : " +MainGarageID + " it must be removed, unless other operation add them");

                                reject("Error set garage OID in Mechanic" + err);
                            } else {
                                resolve()
                            }
                        }
                    );
                }),

                new Promise((resolve, reject) => {

                    setData("_id", mechanicID, {"garage_id": MainGarageID}, Mechanic, null,
                        (err) => {
                            if (err) {
                                Messages.push("Critical Error, because of this method set data in two documents, if one of saving has error, It will be value hangling");
                                Messages.push("By this, you require to remove hangling value by yourself, because this system is not support rollback operation");
                                Messages.push("Please check mechanicOID: " + mechanicID + " if's there's value of garageOID : " +MainGarageID + " it must be removed, unless other operation add them");
                                Messages.push("Please check garageOID: " + MainGarageID + " if's there's value of mechanicOID : " +mechanicID + " it must be removed, unless other operation add them");

                                reject("Error push new Mechanic OID in Garage" + err);
                            } else {
                                resolve(err);
                            }
                        }
                    );
                })
            ];
            Promise.all(promises) //This function wait for all promise array function finish
                .then( (result => {done()})) // then recieve result and run function
                .catch( (error)=> { done(new Error(error))}); // catch recieve error message and run function if error occur

        },
        ////////////////////////////////////////////////////////////////
        ////////////////////////////Last Block//////////////////////////
        ////////////////////////////////////////////////////////////////

        () => {
            Messages.push('------------Completed add new Mechanic-------------');
            saveMessageLog(Messages, "SystemLog.txt", "D");
            res.status(200).json({"message":"add mechanic to garage completed"});
        }
        ////////////////////////////////////////////////////////////////
        ////////////////////////////Error Block//////////////////////////
        ////////////////////////////////////////////////////////////////

    ], (error) => {
        Messages.push(error);
        Messages.push('------------Operation end with error-------------');
        saveMessageLog(Messages, "SystemLog.txt", "D");
        res.status(400).json({"message":"error, can't add mechanic to garage"});
        res.end();
    });


};

module.exports._NotCompleted_getGarageData = (searchID ,specialOptions, callback /* (error, docs) */) => {
    /////////Declare Global Method Variable///////////
    let Messages = [];
    let searchtype = "_id";
    let projection = "";
    //////////////////////////////////////////////////

    ///////Read Template                        ///////
    ///////                                     ///////
    /////// <1>  User ID --> Garage ID          ///////
    /////// <2>  Garage ID --> User ID          ///////
    /////// <3>  Mechanic ID --> Garage ID      ///////


    let sp = {
        readTemplate: "1",
    };



    try {

    } catch (err) {
        console.log('specialOptions structure error : ' + err);
    }

    Garage.findOne({"_id": garageID}, 'user_id',
        (err, docs) => {
            if (err)
                return callback(new Error("Database Error" + err));
            if (docs) {
                return callback(null, docs.user_id);
            } else {
                return callback(new Error("Can't find garage ID : " + garageID));
            }
        }
    );
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



module.exports.postMechanic = function(req,res,next)
{
  //var token = req.headers.authorization;
  async.waterfall
  (// start of functions flow here
    [// arrange the argument in the same order as much as possible
    //callback(err,arg); // the command to end the function
      function(callback)
      {
        // callback(null,null)
        toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
        {
          callback(null,decoded)
        });

      }, // request0
      function(arg,callback)
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
          callback(null,{user:docs,decoded:arg})
        })
      },
      function(arg,callback)
      {
        var newMechanic = new Mechanic(req.body);
        if(!req.file || !req.file.hasOwnProperty('mimetype'))
        {
          res.status(400).json({message:"error, incorrect input for uploading"});
          return -1;
        }
        newMechanic.image_url = '/uploads/mechanic/images/' + newMechanic._id +'.'+ req.file.mimetype.split('/')[1];
        callback(null,{arg:arg,newMechanic:newMechanic})
      },
      function(arg,callback)
      {
        Garage.findOne({user_id:db.mongo.mongo.ObjectId(arg.arg.decoded.id)},function(err,docs)
        {
          if(docs)
          {
            arg.newMechanic.garage_id = docs._id;
            docs.mechanic_id_list.push(arg.newMechanic._id);
            docs.save(function(err,docs2)
            {
              callback(null,arg);
            })
          }
          else
          {
            res.status(400).json({message:"error, please create your garage first"});
            return -1;
          }
        })
      },
    ],// end of functions flow here
    function(err,result) // last function
    {
      let arg = result;
      arg.newMechanic.save(function(err,docs)
      {
        if(err)
        {
          res.status(400).json({message:"error, something happened while query",error_message:err});
          return 0;
        }
        toolController.renameFile(req,/*req.file.path//*/ docs._id,docs,res,path = './public/uploads/mechanic/images') //'../public/uploads/mechanic/images') old code for debugging, use with __dirname in toolController
        return 1;
      })
    })
};
module.exports.getPartList = function(req,res,next)
{
  //var token = req.headers.authorization;
  toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
  {
    Garage.findOne({user_id:db.mongo.mongo.ObjectId(decoded.id)},function(err,docs)
    {
      toolController.showModel(res,err,docs.part_id_list)
    }).populate({path:'part_id_list',select:'name'})
  });
}
module.exports.getMechanicList = function(req,res,next)
{
  //var token = req.headers.authorization;
  toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
  {
    Garage.findOne({user_id:db.mongo.mongo.ObjectId(decoded.id)},function(err,docs)
    {
      toolController.showModel(res,err,docs.mechanic_id_list)
    }).populate({path:'mechanic_id_list',select:'name'})
  });
}
exports.getMechanic = function(req,res,next)
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
        Garage.findOne({user_id:db.mongo.mongo.ObjectId(arg.id)},function(err,docs)
        {
          if(docs) callback(null,docs)
          else
          {
            res.status(401).json({message:"error, garage not found from the token"})
            return 0;
          }
        })
      }
    ],
    function(err,arg)
    {
      Mechanic.find({garage_id:arg._id}, function(err, docs)
      {
        toolController.showModel(res,err,docs)
      }).populate('user_id',{password:0}).populate('garage_id')
    }
  )
}
exports.showMechanic = function(req,res,next)
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
        Garage.findOne({user_id:db.mongo.mongo.ObjectId(arg.id)},function(err,docs)
        {
          if(docs) callback(null,docs)
          else
          {
            res.status(401).json({message:"error, garage not found from the token"})
            return 0;
          }
        })
      }
    ],
    function(err,result)
    {
      let arg = result;
      Mechanic.findOne({$and:[{_id:req.params.id},{_id:{$in:arg.mechanic_id_list}}]}, function(err, docs)
      {
        toolController.showModel(res,err,docs)
      }).populate('user_id',{password:0}).populate('garage_id')
    }
  )
};
module.exports.putMechanic = function(req,res,next)
{
  var updateObj = req.body;
  var id = req.params.id

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
        Garage.findOne({user_id:db.mongo.mongo.ObjectId(arg.id)},function(err,docs)
        {
          if(docs) callback(null,docs)
          else
          {
            res.status(401).json({message:"error, garage not found from the token"})
            return 0;
          }
        })
      }
    ],
    function(err,result)
    {
      let arg = result;
      Mechanic.update({$and:[{_id:id},{garage_id:arg._id}]}, updateObj, function(err,docs)
      {
    		if(err)
        {
    			res.status(400).json({"message":"error, something happened",error_message:err});
          return 0;
    		}
    		else if(docs)
        {
          if(toolController.checkUpdate(res,err,docs)==0) return 0;

    			res.json({"message":"Mechanic has been updated."});
          return 1;
    		}
        else
        {
          res.status(404).json({message:"error, data not found"})
          return 0;
        }
    	});
    }
  )
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
          else if(docs.enabled != 1 && docs.user_type != 3)
          {
            res.status(403).json({message: "error, your account got disabled, please contact the garage you are in or the administrator."})
            return 0;
          }
          callback(null,{user:docs,decoded:arg})
        })
      },
      function(arg,callback)
      {
        Garage.findOne({user_id:db.mongo.mongo.ObjectId(arg.decoded.id)},function(err,docs)
        {
          if(docs)
          {
            let tmpMechList = docs.mechanic_id_list.map(function(x){ return x.toString() })
            if(tmpMechList.indexOf(req.params.id)!==-1)
            {
              callback(null,arg);
            }
            else
            {
              res.status(400).json({message:"error, this mechanic doesn't found in your garage"})
              return -1;
            }
          }
          else //callback(null,arg);
          {
            res.status(401).json({message:"error, garage not found from the token"})
            return -1;
          }
        })
      },
      function(arg,callback)
      {
        if(!req.file || !req.file.hasOwnProperty('mimetype'))
        {
          res.status(400).json({message:"error, incorrect input for uploading"});
          return -1;
        }
        Mechanic.findOne({_id:req.params.id},function(err,docs)
        {
          docs.image_url = '/uploads/mechanic/images/' + docs._id +'.'+ req.file.mimetype.split('/')[1];
          callback(null,{arg:arg,newMechanic:docs})
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
          toolController.renameFile(req,/*req.file.path//*/ docs._id,docs,res,path = './public/uploads/mechanic/images') // in case you want to debug for __dirname '../public/uploads/mechanic/images')
          return 1;
        }
      })
    }
  );
}

  module.exports.postMechanicWithUser = function(req,res,next)
  {
    //var token = req.headers.authorization;
    async.waterfall
    (// start of functions flow here
      [// arrange the argument in the same order as much as possible
      //callback(err,arg); // the command to end the function
        function(callback)
        {
          // callback(null,null)
          toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
          {
            callback(null,{decoded:decoded})
          });
        }, // request0
        function(arg,callback)
        {
          if(arg &&((typeof arg !== "undefined") && (arg !== null))  && arg.hasOwnProperty('decoded') &&((typeof arg.decoded !== "undefined") && (arg.decoded !== null)) && arg.decoded.hasOwnProperty('type') && arg.decoded.type==2) // isGarage
          {
            callback(null,{decoded:arg.decoded})
          }
          else if(arg && ((typeof arg !== "undefined") && (arg !== null)) && arg.hasOwnProperty('decoded') &&((typeof arg.decoded !== "undefined") && (arg.decoded !== null)) && arg.decoded.hasOwnProperty('type') && (arg.decoded.type==3 || arg.decoded.type==1 || arg.decoded.type==0))
          { // prevent the user and mechanic from access the page
            res.status(403).json({message:"forbidden"})
            return -1;
          }
          else
          { // for the other, don't let them pass
            res.status(401).json({message:"unauthorized"})
            return -1;
          }
        },
        function(arg,callback)
        {
          var tmpUser = new User(req.body);
          tmpUser.username = req.body.username;
          tmpUser.password = req.body.password;
          tmpUser.user_type = 1;
          tmpUser.save(function(err,docs)
          {
            try
            {
              delete err.toJSON().op.password;
            }
            catch(e)
            {

            }
            try
            {
              if(err.code=='11000')
              {
                let obj = {"message":"error, can't insert the data to the database, User collection","error_messages":err};
                res.status(409).json({obj})
                return 0;
              }
            }
            catch(e)
            {

            }
            if(!err)
            {
              callback(null,{userCreated:docs,decoded:arg.decoded})//,user:arg.user
            }
            else
            {
              var obj = {"message":"error, can't insert the data to the database, User collection","error_messages":err};
              res.status(400).json({obj});
              return 0;
            }
          })
        },
        function(arg,callback)
        {
          Garage.findOne({user_id:arg.decoded.id},function(err,docs)
          {
            if(err)
            {
              res.status(400).json({message:"error, something happened",error_message:err})
              return 0;
            }
            else if(docs)
            {
              arg.garage = docs;
              callback(null,arg)
            }
            else
            {
              res.status(404).json({message:"error, data not found"})
              return 0;
            }
          })

        },
        function(arg,callback)
        {
          // create new mechanic
          var newMechanic = new Mechanic(req.body);
          // check that the file really got uploaded
          newMechanic.garage_id = arg.garage._id;
          if(!req.file || !req.file.hasOwnProperty('mimetype'))
          {
            res.status(400).json({message:"error, incorrect input for uploading"});
            return -1;
          }
          // set image_url path as mechanic_id
          newMechanic.image_url = '/uploads/mechanic/images/' + newMechanic._id +'.'+ req.file.mimetype.split('/')[1];
          newMechanic.user_id = arg.userCreated._id; // auto add user_id from the User that created
          callback(null,{arg:arg,newMechanic:newMechanic})
        },
      ],// end of functions flow here
      function(err,result) // last function
      {
        let arg = result;
        arg.newMechanic.save(function(err,docs)
        {
          if(err)
          {
            res.status(400).json({message:"error, something happened",err:err});
            return 0;
          }
          else
            toolController.renameFile(req,/*req.file.path//*/ docs._id,docs,res,path = './public/uploads/mechanic/images') //'../public/uploads/mechanic/images') old code for debugging, use with __dirname in toolController
          // return 1;
        })
      })
  };

  exports.getPart = function(req,res,next)
  {
    Part.find({}, function(err, docs)
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
          Garage.findOne({user_id:db.mongo.mongo.ObjectId(arg.decoded.id)},function(err,docs)
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
              res.status(400).json({message:"error, something happened when try to find the parts",error_message:err})
              return 0;
            }
          }).lean()
        }
      )
  }
  exports.showPart = function(req,res,next)
  {
    Part.findOne({_id:req.params.id}, function(err, docs)
    {
      toolController.showModel(res,err,docs);
    })
  };

  exports.getCar = function(req,res,next)
  {
    //var token = req.headers.authorization;
    toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
    {
      Car.find({}, function(err, docs)
      {
        toolController.showModel(res,err,docs)
      })
    });
  };
  exports.showCar = function(req,res,next)
  {
    // TODO: add check and make the test so that it is the same user_id as user or got serviced and able to be viewed by which mechanic or garage (check if there should be a request first before viewing these car data)
    Car.findOne({_id:req.params.id}, function(err, docs)
    {
      toolController.showModel(res,err,docs)
    })
  };

  exports.getUser = function(req,res,next)
  {
    // TODO: getUser function should show only the garage and mechanic that related to the garage (check if there should be a request first before viewing the user)
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
          Garage.findOne({user_id:db.mongo.mongo.ObjectId(arg.id)},function(err,docs)
          {
            if(docs) callback(null,docs)
            else if(err)
            {
              res.status(401).json({message:"error, something happened while try to find garage from the token",error_message:err})
              return 0;
            }
            else
            {
                res.status(401).json({message:"error, something happened while try to find garage from the token"})
                return 0;
            }
          })
        },
        function(arg,callback)
        {
          Mechanic.find({_id:{$in:arg.mechanic_id_list}},function(err,docs)
          {

            if(docs) callback(null,{garage:arg,mechanic:docs})
            else if(err)
            {
              res.status(401).json({message:"error, something happened while try to find mechanic from the token",error_message:err})
              return 0;
            }
            else
            {
                res.status(401).json({message:"error, something happened while try to find mechanic from the token"})
                return 0;
            }
          })
        },
        function(arg,callback)
        {
          Service.find({mechanic_id:{$in:arg.garage.mechanic_id_list}},function(err,docs)
          {
            if(err)
            {
              res.status(400).json({message:"error, something happened while find the service",error_message:err})
              return 0;
            }
            else if(docs)
            {
              arg.service = docs;
              callback(null,arg)
            }
            else
            {
              res.status(400).json({message:"error, something happened while find the service"})
              return 0;
            }
          })
        }
        //TODO: check if we should find the user that requested or got serviced within garage
      ],
        function(err,arg)
        {
          let tmpMechanicList = [];
          arg.mechanic.forEach(function(x)
          {
            tmpMechanicList.push(x.user_id)
          })
          let tmpUserList = [];
          arg.service.forEach(function(x)
          {
            tmpUserList.push(x.user_id)
          })
          User.find({$or:[{_id:arg.garage.user_id},{_id:{$in:tmpMechanicList}},{_id:{$in:tmpUserList}}]},{ "password": 0 }, function(err, docs)
          {
            toolController.showModel(res,err,docs)
          })
        }
      )
  };
  exports.showUser = function(req,res,next)
  {
    // TODO: showUser function should show only the garage and mechanic that related to the garage
    User.findOne({_id:req.params.id},{ "password": 0 }, function(err, docs)
    {
      toolController.showModel(res,err,docs)
    })
  };
  module.exports.putUser = function(req,res,next)
  {
    var updateObj = req.body;
    var id = req.params.id;
    delete updateObj.id;
    if(updateObj.hasOwnProperty('user_type') && typeof arg.user_type !== "undefined" && arg.user_type !== null && arg.user_type!=2 && arg.user_type!=1 && arg.user_type!=0 )
      delete updateObj.user_type;

    User.update({_id:db.mongo.mongo.ObjectId(id)}, updateObj, function(err,docs)
    {
      if(err)
      {
  			res.status(400).json({"message":err});
        return 0;
  		}
  		else if(docs)
      {
        if(toolController.checkUpdate(res,err,docs)==0) return 0;

  			res.json({"message":"User has been updated."});
        return 1;
  		}
      else
      {
        res.status(404).json({message:"error, data not updated"})
        return 0;
      }
  	});
  }

  exports.getGarage = function(req,res,next)
  {
    //var token = req.headers.authorization;
    toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
    {
      Garage.find({user_id:db.mongo.mongo.ObjectId(decoded.id)}, function(err, docs)
      {
        toolController.showModel(res,err,docs)
      }).populate('user_id',{password:0}).populate('mechanic_id_list').populate('part_id_list')
    });
  };
  module.exports.putGarage = function(req,res,next)
  {
    //var token = req.headers.authorization;
    var updateObj = req.body;
    toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
    {
      Garage.update({user_id:db.mongo.mongo.ObjectId(decoded.id)}, updateObj, function(err,docs)
      {
    		if(err)
        {
    			res.status(400).json({message:"error, something happened while query",error_message:err});
          return 0;
    		}
    		else if(docs)
        {
          if(toolController.checkUpdate(res,err,docs)==0) return 0;

    			res.status(200).json({"message":"Garage has been updated."});
          return 1;
    		}
        else
        {
          res.status(404).json({message:"error, data not found"});
          return 0;
        }
    	});
    })
  };

  exports.putGarageImg = function(req,res,next)
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
          if(!req.file || !req.file.hasOwnProperty('mimetype'))
          {
            res.status(400).json({message:"error, incorrect input for uploading"});
            return -1;
          }
          callback(null,arg)
        },
      ],
        function(err,arg) // last function
        {
          Garage.findOne({user_id:db.mongo.mongo.ObjectId(arg.decoded.id)},function(err,docs)
          {
            if(docs)
            {
              if(arg && (arg.decoded.type == 2) )
              {
                docs.image_url = '/uploads/garage/images/' + docs._id +'.'+ req.file.mimetype.split('/')[1];
                docs.save(function(err2,docs2)
                {
                  if(err2)
                  {
                    res.status(400).json({message:"error, something happened",error_message:err});
                    return 0;
                  }
                  else
                    toolController.renameFile(req,/*req.file.path//*/ docs2._id,docs2,res,path = './public/uploads/garage/images') //'../public/uploads/garage/images') old code for debugging, use with __dirname in toolController
                });
              }
              else if(arg && (arg.decoded.type == 3 || arg.decoded.type == 1 || arg.decoded.type == 0))
              {
                res.status(403).json({message:"forbidden"})
                return -1;
              }
              else
              {
                res.status(401).json({message:"unauthorized"})
                return -1;
              }
            }
            else
            {
              res.status(404).json({message:"error, data not found"})
              return 0;
            }

          })
        }
      );
  }

  exports.putPartByOne = function(req,res,next)
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
      ],
        function(err,arg) // last function
        {
          Garage.update({user_id:db.mongo.mongo.ObjectId(arg.decoded.id)},{$addToSet:{part_id_list:db.mongo.mongo.ObjectId(req.params.id)}},function(err,docs)
          {
            if(err)
            {
              res.status(400).json({message:"error, something happened",error_message:err})
              return 0;
            }
            if(docs)
            {
              if(toolController.checkUpdate(res,err,docs)==0) return 0;

              res.json({message:"add data successful"})
              return 0;
            }
            else
            {
              res.status(404).json({message:"error, data not found"})
              return 0;
            }
          })
          // Garage.findOne({user_id:db.mongo.mongo.ObjectId(arg.decoded.id)},function(err,docs)
          // {
          //   if(err)
          //   {
          //     res.status(400).json({message:"error, something happened",error_message:err})
          //     return 0;
          //   }
          //   if(docs)
          //   {
          //     docs.part_id_list.push(req.params.id)
          //     docs.save(function(err2,docs2)
          //     {
          //       res.json({message:"update data successful"})
          //       return 0;
          //     })
          //   }
          //   else
          //   {
          //     res.status(404).json({message:"error, data not found"})
          //     return 0;
          //   }
          // })
        }
      );
    }
    exports.deletePartByOne = function(req,res,next)
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
        ],
          function(err,arg) // last function
          {
            Garage.update({user_id:db.mongo.mongo.ObjectId(arg.decoded.id)},{$pull:{part_id_list:db.mongo.mongo.ObjectId(req.params.id)}},function(err,docs)
            {
              if(err)
              {
                res.status(400).json({message:"error, something happened",error_message:err})
                return 0;
              }
              if(docs)
              {
                res.json({message:"delete data successful"})
                return 0;
              }
              else
              {
                res.status(404).json({message:"error, data not found"})
                return 0;
              }
            })
            // Garage.update({user_id:db.mongo.mongo.ObjectId(arg.decoded.id)},{$pull:{part_id_list:db.mongo.mongo.ObjectId(req.params.id)}},function(err,docs)
            // {
            //   if(err)
            //   {
            //     res.status(400).json({message:"error, something happened",error_message:err})
            //     return 0;
            //   }
            //   if(docs)
            //   {
            //     let index = docs.part_id_list.map(function(x){ return x.toString(); }).indexOf(req.params.id);
            //     if(index>-1) docs.part_id_list.splice(index,1);
            //     else
            //     {
            //       res.status(404).json({message:"error, data not found"})
            //       return 0;
            //     }
            //     docs.save(function(err2,docs2)
            //     {
            //       res.json({message:"update data successful"})
            //       return 0;
            //     })
            //   }
            //   else
            //   {
            //     res.status(404).json({message:"error, data not found"})
            //     return 0;
            //   }
            // })
          }
        );
      }

  exports.getService = function(req,res,next)
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

        },
        function(arg,callback)
        {
          Garage.findOne({user_id:db.mongo.mongo.ObjectId(arg.id)},function(err,docs)
          {
            if(docs)
            {
              console.log('debug 0 = ')
              console.log(arg)
              callback(null,docs)
            }
            else
            {
              res.status(401).json({message:"error, garage not found from your token"});
              return 0;
            }
          })
        }
      ],
        function(err,result)
        {
          let arg = result;
          console.log('debug 1 = ')
          console.log(arg)
           Service.find({mechanic_id:{ $in: arg.mechanic_id_list}}, function(err, docs)
           {
             console.log('debug docs = ')
             console.log(docs)
             toolController.showModel(res,err,docs)
           }).populate('user_id',{password:0}).populate('mechanic_id').populate('part_id_list').populate('promotion_id')
        }
      )
  };
  module.exports.postService = function(req,res,next)
  {
    // req.body.mechanic_id=json.parse(req.body.mechanic_id)
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
          var tmpStatusList = req.body.status_list;
          delete req.body.status_list;
          var tmpServiceDate = req.body.service_date;
          delete req.body.service_date;
          var newService = new Service(req.body);
          newService.id_number = arg.service_count + 1;
          // TODO: should be able to initiate statusList with the default data if the data does not got sent here and check if their format are correct, else go with default value
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
          Garage.findOne({user_id:db.mongo.mongo.ObjectId(arg.decoded.id)},function(err,docs)
          {
            if(docs)
            {
              // arg.newService.garage_id = docs._id;
              let tmpMechList = docs.mechanic_id_list.map(function(x){ return x.toString() })
              if(tmpMechList.indexOf(req.params.mechanic_id)!==-1)
                callback(null,arg)
              else
              {
                res.status(404).json({message:"error, this mechanic not found from mechanic_id_list inside the garage"})
                return 0;
              }
            }
            else if(err)
            {
              res.status(401).json({message:"error, garage not found from token",error_message:err})
              return 0;
            }
            else
            {
              res.status(401).json({message:"error, garage not found from token"})
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
          res.json({message:"Service has been updated"});
          return 1;
        })
      }
    )
  };
  exports.showService = function(req,res,next)
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
        },
        function(arg,callback)
        {
          Garage.findOne({user_id:db.mongo.mongo.ObjectId(arg.id)},function(err,docs)
          {
            if(docs)
            {
              callback(null,docs)
            }
            else
            {
              res.status(401).json({message:"error, garage not found from your token"});
              return 0;
            }
          })
        }
      ],
        function(err,result)
        {
          let arg = result;
          Service.findOne({$and:[{_id:req.params.id},{mechanic_id:{ $in: arg.mechanic_id_list}}]}, function(err, docs)
          {
            toolController.showModel(res,err,docs)
          }).populate('user_id',{password:0}).populate('mechanic_id').populate('part_id_list').populate('promotion_id')
        }
      )
  };
  module.exports.putService = function(req,res,next)
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
        },
        function(arg,callback)
        {
          Garage.findOne({user_id:db.mongo.mongo.ObjectId(arg.id)},function(err,docs)
          {
            if(docs)
            {
              callback(null,docs)
            }
            else
            {
              res.status(401).json({message:"error, garage not found from your token"});
              return 0;
            }
          })
        }
      ],
        function(err,result)
        {
          let arg = result;
          Service.update({$and:[{_id:id},{mechanic_id:{ $in: arg.mechanic_id_list}}]}, updateObj, function(err,docs)
          {
        		if(err)
            {
        			res.status(400).json({message:"error, something happened while query",error_message:err});
              return 0;
        		}
            else if(docs)
            {
              if(toolController.checkUpdate(res,err,docs)==0) return 0;

              res.json({"message":"Service has been updated."});
              return 1;
            }
        		else
            {
        			res.status(404).json({message:"error, data not found"})
              return 0;
        		}
        	});
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
          Garage.findOne({user_id:db.mongo.mongo.ObjectId(arg.decoded.id)},function(err,docs)
          {
            if(docs)
            {
              arg.mechanic_id_list = docs.mechanic_id_list;
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
          Service.findOne({$and:[{mechanic_id:{$in:arg.mechanic_id_list}},{_id:req.params.id}]},function(err,docs)
          {
            if(err)
            {
              res.status(400).json({message:"error, something happened",error_message:err})
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
      ],
        function(err,arg)
        {
          if(req.params.step=="1" && arg.docs.status_list[arg.docs.status_list.length-1].status!="เปิดงาน")
            arg.docs.status_list.push({status:"เปิดงาน",date:new Date()})
          else if(req.params.step=="2" && arg.docs.status_list[arg.docs.status_list.length-1].status!="ประเมินงาน")
            arg.docs.status_list.push({status:"ประเมินงาน",date:new Date()})
          else if(req.params.step=="3" && arg.docs.status_list[arg.docs.status_list.length-1].status!="เสนอราคา")
            arg.docs.status_list.push({status:"เสนอราคา",date:new Date()})
          else if(req.params.step=="4" && arg.docs.status_list[arg.docs.status_list.length-1].status!="ซ่อม")
            arg.docs.status_list.push({status:"ซ่อม",date:new Date()})
          else if(req.params.step=="5" && arg.docs.status_list[arg.docs.status_list.length-1].status!="ปิดงาน")
            arg.docs.status_list.push({status:"ปิดงาน",date:new Date()})
          else if(req.params.step=="0" && arg.docs.status_list[arg.docs.status_list.length-1].status!="ยกเลิกงาน")
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
              if(toolController.checkUpdate(res,err,docs)==0) return 0;

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
          Garage.findOne({user_id:db.mongo.mongo.ObjectId(arg.id)},function(err,docs)
          {
            if(err)
            {
              res.status(400).json({message:"error, something happened while query",error_message:err})
              return 0;
            }
            else if(docs)
            {
              callback(null,docs);
            }
            else
            {
              res.status(401).json({message:"error, garage not found from your token"});
              return 0;
            }
          })
        }
      ],
        function(err,result)
        {
          let arg = result;
          Request.find({mechanic_id:{ $in: arg.mechanic_id_list}}, function(err, docs)
          {
            toolController.showModel(res,err,docs)
          }).populate('user_id',{password:0},{password:0}).populate('mechanic_id')
        }
      )
  }
  exports.showRequest = function(req,res,next)
  {
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
    Request.update({_id:id}, updateObj, function(err,docs)
    {
  		if(err)
      {
  			res.status(400).json({"message":err});
        return 0;
  		}
  		else {
        if(toolController.checkUpdate(res,err,docs)==0) return 0;

  			res.status(200).json({"message":"Request has been updated."});
        return 1;
  		}
  	});
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
            callback(null,decoded)
          });

        },
        function(arg,callback)
        {
          Garage.findOne({user_id:db.mongo.mongo.ObjectId(arg.id)},function(err,docs)
          {
            if(docs)
            {
              callback(null,docs)
            }
            else
            {
              res.status(401).json({message:"error, garage not found from your token"});
              return 0;
            }
          })
        },
        function(arg,callback)
        {
          Service.find({mechanic_id:{ $in: arg.mechanic_id_list}},function(err,docs)
          {
            if(err)
            {
              res.status(400).json({message:"error, something happened while try to find a service from a mechanic",error_message:err})
              return 0;
            }
            else if(docs && docs.length>0)
            {
              let tmpList = [];
              for(let i = 0;i<docs.length;i++)
                tmpList.push(docs[i]._id)
              callback(null,{garage:arg,serviceList:tmpList})
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
          Billing.find({service_id:{ $in: arg.serviceList}}, function(err, docs)
          {
            toolController.showModel(res,err,docs)
          }).populate('service_id').populate('user_id',{password:0})
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
          Garage.findOne({user_id:db.mongo.mongo.ObjectId(arg.id)},function(err,docs)
          {
            if(err)
            {
              res.status(401).json({message:"error, something happened while try to find a garage from a token"})
              return 0;
            }
            else if(docs) callback(null,docs)
            else
            {
              res.status(401).json({message:"error, data not found when try to find a garage from a token"})
              return 0;
            }
          })
        },
        function(arg,callback)
        {
          Service.find({mechanic_id:{$in:arg.mechanic_id_list}},function(err,docs)
          {
            if(err)
            {
              res.status(400).json({message:"error, something happened when try to find service from garage token",error_message:err})
              return 0;
            }
            else if(docs) callback(null,docs)
            else
            {
              res.status(404).json({message:"error, data not found when try to find service from garage token"})
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
            res.status(400).json({message:"error, this service not found from the garage"})
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
            else if(docs) res.json(docs);
            else
            {
              res.status(400).json({message:"error, something happened while query",error_message:err});
              return 0;

            }
            return 1;
          })
        }
      )

  };
  exports.showBilling = function(req,res,next)
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

        },
        function(arg,callback)
        {
          Garage.findOne({user_id:db.mongo.mongo.ObjectId(arg.id)},function(err,docs)
          {
            if(docs)
            {
              callback(null,docs)
            }
            else
            {
              res.status(401).json({message:"error, garage not found from your token"});
              return 0;
            }
          })
        },
        function(arg,callback)
        {
          Service.find({mechanic_id:{ $in: arg.mechanic_id_list}},function(err,docs)
          {
            if(err)
            {
              res.status(400).json({message:"error, something happened when try to find a service from a mechanic",error_message:err})
              return 0;
            }
            else if(docs && docs.length>0)
            {
              let tmpList = [];
              for(let i = 0;i<docs.length;i++)
                tmpList.push(docs[i]._id)
              callback(null,{garage:arg,serviceList:tmpList})
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
          Billing.findOne({$and:[{_id:req.params.id},{service_id:{ $in: arg.serviceList}}]}, function(err, docs)
          {
            toolController.showModel(res,err,docs)
          }).populate('service_id').populate('user_id',{password:0})
        }
      )
  };
  module.exports.putBilling = function(req,res,next)
  {
    var updateObj = req.body;
    var id = req.params.id;
    delete updateObj.id;
    Billing.update({_id:id}, updateObj, function(err,docs)
    {
  		if(err)
      {
  			res.status(400).json({message:"error, something happened while query",error_message:err});
        return 0;
  		}
  		else if(docs)
      {
        if(toolController.checkUpdate(res,err,docs)==0) return 0;

  			res.status(200).json({"message":"Billing has been updated."});
        return 1;
  		}
      else
      {
        res.status(404).json({message:"error, data not found"})
        return 0;
      }
  	});
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
  module.exports.putPromotion = function(req,res,next)
  {
    var updateObj = req.body;
    var id = req.params.id;
    delete updateObj.id;
    Promotion.update({_id:id}, updateObj, function(err,docs)
    {
  		if(err)
      {
  			res.status(400).json({message:"error, something happened while query",error_message:err});
        return 0;
  		}
  		else if(docs)
      {
        if(toolController.checkUpdate(res,err,docs)==0) return 0;

  			res.status(200);
  			res.json({"message":"Promotion has been updated."});
        return 1;
  		}
      else
      {
        res.status(404).json({message:"error, data not found"})
        return 0;
      }
  	});
    //*/
  };
  module.exports.postPromotion = function(req,res,next)
  {
    var newPromotion = new Promotion(req.body);
    newPromotion.save(function(err,docs)
    {
      if(err)
      {
        res.status(400).json({message:"error, something happened while query",error_message:err});
        return 0;
      }
      res.json(docs);
      return 1;
    })
  };
  // TODO: check if we should delete this
  module.exports.getClassDataWithUser = function(req,res,next)
  {
    // TODO: when getGarage, the garage should only be able to view their own data
    async.waterfall
    (// start of functions flow here
      [// arrange the argument in the same order as much as possible
      //callback(err,arg); // the command to end the function
        function(callback)
        {
          let Model;
          if(req.params.userType=="mechanic") Model = Mechanic;
          // else if(req.params.userType=="garage") Model = Garage; // TODO: check if we really need this when garage view themselves or not
          else
          {
              res.status(400).json({message: "please input proper userType of getClassDataWithUser"})
              return 0;
          }
          Model.find({}, function(err, docs)
          {
            if(docs && Object.prototype.toString.call(docs)=="[object Array]" && docs.length>0)
            {
              callback(null,docs)
            }
            else
            {
              res.status(404).json({message:"error, unable to find classData"})
              return 0;
            }
          }).lean()
        }
      ],
      function(err,result)
      {
        let arg = result;
        // i.e. result = mechanic, docs = user
        User.find({_id: {$in: arg.map(function(a) {return a.user_id;})}},{ "password": 0 },function(err,docs)
        {
          let classData = result, user = docs;
          if(user && Object.prototype.toString.call(docs)=="[object Array]" && docs.length>0) //exists!
          {
            for(let i=0;i<classData.length;i++)
            {
              if(user[i]._id==classData[i].user_id)
              {
                classData[i]["enabled"] = user[i].enabled;
                classData[i]["username"] = user[i].username;
              }
              else
              {
                for(let j=0;j<user.length;j++)
                {
                  if(user[j]._id==classData[i].user_id)
                  {
                    classData[i]["enabled"] = user[j].enabled;
                    classData[i]["username"] = user[j].username;
                  }
                }
              }
            }
            //TODO: for garage, join mechanic with service too. (in case you want to show the garages their current services)
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
  // TODO: check if we should delete this
  module.exports.showClassDataWithUser = function(req,res,next)
  {
    async.waterfall
    (// start of functions flow here
      [// arrange the argument in the same order as much as possible
      //callback(err,arg); // the command to end the function
        function(callback)
        {
          let Model;
          if(req.params.userType=="mechanic") Model = Mechanic;
          else if(req.params.userType=="garage") Model = Garage;
          else
          {
              res.status(400).json({message: "please input proper userType of getClassDataWithUser"})
              return 0;
          }
          if(!req.params.id)
          {
            res.status(400).json({message: "please input proper id of getClassDataWithUser"})
            return 0;
          }
          Model.findOne({_id:req.params.id}, function(err, docs)
          {
            if(docs)
            {
              callback(null,docs)
            }
            else
            {
              res.status(404).json({message:"error, unable to find classData"})
              return 0;
            }
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
