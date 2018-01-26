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

let BillingSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    service_id: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    price: { type: Number, required: true }
},{timestamps:true});

/////////////////////////Export Model Section/////////////////////////////////
module.exports = mongoose.model('Billing', BillingSchema);