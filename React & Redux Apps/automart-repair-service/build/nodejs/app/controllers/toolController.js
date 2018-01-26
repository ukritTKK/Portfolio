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
const path = require('path');
///////////////////////From Configs////////////////////////
const config = require('../configs/env');
const db = require('../configs/db');

//////////////////From Other Controllers///////////////////
//const toolController = require('./toolController');

////////////////////////From Mongo/////////////////////////

const Garage = require('mongoose').model('Garage');
const Mechanic =  require('mongoose').model('Mechanic');
const User = require('mongoose').model('User');
const Part = require('mongoose').model('Part');
const Car = require('mongoose').model('Car');

/*
 const Garage = require('../models/garage');
 const Mechanic = require('../models/mechanic');
 const User = require('../models/user');
 const Part = require('../models/part');
 const Car = require('../models/car');
 */
///////////////////////From Firebase///////////////////////
const admin = require('firebase-admin');

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
//////////////////Token and Authentication/////////////////////////
//////////////////Token and Authentication/////////////////////////
//////////////////Token and Authentication/////////////////////////
//////////////////Token and Authentication/////////////////////////
//////////////////Token and Authentication/////////////////////////
//////////////////Token and Authentication/////////////////////////
//////////////////Token and Authentication/////////////////////////
//////////////////Token and Authentication/////////////////////////
//////////////////Token and Authentication/////////////////////////
//////////////////Token and Authentication/////////////////////////
//////////////////Token and Authentication/////////////////////////
//////////////////Token and Authentication/////////////////////////
//////////////////Token and Authentication/////////////////////////
//////////////////Token and Authentication/////////////////////////
///////////////////////////Section/////////////////////////////////
///////////////////////////////////////////////////////////////////


module.exports.firebaselogin = (req, res, next) => {
    ////////////////////////////////Use of FirebaseLogin///////////////////////////
    ////////////////////////////////Use of FirebaseLogin///////////////////////////
    ////////////////////////////////Use of FirebaseLogin///////////////////////////
    //
    //           This is the main method that handle user and mechanic login
    //            it's receive Firebase Token , create new user in mongodb
    //            , save firebase ID and then sentback JWT Token to client
    //
    ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////

    ///////////////////////////Bug caugth, Must be solve///////////////////////////
    ///////////////////////////Bug caugth, Must be solve///////////////////////////
    ///////////////////////////Bug caugth, Must be solve///////////////////////////
    //
    //           The bug is that, when client sent multiple login at nearly the
    //      sametime, mongodb will create duplicate user that have the same
    //      firebase-ID , because the firebaseUserID field is not set to unique
    //      due to some user such as admin and garage not have firebase ID.
    //
    //          In normal case, We create checker that will check if firebase user ID
    //      already existed in mongo, but in this case, when two or more same request
    //      are coming nearly sametime, and that user is not store in mongo before.
    //      two or more request will see that the mongodb have no their user before.
    //      and will create duplicate user.
    //
    //          because I have time left to work on this only 4 days and have to work
    //      on firebase listener, so I can't solve this bug and testing it. so I left
    //      this bug for you.
    //
    //      I have some Idea on solving it..
    //          - frontend block multiple click on login button.
    //          - backend lock the user collection, in registering state..
    //            only one user can regis at the time
    //          - change user schemas (can harzard to legacy module)
    //          - abundant that bug, eventhough it's duplicate but mongo read the
    //            the first user of that duplicate firebase id user, so it's not
    //            effect other module, but we will have service that periodically
    //            check redundant of firebaseUID and automatically remove other
    //            user and left only first user (all of these users have the same
    //            firebaseID)
    //
    ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////



    let token = req.headers.authorization;       /////////Receive Firebase Token//////////
    let usertype = req.headers.usertype;         /////////Receive User Type(Number)///////
    let JWTtoken;                                /////////Wait for Save JWT Token/////////

    let uid;                                     /////////Wait for Firebase UID///////////
    let userobjectID;                            /////////Wait for Mongo User's Model Object ID///////
    let foundUIDinMongo = false;
    let Messages = [];

    //console.log("header : " + req.headers.authorization);
    //console.log("usertype : " + req.headers.usertype);
    /////////////////////////For Debug////////////////////////////

    //let token  = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjRkYmI2Y2M0OWM5MGU1ZTA3YTljZTc4MTZhNGI0YmUxOWRkNzJhMjkifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXV0b21hcnQtc2VydmljZS1yZXBhaXIiLCJuYW1lIjoibmEgdGVzdGZpcmUiLCJwaWN0dXJlIjoiaHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9hdXRvbWFydC1zZXJ2aWNlLXJlcGFpci5hcHBzcG90LmNvbS9vL2ltYWdlc19qWTBxUWk3cGdzYlJSZ3N0VHVIejlPNHI3ajUzP2FsdD1tZWRpYSZ0b2tlbj02NjUyMjJjYi02ZjJmLTQxZTUtYWQwMy1iZjA1MzI3OGFkNDIiLCJhdWQiOiJhdXRvbWFydC1zZXJ2aWNlLXJlcGFpciIsImF1dGhfdGltZSI6MTQ5OTA1NzU3NSwidXNlcl9pZCI6ImpZMHFRaTdwZ3NiUlJnc3RUdUh6OU80cjdqNTMiLCJzdWIiOiJqWTBxUWk3cGdzYlJSZ3N0VHVIejlPNHI3ajUzIiwiaWF0IjoxNDk5MDU3NTc2LCJleHAiOjE0OTkwNjExNzYsImVtYWlsIjoibmFmb3J0ZXN0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAxNzk2MzA2OTc1Mzg0ODEwNTE3Il0sImVtYWlsIjpbIm5hZm9ydGVzdEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.ohpQL-sPttLEPNwLl8WOOJDaDIiy34zAOjSCM6hxkuixV6yGRNvbeF3VQm7KApOc5uU5fBfXCGLOjPFmJbXKQYbiDyLT0Z-CJv2G-YsFHILrKR1eNnQZuHKxOGg_FbBOds1L5WrQeh-AVjiKU1iY2MG2qV8Pe4mb80GFgC7SlpAMudoeGxRW7JEiH7nyv9hqnc07ZQwkcbtEk3YhVqXyk5P-3CbVZBwqSe5KkESQR7zxq0FcTynkyMskNDRGflwmQGGGdDEnyecT_TGmu95t74rqFEIiS3TfKJvQC3tYk6AlKeDCBl0A5q6Ru97fbSax6Hdfj5oKh2UCeLZ83TI56A';
    //let usertype = "1";
    Messages.push('------------Start firebase login operation-------------');
    /////////////////////////////////////////////////////////////

    /////////You can see series and promise helper at the bottom of the this file/////

    series([
        (done)=>{

            /////////////////This first block of code is about getting firebase token from client////////////////
            /////////////////and check , decode that token using firebase admin sdk.             ////////////////
            /////////////////If no error occur, it's will get firebase uid and some other data   ////////////////
            //console.log("token : " + JSON.stringify(token, null, 4));
            admin.auth().verifyIdToken(token)
                .then((decodedToken)=>{

                    uid = decodedToken.uid;
                    Messages.push('verify firebase-token completed! of user id : ' + uid);
                    //console.log('Show all inside token : ' + JSON.stringify(decodedToken, null, 4));
                    //console.log('Receive User ID : ' + uid);
                    return done();
                })
                .catch((error)=>{
                    return done(new Error('Found Verification Error! : ' + error));
                });
        },
        (done)=>{

            /////////////////This second block of code is about check if firebase uid already    ////////////////
            /////////////////in the mongo users database, if not mongo will create new user      ////////////////
            /////////////////and attach firebase userid inside of it , else not do anythings     ////////////////

            User.findOne(
                { firebaseid: uid },'_id', function(err, user) {
                    //console.log('User name login: ' + req.body.username);
                    if(err) {
                        return done(new Error("Found Database Error : " + err));
                    } else {
                        if (user){
                            userobjectID = user._id;
                            Messages.push("user firebase id : " + uid + " _id : " + userobjectID + " already in database");
                            return done();
                        }else{
                            Messages.push("Mongo Can't find user firebaseid : " + uid);
                            Messages.push("Mongo Create new user from token");
                            let user = new User();
                            user.firebaseid = uid;
                            user.user_type = usertype;
                            user.save(function (err, newlysaved) {
                                if (err){
                                    return done(new Error("Database save Error : " + err));
                                } else {
                                    userobjectID = newlysaved._id;
                                    Messages.push("Complete add new user to mongo. show newly saved : " + newlysaved);
                                    return done();
                                }
                            });
                        }
                    }
                }
            );


        },
        (done)=>{

            /////////////////This third block of code is about to create new JWT token and      ////////////////
            /////////////////attach Mongo User Object ID (not firebase UserID) and user type    /////////////////
            /////////////////to it.                                                             /////////////////

            Messages.push("Start sending JWTToken");
            try{
                let payload = {id: userobjectID, type: usertype};
                JWTtoken = jwt.sign(payload, config.jwt.secret, {expiresIn: '2h'});
                //console.log("JWTToken : " + JWTtoken);
                return done();
            } catch (error){
                return done(new Error('Sign Token Error : ' + JWTtoken));
            }
        },
        ()=>{

            /////////////////Last, sent JWT Token to client for client to save it in their      /////////////////
            /////////////////cookies or storage.                                                /////////////////

            res.append('Token',JWTtoken);
            res.json({'message': 'login completed'});
            //res.json({"Token": JWTtoken});
            Messages.push('JWT Token Completely sent');
            module.exports.saveMessageLog(Messages, "SystemLog.txt", "D");
            //module.exports.MessagePrint(Messages, "G");

            //res.set({'token': JWTtoken});
            //res.end();
        }
    ], (error)=>{

        /////////////////If Error occur in some of any previous block, this block will run  ////////////////

        res.status(400).json({'message': 'Operation Stopped By Error'});
        Messages.push('Operation Stoped by Error! : ' + error);
        //module.exports.MessagePrint(Messages, "R");
        module.exports.saveMessageLog(Messages, "SystemLog.txt", "D");
        //res.end();
    });
};

