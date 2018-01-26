var config = require(__dirname+'/../configs/env');
var db = require(__dirname+'/../configs/db');
//var Part = require(__dirname+'/../models/part');
//var User = require(__dirname+'/../models/user');
// var Garage = require(__dirname+'/../models/garage');
var Mechanic = require(__dirname+'/../models/mechanic');

var mongoose = require('mongoose')
  , csv = require('fast-csv');

// create instance of Schema
var mongoose = db.mongo;

module.exports.importFile = function(filePath, fileHeaders, modelName) {
    csv
        .fromPath(filePath, {headers: fileHeaders})
        .on('data', function(data) {

            var Obj = mongoose.model(modelName);
            var obj = new Obj();

            Object.keys(data).forEach(function(key) {
                var val = data[key];

                if (val !== '')
                    obj.set(key, val);
            });

            obj.save(function (err) {
                if (err)
                    console.log(err);
            });
        })
        .on('end', function() {
            console.log("done");
        });
}
