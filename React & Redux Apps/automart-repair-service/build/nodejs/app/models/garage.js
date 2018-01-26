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
let GarageSchema = new Schema({
    name: { type: String, required: true },
    tel: { type: String, required: true },
    rating: { type: Number, default:0 }, // TODO: check if we need to removed this
    address: { type: String, required: true },
    image_url: { type: String },
    address_lat: { type: Number, required: true },
    address_lng: { type: Number, required: true },
    mechanic_id_list: [{ type: Schema.Types.ObjectId, ref:'Mechanic' }], // TODO: default list become []
    part_id_list: [{ type: Schema.Types.ObjectId, ref:'Part'}], // TODO: default list become []
    user_id: { type: Schema.Types.ObjectId, ref:'User', required: true, unique:true },
},{timestamps:true});

GarageSchema.pre("save",function(callback) {
    if ( !this.mechanic_id_list || this.mechanic_id_list.length === 0 )
    {
        this.mechanic_id_list = []; // TODO: check if we can add the data later
    }
    if ( !this.part_id_list || this.part_id_list.length === 0 )
    {
        this.part_id_list = [];
    }
    callback();
});

/////////////////////////Export Model Section/////////////////////////////////
module.exports = mongoose.model('Garage', GarageSchema);
