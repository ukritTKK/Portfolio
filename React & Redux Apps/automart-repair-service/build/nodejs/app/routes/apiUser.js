///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
////////////////////Requirement Section/////////////////////
///////////////////////////////////////////////////////////
//**//This code require javascript version 6 or newer//**//
////////////////////////miscellaneous//////////////////////
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

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
const apiUserController = require(config.mpath['controllers']['user']);
////////////////////////From Mongo/////////////////////////

const User = require('mongoose').model('User');

///////////////////////From Firebase///////////////////////
const admin = require('firebase-admin');

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////


router.route('/mechanic').get(allVerify, apiUserController.getMechanic);

router.route('/part').get(allVerify, apiUserController.getPart );

router.route('/car').get(allVerify   ,    apiUserController.getCar);

router.route('/user')
    .get(allVerify   ,    apiUserController.getUser);
router.put(   '/user',allVerify,    apiUserController.setUser);

router.route('/garage').get(allVerify,    apiUserController.getGarage);

router.route('/service').get(allVerify,   apiUserController.getService);

router.route('/request')
    .post(allVerify  ,   apiUserController.postRequest)
    .get(allVerify   ,    apiUserController.getRequest);

router.route('/billing').get(allVerify   ,    apiUserController.getBilling);

router.route('/promotion').get(allVerify   ,    apiUserController.getPromotion);




/*
router.route('/mechanic').get(allVerify, apiUserController.getMechanic)

router.route('/part')   .get(allVerify, apiUserController.getPart )

router.route('/car').get(allVerify   ,    apiUserController.getCar)

router.route('/user')
  .get(allVerify   ,    apiUserController.getUser)
router.put(   '/user',allVerify,    apiUserController.putUser)

router.route('/garage').get(allVerify,    apiUserController.getGarage)

router.route('/service').get(allVerify,   apiUserController.getService)

router.route('/request')
  .post(allVerify  ,   apiUserController.postRequest)
  .get(allVerify   ,    apiUserController.getRequest)

router.route('/billing').get(allVerify   ,    apiUserController.getBilling)

router.route('/promotion').get(allVerify   ,    apiUserController.getPromotion)
*/
module.exports = router;
