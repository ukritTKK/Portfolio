///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
////////////////////Requirement Section/////////////////////
///////////////////////////////////////////////////////////
//**//This code require javascript version 6 or newer//**//
////////////////////////miscellaneous//////////////////////
const express = require('express');
const router = express.Router();
const path = require('path');

const async = require('async');
const series = require('async-series');
const chalk = require('chalk');
const jwt = require('jsonwebtoken');
///////////////////////From Configs////////////////////////
const config = require('../configs/env');
const db = require('../configs/db');

//////////////////From Other Controllers///////////////////
const verifyController = require(config.mpath['controllers']['verify']);
    const allVerify = verifyController.verifyAllV2;
    const allVerifyIndiv = verifyController.verifyAllIndivV2;
    const verifyMech = verifyController.verifyMechanicV2;
    const verifyMechIndiv = verifyController.verifyMechanicIndivV2;
    const verifyGarage = verifyController.verifyGarageV2;
    const verifyGarageIndiv = verifyController.verifyGarageIndivV2;
    const verifyAdmin = verifyController.verifyAdminV2;

const toolController = require(config.mpath['controllers']['tool']);
const userController = require(config.mpath['controllers']['user']);
const authController = require(config.mpath['controllers']['auth']);
const adminController = require(config.mpath['controllers']['admin']);
const mechanicController = require(config.mpath['controllers']['mechanic']);
const garageController = require(config.mpath['controllers']['garage']);
////////////////////////From Mongo/////////////////////////

const User = require('mongoose').model('User');

///////////////////////From Firebase///////////////////////
const admin = require('firebase-admin');

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

//                                                                           //
//                This route is use by                                       //
//                localhost:3001/test/...                                    //
//                                                                           //
//                Example : localhost:3001/test/createUser                   //
//                                                                           //

//////////////////////////////Customer User Test///////////////////////////////
//////////////////////////////Customer User Test///////////////////////////////
//////////////////////////////Customer User Test///////////////////////////////
//
//
//===============================Create User===================================
//                                 <POST>
//
//               This is to testing generate new normal user
//
//            <<    Req headers must use in this method     >>
//
//                        - not require any others
//
//     <<    Req body can be use in this method  (not require all)   >>
//
//                          -  req.body.username
//                          -  req.body.name
//                          -  req.body.email
//                          -  req.body.home_address
//                          -  req.body.home_lat
//                          -  req.body.home_lng
//                          -  req.body.tel
//

            router.post('/createUser', userController.createUser);

//
//=================================Get User====================================
//                                  <GET>
//
//        This is to testing getting user data with the id from token
//
//            <<    Req headers must use in this method     >>
//
//                       - req.headers.authorization   <-- "JWTToken"
//
//     <<    Req body can be use in this method  (not require all)   >>
//
//                        - not require any others
//

         router.get('/getUser', allVerify, userController.getUser);

//
//=================================Set User====================================
//                                  <POST>
//
//                        This is to change user data
//
//            <<    Req headers must use in this method     >>
//
//                       - req.headers.authorization   <-- "JWTToken"
//
//     <<    Req body can be use in this method  (not require all)   >>
//
//                          -  req.body.username
//                          -  req.body.name
//                          -  req.body.email
//                          -  req.body.home_address
//                          -  req.body.home_lat
//                          -  req.body.home_lng
//                          -  req.body.tel
//

          router.post('/setUser', allVerify, userController.setUser);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////







//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++







////////////////////////////Fake Mechanic User Test////////////////////////////
////////////////////////////Fake Mechanic User Test////////////////////////////
////////////////////////////Fake Mechanic User Test////////////////////////////
//
//
//==============================Create Mechanic================================
//                                 <POST>
//
//                This is to test generate new Fake Mechanic
//
//            <<    Req headers must use in this method     >>
//
//                        - not require any others
//
//     <<    Req body can be use in this method  (not require all)   >>
//
//                          -  req.body.name
//                          -  req.body.tel
//                          -  req.body.image_url
//

        router.post('/createMechanic', mechanicController.createMechanic);

//
//===============================Get Mechanic==================================
//                                  <GET>
//
//      This is to test getting mechanic data with the id from token
//
//            <<    Req headers must use in this method     >>
//
//                       - req.headers.authorization   <-- "JWTToken"
//
//     <<    Req body can be use in this method  (not require all)   >>
//
//                        - not require any others
//

    router.get('/getMechanic', verifyMech, mechanicController.getMechanic);