///// This is original method in Experimenting
module.exports.verifyTokenExp = (JWTtoken, res, callback) => {

    /////////////////This method is the new version of old verifytoken                   ////////////////
    /////////////////It's recieve JWTtoken, decode it sent data back if success          ////////////////

    if (JWTtoken){
        //console.log(chalk.green('Found JWT Token from cookie : ' + JWTtoken));
        jwt.verify(JWTtoken, config.jwt.secret, function(err, decoded) {
            if (err) {
                //console.log(chalk.red('Cant decode token : ' + err));
                if(err.name === 'JsonWebTokenError') {
                    res.status(400).json({"message": "Token invalid"});
                    return 0;
                } else {
                    res.status(400).json({"message": "Token is expired"});
                    return 0;
                }
            }
            else if(decoded) {
                //console.log('Found Decoded : ' + JSON.stringify(decoded, null, 4));
                User.findOne({_id:decoded.id},function(err,docs){
                    ////////////////////User Data//////////////////////////////
                    //console.log('_id : ' + decoded.id);
                    //console.log('user data : ' + JSON.stringify(docs, null, 4));
                    ///////////////////////////////////////////////////////////
                    if(docs && docs.enabled !== 1 && docs.user_type !== 3) { // add check for docs exist for the test that remove the user, but use the same test file token.
                        res.status(403).json({message: "error, your account got disabled, please contact the garage you are in or the administrator."})
                        return 0;
                    } else {
                        /////////////////This check if JWT token from client is nearly expire, it will       ////////////////
                        /////////////////recreate the JWT Token and sent bact to client.                     ////////////////

                        let now = new Date();
                        let refresh_time = new Date(decoded.exp * 1000);
                        refresh_time.setMinutes(refresh_time.getMinutes() - 45);
                        if(now >= refresh_time) {
                            let newToken = jwt.sign({id: decoded.id, type: docs.user_type}, config.jwt.secret, {expiresIn: '2h'});
                            res.json({'JWTToken': newToken});
                        }
                        return callback(null, decoded);
                    }
                })
            }
            else {
                //console.log(chalk.red('User not found'));
                res.status(401).json({message:"user not found"});
                return 0;
            }
        });

    } else {
        //console.log(chalk.red('JWT Token Not Found'));
        res.status(400).json({'message': 'The token has not found.'});
        return 0;
    }
};

