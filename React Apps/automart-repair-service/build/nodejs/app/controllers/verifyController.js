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

///////////////////////From Configs////////////////////////
const config = require('../configs/env');
const db = require('../configs/db');

//////////////////From Other Controllers///////////////////
const toolController = require(config.mpath['controllers']['tool']);
    const UserGenerator = toolController.UserGenerator;
    const saveMessageLog = toolController.saveMessageLog;
    const MessagePrint = toolController.MessagePrint;
    const randomString = toolController.randomString;
    const setData = toolController.setData;

////////////////////////From Mongo/////////////////////////
const Garage = require('mongoose').model('Garage');
const Mechanic =  require('mongoose').model('Mechanic');
const User = require('mongoose').model('User');
///////////////////////From Firebase///////////////////////
const admin = require('firebase-admin');
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////


///////////////////////Process of version 2 Verification///////////////////////
///////////////////////Process of version 2 Verification///////////////////////
///////////////////////Process of version 2 Verification///////////////////////
///////////////////////Process of version 2 Verification///////////////////////
///////////////////////Process of version 2 Verification///////////////////////
//
//
//               FrontEnd LogIn Via Firebase and Get JWT Token
//            FrontEnd Use that JWT Token to request Backend API
//
//             ----------Request Authentication Flow-----------
//
//      Route -->  verification method -> API Method1 -> API Method2 ...
//
// 1 >    Verification Method receive JWT Token and decode and authen
// 2 >           if decoded or authen fail, Cancel the request
// 3 >if success, save docoded Token in req.decodedJWT, and pass to API Method
//
// 4 >      API Method read decodedJWT from req.decodedJWT to run API
//
//
///////////////////////////////////////////////////////////////////////////////
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



module.exports.verifyAllV2 = (req, res, next) => {

    /////////////////////////Module Global Variable////////////////////////////
    let decodedtoken;
    let Messages = [];
    ///////////////////////////////////////////////////////////////////////////
    /////////You can see series and promise helper at the bottom of the this file/////
    //console.log("receive JWT ID : " + req.headers.authorization );
    //console.log("inside : " + JSON.stringify(req.body, null, 4));
    series([
        (done) => {
            /////////////////This first Block is to receive JWTtoken from header of request.     ////////////////
            /////////////////and then sent to verifyToken mothod to decode.                      ////////////////

            let JWTtoken = req.headers.authorization;
            //console.log('JWTtoken : ' + JWTtoken);
            toolController.verifyTokenV2(JWTtoken, res,
                (err, decode)=>{
                    if (err) {
                        done(new Error(err));
                    } else {
                        decodedtoken = decode ;
                        done();
                    }
            });
        },
        () => {
            Messages.push('Verification Completed | UserOID : ' + decodedtoken['id'] + ' User Type : ' + decodedtoken['type']);
            saveMessageLog(Messages, 'VerificationLogs.txt', 'D', 'J');

            req.decodedJWT = decodedtoken;
            next();
        }
    ], (error) => {
        Messages.push('Verification Error : ' + error);
        saveMessageLog(Messages, 'VerificationLogs.txt', 'D', 'J');
        req.decodedJWT = "";
        return 0;
    });
};