//
//===============================Set Mechanic==================================
//                                  <POST>
//
//                        This is to change user data
//
//            <<    Req headers must use in this method     >>
//
//                       - req.headers.authorization   <-- "JWTToken"
//
//     <<    Req body can be use in this method  (not require all)   >>
//
//                          -  req.body.name
//                          -  req.body.tel
//                          -  req.body.image_url
//

    router.post('/setMechanic', verifyMech, mechanicController.setMechanic);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////






//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++






//////////////////////////////////Garage Test//////////////////////////////////
//////////////////////////////////Garage Test//////////////////////////////////
//////////////////////////////////Garage Test//////////////////////////////////
//
//
//===============================Create Garage================================
//                                  <POST>
//
//                     This is to test generate new Garage
//
//              <<    Req headers must use in this method     >>
//
//                        - not require any others
//
//        <<    Req body must be use in this method  (require all)   >>
//
//                        -  req.body.name
//                        -  req.body.tel
//                        -  req.body.address
//                        -  req.body.image_url
//                        -  req.body.address_lat
//                        -  req.body.address_lng
//

        router.post('/createGarage', garageController.createGarage);

//
//================================Get Garage==================================
//                                  <GET>
//
//         This is to test getting garage data with the id from token
//
//            <<    Req headers must use in this method     >>
//
//                       - req.headers.authorization   <-- "JWTToken"
//
//     <<    Req body can be use in this method  (not require all)   >>
//
//                        - not require any others
//

      router.get('/getGarage', verifyGarage, garageController.getGarage);

//
//================================Set Garage===================================
//                                  <POST>
//
//                        This is to change garage data
//
//            <<    Req headers must use in this method     >>
//
//                       - req.headers.authorization   <-- "JWTToken"
//
//     <<    Req body can be use in this method  (not require all)   >>
//
//                          -  req.body.name
//                          -  req.body.tel
//                          -  req.body.image_url
//

        router.post('/setGarage', verifyGarage, garageController.setGarage);

//
//==========================Add Mechanic to Garage=============================
//                                  <POST>
//
//           This is to add mechanic to garage, by use mechanic ID
//
//            <<    Req headers must use in this method     >>
//
//                       - req.headers.authorization   <-- "JWTToken"
//
//     <<    Req body can be use in this method  (not require all)   >>
//
//                       -  req.body.mechanicID
//                       -  req.body.forcestation
//                              set this to "1" will force original Mechanic
//                              to change garage to the new garage
//                              .If you set to zero, if This Mechanic
//                              already stationed, it's will return error.
//

router.post('/addmechtogarage', verifyGarage, garageController.addMechanic);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////





//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++






/////////////////////////////////Admin Test////////////////////////////////////
/////////////////////////////////Admin Test////////////////////////////////////
/////////////////////////////////Admin Test////////////////////////////////////
//
//
//==============================Create Admin================================
//                                 <POST>
//
//                      This is to test add new Admin
//
//             <<    Req headers must use in this method     >>
//
//                        - not require any others
//
//       <<    Req body must be use in this method  (require all)   >>
//
//                        -  req.body.username
//                        -  req.body.password
//                        -  req.body.email
//                        -  req.body.tel
//

          router.post('/createAdmin', adminController.createAdmin);

//
//=============================Get Admin Data==================================
//                                  <GET>
//
//      This is to test getting mechanic data with the id from token
//
//            <<    Req headers must use in this method     >>
//
//                       - req.headers.authorization   <-- "JWTToken"
//
//     <<    Req body can be use in this method  (not require all)   >>
//
//                        - not require any others
//

          router.get('/getAdmin', verifyAdmin, userController.getUser);

//
//=================================Set Admin==================================
//                                  <POST>
//
//                        This is to change Admin data
//
//            <<    Req headers must use in this method     >>
//
//                       - req.headers.authorization   <-- "JWTToken"
//
//     <<    Req body can be use in this method  (not require all)   >>
//
//                        -  req.body.username
//                        -  req.body.password
//                        -  req.body.email
//                        -  req.body.tel
//

         router.post('/setAdmin', verifyAdmin, adminController.setAdmin);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////






//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++