///// This method is use in version 2 verifyController
///// This add some new error handle and callback to the v.1 method
///// but the original method can be use by old controller
module.exports.verifyTokenV2 = (JWTtoken, res, callback) => {

    /////////////////This method is the new version of old verifytoken                   ////////////////
    /////////////////It's recieve JWTtoken, decode it sent data back if success          ////////////////

    if (JWTtoken){
        //console.log(chalk.green('Found JWT Token from cookie : ' + JWTtoken));
        jwt.verify(JWTtoken, config.jwt.secret, function(err, decoded) {
            if (err) {
                //console.log(chalk.red('Cant decode token : ' + err));
                if(err.name === 'JsonWebTokenError')
                    res.status(400).json({"message": "Token invalid"});
                else
                    res.status(400).json({"message": "Token is expired"});

                return callback(err);
            }
            else if(decoded) {
                User.findOne({_id:decoded.id},'enabled user_type',function(err,docs){
                    ////////////////////User Data//////////////////////////////
                    //console.log('check docoded : ' + chalk.green(JSON.stringify(docs, null, 4)));
                    ///////////////////////////////////////////////////////////
                    if(docs && docs.enabled !== 1 && docs.user_type !== 3) {
                        res.status(403).json({message: "error, your account got disabled, please contact the garage you are in or the administrator."})
                        return callback(err);
                    } else {
                        /////////////////This check if JWT token from client is nearly expire, it will       ////////////////
                        /////////////////recreate the JWT Token and sent bact to client.                     ////////////////

                        let now = new Date();
                        let newToken;
                        let refresh_time = new Date(decoded.exp * 1000);
                        refresh_time.setMinutes(refresh_time.getMinutes() - 45);
                        if(now >= refresh_time) {
                            newToken = jwt.sign({id: decoded.id, type: docs.user_type}, config.jwt.secret, {expiresIn: '2h'});
                            res.append("Token" , newToken);
                        }
                        return callback(null, decoded);
                    }
                })
            }
            else {
                //console.log(chalk.red('User not found'));
                res.status(401).json({message:"user not found"});
                return callback(new Error("user not found"));
            }
        });

    } else {
        //console.log(chalk.red('JWT Token Not Found'));
        res.status(400).json({'message': 'The token has not found.'});
        return callback(new Error("Token not found"));

    }
};


///////////////////////Use of Verify Token Dummy Callback/////////////////////
///////////////////////Use of Verify Token Dummy Callback/////////////////////
///////////////////////Use of Verify Token Dummy Callback/////////////////////
//
//
//              because all legacy module use old authentication
//     We add new verification method that not do anything but sent back
//                            ready decoded token
//
//
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


module.exports.verifyTokenDummyCallback = (req, res, callback) => {
    if (req.decodedJWT) {
        return callback (null, req.decodedJWT);
    } else {
        return callback(new Error("Can't found any token"));
    }
};


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
//////////////////////////Generator//////////////////////////
//////////////////////////Generator//////////////////////////
//////////////////////////Generator//////////////////////////
//////////////////////////Generator//////////////////////////
//////////////////////////Generator//////////////////////////
//////////////////////////Generator//////////////////////////
//////////////////////////Generator//////////////////////////
//////////////////////////Generator//////////////////////////
//////////////////////////Generator//////////////////////////
//////////////////////////Generator//////////////////////////
//////////////////////////Generator//////////////////////////
//////////////////////////Generator//////////////////////////
//////////////////////////Generator//////////////////////////
//////////////////////////Generator//////////////////////////
///////////////////////////Section/////////////////////////////////
///////////////////////////////////////////////////////////////////

///////Goal to use "usergenerator" method
///////
///////  -- to generate fake user and mechanic for testing with fake firebase ID.
///////
///////  -- to be use in other method that require create new user, such as
///////     garage and admin.

///////To see global scope of code, you can fold entire module
///////by use your IDE ability

//////Registration of user
//////    user --> registration from firebase
//////    mechanic --> registration from firebase
//////
//////    garage --> registration inside backend
//////    admin --> registration inside backend
//////

///////It's agreement that user that regis from non firebase base
///////will not have firebaseID

/*
UserGenerator params : uidlength, usertype, numberofuser, specialOptions, callback

uidlength is fake firebase ID generating length
to not generating firebase ID use number 0

usertype : 0 -- User, 1 -- Mechanic, 2 -- Garage, 3-- Admin

this version of method support generate multiple user

Example:
UserGenerator (10, 0, 2, null) --> Generate 2 user with 10 FirebaseIDDigit without preset information and callback

UserGenerator (0, 3, 5, null, (error, returnAdminID)=>{} ) --> Generate 5 admin without FirebaseIDDigit without preset information
but get callback that sent error if occur and sent group of Admin user object ID back to requestor

UserGenerator (0, 2, 4, specialOptions ) --> Generate 4 GarageUser without FirebaseIDDigit but use the preset information

Warning:: You can't create garage and mechanic with only this method alone, it's will be use as part of other method
because garage and mechanic require create in multiple collections

Example of specialOptions // if generate 4 user and want to preset information. You must add 4 object of preset as shown below
let specialOptions = {
    "userinfo" : [ //userinfo tell the method to use preset information
        {
            "username": "A",
            "password": "A",
            "email": "A",
            "tel": "A"
        },
        {
            "username": "B",
            "password": "B",
            "email": "B",
            "tel": "B"
        }
        ,
        {
            "username": "C",
            "password": "C",
            "email": "C",
            "tel": "C"
        },
        {
            "username": "D",
            "password": "D",
            "email": "D",
            "tel": "D"
        }
    ]};
*/



