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
    const allVerify = verifyController.verifyAll;
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


router.post('/registerAdmin', (req, res, next) => {
    /////Please use this key to authorize this feature////
    /////You can implement more to protect access this api////

    /////req.body.createadminkey = "a7f44g5r5r488g5r48s55df48eef54gr48s4g4r8s6f54";
    if (req.body.createadminkey){
        if (req.body.createadminkey !== "a7f44g5r5r488g5r48s55df48eef54gr48s4g4r8s6f54")
            return res.json("You must be backend to know, how to access this api");
    } else {
        return res.json("You must be backend to know, how to access this api");
    }

    adminController.createAdmin(req, res, next);

/*
    User.findOne({user_type:3},function(err,docs)
    {
        if(!docs) // TODO: check if this check for an admin account exist is really work or not (it's not work when test somehow)
        {
            adminController.createAdmin(req, res, next);
        }
        else
        {
            var obj = {"message":"admin account already exist"};
            res.status(409).json({obj});
            return -1;
        }
    })
*/

});

router.post('/login', toolController.firebaselogin);

router.route('/api/part')
    .get(verifyController.verifyAllV2, toolController.getPart);
router.get(   '/api/part/:id',   toolController.showPart);
router.route('/api/car')
    .get(    toolController.getCar);
router.get(   '/api/car/:id',   toolController.showCar);



module.exports = router;
