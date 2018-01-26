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
//                  the admin verification method give you
//
//              - decoded token           via    req.decodedJWT
//                  (contain user-OID and usertype)
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

module.exports.createAdmin = (req, res, next) => {

    ///////Req body required to use this method ///////
    ///////                                     ///////
    ///////                                     ///////
    ///////  -  req.body.username               ///////
    ///////  -  req.body.password               ///////
    ///////  -  req.body.email                  ///////
    ///////  -  req.body.tel                    ///////

    /////////         Validation           ///////////
    if (req.body.username && req.body.password && req.body.email && req.body.tel) {
        if (req.body.username.length > 0 && req.body.password.length > 0 && req.body.email.length > 0 && req.body.tel.length > 0) {

        } else {
            res.status(400).json({"message":"req.body not completed"});
            return 0;
        }
    } else {
        res.status(400).json({"message":"req.body not completed"});
        return 0;
    }

    /////////Declare Global Method Variable///////////
    let Messages = [];
    let userObjectID;
    let specialOptions = {
        "userinfo" : [{
            "username": req.body.username,
            "password": req.body.password,
            "email": req.body.email,
            "tel": req.body.tel
        }]
    };
    //////////////////////////////////////////////////
    Messages.push('------------Start create new admin-------------');

    series([
        ////////////////////////////////////////////////////////////////
        //////////////////////////First Block///////////////////////////
        ////////////////////////////////////////////////////////////////
        (done) => {
            ////////////////////////////add new user///////////////////////////

            //This UserGenerator can be use too, to create new admin user
            //because admin user is not from firebase registration.
            UserGenerator(0,3,1,specialOptions,
                (err, usersObjectID) => {
                    if (err) {
                        return done(new Error("Add admin fail : " + err));
                    } else if (usersObjectID) {
                        if (usersObjectID.length > 0) {
                            userObjectID = usersObjectID[0];
                            Messages.push("Add new admin objectid : " + userObjectID + " completed");
                            return done();
                        }
                        else
                            return done(new Error("Unknown Error"));
                    } else {
                        return done(new Error("Unknown Error"));
                    }
                }
            );
        },
        () => {
            Messages.push('------------------------------------------------');
            saveMessageLog(Messages, "SystemLog.txt", "D");
            //MessagePrint(Messages, "G");
            res.status(200).json({"message":"add completed"});

            res.end();
        }
        ////////////////////////////////////////////////////////////////
        ////////////////////////////Error Block//////////////////////////
        ////////////////////////////////////////////////////////////////
    ], (error) => {
        Messages.push(error);
        Messages.push('------------------------------------------------');
        saveMessageLog(Messages, "SystemLog.txt", "D");
        res.status(400).json({"message":"Can't add Admin"});
        //MessagePrint(Messages, "R");
        res.end();
        //console.log("Found Error : " +  error);
    });

};