module.exports.UserGenerator = (uidlength, usertype, numberofuser, specialOptions/* Object */, callback /*(error, objectIDlist)*/) => {

    let userobjectID = [];                 /////////Wait for Mongo User's Model Object ID///////
    let Messages = [];

    /////////Rerandom attempt is to prevent infinity loop.                        ///////////
    /////////because when this module generate user                               ///////////
    /////////if it's generate the same firebase ID, it will regenerate            ///////////
    /////////until not the same, but if generate scope is small                   ///////////
    /////////or the firebase in the scope is full, it can cause regen to infinity ///////////
    let reRandomAttempt = 0;
    const maxRandomAttempt = 5; //////set max Random Attemp here//////

    /////////You can see series and promise helper at the bottom of the this file/////

    /*  specialOptions Example
    let specialOptions = {
        "userinfo": [{
            "name": "Luck My Balllllssss"
        }]
    };  */

    if (!specialOptions) {
        ///////////////////To prevent error of access null object///////////////////
        specialOptions = {
            "userinfo" : []
        };
    }


    series([
        ////////////////////////////////////////////////////////////////
        //////////////////////////First Block///////////////////////////
        ////////////////////////////////////////////////////////////////
        (done)=>{

            /////////////////This first block of code is about to generate User ////////////////
            /////////This block use async for-loop, it's use promise ///////////

            (function loop(i){
                const promise = new Promise((resolve, reject) => {
                    /////////get Fake firebase ID from random method///////////
                    let uid = module.exports.randomString(uidlength);
                    console.log("Generating number : " + i);
                    /////////If caller want to generate user with no firebase ID///////////
                    if (uid === "") {
                        Messages.push("Create non-firebase user : " + uid + ' to mongo database');
                        let user;
                        if (specialOptions["userinfo"])
                            user = new User(specialOptions["userinfo"][i]);
                        else
                            user = new User();
                        user.user_type = usertype;
                        user.firebaseid = uid;

                        user.save(function (err, newlysaved) {
                            if (err) {
                                Messages.push("Can't add new user : " + uid + " to Mongo database with Error Message : " + err);
                                resolve();
                            } else {
                                userobjectID.push(newlysaved._id);
                                Messages.push("Complete add new User with firebaseID : " + uid + " and ObjectID : " + newlysaved._id+ " to Mongo Database");
                                resolve();
                            }
                        });
                    } else {
                        /////////If caller want to generate user with fake firebase ID///////////

                        /////////it's will check if this new fake firebase ID already store///////////
                        User.findOne(
                            { firebaseid: uid },'_id', function(err, user) {
                                //console.log('User name login: ' + req.body.username);
                                if(err) {
                                    Messages.push("Found Database Error : " + err);
                                    resolve();
                                } else {
                                    if (user){

                                        //userobjectID.push(user._id);
                                        Messages.push('User : ' + uid + 'Already in Mongo Database');
                                        Messages.push('reRandomAttempt : ' + reRandomAttempt);

                                        /////////if it found, it's will regen fake firebase ID again///////////
                                        if (reRandomAttempt > maxRandomAttempt)
                                            return done(new Error("Too much random firebase ID attempt to create new user, May be digit can be full"));
                                        i = i - 1;
                                        reRandomAttempt = reRandomAttempt + 1;

                                        resolve();

                                    }else{
                                        /////////if not found, everything okey, it will start create new user///////////

                                        Messages.push("Can't find user : " + uid + ' from mongo database');
                                        Messages.push("Start create new user : " + uid + "in database");
                                        let user;
                                        if (specialOptions["userinfo"])
                                            user = new User(specialOptions["userinfo"][i]);
                                        else
                                            user = new User();

                                        user.firebaseid = uid;
                                        user.user_type = usertype;
                                        user.save(function (err, newlysaved) {
                                            if (err) {
                                                Messages.push("Can't add new user : " + uid + " to Mongo database with Error Message : " + err);
                                                resolve();
                                            } else {
                                                userobjectID.push(newlysaved._id);
                                                Messages.push("Complete add new User with firebaseID : " + uid + " and ObjectID : " + newlysaved._id+ " to Mongo Database");
                                                resolve();
                                            }
                                        });
                                    }
                                }
                            }
                        );

                    }

                }).then( () =>{
                    //i < playername.length - 1 ? loop(i+1) : resolveb
                    if (i < numberofuser - 1){
                        loop(i + 1);
                    } else {
                        /////////End of Loop///////////
                        Messages.push('-----------------------------------------');
                        Messages.push('Complete Create Fake User');
                        return done();
                    }

                }).catch((err)=>{
                    ///////Error inside loop/////////
                    return done(new Error('Database Error : ' + err));
                });
            })(0);

        },
        ////////////////////////////////////////////////////////////////
        ////////////////////////////Last Block//////////////////////////
        ////////////////////////////////////////////////////////////////
        ()=>{

            //module.exports.MessagePrint(Messages, 'G');
            //module.exports.MessagePrint(userobjectID, 'W');
            module.exports.saveMessageLog(Messages, 'SystemLog.txt', 'D'); // 'D' for generate date time
            //res.end();
            callback(null, userobjectID);
        }
        ////////////////////////////////////////////////////////////////
        ////////////////////////////Error Block//////////////////////////
        ////////////////////////////////////////////////////////////////

    ], (error)=>{
        Messages.push(error);
        Messages.push('----------Operation Stoped by Error---------');
        /////////////////If Error occur in some of any previous block, this block will run  ////////////////

        module.exports.saveMessageLog(Messages, 'SystemLog.txt', 'D'); // 'D' for generate date time
        //module.exports.MessagePrint(Messages, 'R');
        //res.status(400).json({'message': 'Operation Stopped By Error'});
        callback(error);
        //res.end();
    });
};

