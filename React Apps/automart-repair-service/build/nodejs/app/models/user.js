///////////////////////////////////////////////////////////
////////////////////Requirement Section/////////////////////
///////////////////////////////////////////////////////////
//**//This code require javascript version 6 or newer//**//
///////////////////////From Mongo//////////////////////////
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

///////////////////////From Configs////////////////////////
const config = require('../configs/env');
const db = require('../configs/db');

//////////////////From Other Controllers///////////////////
//                       <None>

////////////////////////miscellaneous//////////////////////
const chalk = require('chalk');

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

//////////////////////////Define Schema Section////////////////////////////////
let UserSchema = new mongoose.Schema({
    firebaseid: {
        type: String,
       // unique: true,
       // required: true,
        key: true
    },

    username: {
        type: String,
        //unique: true,
        //required: true,
        //key: true
    },

    password: {
        type: String,
        //required: true,
        // select: false // somehow make the password checking error
    },

    user_type: {type: Number, min: 0, max: 3, default: 0},
    name: {
        type: String,
        //required: true
    },
    email: {
        type: String,
        //required: true
    },
    home_address: {
        type: String,
        //required: true
    },
    home_address_lat: {
        type: Number,
        //required: true
    },
    home_address_lng: {
        type: Number,
        //required: true
    },
  /*
   assoc_id: {
   type: String,
   //required: true
   },
   //*/
    tel: {
        type: String,
        //required: true
    },
    enabled: {type: Number, min: 0, max: 1, default: 1}

},{timestamps:true});

// Execute before each user.save() call
/*
UserSchema.pre('save', function(callback) {

    let user = this;

    // Break out if the password hasn't changed
    if (!user.isModified('password')) return callback();

    // Password changed so we need to hash it

    bcrypt.genSalt(5, function(err, salt) {
        if (err) return callback(err);

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return callback(err);
            user.password = hash;
            callback();
        });
    });

});
*/
UserSchema.methods.verifyPassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

//var options = ({missingPasswordError: "Wrong password"});
//UserSchema.plugin(passportLocalMongoose,options);

/////////////////////////Export Model Section/////////////////////////////////
module.exports = mongoose.model('User', UserSchema);