module.exports.setAdmin = (req, res, next) => {
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

    ///////You can create your own validation before put your req.body

    setData('_id', req.decodedJWT['id'], req.body, User, null,
        (err) => {
            if (err) {
                res.status(400).json({"message":"Can't set Admin"});
            } else {
                res.status(200).json({"message":"set completed"});
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




module.exports.postMechanicWithUser = function(req,res,next)
{
  //let token = req.headers.authorization;
  async.waterfall
  (// start of functions flow here
    [// arrange the argument in the same order as much as possible
    //callback(err,arg); // the command to end the function
      function(callback)
      {
        // callback(null,null)
        console.log('degbug 1')
        toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
        {
          console.log('devgu 2')
          callback(null,{decoded:decoded})
        });
      }, // request0
      function(arg,callback)
      {
        if(arg &&((typeof arg !== "undefined") && (arg !== null))  && arg.hasOwnProperty('decoded') &&((typeof arg.decoded !== "undefined") && (arg.decoded !== null)) && arg.decoded.hasOwnProperty('type') && arg.decoded.type==3) // isAdmin
        {
          callback(null,{decoded:arg.decoded})
        }
        else if(arg && ((typeof arg !== "undefined") && (arg !== null)) && arg.hasOwnProperty('decoded') &&((typeof arg.decoded !== "undefined") && (arg.decoded !== null)) && arg.decoded.hasOwnProperty('type') && (arg.decoded.type==2 || arg.decoded.type==1 || arg.decoded.type==0))
        { // prevent the user and mechanic from access the page
          res.status(403).json({message:"forbidden"})
          return -1;
        }
      },
      function(arg,callback)
      {
        let tmpUser = new User(req.body);
        if(req.body && req.body.hasOwnProperty) delete req.body.user_id;
        tmpUser.username = req.body.username;
        tmpUser.password = req.body.password;
        tmpUser.user_type = 1;

        tmpUser.save(function(err,docs)
        {
          if(!err)
          {
            callback(null,{userCreated:docs,decoded:arg.decoded})//,user:arg.user
          }
          else
          {
            let obj = {"message":"error, can't insert the data to the database, User collection","error_messages":err};
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
                res.status(409).json({obj})
                return 0;
              }
            }
            catch(e)
            {

            }



            //obj.error_messages.op.password



            res.status(400).json({obj});
            return 0;
          }
        })
      },
      function(arg,callback)
      {
        // create new mechanic
        let newMechanic = new Mechanic(req.body);
        // check that the file really got uploaded
        if(!req.file || !req.file.hasOwnProperty('mimetype'))
        {
          res.status(400).json({message:"error, incorrect input for uploading"});
          return -1;
        }
        // set image_url path as mechanic_id
        newMechanic.image_url = '/uploads/mechanic/images/' + newMechanic._id +'.'+ req.file.mimetype.split('/')[1];
        console.log('debug arg = ')
        console.log(arg)
        newMechanic.user_id = arg.userCreated._id; // auto add user_id from the User that created
        callback(null,{arg:arg,newMechanic:newMechanic})
      },
      function(arg,callback)
      {
        arg.newMechanic.save(function(err,docs)
        {
          if(err)
          {
            res.status(400).json({message:"error, something happened",err:err});
            return 0;
          }
          else
          {
            arg.last = {err:err,docs:docs};
            callback(null,arg)
          // return 1;
          }
        })

      },
      function(arg,callback)
      {
        Garage.findOne({_id:arg.newMechanic.garage_id},function(err,docs)
        {
          if(err)
          {
            res.status(400).json({message:"error, something happened",error_message:err}) // while insert the new mechanic to the garage
            return 0;
          }
          else if(docs)
          {
            docs.mechanic_id_list.push(arg.newMechanic._id);
            docs.save(function(err2,docs2)
            {
              if(err2)
              {
                res.status(400).json({message:"error, something happened",error_message:err})
                return 0;
              }
              else
              {
                callback(null,arg)
              }
            })

          }
          else
          {
            res.status(404).json({message: "error, data not found"})
            return 0;
          }
        })
      }
    ],// end of functions flow here
    function(err,arg) // last function
    {
      let docs = arg.last.docs;
      toolController.renameFile(req,/*req.file.path//*/ docs._id,docs,res,path = './public/uploads/mechanic/images') //'../public/uploads/mechanic/images') old code for debugging, use with __dirname in toolController

    }
  )

};
module.exports.postMechanic = function(req,res,next)
{
  //let token = req.headers.authorization;
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
        if(arg && arg.hasOwnProperty('type') && arg.type==3) // isAdmin
        {
          callback(null,{decoded:arg})
        }
        else if(arg && arg.hasOwnProperty('type') && (arg.type==2 || arg.type==1 || arg.type==0))
        {
          res.status(403).json({message:"forbidden"})
          return -1;
        }
      },
      function(arg,callback)
      {
        let newMechanic = new Mechanic(req.body);
        if(!req.file || !req.file.hasOwnProperty('mimetype'))
        {
          res.status(400).json({message:"error, incorrect input for uploading"});
          return -1;
        }
        newMechanic.image_url = '/uploads/mechanic/images/' + newMechanic._id +'.'+ req.file.mimetype.split('/')[1];
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
          res.status(200).json({message:"error, something happened",error_message:err});
          return 0;
        }
        else
          toolController.renameFile(req,/*req.file.path//*/ docs._id,docs,res,path = './public/uploads/mechanic/images') //'../public/uploads/mechanic/images') old code for debugging, use with __dirname in toolController
      })
    })
};
exports.putMechanicImg = function(req,res,next)
{
  //let token = req.headers.authorization;
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
        if(arg && arg.hasOwnProperty('type') && arg.type==3) // isAdmin
        {
          callback(null,{decoded:arg})
        }
        else if(arg && arg.hasOwnProperty('type') && (arg.type==2 || arg.type==1 || arg.type==0))
        {
          res.status(403).json({message:"forbidden"})
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
          toolController.renameFile(req,/*req.file.path//*/ docs._id,docs,res,path = './public/uploads/mechanic/images') //'../public/uploads/mechanic/images') old code for debugging, use with __dirname in toolController
        }
      })
    }
  );
}
exports.getMechanic = function(req,res,next)
{
  Mechanic.find({}, function(err, docs)
  {
    toolController.showModel(res,err,docs)
  }).populate('user_id',{password:0}).populate('garage_id')
};
exports.showMechanic = function(req,res,next)
{
  Mechanic.findOne({_id:req.params.id}, function(err, docs)
  {
    toolController.showModel(res,err,docs)
  }).populate('user_id',{password:0}).populate('garage_id')
};
exports.getMechanicInGarage = function(req,res,next)
{
  //let token = req.headers.authorization;
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
        Garage.findOne({user_id:db.mongo.mongo.ObjectId(req.params.id)},function(err,docs)
        {
          if(docs)
          {
            callback(null,docs)
          }
          else
          {
            res.json({message: "error, unable to find garage from the token"})
            return 0;
          }
        })
      },
      function(arg,callback)
      {
        let tmpList = [];
        let mongoose = db.mongo;
        for(let i=0;i<arg.mechanic_id_list.length;i++)
        {
          try
          {
            tmpList.push(mongoose.mongo.ObjectId(arg.mechanic_id_list[i]));
          }
          catch (e)
          {
            console.log("skip this value as we can't associate this data as an ObjectID, i = "+i+": "+arg.mechanic_id_list[i])
          }
        }
        Mechanic.find({_id:{ $in: tmpList}}, function(err, docs)
        {
          if(docs && Object.prototype.toString.call(docs)=="[object Array]" && docs.length>0)
          {
            callback(null,docs)
          }
          else
          {
            res.status(404).json({message:"error, unable to find mechanic from garage"})
            return 0;
          }
        }).lean()
      }
    ],
      function(err,result)
      {
        let arg = result;
        User.find({_id: {$in: arg.map(function(a) {return a.user_id;})}},{ "password": 0 },function(err,docs)
        {
          if(docs && Object.prototype.toString.call(docs)=="[object Array]" && docs.length>0)
          {
            let classData = result, user = docs;
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
            // res.json({user_list:docs, class_list: classData})
            res.json(classData)
            return 1;
          }
          else
          {
            res.status(404).json({message:"error, unable to find user from mechanic"})
            return 0;
          }
        })
      }
    )
  }
  module.exports.getClassDataWithUser = function(req,res,next)
  {
    async.waterfall
    (// start of functions flow here
      [// arrange the argument in the same order as much as possible
      //callback(err,arg); // the command to end the function
        function(callback)
        {
          // let docs = arg;
          // console.log('getMechanicFromUser Garage arg = ')
          // console.log(arg)
          let Model;
          if(req.params.userType=="mechanic") Model = Mechanic;
          else if(req.params.userType=="garage") Model = Garage;
          else
          {
              res.status(400).json({message: "please input proper userType of getClassDataWithUser"})
              return 0;
          }
          Model.find({}, function(err, docs)
          {
            if(err)
            {
              res.status(200).json({message:"error, something happened",error_message:err})
              return 0;
            }
            else if(docs && Object.prototype.toString.call(docs)=="[object Array]" && docs.length>0)
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
            res.json(classData);
            return 1;
          }
          else
          {
            res.status(200).json({message:"error, unable to find user from classData"})
            return 0;
          }
        })
      }
    );
    return 0;
  };
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
              res.status(400).json({message: "please input proper userType of showClassDataWithUser"})
              return 0;
          }
          Model.findOne({_id:req.params.id}, function(err, docs)
          {
            if(err)
            {
              res.status(200).json({message:"error, something happened",error_message:err})
              return 0;
            }
            else if(docs)
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
        // console.log(arg.map(function(a) {return a.user_id;}))
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
            res.status(200).json({message:"error, unable to find user from classData"})
            return 0;
          }
        })
      }
    )
    return 0;
  }
  module.exports.putMechanic = function(req,res,next)
  {
    let updateObj = req.body;
    let id = req.params.id
    Mechanic.findOneAndUpdate({_id:id}, updateObj, function(err,docs)
    {
  		if(err)
      {
  			res.status(400).json({message:"error, something happened",error_message:err});
        return 0;
  		}
  		else if(docs)
      {
        // if(toolController.checkUpdate(res,err,docs)==0) return 0; // TODO: add check for this case somehow
        if(req.body.hasOwnProperty('garage_id') && typeof req.body.garage_id!='undefined')
        {
          Garage.update({_id:docs.garage_id},{$pull:{mechanic_id_list:req.params.id}},function(err2,docs2)
          {
            if(toolController.checkUpdate(res,err2,docs2)==0) return 0;
            Garage.update({_id: req.body.garage_id}, {$addToSet: {mechanic_id_list: req.params.id}},function(err3,docs3)
            {
              if(toolController.checkUpdate(res,err3,docs3)==0) return 0;

              res.status(200).json({"message":"Mechanic has been updated."});
              return 1;
            })
          })
        }
        else
        {
    			res.status(200).json({"message":"Mechanic has been updated."});
          return 1;
        }
  		}
      else
      {
        res.status(404).json({message:"error, data not found"})
        return 0;
      }
  	});
    //*/
  };
  exports.deleteMechanic = function(req,res,next)
  {
    Mechanic.remove({_id:req.params.id}).exec(function(err,docs)
    {
      toolController.showDeleteModel(res,err,docs)
    });
  };
  module.exports.postPart = function(req,res,next)
  {
    //let token = req.headers.authorization;
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
          if(arg && arg.hasOwnProperty('type') && arg.type==3) // isAdmin
          {
            callback(null,arg)
          }
          else if(arg && arg.hasOwnProperty('type') && (arg.type==2 || arg.type==1 || arg.type==0))
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
      ],
      function(err,result)
      {
        let newPart = new Part(req.body);
        if(!req.file || !req.file.hasOwnProperty('mimetype'))
        {
          res.status(400).json({message:"error, incorrect input for uploading"});
          return -1;
        }
        newPart.image_url = '/uploads/part/images/' + newPart._id +'.'+ req.file.mimetype.split('/')[1];
        newPart.save(function(err,docs)
        {
          if(err)
          {
            res.status(400).json({message:"error, something happened",error_message:err});
            return 0;
          }
          else
            toolController.renameFile(req,/*req.file.path//*/ docs._id,docs,res,path = './public/uploads/part/images') //'../public/uploads/part/images') old code for debugging, use with __dirname in toolController
        })
      }
    );
  }; //*/
  module.exports.putPartImg = function(req,res,next)
  {
    //let token = req.headers.authorization;
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
          if(arg && arg.hasOwnProperty('type') && arg.type==3) // isAdmin
          {
            callback(null,arg)
          }
          else if(arg && arg.hasOwnProperty('type') && (arg.type==2 || arg.type==1 || arg.type==0))
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
      ],
      function(err,result)
      {
        if(!req.file || !req.file.hasOwnProperty('mimetype'))
        {
          res.status(400).json({message:"error, incorrect input for uploading"});
          return -1;
        }
        Part.findOne({_id:req.params.id},function(err,docs)
        {
          docs.image_url = '/uploads/part/images/' + docs._id +'.'+ req.file.mimetype.split('/')[1];
          docs.save(function(err2,docs2)
          {
            if(err)
            {
              res.status(400).json({message:"error, something happened",error_message:err});
              return 0;
            }
            else
            {
              toolController.renameFile(req,/*req.file.path//*/ docs2._id,docs2,res,path = './public/uploads/part/images') //'../public/uploads/part/images') old code for debugging, use with __dirname in toolController
            }
          })
        })
      }
    );
  };