module.exports._OldCode_addFakeMechanic = (req, res, next, numberofmechanic) => {
    let Messages = [];
    Messages.push('---------------Add Fake Mechanic---------------');
    series([
        ////////////////////////////////////////////////////////////////
        //////////////////////////First Block///////////////////////////
        ////////////////////////////////////////////////////////////////
        (done) => {
            User
                .find({user_type: 1}, '_id')
                .limit(numberofmechanic)
                .exec(
                    (err, docs) => {
                        if (err) {
                            Messages.push('Database Error : ' + err);
                            return done(new Error());
                        } else if (docs) {
                            if (docs.length === 0) {
                                Messages.push('Cant find any Mechanics');
                                return done(new Error());
                            }

                            Messages.push('Successful Finded');
                            //console.log('show mechanic : ' + docs);
                            Data = docs;
                            return done();
                        } else { //Undefined situation
                            Messages.push('Cant find any Mechanics');
                            return done(new Error());
                        }
                    }
                );
        },
        ////////////////////////////////////////////////////////////////
        //////////////////////////Second Block//////////////////////////
        ////////////////////////////////////////////////////////////////
        (done) => {

            (function loop(i){
                const promise = new Promise((resolve, reject) => {
                    if (Data[i]) { // Need to do this because machanics can be lower than set limit
                        let uid = Data[i]._id;
                        let mechanic = new Mechanic();
                        mechanic.user_id = uid;
                        mechanic.save(
                            (err) => {
                                if (err) {
                                    Messages.push("Can't add new mechanic of user : " + uid + " error message : " + err);
                                    resolve();
                                } else {
                                    Messages.push("Completed Create mechanic of uid : " + uid);
                                    resolve();
                                }
                            }
                        );

                    } else {
                        return done();
                    }

                }).then( () =>{
                    if (i < numberofmechanic - 1){
                        loop(i + 1);
                    } else {
                        Messages.push('-----------------------------------------');
                        Messages.push('Complete Create Fake Mechanics');
                        return done();
                    }

                }).catch((err)=>{
                    return done(new Error('Database Error : ' + err));
                });
            })(0);

        },
        ////////////////////////////////////////////////////////////////
        ////////////////////////////Last Block//////////////////////////
        ////////////////////////////////////////////////////////////////

        () => {
            Messages.push('---------------Generate Completed---------------');
            //module.exports.MessagePrint(Messages, 'G');
            module.exports.saveMessageLog(Messages, "SystemLog.txt", "D"); //Gen Date Time
            //module.exports.saveMessageLog(Messages, 'SystemLog.txt', 'D'); // 'D' for generate date time
            res.end();
        }
        ////////////////////////////////////////////////////////////////
        ////////////////////////////Error Block//////////////////////////
        ////////////////////////////////////////////////////////////////
    ], (error) => {
        Messages.push('Error : ' + error);
        Messages.push('---------------End With Error---------------');
        //module.exports.MessagePrint(Messages, 'R');
        module.exports.saveMessageLog(Messages, "SystemLog.txt", "D"); //Gen Date Time
        //module.exports.saveMessageLog(Messages, 'SystemLog.txt', 'D'); // 'D' for generate date time
        res.end();
    });

};

module.exports.generateAllJWTToken = (req, res, next) => {
    ////////////////////////Using of GenerateAllToken/////////////////////////
    ////////////////////////Using of GenerateAllToken/////////////////////////
    ////////////////////////Using of GenerateAllToken/////////////////////////
    //
    //
    //              This method will read all user in mongodb
    //and generate all JWTToken and save in TestToken.txt inside Logs Folder
    //
    //                The newly JWTToken can be use to test
    //                      every user in the system
    //
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////

    //////////////////////Global Method Variable//////////////////////
    let Data;
    let DataWithToken = [];
    let Messages = [];
    //In seriel flow the error messages should sent to done(new Error(error message))//
    //If in for loop flow, you should push Message by each error.//////////////////////
    let expireTime = '2h';
    //////////////////////////////////////////////////////////////////

    Messages.push('---------------Generate All JWT Token---------------');
    series([
        (done) => {
            User.find({}, '_id user_type',
                (err, docs) => {
                    if (err) {
                        return done(new Error('Database Error : ' + err));
                    } else if (docs) {
                        if (docs.length === 0){
                            return done(new Error('Theres no any user in mongo database'));
                        }
                        Messages.push('Successful Finded');
                        Data = docs;
                        //console.log("show docsssss : " + JSON.stringify(Data, null, 4));

                        return done();
                    } else { //Undefined situation
                        return done(new Error('Theres no any user in mongo database'));
                    }
                }
            );
        },
        (done) => {

            try {
                for (let i = 0; i < Data.length; i++) {
                    //console.log("Dataaaa : " + JSON.stringify(Data[i], null, 4));
                    let id = Data[i]['_id'];
                    let usertype = Data[i]['user_type'];
                    Messages.push('JWT Encoding _id : ' + id);
                    console.log("Generate at: " + i);
                    module.exports.generateJWTToken(Data[i]['_id'],Data[i]['user_type'],expireTime,
                        (err, JWTtoken) => {
                            if (err) {
                                Messages.push('Encode Fail : ' + err);
                            } else if (JWTtoken) {
                                Messages.push('Encode Successfully');
                                DataWithToken.push({'_id': id,'UserType : ' : usertype, 'JWTToken': JWTtoken});
                            } else {
                                Messages.push('Encode Fail : Cant recieve JWT token from Method');
                            }
                        }
                    )
                }
                done(); // All code are synchronous so its not require promise to do for loop
            } catch (error) {
                console.log('UnHandle Error : ' + error);
            }
        },
        () => {
            Messages.push('---------------Generate Completed---------------');
            //module.exports.MessagePrint(Messages, 'G');
            //module.exports.MessagePrint(DataWithToken, 'G');
            module.exports.saveMessageLog(Messages, 'SystemLog.txt', 'D'); // 'D' for generate date time
            module.exports.saveMessageLog(DataWithToken, 'TestToken.txt', 'D', 'J');
            res.end();
        }

    ], (error) => {
        Messages.push('Error : ' + error);
        Messages.push('---------------End With Error---------------');
        //module.exports.MessagePrint(Messages, 'R');
        module.exports.saveMessageLog(Messages, 'SystemLog.txt', 'D'); // 'D' for generate date time
        res.end();
    });
};

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
/////////////////////////Utility Tools/////////////////////////////
/////////////////////////Utility Tools/////////////////////////////
/////////////////////////Utility Tools/////////////////////////////
/////////////////////////Utility Tools/////////////////////////////
/////////////////////////Utility Tools/////////////////////////////
/////////////////////////Utility Tools/////////////////////////////
/////////////////////////Utility Tools/////////////////////////////
/////////////////////////Utility Tools/////////////////////////////
/////////////////////////Utility Tools/////////////////////////////
/////////////////////////Utility Tools/////////////////////////////
/////////////////////////Utility Tools/////////////////////////////
/////////////////////////Utility Tools/////////////////////////////
/////////////////////////Utility Tools/////////////////////////////
/////////////////////////Utility Tools/////////////////////////////
///////////////////////////Section/////////////////////////////////
///////////////////////////////////////////////////////////////////