module.exports.verifyAllIndivV2 = (req, res, next) => {

    /////////////////////////Module Global Variable////////////////////////////
    let decodedtoken;
    let Messages = [];
    ///////////////////////////////////////////////////////////////////////////
    console.log('------------------------------------------------------------');
    series([
        (done) => {
            /////////////////This first Block is to receive JWTtoken from header of request.     ////////////////
            /////////////////and then sent to verifyToken mothod to decode.                      ////////////////

            let JWTtoken = req.headers.authorization;
            toolController.verifyTokenV2(JWTtoken, res,
                (err, decode)=>{
                    if (err) {
                        done(new Error(err));
                    } else {
                        decodedtoken = decode ;
                        done();
                    }
                });
        },
        (done) => {
            try {
                if (Number(decodedtoken.type) === 0) {
                    //TODO: check if we should add more check for User to double check or not
                    if (String(decodedtoken.id) === String(req.params.id)){
                        done();
                    } else {
                        res.status(403).json({'message':'You are not the staff, so you can\'t use this function.'});
                        done(new Error('Client are not stuff'));
                    }
                } else {
                    res.status(403).json({'message': 'forbidden from authentication'});
                    done(new Error('client forbid from authentication'));
                }
            } catch (error) {
                done (new Error('Fatal or Unhandle Error : ' + error));
            }
        },
        () => {
            Messages.push('Verification Completed | UserOID : ' + decodedtoken['id'] + ' User Type : ' + decodedtoken['type']);
            saveMessageLog(Messages, 'VerificationLogs.txt', 'D', 'J');
            req.decodedJWT = decodedtoken;
            next();
        }
    ], (error) => {
        Messages.push('Verification Error : ' + error);
        saveMessageLog(Messages, 'VerificationLogs.txt', 'D', 'J');
        req.decodedJWT = "";
        return 0;
    });

};

module.exports.verifyMechanicV2 = (req, res, next) => {
    /////////////////////////Module Global Variable////////////////////////////
    let decodedtoken;
    let mechanicID;
    let garageID;
    let Messages = [];
    ///////////////////////////////////////////////////////////////////////////
    /////////You can see series and promise helper at the bottom of the this file/////

    series([
        (done) => {
            /////////////////This first Block is to receive JWTtoken from header of request.     ////////////////
            /////////////////and then sent to verifyToken mothod to decode.                      ////////////////

            let JWTtoken = req.headers.authorization;
            //console.log('JWTtoken : ' + JWTtoken);
            toolController.verifyTokenV2(JWTtoken, res,
                (err, decode)=>{
                    if (err) {
                        done(new Error(err));
                    } else {
                        decodedtoken = decode ;
                        done();
                    }
                });
        },
        (done) => {
            try {
                if (Number(decodedtoken.type) === 1) {
                    Mechanic.findOne({user_id: decodedtoken.id}, '_id garage_id',
                        (err, docs) => {
                            if (err) {
                                //We not sent detail database error message to client
                                res.status(400).json({'message':'error, something happened from authentication'});
                                done(new Error('Database Error : ' + err));
                            } else if (docs) {
                                //console.log("Docs : " + JSON.stringify(docs, null, 4));
                                mechanicID = docs._id;
                                garageID = docs.garage_id;
                                done();
                            } else {
                                res.status(401).json({'message': "error, mechanic not found from a token from authentication"});
                                done(new Error('Mongo : mechanic not found'));
                            }
                        });
                } else if (Number(decodedtoken.type) === 0 || Number(decodedtoken.type) === 2 || Number(decodedtoken.type) === 3) {
                    //TODO: check if we should add more check for User to double check or not
                    res.status(403).json({'message' : "You are not a mechanic, so you can't use this function."});
                    done (new Error('Client is not a mechanic'));
                } else {
                    res.status(403).json({'message' : 'forbidden from authentication'});
                    done (new Error('Client forbidden from authentication'));
                }
            } catch (error) {
                done (new Error('Fatal or Unhandle Error : ' + error));
            }


        },
        () => {

            Messages.push('Verification Completed | UserOID : ' + decodedtoken['id'] + ' User Type : ' + decodedtoken['type']);
            saveMessageLog(Messages, 'VerificationLogs.txt', 'D', 'J');
            req.decodedJWT = decodedtoken;
            req.mechanicID = mechanicID;
            req.garageID = garageID;
            next();
        }
    ], (error) => {
        Messages.push('Verification Error : ' + error);
        saveMessageLog(Messages, 'VerificationLogs.txt', 'D', 'J');
        req.decodedJWT = "";
        return 0;
    });

};