///////////////////////////////////Generator///////////////////////////////////
///////////////////////////////////Generator///////////////////////////////////
///////////////////////////////////Generator///////////////////////////////////
//
//
//===============================User Generator================================
//                                   <Get>
//
//          To use this method, you must change parameters by hard code
//
//           You can read about how to use, by go to method declaration
//

            router.get('/GenUser', (req, res, next) => {
                toolController.UserGenerator(8,0,5000,null, () => {
                    res.end();
                });
            });

            router.get('/GenAdmin', (req, res, next) => {
                toolController.UserGenerator(0,3,3,null, () => {
                    res.end();
                });
            });

//
//=========================One Custom Token Generator=============================
//                                   <Get>
//
//          To use this method, you must change parameters by hard code
//
//           You can read about how to use, by go to method declaration
//

            router.get('/genToken', (req, res, next) => {
                toolController.generateJWTToken(20, 0, '2h',
                    (err, JWTToken) => {
                        if (err)
                            console.log('Encode Fail : ' + err);
                        else if (JWTToken) {
                            console.log('Encode Successfully');
                            console.log(JWTToken);
                        } else {
                            console.log('Cant recieve anything');
                        }
                    }
                );
                console.log('Completed');
                res.end();
            });

//
//============================All Token Generator=============================
//                                   <Get>
//
//                  This method generate token of all user
//
//          To use this method, you must change parameters by hard code
//
//           You can read about how to use, by go to method declaration
//

            router.get('/genallToken', (req, res, next) => {
                toolController.generateAllJWTToken(req, res, next);
            });

//
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////






//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++







///////////////////////////////Verification Test///////////////////////////////
///////////////////////////////Verification Test///////////////////////////////
///////////////////////////////Verification Test///////////////////////////////
//
//
//===========================Non-Param Verification============================
//                                   <Get>
//

    router.get('/userVeri', allVerify,
        (req, res, next) => {
            if (req.decodedJWT) {
                console.log("User Authen Complete : " + JSON.stringify(req.decodedJWT));
            } else {
                console.log(chalk.red("Authentication Fail"));
            }
            res.end();
        }
    );

    router.get('/mechanicVeri', verifyMech,
        (req, res, next) => {
            if (req.decodedJWT) {
                console.log("Mechanic Authen Complete : " + JSON.stringify(req.decodedJWT));
                console.log("Mechanic Object ID : " + req.mechanicID);
                console.log("Mechanic Stationed Garage Object ID : " + req.garageID);
            } else {
                console.log(chalk.red("Authentication Fail"));
            }
            res.end();
        }
    );


    router.get('/GarageVeri', verifyGarage,
        (req, res, next) => {
            if (req.decodedJWT) {
                console.log("Garage Authen Complete : " + JSON.stringify(req.decodedJWT));
                console.log("Garage Object ID : " + req.garageID);
            } else {
                console.log(chalk.red("Authentication Fail"));
            }
            res.end();
        }
    );

    router.get('/adminVeri', verifyAdmin,
        (req, res, next) => {
            if (req.decodedJWT) {
                console.log("Admin Authen Complete : " + JSON.stringify(req.decodedJWT));
            } else {
                console.log(chalk.red("Authentication Fail"));
            }
            res.end();
        }
    );

//
//=============================Param Verification============================
//                                   <Get>
//


    router.get('/userVeriParam/:id', allVerifyIndiv,
        (req, res, next) => {
            if (req.decodedJWT) {
                console.log("User Authen Complete : " + JSON.stringify(req.decodedJWT));
            } else {
                console.log(chalk("Authentication Fail"));
            }
            res.end();
        }
    );

    router.get('/mechanicVeriParam/:id', verifyMechIndiv,
        (req, res, next) => {
            if (req.decodedJWT) {
                console.log("Mechanic Authen Complete : " + JSON.stringify(req.decodedJWT));
                console.log("Mechanic Object ID : " + req.mechanicID);
                console.log("Mechanic Stationed Garage Object ID : " + req.garageID);
            } else {
                console.log(chalk("Authentication Fail"));
            }
            res.end();
        }
    );


    router.get('/GarageVeriParam/:id', verifyGarageIndiv,
        (req, res, next) => {
            if (req.decodedJWT) {
                console.log("Garage Authen Complete : " + JSON.stringify(req.decodedJWT));
                console.log("Garage Object ID : " + req.garageID);
            } else {
                console.log(chalk("Authentication Fail"));
            }
            res.end();
        }
    );


//
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////




//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




module.exports = router;