module.exports.randomString = (length) => {
    let text = "";
    let longstring = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    //let longstring = "1234567890";
    for (let i = 0; i < length; i++)
        text += longstring.charAt((Math.floor(Math.random() * longstring.length)));

    return text;
};

module.exports.generateJWTToken = (userobjectID, usertype, expiresTime, callback) => {
    /////////////////This code is about to create new JWT token and                     ////////////////
    /////////////////attach Mongo User Object ID (not firebase UserID) and user type    /////////////////
    /////////////////to it.                                                             /////////////////
    let JWTtoken;
    //expiresTime = '2h';
    try{
        let payload = {id: userobjectID, type: usertype};
        JWTtoken = jwt.sign(payload, config.jwt.secret, {expiresIn: expiresTime});
        return callback(null, JWTtoken);
    } catch (error) {
        return callback(error);
    }
};

module.exports.saveMessageLog = (Messages, filename, options, options2) => {
    ////////////////////////Using of SaveMessageLog/////////////////////////
    ////////////////////////Using of SaveMessageLog/////////////////////////
    ////////////////////////Using of SaveMessageLog/////////////////////////
    //
    //
    //           This method save input Messages to the file
    //
    //                    Message is array of String
    //        options === "D" mean Generate Date Time with the save
    //          options2 === "J" mean support saving String Object
    //
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    if (config.saveLogs === "1") {

        let logpath = path.join(config.mpath['logs']['head'], filename);

        //console.log('save file path : ' + logpath);
        let entireMessages = '';

        if (options === "D") {
            let currentdate = new Date();
            let datetime = "Message Save At: " + currentdate.getDate() + "/" + (currentdate.getMonth() + 1)
                + "/" + currentdate.getFullYear() + " @ "
                + (currentdate.getHours() + 7) + ":"
                + currentdate.getMinutes() + ":" + currentdate.getSeconds() + ' Asia Timeing(Not UTC)';
            //let currentdate = new Date().toString();
            entireMessages += datetime + '\n';
        }

        if (options2 === "J") {
            for (let i = 0; i < Messages.length; i++) {
                entireMessages += JSON.stringify(Messages[i], null, 4) + '\n';
            }
        } else {
            for (let i = 0; i < Messages.length; i++) {
                entireMessages += Messages[i] + '\n';
            }
        }
        fs.appendFile(logpath, entireMessages,
            (err) => {
                if (err) {
                    console.log('File System Error : ' + err);
                    console.log(chalk.red.bold('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'));
                    console.log(chalk.red.bold('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'));
                    console.log(chalk.red.bold('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'));
                    console.log();
                    console.log(chalk.red.bold('If error because Logs folder not found, you must create that folder as /app/Logs'));
                    console.log(chalk.red.bold('but not require to create file itself, because it will auto creating it.'));
                    console.log();
                    console.log(chalk.red.bold('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'));
                    console.log(chalk.red.bold('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'));
                    console.log(chalk.red.bold('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'));
                    console.log();

                    return 0;
                }
            }
        )
    }
};

module.exports.MessagePrint = (Messages, Color)=>{
    //////////////////////////Using of MessagePrint///////////////////////////
    //////////////////////////Using of MessagePrint///////////////////////////
    //////////////////////////Using of MessagePrint///////////////////////////
    //
    //             This method print input Messages to the console
    //
    //                      Message is array of String
    //
    //                           Color Available
    //               "W" => White   "G" => Green   "R" => Red
    //
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////

    //console.log("Message : " + Messages);
    console.log('Message Length : ' + Messages.length);

    switch (Color){
        case 'W':
            for (let i = 0; i < Messages.length; i++){
                console.log(JSON.stringify(Messages[i], null, 4));
            }
            break;
        case 'G':
            for (let i = 0; i < Messages.length; i++){
                console.log(chalk.green(Messages[i]));
            }
            break;
        case 'R':
            for (let i = 0; i < Messages.length; i++){
                console.log(chalk.red(Messages[i]));
            }
            break;
    }

};