module.exports.verifyMechanicIndivV2 = (req, res, next) => {
    /////////////////////////Module Global Variable////////////////////////////
    let decodedtoken;
    let mechanicID;
    let garageID;
    let Messages = [];
    ///////////////////////////////////////////////////////////////////////////
    /////////You can see series and promise helper at the bottom of the this file/////

    series([
        (done) => {
            /////////////////This first Block is to receive JWTtoken from header of request.     ////////////////
            /////////////////and then sent to verifyToken mothod to decode.                      ////////////////

            let JWTtoken = req.headers.authorization;
            //console.log('JWTtoken : ' + JWTtoken);
            toolController.verifyTokenV2(JWTtoken, res,
                (err, decode) => {
                    if (err) {
                        done(new Error(err));
                    } else {
                        decodedtoken = decode ;
                        done();
                    }
                });
        },
        (done) => {
            try {
                if (Number(decodedtoken.type) === 1) {
                    Mechanic.findOne({user_id: decodedtoken.id},'_id garage_id',
                        (err, docs) => {
                            if (err) {
                                //We not sent detail database error message to client
                                res.status(400).json({'message':'error, something happened from authentication'});
                                done(new Error('Database Error : ' + err));
                            } else if (docs && String(docs._id) === String(req.params.id) || String(decodedtoken.id) === String(req.params.id)) {
                                mechanicID = docs._id;
                                garageID = docs.garage_id;
                                done();
                            } else {
                                res.status(403).json({'message': "You can't change another mechanic's profile."});
                                done(new Error('Mongo : mechanic not found'));
                            }
                        });
                } else if (Number(decodedtoken.type) === 0 ) {
                    //TODO: check if we should add more check for User to double check or not
                    res.status(403).json({'message' : "You are not the staff, so you can't use this function."});
                    done (new Error('Client is not a mechanic'));
                } else {
                    res.status(403).json({'message' : 'forbidden from authentication'});
                    done (new Error('Client forbidden from authentication'));
                }
            } catch (error) {
                done (new Error('Fatal or Unhandle Error : ' + error));
            }


        },
        () => {
            Messages.push('Verification Completed | UserOID : ' + decodedtoken['id'] + ' User Type : ' + decodedtoken['type']);
            saveMessageLog(Messages, 'VerificationLogs.txt', 'D', 'J');
            req.decodedJWT = decodedtoken;
            req.mechanicID = mechanicID;
            req.garageID = garageID;
            next();
        }
    ], (error) => {
        Messages.push('Verification Error : ' + error);
        saveMessageLog(Messages, 'VerificationLogs.txt', 'D', 'J');
        req.decodedJWT = "";
        return 0;
    });

};

module.exports.verifyGarageV2 = (req, res, next) => {
    /////////////////////////Module Global Variable////////////////////////////
    let decodedtoken;
    let garageID;
    let Messages = [];
    ///////////////////////////////////////////////////////////////////////////
    /////////You can see series and promise helper at the bottom of the this file/////

    series([
        (done) => {
            /////////////////This first Block is to receive JWTtoken from header of request.     ////////////////
            /////////////////and then sent to verifyToken mothod to decode.                      ////////////////

            let JWTtoken = req.headers.authorization;
            //console.log('JWTtoken : ' + JWTtoken);
            toolController.verifyTokenV2(JWTtoken, res,
                (err, decode)=>{
                    if (err) {
                        done(new Error(err));
                    } else {
                        decodedtoken = decode ;
                        done();
                    }
                });
        },
        (done) => {
            try {
                if (Number(decodedtoken.type) === 2) {
                    Garage.findOne({user_id: decodedtoken.id},'_id',
                        (err, docs) => {
                            if (err) {
                                //We not sent detail database error message to client
                                res.status(400).json({'message':'error, something happened from authentication'});
                                done(new Error('Database Error : ' + err));
                            } else if (docs) {
                                garageID = docs._id;
                                done();
                            } else {
                                res.status(400).json({'message': "error, please create your garage first from authentication"});
                                done(new Error('Mongo : mechanic not found'));
                            }
                        });
                } else {
                    res.status(403).json({'message' : 'forbidden from authentication'});
                    done (new Error('Client forbidden from authentication'));
                }
            } catch (error) {
                done (new Error('Fatal or Unhandle Error : ' + error));
            }


        },
        () => {
            Messages.push('Verification Completed | UserOID : ' + decodedtoken['id'] + ' User Type : ' + decodedtoken['type']);
            saveMessageLog(Messages, 'VerificationLogs.txt', 'D', 'J');
            req.decodedJWT = decodedtoken;
            req.garageID = garageID;
            next();
        }
    ], (error) => {
        Messages.push('Verification Error : ' + error);
        saveMessageLog(Messages, 'VerificationLogs.txt', 'D', 'J');
        req.decodedJWT = "";
        return 0;
    });

};

