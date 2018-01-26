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
let PromotionSchema   = new Schema({
    promotion_type: { type: String, required: true },
    discount_price: { type: Number, required: true },
    discount_percent: { type: Number, required: true }
},{timestamps:true});

/////////////////////////Export Model Section/////////////////////////////////
module.exports = mongoose.model('Promotion', PromotionSchema);
