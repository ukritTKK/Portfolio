const path = require('path');

const port = process.env.PORT; //process.env.PORT; // set to port 3000 for production, 3002 to test
const test_protocol = "http"+"://";
const test_host = "192.168.99.100";
const test_port = 3002;
const host = "128.199.175.159";
const mongodb_port = 27017;
const host_db = "db";
const isSendEmail = false;
const isDebugMessage = false;
const jwtSecret = "ThsiisMineSecrt";
const saveLogs = "1"; // 0 to not print logs, 1 to print logs

const parentPath =  path.join(__dirname, "../");
const controllerPath = path.join(parentPath, "controllers/");
const modelPath = path.join(parentPath, "models/");

/////////////////////////Relative Part Section////////////////////
const mpath = {
    parent: parentPath,
    logs: { head : path.join(parentPath,"Logs/"), },
    config: { head : path.join(parentPath,"config/")},
    configs: { head : path.join(parentPath,"configs/")},
    controllers: {
        head : controllerPath,
        admin: path.join(controllerPath,"adminController"),
        garage: path.join(controllerPath,"apiGarageController"),
        mechanic: path.join(controllerPath,"apiMechanicController"),
        user: path.join(controllerPath,"apiUserController"),
        auth: path.join(controllerPath,"authController"),
        test: path.join(controllerPath,"testController"),
        testfirebase: path.join(controllerPath,"TestFirebaseController"),
        tool: path.join(controllerPath, "toolController"),
        verify: path.join(controllerPath,"verifyController")
    },
    importer: { head : path.join(parentPath,"importer/")},
    models: {
        head : modelPath,
        billing: path.join(modelPath,"billing"),
        car: path.join(modelPath,"car"),
        garage: path.join(modelPath,"garage"),
        mechanic: path.join(modelPath,"mechanic"),
        part: path.join(modelPath,"part"),
        promotion: path.join(modelPath,"promotion"),
        request: path.join(modelPath,"request"),
        service: path.join(modelPath,"service"),
        user: path.join(modelPath,"user")

    },
    public: { head : path.join(parentPath,"public/")},
    route: { head : path.join(parentPath,"routes/")},
    sample: { head : path.join(parentPath,"sample/")},
    script: { head : path.join(parentPath,"scripts/")},
    src: { head : path.join(parentPath,"src/")},
    views: { head : path.join(parentPath,"views/")}

};
//console.log(JSON.stringify(mpath, null, 4));
//console.log('test path : ' + mpath.parent);
//console.log('test path : ' + mpath['controllers']['garage']);

module.exports = {
    port: port,
	test_protocol: test_protocol,
	test_host: test_host,
    test_port: test_port,
    mongodb_port: mongodb_port,
    host_db: host_db,
    isSendEmail: isSendEmail,
    isDebugMessage: isDebugMessage,
    mpath: mpath,
    saveLogs: saveLogs,
    jwt:{
      secret: jwtSecret
    },
    facebook: {
        clientID: '508712069322257',
        clientSecret: 'e50bc71cd713c1eeed84f673094f08c0',
        callbackURL: 'http://'+host+'/register/oauth/facebook/callback'
    },
	google: {
		clientID:'547649472772-752ugta7ca5mtsqqpelq1eflud5jver6.apps.googleusercontent.com',
		clientSecret:'UUxqiJrkYHkT0I1VTJ_l6hOt',
        callbackURL: 'http://'+host+'/register/oauth/google/callback'
    },
    omise: {
      publicKey: 'pkey_test_xxxxxxxxxxxxxxxxxx',
      privateKey: 'skey_test_xxxxxxxxxxxxxxxxxxx',
      version: '2015-11-17'
    },
    sendgrid:{
      APIKey: 'SG.XXXXXXXXXXXXXXXXXXXX.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      template: {
        choosepay:"xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        omise:"xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        wire:"xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        ticket:"xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      }
    },
    default_value:{
      isRegisterWorkingStatus: 0,
      ticket:{
        max_sale_amount: 1000,
        error_amount: 0
      },
      normalMaxCount:{
        max_sale_amount: 300,
        error_amount: 0
      },
      earlyBirdMaxCount:{
        max_sale_amount: 200,
        error_amount: 0
      },
      discountMaxCount:{
        max_sale_amount: 200,
        error_amount: 0
      },
      otherMaxCount:{
        max_sale_amount: 150,
        error_amount: 0
      },
      freeMaxCount:{
        max_sale_amount: 150,
        error_amount: 0
      },
      normalPrice:{
        max_sale_amount: 1500,
        error_amount: 0
      },
      earlyBirdPrice:{
        max_sale_amount: 2000,
        error_amount: 0
      },
      discountPrice:{
        max_sale_amount: 1000,
        error_amount: 0
      },
      otherPrice:{
        max_sale_amount: 1150,
        error_amount: 0
      },
      freePrice:{
        max_sale_amount: 20,
        error_amount: 0
      }
    },
};