module.exports.setData = (searchtype, searchID, setObject, Model, specialOptions,callback) => {
    /////////////////////////////Using of setData//////////////////////////////
    /////////////////////////////Using of setData//////////////////////////////
    /////////////////////////////Using of setData//////////////////////////////
    //
    //          This method use to set or change mongodb document
    //               searchtype is the fieldname to be search
    //                   searchID is ID of that fieldname
    //                    Model is name of Mongo Model
    //                 specialOption is for advance usage
    //        and callback use if you get call after setData finish
    //
    //                      < specialOptions usage >
    //
    //              specialOptions = {
    //                  customset: optional   ----> such as : "$push", "$addToSet"
    //              }
    //
    //--------------------------------------------------------------------------------
    //                             < Example >
    //--------------------------------------------------------------------------------
    //                           -v-searchtype   -v-searchID        -v-setObject
    //
    //              Example: = ("_id", "4fe4ge8gw6ge84", {"name":"Cat","age":20}
    //                          , Pet  ,     null)
    //
    //                            -^-Model   -^-specialOptions
    //
    //              this example not return callback .
    //--------------------------------------------------------------------------------
    //                           -v-searchtype   -v-searchID        -v-setObject
    //
    //              Example: = ("user_id", "gr8grggr84g5r8g", {"tool":"spank"}
    //                          , Tool  ,  {"customset" : "$addToSet"}, (err, newlyUpdatedID) => {});
    //
    //                            -^-Model   -^-specialOptions               -^-Callback
    //
    //              this example will add spank to array "tool" to the document
    //              that have "user_id" as "gr8...8g" and return callback
    //              with err message (null or errormessage) and object id of that newly edited document
    //--------------------------------------------------------------------------------
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////


    /////////Declare Global Method Variable///////////
    let Messages = [];
    let findkey;
    let setOption = "$set"; //Default
    //////////////////////////////////////////////////
    Messages.push("------------Start set data-------------");
    if (specialOptions) {
        try {
            if (specialOptions.customset) {
                setOption = specialOptions.customset;
            }
        } catch (error) {
            return callback("SpecialOption Error Defined" + error);
        }
    }

    series([
        ////////////////////////////////////////////////////////////////
        //////////////////////////First Block///////////////////////////
        ////////////////////////////////////////////////////////////////
        (done) => {
            try {
                if (!searchtype)
                    return done(new Error("searchtype not found"));
                if (!searchID)
                    return done(new Error("searchID not found"));
                if (!setObject)
                    return done(new Error("Data to set is undefined"));

                findkey = {[searchtype] : searchID};

            } catch (unhandleError) {
                done (new Error('UnhaddleError Occured : ' + unhandleError));
                //console.log("UnhaddleError Occured : " + unhandleError);
            }

            Model
                .findOneAndUpdate(findkey, {[setOption]: setObject}, {projection: {"_id":1}},
                    (err, newlyupdated) => {
                        if (err)
                            return done(new Error("Database Error : " + err));
                        else if (newlyupdated){
                            return done();
                        } else {
                            return done(new Error("Can't update data : This ID : " + searchID + " not found, or you may send false usertype"));
                        }
                    }
                );

        },
        ////////////////////////////////////////////////////////////////
        ////////////////////////////Last Block//////////////////////////
        ////////////////////////////////////////////////////////////////
        () => {
            Messages.push("Save data completed");
            Messages.push('------------------------------------------------');
            module.exports.saveMessageLog(Messages, "SystemLog.txt", "D");
            //module.exports.MessagePrint(Messages, "G");
            return callback(null);
        }
        ////////////////////////////////////////////////////////////////
        ////////////////////////////Error Block//////////////////////////
        ////////////////////////////////////////////////////////////////
    ], (error) => {
        Messages.push(error);
        Messages.push('------------------------------------------------');
        module.exports.saveMessageLog(Messages, "SystemLog.txt", "D");
        //module.exports.MessagePrint(Messages, "R");
        //console.log("Found Error : " +  error);
        return callback(error);
    });
};