module.exports.verifyGarageIndivV2 = (req, res, next) => {
    /////////////////////////Module Global Variable////////////////////////////
    let decodedtoken;
    let garageID;
    let Messages = [];

    ///////////////////////////////////////////////////////////////////////////
    /////////You can see series and promise helper at the bottom of the this file/////

    series([
        (done) => {
            /////////////////This first Block is to receive JWTtoken from header of request.     ////////////////
            /////////////////and then sent to verifyToken mothod to decode.                      ////////////////

            let JWTtoken = req.headers.authorization;
            //console.log('JWTtoken : ' + JWTtoken);
            toolController.verifyTokenV2(JWTtoken, res,
                (err, decode)=>{
                    if (err) {
                        done(new Error(err));
                    } else {
                        decodedtoken = decode ;
                        done();
                    }
                });
        },
        (done) => {
            try {
                if (Number(decodedtoken.type) === 2) {
                    /////////////////Find Garage by User-ID////////////////
                    Garage.findOne({user_id: decodedtoken.id},'_id user_id mechanic_id_list',
                        (err, docs) => {
                            if (err) {
                                //We not sent detail database error message to client
                                res.status(400).json({'message':'error, something happened from authentication'});
                                return done(new Error('Database Error : ' + err));
                            } else if (docs) {
                                /////////////////You can access garage by user_oid, garage_oid////////////////
                                /////////////////Stationed Mechanic(user_id or Object_ID of Mechanic)/////////

                                /////////////////First Part it's check params id with garage_oid and user_oid////////////////
                                //console.log("test docs : " + JSON.stringify(docs, null, 4));
                                //console.log("params : " + req.params.id);
                                if (String(req.params.id) === String(docs._id) || String(req.params.id) === String(decodedtoken.id))  { // find same garage_id or user_id
                                    garageID = docs._id;
                                    Messages.push('Garage verification pass by using garage OID or garage User OID');
                                    return done();
                                } else {
                                    /////////////////Second Part if previous fail, it's check stationed mechanic////////////////
                                    for (let i = 0; i < docs.mechanic_id_list.length; i++) {
                                        try {
                                            /////////////////check stationed mechanic by object ID////////////////
                                            if (String(docs.mechanic_id_list[i]) === String(req.params.id)) {
                                                garageID = docs._id;
                                                Messages.push('Garage verification pass by using one of the Mechanic OID');
                                                return done();
                                            }
                                        } catch (error) {
                                            Messages.push("Found push mechanic ID Error at : " + i + " : " + error);
                                        }

                                    }
                                }
                                /////////////////check stationed mechanic by user_id of mechanic////////////////

                                Mechanic.find({_id: {$in: docs.mechanic_id_list}}, 'user_id',
                                    (err, docsM) => {
                                        if (err) {
                                            res.status(403).json({"message": "Database Error"});
                                            return done(new Error("Database Error : " + err));
                                        }
                                        else if (docsM && docsM.length > 0) {
                                            for (let i = 0; i < docsM.length; i++) {
                                                if (String(docsM[i].user_id) === String(req.params.id)) {
                                                    garageID = docs._id;
                                                    Messages.push('Garage verification pass by using one of the Mechanic user OID');
                                                    return done();
                                                }
                                            } //Syncronous Code
                                            res.status(403).json({"message": "params id not found in any topics"});
                                            return done(new Error("params id not found in any topics"));
                                        } else {
                                            res.status(403).json({"message": "You can't change the unrelated's profile from authentication"});
                                            return done(new Error("Authentication Error"));
                                        }
                                    }
                                );
                            } else {
                                res.status(400).json({'message': "error, please create your garage first from authentication"});
                                return done(new Error('Mongo : mechanic not found'));
                            }
                        });
                } else {
                    res.status(403).json({'message' : "You are not the garage owner, so you can't use this function from authentication."});
                    return done (new Error('Client forbidden from authentication'));
                }
            } catch (error) {
                return done (new Error('Fatal or Unhandle Error : ' + error));
            }

        },
        () => {
            Messages.push('Verification Completed | UserOID : ' + decodedtoken['id'] + ' User Type : ' + decodedtoken['type']);
            saveMessageLog(Messages, 'VerificationLogs.txt', 'D', 'J');
            //MessagePrint(Messages, "G");
            req.decodedJWT = decodedtoken;
            req.garageID = garageID;
            next();
        }
    ], (error) => {
        Messages.push('Verification Error : ' + error);
        saveMessageLog(Messages, 'VerificationLogs.txt', 'D', 'J');
        //MessagePrint(Messages, "R");
        req.decodedJWT = "";
        return 0;
    });

};

