
/////////////////////////////////Warning//////////////////////////////////
/////////////////////////////////Warning//////////////////////////////////
/////////////////////////////////Warning//////////////////////////////////
/////////////////////////////////Warning//////////////////////////////////
/////////////////////////////////Warning//////////////////////////////////
//
//
//                   This auth controller is no longer use
//              because we use the new firebase authentication
//                      this file will be code archive
//
//
//
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////



// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var LocalStrategy = require('passport-local').Strategy
//var User = require('.'+'/../models/user');
var BearerStrategy = require('passport-http-bearer').Strategy

const series = require('async-series');
const jwt = require('jsonwebtoken');
const chalk = require('chalk');
const User = require('mongoose').model('User');
const config = require('../configs/env');
const admin = require('firebase-admin');




passport.use('local', new LocalStrategy(
    function (username, password, callback) {
        // console.log('welcome to local:')
        User.findOne({username: username}, function (err, user) {
            if (err) {
                return callback(err);
            }

            // No user found with that username
            if (!user) {
                return callback(null, false);
            }

            // Make sure the password is correct
            user.verifyPassword(password, function (err, isMatch) {
                if (err) {
                    return callback(err);
                }

                // Password did not match
                if (!isMatch) {
                    return callback(null, false);
                }

                // Success
                return callback(null, user);
            });
        });
    }

    /*
     function(username, password, done) {
     findUser(username, function (err, user) {
     if (err) {
     return done(err)
     }
     if (!user) {
     return done(null, false)
     }
     if (password !== user.password  ) {
     return done(null, false)
     }
     return done(null, user)
     })
     }
     //*/
));

exports.isAuthenticated = passport.authenticate('local', { failWithError: true });