module.exports._Old_NotUse_setUserData = (req, res, next) => {

    ///////Req body  to use this method         ///////
    ///////                                     ///////
    ///////  -  req.body.searchtype             ///////
    ///////     (searchtype = "_id" mean Object ID ///////
    ///////                 = "firebaseid")        ///////
    ///////  -  req.body.searchID               ///////
    ///////                                     ///////
    ///////  -  req.body.username               ///////
    ///////  -  req.body.password               ///////
    ///////  -  req.body.name                   ///////
    ///////  -  req.body.email                  ///////
    ///////  -  req.body.home_address           ///////
    ///////  -  req.body.home_address_lat       ///////
    ///////  -  req.body.home_address_lng       ///////
    ///////  -  req.body.tel                    ///////


    /////////Declare Global Method Variable///////////
    let Messages = [];
    let searchtype;
    let findkey;
    let setObject;
    let Model = User;
    //////////////////////////////////////////////////
    Messages.push('------------Start set user data-------------');

    series([
        ////////////////////////////////////////////////////////////////
        //////////////////////////First Block///////////////////////////
        ////////////////////////////////////////////////////////////////
        (done) => {
            try {
                if (!req.body.searchtype)
                    return done(new Error("searchtype not found"));

                searchtype = req.body.searchtype;
                //////////////////Can search in two type. by object _id or user_id//////////////////
                if (searchtype === "_id") {
                    if (req.body.searchID)
                        findkey = {"_id": req.body.searchID};
                    else
                        return done(new Error("_id not found"));
                } else if (searchtype === "firebaseid") {
                    if (req.body.searchID)
                        findkey = {"firebaseid": req.body.searchID};
                    else
                        return done(new Error("firebaseid not found"));
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
            //////////////////Find Mechanic to change data////////////////////
            if (req.body)
                setObject = req.body;
            else
                return done(new Error("req.body undefined"));

            Model
                .findOneAndUpdate(findkey, {$set: setObject},
                    (err) => {
                        if (err)
                            return done(new Error("Database Error : " + err));
                        else
                            return done();
                    }
                );

        },
        ////////////////////////////////////////////////////////////////
        ////////////////////////////Last Block//////////////////////////
        ////////////////////////////////////////////////////////////////
        () => {
            Messages.push("Save user data completed");
            Messages.push('------------------------------------------------');
            module.exports.saveMessageLog(Messages, "SystemLog.txt", "D");
            module.exports.MessagePrint(Messages, "G");
            res.end();
        }
        ////////////////////////////////////////////////////////////////
        ////////////////////////////Error Block//////////////////////////
        ////////////////////////////////////////////////////////////////
    ], (error) => {
        Messages.push(error);
        Messages.push('------------------------------------------------');
        module.exports.saveMessageLog(Messages, "SystemLog.txt", "D");
        module.exports.MessagePrint(Messages, "R");
        res.end();
        //console.log("Found Error : " +  error);
    });
};

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
/////////////////////////Legacy Code///////////////////////////////
/////////////////////////Legacy Code///////////////////////////////
/////////////////////////Legacy Code///////////////////////////////
/////////////////////////Legacy Code///////////////////////////////
/////////////////////////Legacy Code///////////////////////////////
/////////////////////////Legacy Code///////////////////////////////
/////////////////////////Legacy Code///////////////////////////////
/////////////////////////Legacy Code///////////////////////////////
/////////////////////////Legacy Code///////////////////////////////
/////////////////////////Legacy Code///////////////////////////////
/////////////////////////Legacy Code///////////////////////////////
/////////////////////////Legacy Code///////////////////////////////
/////////////////////////Legacy Code///////////////////////////////
/////////////////////////Legacy Code///////////////////////////////
///////////////////////////Section/////////////////////////////////
///////////////////////////////////////////////////////////////////



module.exports._NotUse_verifyToken = function(token, res, callback)
{
    if(token)
    {
        jwt.verify(token, config.jwt.secret, function(err, decoded) {
            if (err)
            {
                if(err.name == 'JsonWebTokenError')
                {
                    res.status(400).json({"message": "Token invalid"});
                    // return callback("Token invalid", null);
                    return 0;
                }
                else
                {
                    res.status(400).json({"message": "Token is expired"});
                    // return callback("Token is expired", null);
                    return 0;
                }
            }
            else if(decoded)
            {
                User.findOne({_id:db.mongo.mongo.ObjectId(decoded.id)},function(err,docs)
                {
                    if(docs && docs.enabled != 1 && docs.user_type != 3) // add check for docs exist for the test that remove the user, but use the same test file token.
                    {
                        res.status(403).json({message: "error, your account got disabled, please contact the garage you are in or the administrator."})
                        // return callback("Account got disabled", null);
                        return 0;
                    }
                    else
                    {
                        var now = new Date();
                        var refresh_time = new Date(decoded.exp * 1000);
                        refresh_time.setMinutes(refresh_time.getMinutes() - 45);
                        if(now >= refresh_time)
                        {
                            var newToken = jwt.sign({username: decoded.username, type: decoded.user_type}, config.jwt.secret, {expiresIn: '2h'});
                            res.set({'Token': newToken});
                        }
                        return callback(null, decoded);
                    }
                })
            }
            else {
                // return callback("User not found", null);
                res.status(401).json({message:"user not found"})
                return 0;
            }
        });
    }
    else {
        res.status(400).json({'message': 'The token has not found.'});
        // return callback('The token has not found.', null);
        return 0;
    }
};

module.exports.getDataList = function(req,res,next)
{
    let Model;
    if(req.params.type=="mechanic") Model = Mechanic;
    else if(req.params.type=="part") Model = Part;
    else if(req.params.type=="garage") Model = Garage;
    else
    {
        res.status(400).json({message:"error, invalid type"})
        return 0;
    }
    Model.find({},{_id:1,name:1},function(err,docs)
    {
        module.exports.showModel(res,err,docs)
    })
}
module.exports.checkUpdate = function(res,err,docs)
{
    try
    {
        if(docs.n == "0" || docs.ok =="0")
        {
            res.status(404).json({message:"error, data not found"})
            return 0;
        }
    }
    catch(e)
    {

    }
    return 1;
}
module.exports.checkUpdate_2 = function(res,err,docs)
{
    try
    {
        if(docs.n == "0" || docs.ok =="0")
        {
            res.status(404).json({message:"error, data not updated"})
            return 0;
        }
    }
    catch(e)
    {

    }
    return 1;
}
module.exports.showUpdate = function(res,err,docs)
{
    if(err)
    {
        res.status(400).json({message:"error, something happened",error_message:err});
        return 0;
    }
    else if(docs)
    {
        if(module.exports.checkUpdate(res,err,docs)==0) return 0;
        res.json({"message":"data has been updated."});
        return 1;
    }
    else
    {
        res.status(404).json({message:"error, data not found"})
        return 0;
    }
}
module.exports.renameFile = function(req,filename,docs,res,path) // path = '../public/uploads/car/images'
{
    //if(req.hasOwnProperty(file)) //&& req.file.hasOwnProperty(mimetype)) // check if file exist?
    try
    {
        // var file = __dirname +'/'+ path + '/'+ filename +'.'+ req.file.mimetype.split('/')[1];//req.file.filename; in case you want to change the filename to be the same but with different path
        var file = path + '/'+ filename +'.'+ req.file.mimetype.split('/')[1];//req.file.filename; in case you want to change the filename to be the same but with different path
        fs.rename(req.file.path, file, function(err)
        {
            if (err)
            {
                if(config.isDebugMessage) console.log(err);
                var obj = {"message":"error, can't upload the file."};
                res.status(400).json({docs:docs, obj:obj, err:err});
                return 0;
            } else
            {
                var obj = {
                    message: 'File uploaded successfully',
                    filename: filename +'.'+ req.file.mimetype.split('/')[1] //req.file.filename
                };
                res.json({obj:docs, file:obj});
                return file;
            }
        });
    }
    catch(e)
    {
        return 0;
    }
}
module.exports.showModel = function(res,err,docs)
{
    if(err)
    {
        res.status(400).json({message:"error, something happened",error_message:err});
        return 0;
    }
    //TODO: change the other showModel with upload to check with this condition as well
    if(docs && Object.prototype.toString.call(docs)=="[object Array]" && docs.length>0)
        res.json(docs);
    else if(docs && Object.prototype.toString.call(docs)!="[object Array]")
        res.json(docs);
    else
    {
        res.status(404).json({message:"error, data not found"});
        return 0;
    }
};
module.exports.showDeleteModel = function(res,err,docs)
{
    if(err)
    {
        res.status(400).json({message:"error, something happened",error_message:err})
        return 0;
    }
    else if(docs)
    {
        if(docs.hasOwnProperty('result') && typeof docs.result != 'undefined' && docs.result.hasOwnProperty('n') && typeof docs.result.n != 'undefined' && docs.result.n==0)
        {
            res.status(404).json({message:"error, data not found"})
            return 0;
        }
        else
        {
            res.json({message:"delete data successful"})
            return 1;
        }
    }
    else
    {
        res.status(404).json({message:"error, data not found"})
        return 0;
    }
}
/*
 module.exports.verifyKey = function(key, res, callback) {
 User.findOne({key:key}, function(err, user) {
 if(!user) {
 res.status(400);
 res.json({"message" : "Key is invalid."});
 return callback("Key is invalid.",null);
 }
 else {
 return callback(null, user);
 }
 });
 };
 //*/

exports.getCar = function(req,res,next)
{
    Car.find({}, function(err, docs)
    {
        module.exports.showModel(res,err,docs)
    })
};
exports.showCar = function(req,res,next)
{
    Car.findOne({_id:req.params.id}, function(err, docs)
    {
        module.exports.showModel(res,err,docs)
    })
};
exports.getPart = function(req,res,next)
{
    Part.find({}, function(err, docs)
    {
        module.exports.showModel(res,err,docs)
    })
};
exports.showPart = function(req,res,next)
{
    Part.findOne({_id:req.params.id}, function(err, docs)
    {
        module.exports.showModel(res,err,docs)
    })
};



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

////////////////////The use of return Done()//////////////////
// this will ignore other command to run and goto Done() immediately