module.exports.verifyAdminV2 = (req, res, next) => {
    /////////////////////////Module Global Variable////////////////////////////
    let decodedtoken;
    let Messages = [];
    ///////////////////////////////////////////////////////////////////////////
    /////////You can see series and promise helper at the bottom of the this file/////

    series([
        (done) => {
            /////////////////This first Block is to receive JWTtoken from header of request.     ////////////////
            /////////////////and then sent to verifyToken mothod to decode.                      ////////////////

            let JWTtoken = req.headers.authorization;
            //console.log('JWTtoken : ' + JWTtoken);
            toolController.verifyTokenV2(JWTtoken, res,
                (err, decode)=>{
                    if (err) {
                        done(new Error(err));
                    } else {
                        decodedtoken = decode ;
                        done();
                    }
                });
        },
        (done) => {
            try {
                if (Number(decodedtoken.type) === 3) {
                    return done();

                } else if (Number(decodedtoken.type) === 0 || Number(decodedtoken.type) === 1 || Number(decodedtoken.type) === 2) {
                    //TODO: check if we should add more check for User to double check or not
                    res.status(403).json({'message' : "You are not the admin, so you can't use this function."});
                    return done (new Error('Client is not a admin'));

                } else {
                    res.status(401).json({'message' : 'unauthorized from authentication'});
                    return done (new Error('Client forbidden from authentication'));

                }
            } catch (error) {
                return done (new Error('Fatal or Unhandle Error : ' + error));
            }

        },
        () => {
            Messages.push('Verification Completed | UserOID : ' + decodedtoken['id'] + ' User Type : ' + decodedtoken['type']);
            saveMessageLog(Messages, 'VerificationLogs.txt', 'D', 'J');
            req.decodedJWT = decodedtoken;
            next();
        }
    ], (error) => {
        Messages.push('Verification Error : ' + error);
        saveMessageLog(Messages, 'VerificationLogs.txt', 'D', 'J');
        return 0;
    });

};


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
//////////////////////////Legacy API///////////////////////////////
//////////////////////////Legacy API///////////////////////////////
//////////////////////////Legacy API///////////////////////////////
//////////////////////////Legacy API///////////////////////////////
//////////////////////////Legacy API///////////////////////////////
//////////////////////////Legacy API///////////////////////////////
//////////////////////////Legacy API///////////////////////////////
//////////////////////////Legacy API///////////////////////////////
//////////////////////////Legacy API///////////////////////////////
//////////////////////////Legacy API///////////////////////////////
//////////////////////////Legacy API///////////////////////////////
//////////////////////////Legacy API///////////////////////////////
//////////////////////////Legacy API///////////////////////////////
//////////////////////////Legacy API///////////////////////////////
///////////////////////////Section/////////////////////////////////
///////////////////////////////////////////////////////////////////


