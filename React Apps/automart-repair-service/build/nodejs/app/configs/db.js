const chalk = require('chalk');
console.log(chalk.green.bold('===============MongoDB by Mongoose Configuration================='));

console.log();
console.log(chalk.white.bold('      // \\                                                '));
console.log(chalk.white.bold('    //      \\\\                                             '));
console.log(chalk.white.bold('    //         \\\\                                          '));
console.log(chalk.white.bold('     ///            \\\\                                       '));
console.log(chalk.white.bold('       ////             \\\\                                '));
console.log(chalk.white.bold('          /////             \\\\                                 '));
console.log(chalk.white.bold('               /////            \\\\\\                              '));
console.log(chalk.white.bold('                    //////         \\\\                           '));
console.log(chalk.white.bold('                          //// //  ////                      '));
console.log(chalk.white.bold('                                         / / / / /                   '));
console.log(chalk.white.bold('                                                     / / / / /              '));
console.log();
var mongoose = require('mongoose');
var pjson = require('../package.json');
var config = require('./env');
var host = config.host_db;
var dbURI = "mongodb://"+host+":"+config.mongodb_port+"/"+pjson.name;

require('../models/billing');
require('../models/car');
require('../models/garage');
require('../models/mechanic');
require('../models/part');
require('../models/promotion');
require('../models/request');
require('../models/service');
require('../models/user');

mongoose.connect(dbURI);
// Use native promises
mongoose.Promise = global.Promise;
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});


// require db
//require('../models/user');

module.exports = {
    mongo: mongoose
};
console.log();
console.log(chalk.green.bold('              --    Configuration Completed    --                '));
console.log();

