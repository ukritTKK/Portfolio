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
let ServiceSchema   = new Schema({
    id_number: { type: Number, required: true, min:1, unique: true},
    user_id: { type: Schema.Types.ObjectId, ref:'User', required: true },
    mechanic_id: { type: Schema.Types.ObjectId, ref:'Mechanic', required: true },
    promotion_id: { type: Schema.Types.ObjectId, ref:'Promotion', required: true },
    car_id: { type: Schema.Types.ObjectId, ref:'Car', required: true },
    car_miles: { type: Number, required: true },
    car_used_years: { type: Number, required: true },
    part_id_list: [{ type: Schema.Types.ObjectId, ref:'Part' }],
    repair_list:[{ type: String }],

    status_list:[{ status: String, date: Date }],
    // status_list:[{ type: String }],
    // status_list_date:[{ type: Date }],

    price: { type: Number, required: true },
    location_lat: { type: Number, required: true },
    location_lng: { type: Number, required: true },
    service_date: { type: Date, required: true }, // TODO: to be decided whether to be deleted or not
    corrected_price: { type: Number, required: true },
},{timestamps:true});

ServiceSchema.pre("save",function(callback)
{
    if ( !this.part_id_list || this.part_id_list.length == 0 ) {
        this.part_id_list = [];
    }
    if ( !this.status_list || this.status_list.length == 0 ) {
        this.status_list = [{status:'เปิดงาน',date:new Date()}];
    }
    if ( !this.repair_list || this.repair_list.length == 0 ) {
        this.repair_list = [];
    }
    callback();
});

/////////////////////////Export Model Section/////////////////////////////////
module.exports = mongoose.model('Service', ServiceSchema);