module.exports.putPart = function(req,res,next)
{
  let updateObj = req.body;
  let id = req.params.id;
  delete updateObj.id;
  Part.update({_id:id}, updateObj, function(err,docs)
  {
		if(err)
    {
			res.status(400).json({message:"error, something happened while query",error_message:err});
      return 0;
		}
		else if(docs)
    {
      if(toolController.checkUpdate(res,err,docs)==0) return 0;

			res.status(200).json({"message":"Part has been updated."});
      return 1;
		}
    else
    {
      res.status(404).json({message:"error, data not found"});
      return 0;
    }
	});
  //*/
};
exports.deletePart = function(req,res,next)
{
  Part.remove({_id:req.params.id}).exec(function(err,docs)
  {
    toolController.showDeleteModel(res,err,docs)
  });
};
module.exports.postCar = function(req,res,next)
{
  //let token = req.headers.authorization;
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
        if(arg && arg.hasOwnProperty('type') && arg.type==3) // isAdmin
        {
          callback(null,{decoded:arg})
        }
        else if(arg && arg.hasOwnProperty('type') && (arg.type==2 || arg.type==1 || arg.type==0))
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
    ],
    function(err,result)
    {
      let newCar = new Car(req.body);
      if(!req.file || !req.file.hasOwnProperty('mimetype'))
      {
        res.status(400).json({message:"error, incorrect input for uploading"});
        return -1;
      }
      newCar.image_url = '/uploads/car/images/' + newCar._id +'.'+ req.file.mimetype.split('/')[1];
      newCar.save(function(err,docs)
      {
        if(err)
        {
          res.status(400).json({message:"error, something happened while query",error_message:err});
          return 0;
        }
        toolController.renameFile(req,/*req.file.path//*/ docs._id,docs,res,path = './public/uploads/car/images') //'../public/uploads/car/images') old code for debugging, use with __dirname in toolController
      })
    })
};
exports.putCarImg = function(req,res,next)
{
  //let token = req.headers.authorization;
  async.waterfall
  (// start of functions flow here
    [// arrange the argument in the same order as much as possible
    //callback(err,arg); // the command to end the function
      function(callback)
      {
        toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
        {
          if(decoded) callback(null,decoded)
        });
      }, // request0
      function(arg,callback)
      {
        if(arg && arg.hasOwnProperty('type') && arg.type==3) // isAdmin
        {
          callback(null,{decoded:arg})
        }
        else if(arg && arg.hasOwnProperty('type') && (arg.type==2 || arg.type==1 || arg.type==0))
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
    ],// end of functions flow here
    function(err,result) // last function
    {
      let arg = result;
      if(!req.file || !req.file.hasOwnProperty('mimetype'))
      {
        res.status(400).json({message:"error, incorrect input for uploading"});
        return -1;
      }

      Car.findOne({_id:db.mongo.mongo.ObjectId(req.params.id)},function(err,docs)
      {
        if(err)
        {
          res.status(400).json({message:"error, something happened", error_message:err})
          return -1;
        }
        else if(docs)
        {
          docs.image_url = '/uploads/car/images/' + docs._id +'.'+ req.file.mimetype.split('/')[1];
          docs.save(function(err2,docs2)
          {
            if(err2)
            {
              res.status(400).json({message:"error, something happened when try to save",err:err});
              return 0;
            }
            else
            {
              toolController.renameFile(req,/*req.file.path//*/ docs2._id,docs2,res,path = './public/uploads/car/images') //'../public/uploads/car/images') old code for debugging, use with __dirname in toolController
            }
          });
        }
        else
        {
          res.status(404).json({message:"error, car not found"})
          return 0;
        }
      })
    }
  )
}
module.exports.putCar = function(req,res,next)
{
  let updateObj = req.body;
  let id = req.params.id;
  delete updateObj.id;
  Car.update({_id:id}, updateObj, function(err,docs) {
				if(err)
        {
					res.status(400).json({message:"error, something happened",error_message:err});
          return 0;
				}
				else if(docs)
        {
          if(toolController.checkUpdate(res,err,docs)==0) return 0;

					res.status(200);
					res.json({"message":"Car has been updated."});
          return 1;
				}
        else
        {
          res.status(404).json({message:"error, data not found"})
          return 0;
        }
			});
};
exports.deleteCar = function(req,res,next)
{
  Car.remove({_id:req.params.id}).exec(function(err,docs)
  {
    toolController.showDeleteModel(res,err,docs)
  });
};
module.exports.postUser = function(req,res,next)
{
  let newUser = new User(req.body);
  newUser.save(function(err,docs)
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
        res.status(409).json({obj})
        return 0;
      }
    }
    catch(e)
    {

    }
    if(err)
    {
      res.status(400).json({message:"error, something happened while query",error_message:err});
      return 0;
    }
    res.json(docs);
    return 1;
  })
};
exports.getUser = function(req,res,next)
{
  User.find({},{ "password": 0 }, function(err, docs)
  {
    toolController.showModel(res,err,docs)
  })
};
exports.showUser = function(req,res,next)
{
  User.findOne({_id:req.params.id},{ "password": 0 }, function(err, docs)
  {
    toolController.showModel(res,err,docs)
  })
};
module.exports.putUser = function(req,res,next)
{
  let updateObj = req.body;

  User.update({_id:req.params.id}, updateObj, function(err,docs)
  {
  	if(err)
    {
  		res.status(400).json({message:"error, something happened",error_message:err});
      return 0;
  	}
  	else if(docs)
    {
      if(toolController.checkUpdate(res,err,docs)==0) return 0;

  		res.status(200).json({"message":"User has been updated."});
      return 1;
  	}
    else
    {
      res.status(404).json({message:"error, data not found"})
      return 0;
    }
  });

};
exports.deleteUser = function(req,res,next)
{
  User.remove({_id:req.params.id}).exec(function(err,docs)
  {
    toolController.showDeleteModel(res,err,docs)
  });
};
module.exports.postGarage = function(req,res,next)
{
  //let token = req.headers.authorization;
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
        if(arg && arg.hasOwnProperty('type') && arg.type==3) // isAdmin
        {
          callback(null,arg)
        }
        else if(arg && arg.hasOwnProperty('type') && (arg.type==2 || arg.type==1 || arg.type==0))
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
    ],
    function(err,result)
    {
      let newGarage = new Garage(req.body);
      if(!req.file || !req.file.hasOwnProperty('mimetype'))
      {
        res.status(400).json({message:"error, incorrect input for uploading"});
        return -1;
      }
      newGarage.image_url = '/uploads/garage/images/' + newGarage._id +'.'+ req.file.mimetype.split('/')[1];
      newGarage.save(function(err,docs)
      {
        if(err)
        {
          res.status(400).json({message:"error, something happened while query",error_message:err});
          return 0;
        }
        else
          toolController.renameFile(req,/*req.file.path//*/ docs._id,docs,res,path = './public/uploads/garage/images') //'../public/uploads/garage/images') old code for debugging, use with __dirname in toolController
      })
    }
  );
};
module.exports.postGarageWithUser = function(req,res,next)
{
  //let token = req.headers.authorization;
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
        if(arg && arg.hasOwnProperty('decoded')  &&((typeof arg.decoded !== "undefined") && (arg.decoded !== null)) && arg.decoded.hasOwnProperty('type') && arg.decoded.type==3) // isAdmin
        {
          callback(null,{decoded:arg.decoded})
        }
        else if(arg && arg.hasOwnProperty('decoded')  &&((typeof arg.decoded !== "undefined") && (arg.decoded !== null)) && arg.decoded.hasOwnProperty('type') && (arg.decoded.type==2 || arg.decoded.type==1 || arg.decoded.type==0))
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
        let tmpUser = new User(req.body);
        tmpUser.username = req.body.username;
        tmpUser.password = req.body.password;
        tmpUser.user_type = 2;
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
            res.status(400).json({"message":"can't insert the data to the database, User collection","error_messages":err});
            return 0;
          }
        })
      },
      function(arg,callback)
      {
        // create new mechanic
        let newGarage = new Garage(req.body);
        // check that the file really got uploaded
        if(!req.file || !req.file.hasOwnProperty('mimetype'))
        {
          res.status(400).json({message:"error, incorrect input for uploading"});
          return -1;
        }
        // set image_url path as mechanic_id
        newGarage.image_url = '/uploads/garage/images/' + newGarage._id +'.'+ req.file.mimetype.split('/')[1];
        newGarage.user_id = arg.userCreated._id; // auto add user_id from the User that created
        callback(null,{arg:arg,newGarage:newGarage})
      },
    ],// end of functions flow here
    function(err,result) // last function
    {
      let arg = result;
      arg.newGarage.save(function(err,docs)
      {
        if(err)
        {
          res.status(400).json({message:"error, something happened while query",error_message:err});
          return 0;
        }
        else
          toolController.renameFile(req,/*req.file.path//*/ docs._id,docs,res,path = './public/uploads/garage/images') //'../public/uploads/garage/images') old code for debugging, use with __dirname in toolController
        // return 1;
      })
    })
};
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
module.exports.putGarage = function(req,res,next)
{
  let updateObj = req.body;
  let id = req.params.id;
  delete updateObj.id;
  Garage.update({_id:id}, updateObj, function(err,docs)
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
					res.json({"message":"Garage has been updated."});
          return 1;
				}
        else
        {
          res.status(404).json({message:"error, data not found"});
          return 0;
        }
	});

};
module.exports.putGarageImg = function(req,res,next)
{
  //let token = req.headers.authorization;
  async.waterfall
  (// start of functions flow here
    [// arrange the argument in the same order as much as possible
      //callback(err,arg); // the command to end the function
      function(callback)
      {
        toolController.verifyTokenDummyCallback(req, res, function(err, decoded)
        {
          if(decoded) callback(null,decoded)
        });
      }, // request0
      function(arg,callback)
      {
        if(arg && arg.hasOwnProperty('type') && arg.type==3) // isAdmin
        {
          callback(null,{decoded:arg})
        }
        else if(arg && arg.hasOwnProperty('type') && (arg.type==2 || arg.type==1 || arg.type==0))
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
    ],
    function(err,result) // last function
    {
      let arg = result;
      if(!req.file || !req.file.hasOwnProperty('mimetype'))
      {
        res.status(400).json({message:"error, incorrect input for uploading"});
        return -1;
      }
      Garage.findOne({_id:req.params.id},function(err,docs)
      {
        if(docs)
        {
          if(arg && (arg.decoded.type == 3 || arg.decoded.type == 2) )
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
          else if(arg && (arg.decoded.type == 2 || arg.decoded.type == 1 || arg.decoded.type == 0))
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
          res.status(404).json({message:"error, garage not found"})
          return 0;
        }
      })
    });
};
exports.deleteGarage = function(req,res,next)
{
  Garage.remove({_id:req.params.id}).exec(function(err,docs)
  {
    toolController.showDeleteModel(res,err,docs)
  });
};
module.exports.postService = function(req,res,next)
{
  //let token = req.headers.authorization;
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
            res.status(400).json({message:"error, something happened while query",error_message:err})
            return -1;
          }
        })
      },
      function(arg,callback)
      {
        let tmpStatusList = req.body.status_list;
        delete req.body.status_list;
        let tmpServiceDate = req.body.service_date;
        delete req.body.service_date;
        let newService = new Service(req.body);
        newService.id_number = arg.service_count + 1;
        try
        {
          newService.service_date = new Date(tmpServiceDate);
        }
        catch (e)
        {
          newService.service_date = new Date();
        }
        if(!tmpServiceDate || typeof tmpServiceDate == "undefined")
          newService.service_date = new Date();

        newService.id_number = arg.service_count + 1;
        try
        {
          tmpStatusList.length

          // TODO: should be able to initiate statusList with the default data if the data does not got sent here and check if their format are correct, else go with default value
          // TODO: add validator for multiple input before the form got interrupted
          for(let i=0;i<tmpStatusList.length;i++)
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
    ],
    function(err,result)
    {
      let arg = result;
      // newService.mechanic_list.push({mechanic_id:"ggjgjkghlkoijdehijdkphjiohui"},{mechanic_id:"sjldfghiughiugguhglkohgiyu"}) // for future use, maybe, so I left it as is
      arg.newService.save(function(err,docs)
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
exports.getService = function(req,res,next)
{
  //let token = req.headers.authorization;
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
    ],
      function(err,result)
      {
        let arg = result;
        if(arg && (arg.type==3))
        {
          Service.find({}, function(err, docs)
          {
            toolController.showModel(res,err,docs)
          }).populate('user_id',{password:0}).populate('mechanic_id').populate('part_id_list').populate('promotion_id').populate('car_id')
        }
        else if(arg && (arg.type == 2 || arg.type == 1 || arg.type == 0))
        {
          res.status(403).json({message:"forbidden"})
          return 0;
        }
        else
        {
          res.status(401).json({message:"unauthorized"})
          return 0;
        }
      }
    )
};
exports.showService = function(req,res,next)
{
  Service.findOne({_id:db.mongo.mongo.ObjectId(req.params.id)}, function(err, docs)
  {
    toolController.showModel(res,err,docs)
  }).populate('user_id',{password:0}).populate('mechanic_id').populate('part_id_list').populate('promotion_id').populate('car_id')
};
module.exports.putService = function(req,res,next)
{
  // TODO: check if id_number should be editable or not
  let updateObj = req.body;
  let id = req.params.id;
  delete updateObj.id;
  Service.update({_id:id}, updateObj, function(err,docs)
  {
		if(err)
    {
			res.status(400).json({message:"error, something happened",error_message:err});
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
exports.deleteService = function(req,res,next)
{
  Service.remove({_id:req.params.id}).exec(function(err,docs)
  {
    // toolController.showModel(res,err,docs)
    toolController.showDeleteModel(res,err,docs)
  });
};
exports.putServiceStatus = function(req,res,next)
{
  Service.findOne({_id:req.params.id},function(err,docs)
  {
    if(docs)
    {
      if(req.params.step=="1" &&  docs.status_list[docs.status_list.length-1].status!="เปิดงาน")
        docs.status_list.push({status:"เปิดงาน",date:new Date()})
      else if(req.params.step=="2" && docs.status_list[docs.status_list.length-1].status!="ประเมินงาน")
        docs.status_list.push({status:"ประเมินงาน",date:new Date()})
      else if(req.params.step=="3" && docs.status_list[docs.status_list.length-1].status!="เสนอราคา")
        docs.status_list.push({status:"เสนอราคา",date:new Date()})
      else if(req.params.step=="4" && docs.status_list[docs.status_list.length-1].status!="ซ่อม")
        docs.status_list.push({status:"ซ่อม",date:new Date()})
      else if(req.params.step=="5" && docs.status_list[docs.status_list.length-1].status!="ปิดงาน")
        docs.status_list.push({status:"ปิดงาน",date:new Date()})
      else if(req.params.step=="0" && docs.status_list[docs.status_list.length-1].status!="ยกเลิกงาน")
        docs.status_list.push({status:"ยกเลิกงาน",date:new Date()})
      else
      {
        res.status(400).json({message:"error, incorrect step, please input the data correctly"})
        return 0;
      }
      docs.save(function(err,docs)
      {
        if(docs)
        {
          res.json({message:"update data successful"})
          return 1;
        }
        else if(err)
        {
          res.status(400).json({message:"error, something happened",error_message:err})
          return 0;
        }
        else
        {
          res.status(404).json({message:"error, something happened"})
          return 0;
        }
      })
    }
    else
    {
      res.status(404).json({message:"error, service not found"})
      return 0;
    }
  })
}
module.exports.postRequest = function(req,res,next)
{
  tmpRequestTime = req.body.request_time
  delete req.body.request_time;

  //let token = req.headers.authorization;

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
        let newRequest = new Request(req.body);
        newRequest.request_time = new Date(tmpRequestTime)

        if(req.body.hasOwnProperty('reach_time'))
        {
          tmpReachTime = req.body.reach_time
          delete req.body.reach_time
          newRequest.reach_time = new Date(tmpReachTime)
        }
        callback(null,{decoded:arg,newRequest:newRequest})
      },
    ],
    function(err,result)
    {
      result.newRequest.save(function(err,docs)
      {
        if(err)
        {
          res.status(400).json({message:"error, something happened",err:err});
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
  // console.log('Enter getRequest')
  //let token = req.headers.authorization;
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
    ],
      function(err,result)
      {
        let arg = result;
        if(arg && (arg.type==3))
        {
          Request.find({}, function(err, docs)
          {
            toolController.showModel(res,err,docs)
          }).populate('user_id',{password:0},{password:0}).populate('mechanic_id')
        }

        else if(arg && (arg.type==0 || arg.type==1 || arg.type==2))
        {
          res.status(403).json({message:"forbidden"})
          return 0;
        }
        else
        {
          res.status(401).json({message:"unauthorized"})
          return 0;
        }
      }
    )
};
exports.showRequest = function(req,res,next)
{
  Request.findOne({_id:db.mongo.mongo.ObjectId(req.params.id)}, function(err, docs)
  {
    toolController.showModel(res,err,docs);
  }).populate('user_id',{password:0}).populate('mechanic_id')
};
module.exports.putRequest = function(req,res,next)
{
  let updateObj = req.body;
  let id = req.params.id;
  delete updateObj.id;
  Request.update({_id:id}, updateObj, function(err,docs)
  {
		if(err)
    {
			res.status(400);
			res.json({"message":err});
		}
		else
    {
      if(toolController.checkUpdate(res,err,docs)==0) return 0;

			res.status(200);
			res.json({"message":"Request has been updated."});
		}
	});
};
exports.deleteRequest = function(req,res,next)
{
  Request.remove({_id:req.params.id}).exec(function(err,docs)
  {
    toolController.showDeleteModel(res,err,docs)
  });
};
module.exports.postPromotion = function(req,res,next)
{
  let newPromotion = new Promotion(req.body);
  newPromotion.save(function(err,docs)
  {
    if(err)
    {
      res.status(400).json({message:"error, something happened",error_message:err});
      return 0;
    }
    res.json(docs);
    return 1;
  })
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
  let updateObj = req.body;
  let id = req.params.id;
  delete updateObj.id;
  Promotion.update({_id:id}, updateObj, function(err,docs)
  {
		if(err)
    {
			res.status(400);
			res.json({"message":err});
		}
		else
    {
      if(toolController.checkUpdate(res,err,docs)==0) return 0;

			res.status(200);
			res.json({"message":"Promotion has been updated."});
		}
	});
};
exports.deletePromotion = function(req,res,next)
{
  Promotion.remove({_id:req.params.id}).exec(function(err,docs)
  {
    toolController.showDeleteModel(res,err,docs)
  });
};
module.exports.postBilling = function(req,res,next)
{
  let newBilling = new Billing(req.body);
  newBilling.save(function(err,docs)
  {
    toolController.showModel(res,err,docs)
  })
};
exports.getBilling = function(req,res,next)
{
  // console.log('Enter getRequest')
  //let token = req.headers.authorization;
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
      },
    ],
      function(err,result)
      {
        let arg = result;
        if(arg && arg.type==3)
        {
          Billing.find({}, function(err, docs)
          {
            toolController.showModel(res,err,docs)
          }).populate('service_id').populate('user_id',{password:0})
        }
        else if(arg && (arg.type==2 || arg.type==1 || arg.type==0))
        {
          res.status(403).json({message:"forbidden"})
          return 0;
        }
        else
        {
          res.status(401).json({message:"unauthorized"})
          return 0;
        }
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
  let updateObj = req.body;
  let id = req.params.id;
  delete updateObj.id;
  Billing.update({_id:id}, updateObj, function(err,docs)
  {
		if(err)
    {
			res.json({"message":"error, unable to update","error_message":err});
      return 0;
		}
		else
    {
      if(toolController.checkUpdate(res,err,docs)==0) return 0;

			res.status(200).json({"message":"Billing has been updated."});
      return 1;
		}
	});
  //*/
};
exports.deleteBilling = function(req,res,next)
{
  Billing.remove({_id:req.params.id}).exec(function(err,docs)
  {
    toolController.showDeleteModel(res,err,docs)
  });
};
exports.getCount = function(req,res,next)
{
  async.waterfall
  (// start of functions flow here
    [// arrange the argument in the same order as much as possible
    //callback(err,arg); // the command to end the function
      function(callback)
      {
        //mechanic
        //garage
        //service
        //part
        Mechanic.count({},function(err,docs)
        {
          if(!err)
          {
            callback(null,docs);
          }
          else
          {
            res.status(400).json({message:"error, something happened while query mechanics",error_message:err})
            return -1;
          }
        })

      }, // request0
      function(arg,callback)
      {
        Garage.count({},function(err,docs)
        {
          if(!err)
          {
            callback(null,{garage:docs,mechanic:arg})
          }
          else
          {
            res.status(400).json({message:"error, something happened while query garages",error_message:err})
            return -1;
          }
        })

      }, // request...
      function(arg,callback)
      {
        Service.count({},function(err,docs)
        {
          if(!err)
          {
            arg.service = docs;
            callback(null,arg)
          }
          else
          {
            res.status(400).json({message:"error, something happened while query services",error_message:err})
            return -1;
          }
        })
      },
      function(arg,callback)
      {
        Part.count({},function(err,docs)
        {
          if(!err)
          {
            arg.part = docs;
            callback(null,arg)
          }
          else
          {
            res.status(400).json({message:"error, something happened while query parts",error_message:err})
            return -1;
          }
        })
      }
    ],// end of functions flow here
    function(err,result) // last function
    {
      // request = result; // save all requests to request variable
      // done();
      res.json(result);
      return 1;
    }
  )
}
exports.getPartPerWeek = function(req,res,next)
{
  Service.aggregate(
    { $unwind : "$part_id_list" },
    { $match: {"createdAt" : { $gt: new Date(moment().subtract(7,'days').tz("Asia/Bangkok"))  }}},
    { $group :
                { _id : "$part_id_list" , number : { $sum : 1 } }

                },

    { $sort : { number : -1 } },function(err,docs)
    {
      // console.log(err);
      Part.populate(docs,{path:"_id"},function(err2,docs2)
      {
        if(err2)
        {
          res.status(400).json({message:"error, something happened",error_message:err})
          return 0;
        }
        else if(docs2)
        {
          docs2.forEach(function(x)
          {
            x.totalPrice = x.number * x._id.price;
          })
          toolController.showModel(res,err2,docs2)
        }
        else
        {
          res.status(404).json({message:"error, data not found from part"})
          return 0;
        }
      })

    }
  )
  /*
  Service.find({},function(err,docs)
  {
      if(!err)
      {
        for(let i in docs)
          for(let j in i.part_id_list)
            tmpList.push(j)

        res.json(result);
      }
  }) //*/

}
exports.getMechActPerWeek = function(req,res,next)
{
  Service.aggregate(

    { $match: {"createdAt" : { $gt: new Date(moment().subtract(7,'days').tz("Asia/Bangkok"))  }}}, // TODO: check what variable we should really check createdAt or service_date or date of the step inside

    { $group :
        { _id : "$mechanic_id", number : { $sum : 1 },last_service_date:{$last:"$service_date"}, money: {$sum: "$corrected_price"} }
    },

    { $sort : { number : -1 } }
    // { $lookup: {from: 'Mechanic', localField:"_id",foreignField:'_id',as:"mechanic_id"}}
    ,function(err,docs)
    {
      if(err)
      {
        res.status(400).json({message:"error, something happened",error_message:err})
        return 0;
      }
      if(docs)
      {
        // Mechanic.populate(docs,{path:'_id',select:"name"},populate:{path:'_id.garage_id',select:"name"},function(err2,docs2)
        // {
        //   toolController.showModel(res,err2,docs2)
        // })
        Mechanic.populate(docs,{path:'_id'},function(err2,docs2)
        {
          if(err2)
          {
            res.status(400).json({message:"error, something happened",error_message:err2})
            return 0;
          }
          else if(docs2)
          {
            Garage.populate(docs2,{path:'_id.garage_id',select:"name"},function(err3,docs3)
            {
              if(docs3)
              {
                docs3.forEach(function(x)
                {
                  x.mechanic_name = x._id.name;
                  x.garage_name = x._id.garage_id.name;
                })
              }
              toolController.showModel(res,err3,docs3)
            })
          }
          else
          {
            res.status(404).json({message:"error, data not found from mechanic"})
            return 0;
          }
        })
      }
      else
      {
        res.status(404).json({message:"error, data not found"})
        return 0;
      }
    }
  )
}
exports.getActPerWeek = function(req,res,next)
{
  Service.find({"createdAt" : { $gt: new Date(moment().subtract(7,'days').tz("Asia/Bangkok"))  }},function(err,docs)
  {
    if(docs)
    {
      docs.forEach(function(x)
      {
        x.last_status = x.status_list[x.status_list.length-1];
        x.mechanic_name = x.mechanic_id.name;
        x.garage_name = x.mechanic_id.garage_id.name;
        x.user_name = x.user_id.name;
      })
    }
    toolController.showModel(res,err,docs)
  }).populate({path:'mechanic_id',populate:{path:'garage_id'}}).populate({path:'user_id',select:'-password'}).lean()
}
exports.getUserServicePerMonth = function(req,res,next)
{
  // Service.count({"createdAt" : { $gt: new Date(moment().subtract(1,'month').tz("Asia/Bangkok"))  }},function(err,docs)
  // {
  //   if(docs)
  //   {
  //     docs = {count:docs};
  //   }
  //   toolController.showModel(res,err,docs)
  // })
  Service.aggregate(
    // {
    //   $project:
    //         {
    //           user_id:1,
    //           createdAt:1
    //         }
    // },
    {
      $match: {

                  createdAt:{
                              $gte:new Date(moment(new Date().getYear()+1900+"").tz("Asia/Bangkok"))
                            }

              }
      // {
            // "createdAt" : { $gt: new Date(moment().subtract(7,'days').tz("Asia/Bangkok"))
          //}
    }, // TODO: check what variable we should really check createdAt or service_date or date of the step inside
    {
      $group:
            {
              _id:{$month:"$createdAt"},number:{$sum:1}
            }
    }


    // { $group :
    //     { _id : "$mechanic_id", number : { $sum : 1 },last_service_date:{$last:"$service_date"}, money: {$sum: "$corrected_price"} }
    // }//,

    // { $sort : { number : -1 } }
  ,function(err,docs)
  {
    toolController.showModel(res,err,docs)
  })
}
//*/
