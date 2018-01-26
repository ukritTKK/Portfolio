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
let RequestSchema   = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref:'User', required: true },
    mechanic_id: { type: Schema.Types.ObjectId, ref:'Mechanic', required: true }, //TODO: check if we should use garage_id instead
    mechanic_reach: { type: Number, min:0, max:1, required: true },
    location_lat: { type: Number, required: true },
    location_lng: { type: Number, required: true },
    request_time: { type: Date, required: true },
    reach_time: { type: Date }
},{timestamps:true});

/////////////////////////Export Model Section/////////////////////////////////
module.exports = mongoose.model('Request', RequestSchema);
