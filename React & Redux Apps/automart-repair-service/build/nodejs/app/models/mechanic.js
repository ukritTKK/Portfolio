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
let MechanicSchema   = new Schema({
    garage_id: { type: Schema.Types.ObjectId, ref:'Garage'/*, required: true*/ }, //we remove required temporary
    name: { type: String, default: ""/*, required: true */},
    tel: { type: String, default: ""/*, required: true */},
    image_url: { type: String, default: ""/*, required: true */},
    rating: { type: Number, default:0 }, // TODO: check if we need to removed this
    service_amount: { type: Number, default:0 }, // TODO: check if we need to removed this
    user_id: { type: Schema.Types.ObjectId, ref:'User', required: true, unique:true },
    information_completed: { type: Number, min: 0, max: 1, default: 0 }
},{timestamps:true});

////////////////////////////Pre Middleware////////////////////////////////////

/////////////////////////Export Model Section/////////////////////////////////
module.exports = mongoose.model('Mechanic', MechanicSchema);