let legacy = () => {
    module.exports.verifyAll = function(req, res, next) {
        var token = req.headers.authorization;
        async.waterfall
        (// start of functions flow here
            [// arrange the argument in the same order as much as possible
                //callback(err,arg); // the command to end the function
                function(callback)
                {
                    toolController.verifyToken(token, res, function(err, decoded)
                    {
                        callback(null,decoded)
                    });
                }, // request0
                /*
                 function(decoded,callback)
                 {
                 tools.verifyKey(decoded.key, res, function(err, user)
                 {
                 callback(callback,arg)
                 });
                 }, // request...
                 //*/
            ],// end of functions flow here
            function(err,result) // last function
            {
                //request = result; // save all requests to request variable
                //done();
                // if(decoded.type!=1 || decoded.type!=2 || decoded.type!=3)
                //   res.status(403).json({"message":"You are not the staff, so you can't use this function."})
                // else
                next();
            }
        )
    };
    module.exports.verifyAllIndiv = function(req, res, next) {
        var token = req.headers.authorization;
        async.waterfall
        (// start of functions flow here
            [// arrange the argument in the same order as much as possible
                //callback(err,arg); // the command to end the function
                function(callback)
                {
                    toolController.verifyToken(token, res, function(err, decoded)
                    {
                        callback(null,decoded)
                    });
                }, // request0
                function(decoded,callback)
                {
                    if(decoded.type==0)
                    {
                        //TODO: check if we should add more check for User to double check or not
                        if(decoded.id == req.params.id)
                        {
                            callback(null,decoded)
                        }
                        else
                        {
                            res.status(403).json({"message":"You are not the staff, so you can't use this function."})
                            return 0;
                        }
                    }
                    else
                    {
                        res.status(403).json({message:"forbidden from authentication"})
                        return 0;
                    }
                }
            ],// end of functions flow here
            function(err,result) // last function
            {
                next();
            }
        )
    };
    module.exports.verifyMechanic = function(req, res, next) {
        var token = req.headers.authorization;
        async.waterfall
        (// start of functions flow here
            [// arrange the argument in the same order as much as possible
                //callback(err,arg); // the command to end the function
                function(callback)
                {
                    toolController.verifyToken(token, res, function(err, decoded)
                    {
                        callback(null,decoded)
                    });
                }, // request0
                function(decoded,callback)
                {
                    if(decoded.type==0 || decoded.type==2 || decoded.type == 3)
                    {  res.status(403).json({"message":"You are not a mechanic, so you can't use this function."})
                        return 0;
                    }
                    else if(decoded.type==1)
                    {
                        Mechanic.findOne({user_id:db.mongo.mongo.ObjectId(decoded.id)},function(err,docs)
                        {
                            if(err)
                            {
                                res.status(400).json({message:"error, something happened from authentication",err_message:err})
                                return 0;
                            }
                            else if(docs)
                            {
                                callback(null,decoded)
                            }
                            else
                            {
                                res.status(401).json({message:"error, mechanic not found from a token from authentication"})
                                return 0;
                            }
                        })
                    }
                    else
                    {
                        res.status(403).json({message:"forbidden from authentication"})
                        return 0;
                    }
                }
            ],// end of functions flow here
            function(err,result) // last function
            {
                next();
            }
        )
    };
    module.exports.verifyMechanicIndiv = function(req, res, next) {
        var token = req.headers.authorization;
        async.waterfall
        (// start of functions flow here
            [// arrange the argument in the same order as much as possible
                //callback(err,arg); // the command to end the function
                function(callback)
                {
                    toolController.verifyToken(token, res, function(err, decoded)
                    {
                        callback(null,decoded)
                    });
                }, // request0
                function(decoded,callback)
                {
                    if(decoded.type==0)
                    {
                        res.status(403).json({"message":"You are not the staff, so you can't use this function."})
                        return 0
                    }
                    else if(decoded.type==1)
                    {
                        Mechanic.findOne({user_id:db.mongo.mongo.ObjectId(decoded.id)},function(err,docs)
                        {
                            if(docs && docs.id == req.params.id || decoded.id ==req.params.id) // check both mechanic_id and user_id too
                                callback(null,decoded);
                            else
                            {
                                res.status(403).json({"message":"You can't change another mechanic's profile."})
                                return 0
                            }
                        });
                    }
                    else if(decoded.type==2 || decoded.type==3)
                    {
                        res.status(403).json({message:"forbidden from authentication"})
                        return 0;
                    }
                }
            ],// end of functions flow here
            function(err,result) // last function
            {
                next();
            }
        )
    };
    module.exports.verifyGarage = function(req, res, next) {
        var token = req.headers.authorization;
        async.waterfall
        (// start of functions flow here
            [// arrange the argument in the same order as much as possible
                //callback(err,arg); // the command to end the function
                function(callback)
                {
                    toolController.verifyToken(token, res, function(err, decoded)
                    {
                        callback(null,decoded)
                    });
                }, // request0
                function(decoded,callback)
                {
                    if(decoded.type==2)
                    {
                        Garage.findOne({user_id:db.mongo.mongo.ObjectId(decoded.id)},function(err,docs)
                        {
                            if(docs)
                            {
                                callback(null,decoded)
                            }
                            else
                            {
                                // TODO: check why garage getDataList show this with the sample data
                                res.status(400).json({message:"error, please create your garage first from authentication"})
                                return -1;
                            }
                        })
                    }
                    else if(decoded.type==0 || decoded.type==1 || decoded.type == 3)
                    {
                        res.status(403).json({message:"forbidden from authentication"})
                        return 0
                    }
                }
            ],// end of functions flow here
            function(err,result) // last function
            {
                next();
            }
        )
    };
    module.exports.verifyGarageIndiv = function(req, res, next) {
        var token = req.headers.authorization;
        async.waterfall
        (// start of functions flow here
            [// arrange the argument in the same order as much as possible
                //callback(err,arg); // the command to end the function
                function(callback)
                {
                    toolController.verifyToken(token, res, function(err, decoded)
                    {
                        callback(null,decoded)
                    });
                }, // request0
                function(decoded,callback)
                {
                    if(decoded.type==2)
                    {
                        Garage.findOne({user_id:db.mongo.mongo.ObjectId(decoded.id)},function(err,docs)
                        {
                            if(docs)
                            {
                                if(req.params.id == docs._id || req.params.id == decoded.id) // find same garage_id or user_id
                                    callback(null,decoded)
                                else
                                {
                                    let tmpList = []
                                    // check mechanic_id of mechanic in garage
                                    let mongoose = db.mongo;
                                    for(let i=0;i<docs.mechanic_id_list.length;i++)
                                    {
                                        if(docs.mechanic_id_list[i]==req.params.id)
                                        {
                                            callback(null,decoded);
                                        }
                                        // tmpList.push(mongoose.mongo.ObjectId(docs.mechanic_id_list[i]));
                                        try
                                        {
                                            tmpList.push(mongoose.mongo.ObjectId(docs.mechanic_id_list[i]));
                                        }
                                        catch (e)
                                        {
                                            console.log("skip this value as we can't associate this data as an ObjectID, i = "+i+": "+docs.mechanic_id_list[i])
                                        }
                                    }
                                    let foundCheck = 0;
                                    Mechanic.find({_id:{ $in: tmpList}}, function(err2, docs2)
                                    {
                                        if(docs2 && docs2.length>0)
                                        {
                                            // check user_id of mechanic in garage
                                            for(let j=0;j<docs2.length;j++)
                                            {
                                                if(docs2[j].user_id==req.params.id)
                                                {
                                                    foundCheck = 1; // found profile
                                                    callback(null,decoded)
                                                }
                                            }
                                            if(foundCheck!=1)
                                            {
                                                res.status(403).json({message:"You can't change the unrelated's profile from authentication."});
                                                return 0;
                                            }
                                        }
                                        else
                                        {
                                            res.status(403).json({message:"You can't change the unrelated's profile from authentication"});
                                            return 0;
                                        }
                                    }).lean()
                                    // original else
                                    // res.status(403).json({message:"You can't change another garage's profile."});
                                    // return -1;
                                    // end of original else
                                }
                            }
                            else
                            {
                                res.status(400).json({message:"error, please create your garage first from authentication"})
                                return -1;
                            }
                        })

                    }
                    else if(decoded.type==0 || decoded.type==1 || decoded.type ==3)
                    {
                        res.status(403).json({message:"You are not the garage owner, so you can't use this function from authentication."})
                        return 0
                    }
                }
            ],// end of functions flow here
            function(err,result) // last function
            {
                next();
            }
        )
    };
    module.exports.verifyAdmin = function(req, res, next) {
        var token = req.headers.authorization;
        async.waterfall
        (// start of functions flow here
            [// arrange the argument in the same order as much as possible
                //callback(err,arg); // the command to end the function
                function(callback)
                {
                    toolController.verifyToken(token, res, function(err, decoded)
                    {
                        callback(null,decoded)
                    });
                }, // request0
                function(decoded,callback)
                {
                    if(decoded.type==0 || decoded.type==1 || decoded.type==2)
                    {
                        res.status(403).json({"message":"You are not the admin, so you can't use this function."})
                        return 0;
                    }
                    else if(decoded.type==3)
                        callback(null,decoded)
                    else
                    {
                        res.status(401).json({message:"unauthorized from authentication"})
                        return 0;
                    }
                }
            ],// end of functions flow here
            function(err,result) // last function
            {
                next();
            }
        )
    };

}








//////////////////////////////////////////////////////////////
//
/////////////////////series and promise///////////////////////
// Series use when each group of code need to run continueously
// And next group need results from previous group
// Sometime, in one group of code can run multiple thing in the
// same time, we use promises all inside the series
// series ([
//      (done)=>{
//
//              //This Block of code will run first
//              //Do something async {
//                  if (error)
//                      done(new Error("Sent error message : " + error));
//                  else ()
//                      done(); //Use done when this async code finish
//              // }
//
//      },
//      ()=>{
//
//              //This Block of code will run second
//              const promises = [
//                  new Promise((resolve, reject) => {
//                      // Do something async {
//                          if (error)
//                              reject();
//                          else
//                              resolve();
//                      // }
//                  }),
//                  new Promise((resolve, reject) => {
//                      // Do something async similar to previous promise
//                  })
//            ];
//            Promise.all(promises) //This function wait for all promise array function finish
//                .then( (result => {done()})) // then recieve result and run function
//                .catch( (error)=> {done(new Error(error))}); // catch recieve error message and run function if error occur
//
//      }],
//      (error)=>{
//
//          //This Block of code will run when any previous
//          //block sent done(new Error());
//
//      }
// );
//////////////////////////////////////////////////////////////