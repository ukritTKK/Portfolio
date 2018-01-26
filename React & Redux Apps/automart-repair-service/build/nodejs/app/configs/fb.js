const admin = require('firebase-admin');
const config = require('./env');

//const serviceAccount =  require('./learnapp1-daa64-firebase-adminsdk-2id74-b2d72031b6');
const serviceAccount =  require('./automart-service-repair-firebase-adminsdk-n8hci-49ee5b0e73');
const toolController = require(config.mpath['controllers']['tool']);
    const saveMessageLog = toolController.saveMessageLog;
    const MessagePrint = toolController.MessagePrint;
const mechanicController = require(config.mpath['controllers']['mechanic']);

const chalk = require('chalk');

module.exports = ()=>{
    let DefaultApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://automart-service-repair.firebaseio.com"
    });
    let defaultAuth = DefaultApp.auth();
    let defaultDatabase = DefaultApp.database();
    console.log(chalk.green.bold('=====================Firebase Configuration======================'));
    console.log(chalk.green.bold('                 --     Firebase Started!    --                  '));
    console.log();
    console.log(chalk.white.bold('                                                             '));
    console.log(chalk.white.bold('                         |                                    '));
    console.log(chalk.white.bold('                        |  |  |       |                        '));
    console.log(chalk.white.bold('                        |   ||  |  ||  |                        '));
    console.log(chalk.white.bold('                        |  |     ||     |                       '));
    console.log(chalk.white.bold('                       |  |    ||        |                      '));
    console.log(chalk.white.bold('                       |  |  ||           |                      '));
    console.log(chalk.white.bold('                      |   |||              |                      '));
    console.log(chalk.white.bold('                      |  ||                 |                     '));
    console.log(chalk.white.bold('                      | ||                   |                    '));
    console.log(chalk.white.bold('                      |||                |||                    '));
    console.log(chalk.white.bold('                           |||      |||                         '));
    console.log(chalk.white.bold('                                ||                            '));
    console.log();

    ///////////////////////////////////////////////////////////////////
    /////////////////////////Firebase Listener/////////////////////////
    /////////////////////////Firebase Listener/////////////////////////
    /////////////////////////Firebase Listener/////////////////////////
    /////////////////////////////Section///////////////////////////////
    ///////////////////////////////////////////////////////////////////

    //mechanicController.StartMechanicFirebaseListener();

    console.log(chalk.grey("If you are fontend and clone the backend part to test the api, you should disable firebase listener by commenting its method, due to conflict by multiple same listener"));
    console.log(chalk.green.bold(" this firebase contain listener that config in /app/configs/fb.js"));
    console.log(chalk.green.bold("             --    Firebase listener started!   --               "));
    console.log();
    console.log(chalk.green.bold('              --    Configuration Completed    --                '));
    console.log();
    console.log(chalk.green.bold('================================================================='));

};
