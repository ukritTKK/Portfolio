//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let config = require('../configs/env');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
// let server = require('../app');
let server = config.test_protocol+config.test_host+":"+config.test_port//require('../app');
let should = chai.should();
let async = require('async');
let isDebugTest = false;
let isDebugTest2 = false; // debug message after refactor
var jwt = require('jsonwebtoken');
let token;
token = ''

let testController = require('../controllers/testController')

let User = require('../models/user')
let Garage = require('../models/garage')

chai.use(chaiHttp);
// start of parent block
describe('Errors', () =>
{
  beforeEach((done) =>
  {
    let Model, modelList = {mechanic:'',part:'',car:'',user:'',service:'',request:'',billing:'',promotion:'',garage:''};//modelList = {client:'',user:'',code:'',mechanic:''};
    for(var modelName in modelList)
      if(testController.testDropModel(function(){},modelName)==0) console.log("ERROR: can't delete database "+modelName);
    done();
  });
  //start template here
  describe('? check that upload file when forget to attach should send correct error: ', () =>
  {
    // start of variable here
    let request={ // just add the required input variable here, and we can put the output in the output section
                  account : {username:"test",password:"12345"},
                  config: [
                            {name:'isRegisterWorkingStatus',status:'1'}, // request0
                            {name: 'ticketMaxSaleCount',status:'1000'}, // request1
                          ],
                  configCount: 0,
                  count: 0,
                  output: {},
                  payMethod: "omise"
                };
    // end of variable here
    // start of before function here
    before(function(done)
    {
      async.waterfall
      (// start of functions flow here
        [// arrange the argument in the same order as much as possible
        //callback(err,arg); // the command to end the function
          function(callback)
          {
            let arg = request, route = '/registerAdmin',obj=request.account;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
            // callback(null,request)
          }, // request0
          function(arg,callback)
          {
            let route = '/login',obj=request.account;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
            // callback(callback,arg)
          }, // request1
          function(arg,callback){
            let route = '/api/admins/car';
            let obj = {car_model:'City',car_brand:'Honda',car_year:2012}
            token = arg.output[1].res.body.token;
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('car_model',obj.car_model)
              .field('car_brand',obj.car_brand).field('car_year',obj.car_year).field('file','')
              // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .set('Authorization',token)
              .send(obj),isDebug=isDebugTest);
            // callback(callback,arg)
          }, // request2
          function(arg,callback)
          {
            let reqNo = 3;
            let route = '/api/admins/mechanic';
            let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
              .field('name',obj.name).field('tel',obj.tel)
              .field('rating',obj.rating).field('service_amount',obj.service_amount)////.set('Content-Type','multipart/form-data')
              // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .field('file','')
              .set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 3
          function(arg,callback)
          {
            let route = '/api/admins/garage';
            let obj ={
              "name":"Toyotacare",
              "tel":"089-999-9999",
              "rating":"4",
              "address":"222/20",
              "address_lat":"13.296745",
              "address_lng":"100.178454",
              // "mechanic_id_list[]":"1",
              // "mechanic_id_list[]":"2",
              // "part_id_list[]":"3",
              // "part_id_list[]":"4",
              "mechanic_id_list":["1","2"],
              "part_id_list":["3","4"]

            }
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('name',obj.name)
              .field('tel',obj.tel).field('rating',obj.rating).field('address',obj.address)
              .field('address_lat',obj.address_lat).field('address_lng',obj.address_lng)////.set('Content-Type','multipart/form-data')
              .field('mechanic_id_list[]',"1")
              .field('mechanic_id_list[]',"2")
              .field('part_id_list[]',"3")
              .field('part_id_list[]',"4")
              // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .field('file','')
              .set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request4
          function(arg,callback)
          {
            let route = '/api/admins/part';
            let obj = {garage_id:'zJELcGlf1gsjbcqy',part_number:'WH31U-82TAA',name:'วาล์วน้ำ',image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg',price:1090,amount:20}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
              .field('part_number',obj.part_number).field('name',obj.name).field('image_url',obj.image_url)
              .field('price',obj.price).field('amount',obj.amount)////.set('Content-Type','multipart/form-data')
              // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .field('file','')
              .set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 5
          function(arg,callback){
            let route = '/api/admins/car';
            let obj = {car_model:'City',car_brand:'Honda',car_year:2012}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('car_model',obj.car_model)
              .field('car_brand',obj.car_brand).field('car_year',obj.car_year)
              // .field('file','')
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              // .set('Authorization',token)
              .send(obj),isDebug=isDebugTest);
            // callback(callback,arg)
          }, // request6
          function(arg,callback)
          {
            let reqNo = 7;
            token = arg.output[1].res.body.token;
            let route = '/api/admins/mechanic';
            let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
              .field('name',obj.name).field('tel',obj.tel)
              .field('rating',obj.rating).field('service_amount',obj.service_amount)////.set('Content-Type','multipart/form-data')
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              // .field('file','')
              // .set('Authorization',token)
              .send(obj),isDebug=isDebugTest);
          }, // request 7
          function(arg,callback)
          {
            let route = '/api/admins/garage';
            let obj ={
              "name":"Toyotacare",
              "tel":"089-999-9999",
              "rating":"4",
              "address":"222/20",
              "address_lat":"13.296745",
              "address_lng":"100.178454",
              // "mechanic_id_list[]":"1",
              // "mechanic_id_list[]":"2",
              // "part_id_list[]":"3",
              // "part_id_list[]":"4",
              "mechanic_id_list":["1","2"],
              "part_id_list":["3","4"]

            }
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('name',obj.name)
              .field('tel',obj.tel).field('rating',obj.rating).field('address',obj.address)
              .field('address_lat',obj.address_lat).field('address_lng',obj.address_lng)////.set('Content-Type','multipart/form-data')
              .field('mechanic_id_list[]',"1")
              .field('mechanic_id_list[]',"2")
              .field('part_id_list[]',"3")
              .field('part_id_list[]',"4")
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              // .field('file','')
              // .set('Authorization',token)
              .send(obj),isDebug=isDebugTest);
          }, // request8
          function(arg,callback)
          {
            let route = '/api/admins/part';
            let obj = {garage_id:'zJELcGlf1gsjbcqy',part_number:'WH31U-82TAA',name:'วาล์วน้ำ',image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg',price:1090,amount:20}
            token = arg.output[1].res.body.token;
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
              .field('part_number',obj.part_number).field('name',obj.name).field('image_url',obj.image_url)
              .field('price',obj.price).field('amount',obj.amount)////.set('Content-Type','multipart/form-data')
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              // .field('file','')
              // .set('Authorization',token)
              .send(obj),isDebug=isDebugTest);
          }, // request 9
          function(arg,callback)
          {
            let reqNo = 10;
            let route = '/api/admins/mechanicWithUser';
            let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
              .field('name',obj.name).field('tel',obj.tel)
              .field('rating',obj.rating).field('service_amount',obj.service_amount)////.set('Content-Type','multipart/form-data')
              // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .field('file','')
              .field('username','test2')
              .field('password','12345')
              .set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 10
          function(arg,callback)
          {
            let reqNo = 10;
            let route = '/api/admins/garageWithUser'
            let obj ={
              "name":"Toyotacare",
              "tel":"089-999-9999",
              "rating":"4",
              "address":"222/20",
              "address_lat":"13.296745",
              "address_lng":"100.178454",
              // "mechanic_id_list[]":"1",
              // "mechanic_id_list[]":"2",
              // "part_id_list[]":"3",
              // "part_id_list[]":"4",
              "mechanic_id_list":["1","2"],
              "part_id_list":["3","4"]

            }
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('name',obj.name)
              .field('tel',obj.tel).field('rating',obj.rating).field('address',obj.address)
              .field('address_lat',obj.address_lat).field('address_lng',obj.address_lng)////.set('Content-Type','multipart/form-data')
              .field('mechanic_id_list[]',"1")
              .field('mechanic_id_list[]',"2")
              .field('part_id_list[]',"3")
              .field('part_id_list[]',"4")
              // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .field('file','')
              .field('username','test3')
              .field('password','12345')
              .set('Authorization',token),isDebug=isDebugTest);

          }, //request 11
          function(arg,callback)
          {
            let reqNo = 10;
            let route = '/api/admins/garageWithUser'
            let obj ={
              "name":"Toyotacare",
              "tel":"089-999-9999",
              "rating":"4",
              "address":"222/20",
              "address_lat":"13.296745",
              "address_lng":"100.178454",
              // "mechanic_id_list[]":"1",
              // "mechanic_id_list[]":"2",
              // "part_id_list[]":"3",
              // "part_id_list[]":"4",
              "mechanic_id_list":["1","2"],
              "part_id_list":["3","4"]

            }
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('name',obj.name)
              .field('tel',obj.tel).field('rating',obj.rating).field('address',obj.address)
              .field('address_lat',obj.address_lat).field('address_lng',obj.address_lng)////.set('Content-Type','multipart/form-data')
              .field('mechanic_id_list[]',"1")
              .field('mechanic_id_list[]',"2")
              .field('part_id_list[]',"3")
              .field('part_id_list[]',"4")
              // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .field('file','')
              .field('username','test3')
              .field('password','12345')
              .set('Authorization',token),isDebug=isDebugTest);

          }, //request 12
          function(arg,callback)
          {
            let reqNo = 13;
            let route = '/api/admins/mechanicWithUser';
            let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
              .field('name',obj.name).field('tel',obj.tel)
              .field('rating',obj.rating).field('service_amount',obj.service_amount)////.set('Content-Type','multipart/form-data')
              // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .field('file','')
              .field('username','test2')
              .field('password','12345')
              .set('Authorization','token').send(obj),isDebug=isDebugTest);
          }, // request 13
          function(arg,callback)
          {
            User.update({},{user_type:2},function(err,docs)
            {
              callback(null,arg);
            })
          },
          function(arg,callback)
          {
            let route = '/login',obj=request.account;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
            // callback(callback,arg)
          }, // request14
          function(arg,callback)
          {
            let reqNo = 15;
            let route = '/api/admins/mechanicWithUser';
            let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
              .field('name',obj.name).field('tel',obj.tel)
              .field('rating',obj.rating).field('service_amount',obj.service_amount)////.set('Content-Type','multipart/form-data')
              // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .field('file','')
              .field('username','test2')
              .field('password','12345')
              .set('Authorization',arg.output[14].res.body.token).send(obj),isDebug=isDebugTest);
          }, // request 15
          function(arg,callback)
          {
            let reqNo = 16;
            let route = '/api/admins/mechanicWithUser';
            let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4a',service_amount:'3b'}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
              .field('name',obj.name).field('tel',obj.tel)
              .field('rating',obj.rating).field('service_amount',obj.service_amount)////.set('Content-Type','multipart/form-data')
              // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .field('file','')
              .field('username','test2')
              .field('password','12345')
              .set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 16
          function(arg,callback)
          {
            let reqNo = 17;
            let route = '/api/admins/garageWithUser'
            let obj ={
              "name":"Toyotacare",
              "tel":"089-999-9999",
              "rating":"4",
              "address":"222/20",
              "address_lat":"13.296745",
              "address_lng":"100.178454",
              // "mechanic_id_list[]":"1",
              // "mechanic_id_list[]":"2",
              // "part_id_list[]":"3",
              // "part_id_list[]":"4",
              "mechanic_id_list":["1","2"],
              "part_id_list":["3","4"]

            }
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('name',obj.name)
              .field('tel',obj.tel).field('rating',obj.rating).field('address',obj.address)
              .field('address_lat',obj.address_lat).field('address_lng',obj.address_lng)////.set('Content-Type','multipart/form-data')
              .field('mechanic_id_list[]',"1")
              .field('mechanic_id_list[]',"2")
              .field('part_id_list[]',"3")
              .field('part_id_list[]',"4")
              // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .field('file','')
              .field('username','test3')
              .field('password','12345')
              .set('Authorization','token'),isDebug=isDebugTest);

          }, //request 17
          function(arg,callback)
          {
            let reqNo = 18;
            let route = '/api/admins/garageWithUser'
            let obj ={
              "name":"Toyotacare",
              "tel":"089-999-9999",
              "rating":"4",
              "address":"222/20",
              "address_lat":"13.296745",
              "address_lng":"100.178454",
              // "mechanic_id_list[]":"1",
              // "mechanic_id_list[]":"2",
              // "part_id_list[]":"3",
              // "part_id_list[]":"4",
              "mechanic_id_list":["1","2"],
              "part_id_list":["3","4"]

            }
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('name',obj.name)
              .field('tel',obj.tel).field('rating',obj.rating).field('address',obj.address)
              .field('address_lat',obj.address_lat).field('address_lng',obj.address_lng)////.set('Content-Type','multipart/form-data')
              .field('mechanic_id_list[]',"1")
              .field('mechanic_id_list[]',"2")
              .field('part_id_list[]',"3")
              .field('part_id_list[]',"4")
              // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .field('file','')
              .field('username','test3')
              .field('password','12345')
              .set('Authorization',arg.output[14].res.body.token),isDebug=isDebugTest);

          }, //request 18
          function(arg,callback)
          {
            let reqNo = 19;
            let route = '/api/admins/garageWithUser'
            let obj ={
              "name":"Toyotacare",
              "tel":"089-999-9999",
              "rating":"4",
              "address":"222/20",
              "address_lat":"13.296745",
              "address_lng":"100.178454",
              // "mechanic_id_list[]":"1",
              // "mechanic_id_list[]":"2",
              // "part_id_list[]":"3",
              // "part_id_list[]":"4",
              "mechanic_id_list":["1","2"],
              "part_id_list":["3","4"]

            }
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('name',obj.name)
              .field('tel',obj.tel).field('rating',obj.rating).field('address',obj.address)
              .field('address_lat',obj.address_lat).field('address_lng',obj.address_lng)////.set('Content-Type','multipart/form-data')
              .field('mechanic_id_list[]',"1")
              .field('mechanic_id_list[]',"2")
              .field('part_id_list[]',"3")
              .field('part_id_list[]',"4")
              // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .field('file','')
              .field('username','test2')
              .field('password','12345')
              .set('Authorization',token),isDebug=isDebugTest);

          }, //request 19
        ],// end of functions flow here
        function(err,result) // last function
        {
          request = result; // save all requests to request variable
          done();
        }
      )
    });
    // end of before function here
    // start of test here
    it('check that postCar should not work when we does not submit a picture', (done) =>
    {
      let reqNo = 2;
      request.output[reqNo].res.status.should.be.eql(400);
      request.output[reqNo].res.body.message.should.be.eql('error, incorrect input for uploading');
      done();
    });
    it('check that postMechanic should not work when we does not submit a picture', (done) =>
    {
      let reqNo = 3;
      request.output[reqNo].res.status.should.be.eql(400);
      request.output[reqNo].res.body.message.should.be.eql('error, incorrect input for uploading');
      done();
    });
    it('check that postGarage should not work when we does not submit a picture', (done) =>
    {
      let reqNo = 4;
      request.output[reqNo].res.status.should.be.eql(400);
      request.output[reqNo].res.body.message.should.be.eql('error, incorrect input for uploading');
      done();
    });
    it('check that postPart should not work when we does not submit a picture', (done) =>
    {
      let reqNo = 5;
      request.output[reqNo].res.status.should.be.eql(400);
      request.output[reqNo].res.body.message.should.be.eql('error, incorrect input for uploading');
      done();
    });
    it('check that postCar should not work when we does not have token', (done) =>
    {
      let reqNo = 6;
      request.output[reqNo].res.status.should.be.eql(400);
      request.output[reqNo].res.body.message.should.be.eql("The token has not found.");
      done();
    });
    it('check that postMechanic should not work when we does not have token', (done) =>
    {
      let reqNo = 7;
      request.output[reqNo].res.status.should.be.eql(400);
      request.output[reqNo].res.body.message.should.be.eql("The token has not found.");
      done();
    });
    it('check that postGarage should not work when we  does not have token', (done) =>
    {
      let reqNo = 8;
      request.output[reqNo].res.status.should.be.eql(400);
      request.output[reqNo].res.body.message.should.be.eql("The token has not found.");
      done();
    });
    it('check that postPart should not work when we does not have token', (done) =>
    {
      let reqNo = 9;
      request.output[reqNo].res.status.should.be.eql(400);
      request.output[reqNo].res.body.message.should.be.eql("The token has not found.");
      done();
    });
    it('check that postMechanicWithUser that not include picture should return an error', (done) =>
    {
      let reqNo = 10;
      request.output[reqNo].res.status.should.be.eql(400);
      request.output[reqNo].res.body.message.should.be.eql("error, incorrect input for uploading");
      done();
    })
    it('check that postGarageWithUser that not include a picture should return an error', (done) =>
    {
      let reqNo = 11;
      request.output[reqNo].res.status.should.be.eql(400);
      request.output[reqNo].res.body.message.should.be.eql("error, incorrect input for uploading");
      done();
    })
    it('should show an error when use postGarageWithUser and register a duplicated username', (done) =>
    {
      let reqNo = 12;
      request.output[reqNo].res.status.should.be.eql(500);
      request.output[reqNo].res.body.message.should.be.eql("error, duplicated username");
      done();
    })
    it('should show an error when use postMechanicWithUser with the wrong token', (done) =>
    {
      let reqNo = 13;
      request.output[reqNo].res.status.should.be.eql(400)
      request.output[reqNo].res.body.message.should.be.eql("Token invalid")
      done();
    })
    it('should show an error when use admin postMechanicWithUser with the garage class', (done) =>
    {
      let reqNo = 15
      request.output[reqNo].res.status.should.be.eql(403)
      request.output[reqNo].res.body.message.should.be.eql('forbidden')
      done();
    })
    it('should show an error when use admin postMechanicWithUser with the duplicated username ', (done) =>
    {
      let reqNo = 16;
      request.output[reqNo].res.status.should.be.eql(500)
      request.output[reqNo].res.body.obj.message.should.be.eql("can't insert the data to the database, User collection")
      done();
    })
    it('should show an error when use postGarageWithUser with the wrong token', (done) =>
    {
      let reqNo = 17;
      request.output[reqNo].res.status.should.be.eql(400)
      request.output[reqNo].res.body.message.should.be.eql("Token invalid")
      done();
    })
    it('should show an error when use admin postGarageWithUser with the garage class', (done) =>
    {
      let reqNo = 18
      request.output[reqNo].res.status.should.be.eql(403)
      request.output[reqNo].res.body.message.should.be.eql('forbidden')
      done();
    })
    it('should show an error when use admin postGarageWithUser with the duplicated username ', (done) =>
    {
      let reqNo = 19;
      request.output[reqNo].res.status.should.be.eql(500)
      request.output[reqNo].res.body.message.should.be.eql("error, duplicated username")
      done();
    })
    //TODO: make if(err) by make duplication of unique data
    // end of test here
  }); //*/ //end of template here
  describe('? "Check if admin putPartImg error and part related error work":', () =>
  {
    // start of variable here
    let request={ // just add the required input variable here, and we can put the output in the output section
                  account : {username:"test",password:"12345"},
                  config: [
                            //{name:'isRegisterWorkingStatus',status:'1'}, // request0
                            //{name: 'ticketMaxSaleCount',status:'1000'}, // request1
                          ],
                  configCount: 0,
                  count: 0,
                  output: {},
                };
    // end of variable here
    // start of before function here
    before(function(done)
    {
      async.waterfall
      (// start of functions flow here
        [// arrange the argument in the same order as much as possible
        //callback(err,arg); // the command to end the function
        // function(callback)
        // {
        //   let route = '/api/part';
        //   let arg = request;
        //   let obj = {garage_id:'zJELcGlf1gsjbcqy',part_number:'WH31U-82TAA',name:'วาล์วน้ำ',image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg',price:1090,amount:20}
        //   testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
        // }, // request0
          function(callback)
          {
            let route = '/api/admins/part';
            let arg = request;
            let obj = {garage_id:'zJELcGlf1gsjbcqy',part_number:'WH31U-82TAA',name:'วาล์วน้ำ',image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg',price:1090,amount:20}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
              .field('part_number',obj.part_number).field('name',obj.name).field('image_url',obj.image_url)
              .field('price',obj.price).field('amount',obj.amount)////.set('Content-Type','multipart/form-data')
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, //request0
          function(arg,callback)
          {
            let route = '/api/admins/partImg';
            route += '/'+arg.output[0].res.body._id;
            let obj = {garage_id:'zJELcGlf1gsjbcqy',part_number:'WH31U-82TAA',name:'วาล์วน้ำ',image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg',price:1090,amount:20}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).put(route).field('garage_id',obj.garage_id)
              .field('part_number',obj.part_number).field('name',obj.name).field('image_url',obj.image_url)
              .field('price',obj.price).field('amount',obj.amount)////.set('Content-Type','multipart/form-data')
              // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, //request1
          function(arg,callback)
          {
            let route = '/register',obj=request.account;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
            // callback(null,request)
          }, // request2
          function(arg,callback)
          {
            let route = '/login',obj=request.account;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
            // callback(callback,arg)
          }, // request3
          function(arg,callback)
          {
            let route = '/api/admins/part';
            let obj = {garage_id:'zJELcGlf1gsjbcqy',part_number:'WH31U-82TAA',name:'วาล์วน้ำ',image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg',price:1090,amount:20}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
              .field('part_number',obj.part_number).field('name',obj.name).field('image_url',obj.image_url)
              .field('price',obj.price).field('amount',obj.amount)////.set('Content-Type','multipart/form-data')
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              // .field('file','')
              .set('Authorization',arg.output[3].res.body.token)
              .send(obj),isDebug=isDebugTest);
          }, // request 4
          function(arg,callback)
          {
            let route = '/api/admins/partImg';
            route += '/'+arg.output[0].res.body._id;
            let obj = {garage_id:'zJELcGlf1gsjbcqy',part_number:'WH31U-82TAA',name:'วาล์วน้ำ',image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg',price:1090,amount:20}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).put(route).field('garage_id',obj.garage_id)
              .field('part_number',obj.part_number).field('name',obj.name).field('image_url',obj.image_url)
              .field('price',obj.price).field('amount',obj.amount)////.set('Content-Type','multipart/form-data')
              // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .set('Authorization',arg.output[3].res.body.token).send(obj),isDebug=isDebugTest);
          }, //request5
          function(arg,callback)
          {
            let route = '/api/admins/partImg';
            route += '/'+arg.output[0].res.body._id;
            let obj = {garage_id:'zJELcGlf1gsjbcqy',part_number:'WH31U-82TAA',name:'วาล์วน้ำ',image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg',price:1090,amount:20}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).put(route).field('garage_id',obj.garage_id)
              .field('part_number',obj.part_number).field('name',obj.name).field('image_url',obj.image_url)
              .field('price',obj.price).field('amount',obj.amount)////.set('Content-Type','multipart/form-data')
              // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .set('Authorization','token').send(obj),isDebug=isDebugTest);
          }, //request6
        ],// end of functions flow here
        function(err,result) // last function
        {
          request = result; // save all requests to request variable
          done();
        }
      )
    });
    // end of before function here
    // start of test here
    it('the record should had been created when called putPartImg', (done) =>
    {
      let reqNo = 1;
      request.output[reqNo].res.status.should.be.eql(400);
      request.output[reqNo].res.body.message.should.be.eql("error, incorrect input for uploading")
      done();
    });
    it('should show that you are forbidden to use admin postPart if you are not an admin', (done) =>
    {
      let reqNo = 4;
      request.output[reqNo].res.status.should.be.eql(403);
      request.output[reqNo].res.body.message.should.be.eql("forbidden")
      done();
    })
    it('should show that you are forbidden to use admin putPartImg if you are not an admin', (done) =>
    {
      let reqNo = 5;
      request.output[reqNo].res.status.should.be.eql(403);
      request.output[reqNo].res.body.message.should.be.eql("forbidden")
      done();
    })
    it('should show that you are unauthorized to use admin putPartImg if you are using a wrong token', (done) =>
    {
      let reqNo = 6;
      request.output[reqNo].res.status.should.be.eql(400);
      request.output[reqNo].res.body.message.should.be.eql("Token invalid")
      done();
    })
  });
  describe('? "Check if mechanic putMechanicImg work":', () =>
  {
    // start of variable here
    let request={ // just add the required input variable here, and we can put the output in the output section
                  account : {username:"test",password:"12345"},
                  config: [
                            //{name:'isRegisterWorkingStatus',status:'1'}, // request0
                            //{name: 'ticketMaxSaleCount',status:'1000'}, // request1
                          ],
                  configCount: 0,
                  count: 0,
                  output: {},
                };
    // end of variable here
    // start of before function here
    before(function(done)
    {
      async.waterfall
      (// start of functions flow here
        [// arrange the argument in the same order as much as possible
        //callback(err,arg); // the command to end the function
        function(callback)
        {
          let arg = request, route = '/registerAdmin',obj=request.account;
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
          // callback(null,request)
        }, // request0
        function(arg,callback)
        {
          let route = '/login',obj=request.account;
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
        }, // request1
        function(arg,callback)
        {
          let reqNo = 2;
          let token = arg.output[1].res.body.token;
          let route = '/api/admins/mechanic';
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          jwt.verify(arg.output[reqNo-1].res.body.token, config.jwt.secret, function(err, decoded)
          {

            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
              .field('name',obj.name).field('tel',obj.tel)
              .field('rating',obj.rating).field('service_amount',obj.service_amount)////.set('Content-Type','multipart/form-data')
              .field('user_id',decoded.id)
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token).send(obj),isDebug=isDebugTest);
          })
        }, // request 2
        function(arg,callback)
        {
          testController.testGetModelMultiple(callback,arg,modelName='mechanic',isDebug=isDebugTest)
        }, // request3
        function(arg,callback)
        {
          User.update({},{user_type:1},function(err,docs)
          {
            callback(null,arg);
          })
        },
        function(arg,callback)
        {
          let route = '/login',obj=request.account;
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
          // callback(callback,arg)
        }, // request4
        function(arg,callback)
        {
          let reqNo = 5;
          token = arg.output[4].res.body.token;
          let route = '/api/mechanics/mechanicImg';
          // let arg = request;

          if(arg.output[2].res.hasOwnProperty('body')
          && arg.output[2].res.body.hasOwnProperty('obj')
          && arg.output[2].res.body.obj.hasOwnProperty('_id') )
            route += '/'+arg.output[2].res.body.obj._id;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).put(route)
            .field('file','')
            // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token),isDebug=isDebugTest);
        }, // request 5
        function(arg,callback)
        {
          User.update({},{enabled:0},function(err,docs)
          {
            callback(null,arg);
          })
        },
        function(arg,callback)
        {
          let reqNo = 6;
          // token = arg.output[2].res.body.token;
          let route = '/api/mechanics/mechanicImg';
          // let arg = request;
          if(arg.output[2].res.hasOwnProperty('body')
          && arg.output[2].res.body.hasOwnProperty('obj')
          && arg.output[2].res.body.obj.hasOwnProperty('_id') )
            route += '/'+arg.output[2].res.body.obj._id;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).put(route)
            // .field('file','');
            .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token),isDebug=isDebugTest);
        }, // request 6
        function(arg,callback)
        {
          testController.testGetModelMultiple(callback,arg,modelName='mechanic',isDebug=isDebugTest)
        }, // request7
        function(arg,callback)
        {
          let route = '/register',obj={username:"test2",password:"12345"};
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
          // callback(null,request)
        }, // request8
        function(arg,callback)
        {
          // User.update({username:"test2"},{user_type:1,enabled:1},function(err,docs)
          User.update({},{user_type:1,enabled:1},function(err,docs)
          {
            callback(null,arg);
          })
        },
        function(arg,callback)
        {
          let route = '/login',obj={username:"test2",password:"12345"};
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
        }, // request9

        function(arg,callback)
        {
          let reqNo = 10;
          // token = arg.output[2].res.body.token;
          let route = '/api/mechanics/mechanicImg';
          // let arg = request;
          // let token = arg.output[reqNo-1].res.body.token; //[reqNo-1], [1] // for debug // try to check forbidden2 but become forbidden1 somehow
          if(arg.output[2].res.hasOwnProperty('body')
          && arg.output[2].res.body.hasOwnProperty('obj')
          && arg.output[2].res.body.obj.hasOwnProperty('_id') )
            route += '/'+arg.output[2].res.body.obj._id;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          // console.log("CURRENT TOKEN = ")
          // console.log(token)
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).put(route)
            // .field('file','');
            .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token),isDebug=isDebugTest);
        }, // request 10
        function(arg,callback)
        {
          testController.testGetModelMultiple(callback,arg,modelName='user',isDebug=isDebugTest)
        }, // request11
        function(arg,callback)
        {
          testController.testGetModelMultiple(callback,arg,modelName='mechanic',isDebug=isDebugTest)
        }, // request12
        function(arg,callback)
        {
          User.remove({username:"test"}).exec(function(err,docs) // try temper with the username, but still not work
          {
            if(docs) callback(err,arg) // try to catch when they got error, but still don't know how though, so I left it as it is.
          })
          // let Model, modelList = {mechanic:'',part:'',car:'',user:'',service:'',request:'',billing:'',promotion:'',garage:''};//modelList = {client:'',user:'',code:'',mechanic:''};
          // for(var modelName in modelList)
          //   if(testController.testDropModel(function(){},modelName)==0) console.log("ERROR: can't delete database "+modelName);
          // callback(null,arg);
        },
        function(arg,callback)
        {

          // check for user before execute the route and it doesn't exist, so it should be error.
          let reqNo = 13;
          token = arg.output[4].res.body.token;
          let route = '/api/mechanics/mechanicImg';
          // let arg = request;
          if(arg.output[2].res.hasOwnProperty('body')
          && arg.output[2].res.body.hasOwnProperty('obj')
          && arg.output[2].res.body.obj.hasOwnProperty('_id') )
            route += '/'+arg.output[2].res.body.obj._id;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).put(route)
            // .field('file','');
            .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token)
            ,isDebug=isDebugTest);
        },//request13
        function(arg,callback)
        {

          // check when the token doesn't exist
          let reqNo = 14;
          token = arg.output[4].res.body.token;
          let route = '/api/mechanics/mechanicImg';
          // let arg = request;
          if(arg.output[2].res.hasOwnProperty('body')
          && arg.output[2].res.body.hasOwnProperty('obj')
          && arg.output[2].res.body.obj.hasOwnProperty('_id') )
            route += '/'+arg.output[2].res.body.obj._id;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).put(route)
            // .field('file','');
            .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            // .set('Authorization',token)
            ,isDebug=isDebugTest);
        }, //request14
        function(arg,callback)
        {

          // check for user before execute the route and it doesn't exist, so it should be error.
          let reqNo = 15;
          token = arg.output[4].res.body.token;
          let route = '/api/admins/mechanicImg';
          // let arg = request;
          if(arg.output[2].res.hasOwnProperty('body')
          && arg.output[2].res.body.hasOwnProperty('obj')
          && arg.output[2].res.body.obj.hasOwnProperty('_id') )
            route += '/'+arg.output[2].res.body.obj._id;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).put(route)
            // .field('file','');
            .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token)
            ,isDebug=isDebugTest);
        },//request15

      ],// end of functions flow here
        function(err,result) // last function
        {
          request = result; // save all requests to request variable
          done();
        }
      )
    });
    // end of before function here
    // start of test here
    it('should return error properly if you submit putMechanicImg without any image', (done) =>
    {
      let reqNo = 5;
      request.output[reqNo].res.status.should.be.eql(400);
      request.output[reqNo].res.body.message.should.be.eql("error, incorrect input for uploading")
      // console.log(request.output)
      // console.log(request.output[11].docs[0])
      // console.log(request.output[11].docs[1])
      done();
    })
    it('should not be able to use putMechanicImg if the account got banned', (done) =>
    {
      let reqNo = 6;
      request.output[reqNo].res.status.should.be.eql(403);
      request.output[reqNo].res.body.message.should.be.eql("error, your account got disabled, please contact the garage you are in or the administrator.");
      done();
    })
    it('should be able to check when use putMechanicImg if there is not a token exist', (done) =>
    {
      let reqNo = 13;
      request.output[reqNo].res.status.should.be.eql(401);
      request.output[reqNo].res.body.message.should.be.eql("unable to find your username");
      done();
    })
    it('should be able to check when use putMechanicImg if there is not a token exist', (done) =>
    {
      let reqNo = 14;
      request.output[reqNo].res.status.should.be.eql(400);
      request.output[reqNo].res.body.message.should.be.eql("The token has not found.");
      done();
    })
    it('should be able to show error when use admin putMechanicImg with garage class ', (done) =>
    {
      let reqNo = 15;
      request.output[reqNo].res.status.should.be.eql(403);
      request.output[reqNo].res.body.message.should.be.eql('forbidden')
      done();
    })
    /* // TODO: try to solve this // try to check forbidden2 but become forbidden1 somehow
    it('should not be able to use putMechanicImg if you try to change the image of the other mechanic', (done) =>
    {
      let reqNo = 10;
      request.output[reqNo].res.status.should.be.eql(403);
      request.output[reqNo].res.body.message.should.be.eql("forbidden2")
      done();
    })
    //*/
    // end of test here
  }); //*/ //end of template here
  describe('? "Check if admin putMechanicImg work":', () =>
  {
    // start of variable here
    let request={ // just add the required input variable here, and we can put the output in the output section
                  account : {username:"test",password:"12345"},
                  config: [
                            //{name:'isRegisterWorkingStatus',status:'1'}, // request0
                            //{name: 'ticketMaxSaleCount',status:'1000'}, // request1
                          ],
                  configCount: 0,
                  count: 0,
                  output: {},
                };
    // end of variable here
    // start of before function here
    before(function(done)
    {
      async.waterfall
      (// start of functions flow here
        [// arrange the argument in the same order as much as possible
        //callback(err,arg); // the command to end the function
        function(callback)
        {
          let arg = request, route = '/registerAdmin',obj=request.account;
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
          // callback(null,request)
        }, // request0
        function(arg,callback)
        {
          let route = '/login',obj=request.account;
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
        }, // request1
        function(arg,callback)
        {
          let reqNo = 2;
          let token = arg.output[1].res.body.token;
          let route = '/api/admins/mechanic';
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          jwt.verify(arg.output[reqNo-1].res.body.token, config.jwt.secret, function(err, decoded)
          {

            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
              .field('name',obj.name).field('tel',obj.tel)
              .field('rating',obj.rating).field('service_amount',obj.service_amount)////.set('Content-Type','multipart/form-data')
              .field('user_id',decoded.id)
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token).send(obj),isDebug=isDebugTest);
          })
        }, // request 2
        function(arg,callback)
        {
          testController.testGetModelMultiple(callback,arg,modelName='mechanic',isDebug=isDebugTest)
        }, // request3
        function(arg,callback)
        {
          User.update({},{user_type:3},function(err,docs)
          {
            callback(null,arg);
          })
        },
        function(arg,callback)
        {
          let route = '/login',obj=request.account;
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
          // callback(callback,arg)
        }, // request4
        function(arg,callback)
        {
          let reqNo = 5;
          token = arg.output[4].res.body.token;
          let route = '/api/admins/mechanicImg';
          // let arg = request;

          if(arg.output[2].res.hasOwnProperty('body')
          && arg.output[2].res.body.hasOwnProperty('obj')
          && arg.output[2].res.body.obj.hasOwnProperty('_id') )
            route += '/'+arg.output[2].res.body.obj._id;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).put(route)
            .field('file','')
            // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token),isDebug=isDebugTest);
        }, // request 5
        function(arg,callback)
        {
          User.update({},{enabled:0},function(err,docs)
          {
            callback(null,arg);
          })
        },
        function(arg,callback)
        {
          let reqNo = 6;
          // token = arg.output[2].res.body.token;
          let route = '/api/admins/mechanicImg';
          // let arg = request;
          if(arg.output[2].res.hasOwnProperty('body')
          && arg.output[2].res.body.hasOwnProperty('obj')
          && arg.output[2].res.body.obj.hasOwnProperty('_id') )
            route += '/'+arg.output[2].res.body.obj._id;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).put(route)
            // .field('file','');
            .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token),isDebug=isDebugTest);
        }, // request 6
        function(arg,callback)
        {
          testController.testGetModelMultiple(callback,arg,modelName='mechanic',isDebug=isDebugTest)
        }, // request7
        function(arg,callback)
        {
          let route = '/register',obj={username:"test2",password:"12345"};
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
          // callback(null,request)
        }, // request8
        function(arg,callback)
        {
          // User.update({username:"test2"},{user_type:1,enabled:1},function(err,docs)
          User.update({},{user_type:1,enabled:1},function(err,docs)
          {
            callback(null,arg);
          })
        },
        function(arg,callback)
        {
          let route = '/login',obj={username:"test2",password:"12345"};
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
        }, // request9

        function(arg,callback)
        {
          let reqNo = 10;
          // token = arg.output[2].res.body.token;
          let route = '/api/admins/mechanicImg';
          // let arg = request;
          // let token = arg.output[reqNo-1].res.body.token; //[reqNo-1], [1] // for debug // try to check forbidden2 but become forbidden1 somehow
          if(arg.output[2].res.hasOwnProperty('body')
          && arg.output[2].res.body.hasOwnProperty('obj')
          && arg.output[2].res.body.obj.hasOwnProperty('_id') )
            route += '/'+arg.output[2].res.body.obj._id;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          // console.log("CURRENT TOKEN = ")
          // console.log(token)
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).put(route)
            // .field('file','');
            .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token),isDebug=isDebugTest);
        }, // request 10
        function(arg,callback)
        {
          testController.testGetModelMultiple(callback,arg,modelName='user',isDebug=isDebugTest)
        }, // request11
        function(arg,callback)
        {
          testController.testGetModelMultiple(callback,arg,modelName='mechanic',isDebug=isDebugTest)
        }, // request12
        function(arg,callback)
        {
          User.remove({username:"test"}).exec(function(err,docs) // try temper with the username, but still not work
          {
            if(docs) callback(err,arg) // try to catch when they got error, but still don't know how though, so I left it as it is.
          })
          // let Model, modelList = {mechanic:'',part:'',car:'',user:'',service:'',request:'',billing:'',promotion:'',garage:''};//modelList = {client:'',user:'',code:'',mechanic:''};
          // for(var modelName in modelList)
          //   if(testController.testDropModel(function(){},modelName)==0) console.log("ERROR: can't delete database "+modelName);
          // callback(null,arg);
        },
        function(arg,callback)
        {

          // check for user before execute the route and it doesn't exist, so it should be error.
          let reqNo = 13;
          token = arg.output[4].res.body.token;
          let route = '/api/admins/mechanicImg';
          // let arg = request;
          if(arg.output[2].res.hasOwnProperty('body')
          && arg.output[2].res.body.hasOwnProperty('obj')
          && arg.output[2].res.body.obj.hasOwnProperty('_id') )
            route += '/'+arg.output[2].res.body.obj._id;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).put(route)
            // .field('file','');
            .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token)
            ,isDebug=isDebugTest);
        },//request13
        function(arg,callback)
        {

          // check when the token doesn't exist
          let reqNo = 14;
          token = arg.output[4].res.body.token;
          let route = '/api/admins/mechanicImg';
          // let arg = request;
          if(arg.output[2].res.hasOwnProperty('body')
          && arg.output[2].res.body.hasOwnProperty('obj')
          && arg.output[2].res.body.obj.hasOwnProperty('_id') )
            route += '/'+arg.output[2].res.body.obj._id;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).put(route)
            // .field('file','');
            .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            // .set('Authorization',token)
            ,isDebug=isDebugTest);
        }//request14

      ],// end of functions flow here
        function(err,result) // last function
        {
          request = result; // save all requests to request variable
          done();
        }
      )
    });
    // end of before function here
    // start of test here
    it('should return error properly if you submit putMechanicImg without any image', (done) =>
    {
      let reqNo = 5;
      request.output[reqNo].res.status.should.be.eql(400);
      request.output[reqNo].res.body.message.should.be.eql("error, incorrect input for uploading")
      // console.log(request.output)
      // console.log(request.output[11].docs[0])
      // console.log(request.output[11].docs[1])
      done();
    })
    it('should be able to check when use putMechanicImg if there is not a token exist', (done) =>
    {
      let reqNo = 14;
      request.output[reqNo].res.status.should.be.eql(400);
      request.output[reqNo].res.body.message.should.be.eql("The token has not found.");
      done();
    })
    /* // TODO: try to solve this // try to check forbidden2 but become forbidden1 somehow
    it('should not be able to use putMechanicImg if you try to change the image of the other mechanic', (done) =>
    {
      let reqNo = 10;
      request.output[reqNo].res.status.should.be.eql(403);
      request.output[reqNo].res.body.message.should.be.eql("forbidden2")
      done();
    })
    //*/
    // end of test here
  }); //*/ //end of template here
  describe('? "Check if mechanic classDataWithUser work":', () =>
  {
    // start of variable here
    let request={ // just add the required input variable here, and we can put the output in the output section
                  account : {username:"test",password:"12345"},
                  config: [
                            //{name:'isRegisterWorkingStatus',status:'1'}, // request0
                            //{name: 'ticketMaxSaleCount',status:'1000'}, // request1
                          ],
                  configCount: 0,
                  count: 0,
                  output: {},
                };
    // end of variable here
    // start of before function here
    before(function(done)
    {
      async.waterfall
      (// start of functions flow here
        [// arrange the argument in the same order as much as possible
        //callback(err,arg); // the command to end the function
        function(callback)
        {
          let arg = request, route = '/registerAdmin',obj=request.account;
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
          // callback(null,request)
        }, // request0
        function(arg,callback)
        {
          let route = '/login',obj=request.account;
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
        }, // request1
        function(arg,callback)
        {
          let reqNo = 2;
          let token = arg.output[1].res.body.token;
          let route = '/api/admins/mechanic';
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          jwt.verify(arg.output[reqNo-1].res.body.token, config.jwt.secret, function(err, decoded)
          {
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
              .field('name',obj.name).field('tel',obj.tel)
              .field('rating',obj.rating).field('service_amount',obj.service_amount)////.set('Content-Type','multipart/form-data')
              .field('user_id',decoded.id)
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token).send(obj),isDebug=isDebugTest);
          })
        }, // request 2
        function(arg,callback)
        {
          User.update({},{user_type:1},function(err,docs)
          {
            callback(null,arg);
          })
        },
        function(arg,callback)
        {
          let route = '/login',obj=request.account;
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
          // callback(callback,arg)
        }, // request3
        function(arg,callback)
        {
          User.remove({username:"test"}).exec(function(err,docs) // try temper with the username, but still not work
          {
            if(docs) callback(err,arg) // try to catch when they got error, but still don't know how though, so I left it as it is.
          })
        },
        function(arg,callback)
        {
          let reqNo = 4;
          token = arg.output[3].res.body.token;
          let route = '/api/mechanics/classDataWithUser/mechanic';
          route += '/'+arg.output[2].res.body.obj._id;
          // let arg = request;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).get(route)
            .set('Authorization',token).send(obj),isDebug=isDebugTest);
        }, // request 4
        function(arg,callback)
        {
          let Model, modelList = {mechanic:'',part:'',car:'',user:'',service:'',request:'',billing:'',promotion:'',garage:''};//modelList = {client:'',user:'',code:'',mechanic:''};
          for(var modelName in modelList)
            if(testController.testDropModel(function(){},modelName)==0) console.log("ERROR: can't delete database "+modelName);
          callback(null,arg)

        },
        function(arg,callback)
        {
          testController.testGetModel(callback,arg,modelName='mechanic',isDebug=isDebugTest)
        }, // request5
        function(arg,callback)
        {
          let reqNo = 6;
          token = arg.output[3].res.body.token;
          let route = '/api/mechanics/classDataWithUser/mechanic';
          route += '/'+arg.output[2].res.body.obj._id;
          // let arg = request;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).get(route)
            .set('Authorization',token).send(obj),isDebug=isDebugTest);
        }, // request 6
        function(arg,callback)
        {
          let route = '/registerAdmin',obj=request.account;
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
          // callback(null,request)
        }, // request7
        function(arg,callback)
        {
          let route = '/login',obj=request.account;
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
        }, // request8
        function(arg,callback)
        {
          let reqNo = 9;
          let route = '/api/admins/classDataWithUser/omg';
          route += '/'+arg.output[2].res.body.obj._id;
          // let arg = request;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).get(route)
            .set('Authorization',arg.output[8].res.body.token).send(obj),isDebug=isDebugTest);
        }, // request 9
        function(arg,callback)
        {
          let reqNo = 10;
          let route = '/api/admins/classDataWithUser/omg';
          // let arg = request;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).get(route)
            .set('Authorization',arg.output[8].res.body.token).send(obj),isDebug=isDebugTest);
        }, // request 10
        function(arg,callback)
        {
          let reqNo = 11;
          let route = '/api/admins/classDataWithUser/garage';
          // let arg = request;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).get(route)
            .set('Authorization',arg.output[8].res.body.token).send(obj),isDebug=isDebugTest);
        }, // request 11
        function(arg,callback)
        {
          let reqNo = 12;
          let route = '/api/admins/classDataWithUser/garage';
          route += '/123';
          // let arg = request;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).get(route)
            .set('Authorization',arg.output[8].res.body.token).send(obj),isDebug=isDebugTest);
        }, // request 12
        function(arg,callback)
        {
          let reqNo = 13;
          let route = '/api/admins/classDataWithUser/garage';
          route += '/587308c29bfdb00141eb74ca';
          // let arg = request;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).get(route)
            .set('Authorization',arg.output[8].res.body.token).send(obj),isDebug=isDebugTest);
        }, // request 13
        function(arg,callback)
        {
          let route = '/api/admins/garage';
          // let arg = request;
          let obj ={
            "name":"Toyotacare",
            "tel":"089-999-9999",
            "rating":"4",
            "address":"222/20",
            "address_lat":"13.296745",
            "address_lng":"100.178454",
            // "mechanic_id_list[]":"1",
            // "mechanic_id_list[]":"2",
            // "part_id_list[]":"3",
            // "part_id_list[]":"4",
            "mechanic_id_list":["1","2"],
            "part_id_list":["3","4"]

          }
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).post(route).field('name',obj.name)
            .field('tel',obj.tel).field('rating',obj.rating).field('address',obj.address)
            .field('address_lat',obj.address_lat).field('address_lng',obj.address_lng)////.set('Content-Type','multipart/form-data')
            .field('mechanic_id_list[]',"1")
            .field('mechanic_id_list[]',"2")
            .field('part_id_list[]',"3")
            .field('part_id_list[]',"4")
            .field('user_id',"99")
            .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',arg.output[8].res.body.token).send(obj),isDebug=isDebugTest);
        }, // request14
        function(arg,callback)
        {
          let reqNo = 15;
          let route = '/api/admins/classDataWithUser/garage';
          // route += '/587308c29bfdb00141eb74ca';
          // let arg = request;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).get(route)
            .set('Authorization',arg.output[8].res.body.token).send(obj),isDebug=isDebugTest);
        }, // request 15
        function(arg,callback)
        {
          let reqNo = 16;
          let route = '/api/admins/classDataWithUser/garage';
          route += '/'+arg.output[14].res.body.obj._id;
          // let arg = request;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).get(route)
            .set('Authorization',arg.output[8].res.body.token).send(obj),isDebug=isDebugTest);
        }, // request 16
      ],// end of functions flow here
        function(err,result) // last function
        {

          request = result; // save all requests to request variable
          done();
        }
      )
    });
    it('when called classDataWithUser without any user exist, the route should show the error properly', (done) =>
    {
      let reqNo = 4;
      request.output[reqNo].res.status.should.be.eql(500);
      request.output[reqNo].res.body.message.should.be.eql("error, unable to find user from classData")
      done();
    })
    it('when called classDataWithUser without any mechanic exist, the route should show the error properly', (done) =>
    {
      let reqNo = 6;
      request.output[reqNo].res.status.should.be.eql(403);
      request.output[reqNo].res.body.message.should.be.eql("You can't change another mechanic's profile.")
      done();
    })
    it('should show an error when use admin showClassDataWithUser with wrong type of input', (done) =>
    {
      let reqNo = 9;
      request.output[reqNo].res.status.should.be.eql(400);
      request.output[reqNo].res.body.message.should.be.eql("please input proper userType of showClassDataWithUser")
      done();
    })
    it('should show an error when use admin getClassDataWithUser with wrong type of input', (done) =>
    {
      let reqNo = 10;
      request.output[reqNo].res.status.should.be.eql(400);
      request.output[reqNo].res.body.message.should.be.eql("please input proper userType of getClassDataWithUser")
      done();
    })
    it('should show an error when use admin getClassDataWithUser to get garage but no garage exist', (done) =>
    {
      let reqNo = 11;
      request.output[reqNo].res.status.should.be.eql(404);
      request.output[reqNo].res.body.message.should.be.eql("error, unable to find classData")
      done();
    })
    it('should show an error when use admin showClassDataWithUser to get garage with wrong format id input', (done) =>
    {
      let reqNo = 12;
      request.output[reqNo].res.status.should.be.eql(500);
      request.output[reqNo].res.body.message.should.be.eql("error, something happened");
      done();
    })
    it('should show an error when use admin showClassDataWithUser to get garage that not exist', (done) =>
    {
      let reqNo = 13;
      request.output[reqNo].res.status.should.be.eql(404);
      request.output[reqNo].res.body.message.should.be.eql("error, unable to find classData")
      done();
    })
    it('should show an error when use admin getClassDataWithUser to get garage that connect with a user that not exist', (done) =>
    {
      let reqNo = 15;
      request.output[reqNo].res.status.should.be.eql(500);
      request.output[reqNo].res.body.message.should.be.eql("error, unable to find user from classData");
      done();
    })
    it('should show an error when use admin showClassDataWithUser to get garage that connect with a user that not exist', (done) =>
    {
      let reqNo = 16;
      request.output[reqNo].res.status.should.be.eql(500);
      request.output[reqNo].res.body.message.should.be.eql("error, unable to find user from classData");
      done();
    })
  });//end of template here
  describe('? "Check if garage putMechanicImg and some mechanic route errors works":', () =>
  {
    // start of variable here
    let request={ // just add the required input variable here, and we can put the output in the output section
                  account : {username:"test",password:"12345"},
                  config: [
                            //{name:'isRegisterWorkingStatus',status:'1'}, // request0
                            //{name: 'ticketMaxSaleCount',status:'1000'}, // request1
                          ],
                  configCount: 0,
                  count: 0,
                  output: {},
                };
    // end of variable here
    // start of before function here
    before(function(done)
    {
      async.waterfall
      (// start of functions flow here
        [// arrange the argument in the same order as much as possible
        //callback(err,arg); // the command to end the function
        function(callback)
        {
          let arg = request, route = '/registerAdmin',obj=request.account;
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
          // callback(null,request)
        }, // request0
        function(arg,callback)
        {
          let route = '/login',obj=request.account;
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
        }, // request1
        function(arg,callback)
        {
          let reqNo = 2;
          jwt.verify(arg.output[reqNo-1].res.body.token, config.jwt.secret, function(err, decoded)
          {
            let route = '/api/admins/garage';
            let arg = request;
            let obj ={
              "name":"Toyotacare",
              "tel":"089-999-9999",
              "rating":"4",
              "address":"222/20",
              "address_lat":"13.296745",
              "address_lng":"100.178454",
              // "mechanic_id_list[]":"1",
              // "mechanic_id_list[]":"2",
              // "part_id_list[]":"3",
              // "part_id_list[]":"4",
              "mechanic_id_list":["1","2"],
              "part_id_list":["3","4"]
            }
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('name',obj.name)
              .field('tel',obj.tel).field('rating',obj.rating).field('address',obj.address)
              .field('address_lat',obj.address_lat).field('address_lng',obj.address_lng)////.set('Content-Type','multipart/form-data')
              .field('mechanic_id_list[]',"1")
              .field('mechanic_id_list[]',"2")
              .field('part_id_list[]',"3")
              .field('part_id_list[]',"4")
              .field('user_id',decoded.id)
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .set('Authorization',arg.output[reqNo-1].res.body.token).send(obj),isDebug=isDebugTest);
            });
        }, //request 2
        function(arg,callback)
        {
          User.update({},{user_type:2},function(err,docs)
          {
            callback(null,arg);
          })
        },

        function(arg,callback)
        {
          let route = '/login',obj=request.account;
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
          // callback(callback,arg)
        }, // request3
        function(arg,callback)
        {
          let reqNo = 4;
          token = arg.output[3].res.body.token;
          let route = '/api/garages/mechanic';
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          jwt.verify(arg.output[reqNo-1].res.body.token, config.jwt.secret, function(err, decoded)
          {

            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
              .field('name',obj.name).field('tel',obj.tel)
              .field('rating',obj.rating).field('service_amount',obj.service_amount)////.set('Content-Type','multipart/form-data')
              .field('user_id',decoded.id)
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token).send(obj),isDebug=isDebugTest);
          })
        }, // request 4
        function(arg,callback)
        {
          token = arg.output[3].res.body.token;
          testController.testGetModelMultiple(callback,arg,modelName='mechanic',isDebug=isDebugTest)
        }, // request5
        function(arg,callback)
        {
          User.update({},{enabled:0},function(err,docs)
          {
            callback(null,arg);
          })
        },
        function(arg,callback)
        {
          let reqNo = 6;
          token = arg.output[3].res.body.token;
          let route = '/api/garages/mechanicImg';
          // let arg = request;

          if(arg.output[4].res.hasOwnProperty('body')
          && arg.output[4].res.body.hasOwnProperty('obj')
          && arg.output[4].res.body.obj.hasOwnProperty('_id') )
            route += '/'+arg.output[4].res.body.obj._id;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).put(route)
            // .field('file','')
            .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token),isDebug=isDebugTest);
        }, // request 6
        function(arg,callback)
        {
          User.update({},{enabled:1},function(err,docs)
          {
            callback(null,arg);
          })
        },
        function(arg,callback)
        {
          let reqNo = 7;
          token = arg.output[3].res.body.token;
          let route = '/api/garages/mechanicImg';
          // let arg = request;

          if(arg.output[4].res.hasOwnProperty('body')
          && arg.output[4].res.body.hasOwnProperty('obj')
          && arg.output[4].res.body.obj.hasOwnProperty('_id') )
            route += '/'+arg.output[4].res.body.obj._id;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).put(route)
            // .field('file','')
            // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token),isDebug=isDebugTest);
        }, // request 7
        function(arg,callback)
        {
          let reqNo = 8;
          token = arg.output[3].res.body.token;
          let route = '/api/garages/mechanic';
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          jwt.verify(arg.output[3].res.body.token, config.jwt.secret, function(err, decoded)
          {

            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
              .field('name',obj.name).field('tel',obj.tel)
              .field('rating',obj.rating).field('service_amount',obj.service_amount)////.set('Content-Type','multipart/form-data')
              .field('user_id',decoded.id)

              // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token).send(obj),isDebug=isDebugTest);
          })
        }, // request 8
        function(arg,callback)
        {
          User.update({},{enabled:0},function(err,docs)
          {
            callback(null,arg);
          })
        },
        function(arg,callback)
        {
          let reqNo = 9;
          token = arg.output[3].res.body.token;
          let route = '/api/garages/mechanic';
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          jwt.verify(arg.output[3].res.body.token, config.jwt.secret, function(err, decoded)
          {

            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
              .field('name',obj.name).field('tel',obj.tel)
              .field('rating',obj.rating).field('service_amount',obj.service_amount)////.set('Content-Type','multipart/form-data')
              .field('user_id',decoded.id)
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token).send(obj),isDebug=isDebugTest);
          })
        }, // request 9
        function(arg,callback)
        {
          Garage.remove({user_id:arg.output[3].res.body.id},function(err,docs)
          {
            callback(null,arg);
          })
        },
        function(arg,callback)
        {
          User.update({},{enabled:1},function(err,docs)
          {
            callback(null,arg);
          })
        },
        function(arg,callback)
        {
          let reqNo = 10;
          token = arg.output[3].res.body.token;
          let route = '/api/garages/mechanic';
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          jwt.verify(arg.output[3].res.body.token, config.jwt.secret, function(err, decoded)
          {

            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
              .field('name',obj.name).field('tel',obj.tel)
              .field('rating',obj.rating).field('service_amount',obj.service_amount)////.set('Content-Type','multipart/form-data')
              .field('user_id',decoded.id)
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token).send(obj),isDebug=isDebugTest);
          })
        }, // request 10
        function(arg,callback)
        {
          let reqNo = 11;
          token = arg.output[3].res.body.token;
          let route = '/api/garages/mechanicImg';
          // let arg = request;

          if(arg.output[4].res.hasOwnProperty('body')
          && arg.output[4].res.body.hasOwnProperty('obj')
          && arg.output[4].res.body.obj.hasOwnProperty('_id') )
            route += '/'+arg.output[4].res.body.obj._id;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).put(route)
            // .field('file','')
            // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token),isDebug=isDebugTest);
        }, // request 11
        function(arg,callback)
        {
          User.remove({},function(err,docs)
          {
            callback(null,arg);
          })
        },
        function(arg,callback)
        {
          let reqNo = 12;
          token = arg.output[3].res.body.token;
          let route = '/api/garages/mechanicImg';
          // let arg = request;

          if(arg.output[4].res.hasOwnProperty('body')
          && arg.output[4].res.body.hasOwnProperty('obj')
          && arg.output[4].res.body.obj.hasOwnProperty('_id') )
            route += '/'+arg.output[4].res.body.obj._id;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).put(route)
            // .field('file','')
            // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token),isDebug=isDebugTest);
        }, // request 12
        function(arg,callback)
        {
          let route = '/api/garages/mechanic';
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
        }, // request 13
        function(arg,callback)
        {
          let route = '/api/admins/mechanic';
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
        } // request 14
      ],// end of functions flow here
        function(err,result) // last function
        {
          request = result; // save all requests to request variable
          done();
        }
      )
    });
    // end of before function here
    // start of test here
    it('should not be able to use putMechanicImg if the account got banned', (done) =>
    {
      let reqNo = 6;
      request.output[reqNo].res.status.should.be.eql(403);
      request.output[reqNo].res.body.message.should.be.eql("error, your account got disabled, please contact the garage you are in or the administrator.")

      done();
    })
    it('should return error properly if you submit putMechanicImg without any image', (done) =>
    {
      let reqNo = 7;
      request.output[reqNo].res.status.should.be.eql(400);
      request.output[reqNo].res.body.message.should.be.eql("error, incorrect input for uploading")
      done();
    })
    it('check that postMechanic from garage class should not work when we does not submit a picture', (done) =>
    {
      let reqNo = 8;
      request.output[reqNo].res.status.should.be.eql(400);
      request.output[reqNo].res.body.message.should.be.eql("error, incorrect input for uploading");
      done();
    })
    it('should not be able to use the garages post mechanic route if the account got banned', (done) =>
    {
      let reqNo = 9;
      request.output[reqNo].res.status.should.be.eql(403);
      request.output[reqNo].res.body.message.should.be.eql("error, your account got disabled, please contact the garage you are in or the administrator.")
      done();
    })
    it('should response with the user that postMechanic can not find the garage', (done) =>
    {
      let reqNo = 10;
      request.output[reqNo].res.status.should.be.eql(500);
      request.output[reqNo].res.body.message.should.be.eql("please create your garage first");
      done();
    })
    it('should response with the user that putMechanicImg can not find the garage', (done) =>
    {
      let reqNo = 11;
      request.output[reqNo].res.status.should.be.eql(404);
      request.output[reqNo].res.body.message.should.be.eql("error, garage not found")
      done();
    })
    it('should response with the user that putMechanicImg can not find the user when the user not exist', (done) =>
    {
      let reqNo = 12;
      request.output[reqNo].res.status.should.be.eql(401);
      request.output[reqNo].res.body.message.should.be.eql('unable to find your username')
      done();
    })
    it('should response with the user that postMechanic can not find the user when the user not exist', (done) =>
    {
      let reqNo = 13;
      request.output[reqNo].res.status.should.be.eql(401);
      request.output[reqNo].res.body.message.should.be.eql('unable to find your username')
      done();
    })
    it('should show an error when call admin postMechanic with garage class', (done) =>
    {
      let reqNo = 14;
      request.output[reqNo].res.status.should.be.eql(403);
      request.output[reqNo].res.body.message.should.be.eql('forbidden');
      done();
    })
  }) // end of template here
  describe('? "Check if Login and token error work":', () =>
  {
    // start of variable here
    let request={ // just add the required input variable here, and we can put the output in the output section
                  account : {username:"test",password:"12345"},
                  config: [
                            //{name:'isRegisterWorkingStatus',status:'1'}, // request0
                            //{name: 'ticketMaxSaleCount',status:'1000'}, // request1
                          ],
                  configCount: 0,
                  count: 0,
                  output: {},
                };
    // end of variable here
    // start of before function here
    before(function(done)
    {
      async.waterfall
      (// start of functions flow here
        [// arrange the argument in the same order as much as possible
        //callback(err,arg); // the command to end the function
        function(callback)
        {
          let arg = request, route = '/register',obj=request.account;
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
          // callback(null,request)
        }, // request0
        function(arg,callback)
        {
          let route = '/login',obj=request.account;
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send({username:arg.account.username,password:"1234"}),isDebug=isDebugTest);
        }, // request1
        function(arg,callback)
        {
          let route = '/login',obj=request.account;
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send({username:"abc",password:"1234"}),isDebug=isDebugTest);
        }, // request2
        function(arg,callback)
        {
          let route = '/api/garages/mechanic';
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization','token'),isDebug=isDebugTest);
        }, // request3
        function(arg,callback)
        {
          let route = '/api/garages/mechanic';
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded'),isDebug=isDebugTest);
        }, // request4
        function(arg,callback)
        {
          let route = '/register',obj=request.account;
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
          // callback(null,request)
        }, // request5
        function(arg,callback)
        {
          User.update({},{user_type:2},function(err,docs)
          {
            callback(null,arg);
          })
        },
        function(arg,callback)
        {
          let route = '/login',obj=request.account;
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
          // callback(callback,arg)
        }, // request6
        function(arg,callback)
        {
          User.update({},{enabled:0},function(err,docs)
          {
            callback(null,arg);
          })
        },
        function(arg,callback)
        {
          let route = '/api/garages/mechanic';
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',arg.output[6].res.body.token),isDebug=isDebugTest);
        }, // request7
        function(arg,callback)
        {
          let route = '/login',obj=request.account;
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
          // callback(callback,arg)
        }, // request8
      ],// end of functions flow here
        function(err,result) // last function
        {
          request = result; // save all requests to request variable
          done();
        }
      )
    });
    it('should be show an error, when login with wrong password' , (done) =>
    {
      let reqNo = 1;
      request.output[reqNo].res.status.should.be.eql(401);
      reqNo = 2;
      request.output[reqNo].res.status.should.be.eql(401);
      done();
    })
    it('should show an error when use the route with wrong format token', (done) =>
    {
      let reqNo = 3;
      request.output[reqNo].res.status.should.be.eql(400);
      request.output[reqNo].res.body.message.should.be.eql('Token invalid');

      done();
    })
    it('should show an error when the token not exist', (done) =>
    {
      let reqNo = 4;
      request.output[reqNo].res.status.should.be.eql(400);
      request.output[reqNo].res.body.message.should.be.eql('The token has not found.');
      done();
    })
    it('should not be able to use the route if the account got banned', (done) =>
    {
      let reqNo = 7;
      request.output[reqNo].res.status.should.be.eql(403);
      request.output[reqNo].res.body.message.should.be.eql("error, your account got disabled, please contact the garage you are in or the administrator.");
      done();
    })
    it('should not be able to login if the account got banned', (done) =>
    {
      let reqNo = 8;
      request.output[reqNo].res.status.should.be.eql(403);
      request.output[reqNo].res.body.message.should.be.eql("error, your account got disabled, please contact the garage you are in or the administrator.");
      done();
    })
  });//end of template here
  describe('? "Check if verifyController, toolController related error work":', () =>
  {
    // start of variable here
    let request={ // just add the required input variable here, and we can put the output in the output section
                  account : {username:"test",password:"12345"},
                  config: [
                            //{name:'isRegisterWorkingStatus',status:'1'}, // request0
                            //{name: 'ticketMaxSaleCount',status:'1000'}, // request1
                          ],
                  configCount: 0,
                  count: 0,
                  output: {},
                };
    // end of variable here
    // start of before function here
    before(function(done)
    {
      async.waterfall
      (// start of functions flow here
        [// arrange the argument in the same order as much as possible
        //callback(err,arg); // the command to end the function
          function(callback)
          {
            let arg = request;
            let route = '/registerAdmin',obj=request.account;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
            // callback(null,request)
          }, // request0
          function(arg,callback)
          {
            let route = '/login',obj=request.account;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
            // callback(callback,arg)
          }, // request1
          function(arg,callback)
          {
            let route = '/api/users/user';
            route += '/'+arg.output[0].res.body._id;
            let obj = {garage_id:'zJELcGlf1gsjbcqy',part_number:'WH31U-82TAA',name:'วาล์วน้ำ',image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg',price:1090,amount:20}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).put(route)
              // .field('garage_id',obj.garage_id)
              // .field('part_number',obj.part_number).field('name',obj.name).field('image_url',obj.image_url)
              // .field('price',obj.price).field('amount',obj.amount)////.set('Content-Type','multipart/form-data')
              // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .set('Authorization','token').send(obj),isDebug=isDebugTest);
          }, //request2
          function(arg,callback)
          {
            let route = '/api/users/user';
            route += '/'+arg.output[0].res.body._id;
            let obj = {garage_id:'zJELcGlf1gsjbcqy',part_number:'WH31U-82TAA',name:'วาล์วน้ำ',image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg',price:1090,amount:20}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).put(route)
              // .field('garage_id',obj.garage_id)
              // .field('part_number',obj.part_number).field('name',obj.name).field('image_url',obj.image_url)
              // .field('price',obj.price).field('amount',obj.amount)////.set('Content-Type','multipart/form-data')
              // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .set('Authorization',arg.output[1].res.body.token).send(obj),isDebug=isDebugTest);
          }, //request3
          function(arg,callback)
          {
            let route = '/api/mechanics/user';
            route += '/'+arg.output[0].res.body._id;
            let obj = {garage_id:'zJELcGlf1gsjbcqy',part_number:'WH31U-82TAA',name:'วาล์วน้ำ',image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg',price:1090,amount:20}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).get(route)
              // .field('garage_id',obj.garage_id)
              // .field('part_number',obj.part_number).field('name',obj.name).field('image_url',obj.image_url)
              // .field('price',obj.price).field('amount',obj.amount)////.set('Content-Type','multipart/form-data')
              // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .set('Authorization',arg.output[1].res.body.token).send(obj),isDebug=isDebugTest);
          }, //request4
          function(arg,callback)
          {
            let route = '/api/mechanics/user';
            route += '/'+arg.output[0].res.body._id;
            let obj = {garage_id:'zJELcGlf1gsjbcqy',part_number:'WH31U-82TAA',name:'วาล์วน้ำ',image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg',price:1090,amount:20}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).put(route)
              // .field('garage_id',obj.garage_id)
              // .field('part_number',obj.part_number).field('name',obj.name).field('image_url',obj.image_url)
              // .field('price',obj.price).field('amount',obj.amount)////.set('Content-Type','multipart/form-data')
              // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .set('Authorization',arg.output[1].res.body.token).send(obj),isDebug=isDebugTest);
          }, //request5
          function(arg,callback)
          {
            let route = '/api/garages/user';
            route += '/'+arg.output[0].res.body._id;
            let obj = {garage_id:'zJELcGlf1gsjbcqy',part_number:'WH31U-82TAA',name:'วาล์วน้ำ',image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg',price:1090,amount:20}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).get(route)
              // .field('garage_id',obj.garage_id)
              // .field('part_number',obj.part_number).field('name',obj.name).field('image_url',obj.image_url)
              // .field('price',obj.price).field('amount',obj.amount)////.set('Content-Type','multipart/form-data')
              // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .set('Authorization',arg.output[1].res.body.token).send(obj),isDebug=isDebugTest);
          }, //request6
          function(arg,callback)
          {
            let route = '/api/garages/user';
            route += '/'+arg.output[0].res.body._id;
            let obj = {garage_id:'zJELcGlf1gsjbcqy',part_number:'WH31U-82TAA',name:'วาล์วน้ำ',image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg',price:1090,amount:20}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).get(route)
              // .field('garage_id',obj.garage_id)
              // .field('part_number',obj.part_number).field('name',obj.name).field('image_url',obj.image_url)
              // .field('price',obj.price).field('amount',obj.amount)////.set('Content-Type','multipart/form-data')
              // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .set('Authorization',arg.output[1].res.body.token).send(obj),isDebug=isDebugTest);
          }, //request7
          function(arg,callback)
          {
            let route = '/api/admins/garage';
            // route += '/'+arg.output[0].res.body._id;
            let obj = {garage_id:'zJELcGlf1gsjbcqy',part_number:'WH31U-82TAA',name:'วาล์วน้ำ',image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg',price:1090,amount:20}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).get(route)
              // .field('garage_id',obj.garage_id)
              // .field('part_number',obj.part_number).field('name',obj.name).field('image_url',obj.image_url)
              // .field('price',obj.price).field('amount',obj.amount)////.set('Content-Type','multipart/form-data')
              // .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .set('Authorization',arg.output[1].res.body.token).send(obj),isDebug=isDebugTest);
          }, //request8
        ],// end of functions flow here
        function(err,result) // last function
        {
          request = result; // save all requests to request variable
          done();
        }
      )
    });
    // end of before function here
    // start of test here
    it('should not be able to use putUser with incorrect token', (done) =>
    {
      let reqNo = 2;
      request.output[reqNo].res.status.should.be.eql(400);
      request.output[reqNo].res.body.message.should.be.eql("Token invalid")
      done();
    })
    it('should not be able to use user class putUser with higher class than a user', (done) =>
    {
      let reqNo = 3;
      request.output[reqNo].res.status.should.be.eql(403);
      request.output[reqNo].res.body.message.should.be.eql("forbidden")
      done();
    })
    it('should not be able to use mechanic class showUser with higher class than a mechanic', (done) =>
    {
      let reqNo = 4;
      request.output[reqNo].res.status.should.be.eql(403);
      request.output[reqNo].res.body.message.should.be.eql("You are not a mechanic, so you can't use this function.")
      done();
    })
    it('should not be able to use mechanic class putUser with higher class than a mechanic', (done) =>
    {
      let reqNo = 5;
      request.output[reqNo].res.status.should.be.eql(403);
      request.output[reqNo].res.body.message.should.be.eql("forbidden")
      done();
    })
    it('should not be able to use garage class showUser with higher class than a garage', (done) =>
    {
      let reqNo = 6;
      request.output[reqNo].res.status.should.be.eql(403);
      request.output[reqNo].res.body.message.should.be.eql("forbidden")
      done();
    })
    it('should not be able to use garage class putUser with higher class than a garage', (done) =>
    {
      let reqNo = 7;
      request.output[reqNo].res.status.should.be.eql(403);
      request.output[reqNo].res.body.message.should.be.eql("forbidden")
      done();
    })
    it('should show an error properly when use admin getGarage that use toolController.showModel and no data exist', (done) =>
    {
      let reqNo = 8;
      request.output[reqNo].res.status.should.be.eql(404);
      request.output[reqNo].res.body.message.should.be.eql("error, data not found")
      done();
    })

  });//end of template here
  describe('? getMechanicInGarage error test', () =>
  {
    // start of variable here
    let request={ // just add the required input variable here, and we can put the output in the output section
                  account : {username:"test",password:"12345"},
                  config: [
                            {name:'isRegisterWorkingStatus',status:'1'}, // request0
                            {name: 'ticketMaxSaleCount',status:'1000'}, // request1
                          ],
                  configCount: 0,
                  count: 0,
                  output: {},
                  payMethod: "omise"
                };
    // end of variable here
    // start of before function here
    before(function(done)
    {
      async.waterfall
      (// start of functions flow here
        [// arrange the argument in the same order as much as possible
        //callback(err,arg); // the command to end the function
        function(callback)
        {
          let arg = request, route = '/registerAdmin',obj=request.account;
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
          // callback(null,request)
        }, // request0
        function(arg,callback)
        {
          let route = '/login',obj=request.account;
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
        }, // request1
        function(arg,callback)
        {
          let reqNo = 2;
          jwt.verify(arg.output[reqNo-1].res.body.token, config.jwt.secret, function(err, decoded)
          {
            let route = '/api/admins/garage';
            let arg = request;
            let obj ={
              "name":"Toyotacare",
              "tel":"089-999-9999",
              "rating":"4",
              "address":"222/20",
              "address_lat":"13.296745",
              "address_lng":"100.178454",
              // "mechanic_id_list[]":"1",
              // "mechanic_id_list[]":"2",
              // "part_id_list[]":"3",
              // "part_id_list[]":"4",
              "mechanic_id_list":["1","2"],
              "part_id_list":["3","4"]
            }
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('name',obj.name)
              .field('tel',obj.tel).field('rating',obj.rating).field('address',obj.address)
              .field('address_lat',obj.address_lat).field('address_lng',obj.address_lng)////.set('Content-Type','multipart/form-data')
              .field('mechanic_id_list[]',"1")
              .field('mechanic_id_list[]',"2")
              .field('part_id_list[]',"3")
              .field('part_id_list[]',"4")
              .field('user_id',decoded.id)
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .set('Authorization',arg.output[reqNo-1].res.body.token).send(obj),isDebug=isDebugTest);
            });
        }, //request 2
        function(arg,callback)
        {
          User.update({},{user_type:2},function(err,docs)
          {
            callback(null,arg);
          })
        },

        function(arg,callback)
        {
          let route = '/login',obj=request.account;
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
          // callback(callback,arg)
        }, // request3
        function(arg,callback)
        {
          let reqNo = 4;
          token = arg.output[3].res.body.token;
          let route = '/api/garages/mechanic';
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:4,service_amount:3}
          jwt.verify(arg.output[reqNo-1].res.body.token, config.jwt.secret, function(err, decoded)
          {

            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
              .field('name',obj.name).field('tel',obj.tel)
              .field('rating',obj.rating).field('service_amount',obj.service_amount)////.set('Content-Type','multipart/form-data')
              .field('user_id',decoded.id)
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token).send(obj),isDebug=isDebugTest);
          })
        }, // request 4
        function(arg,callback)
        {

          testController.testGetModelMultiple(callback,arg,modelName='mechanic',isDebug=isDebugTest)
        }, // request5
        function(arg,callback)
        {
          User.remove({username:"test"}).exec(function(err,docs) // try temper with the username, but still not work
          {
            if(docs) callback(err,arg) // try to catch when they got error, but still don't know how though, so I left it as it is.
          })
        },
        function(arg,callback)
        {
          token = arg.output[1].res.body.token;
          let route = '/api/admins/mechanicInGarage'
          route += '/'+arg.output[2].res.body.obj.user_id
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).get(route).set('Authorization',token),isDebug=isDebugTest);
        }, // request6
        function(arg,callback)
        {
          testController.testGetModelMultiple(callback,arg,modelName='mechanic',isDebug=isDebugTest)
        }, // request7
        function(arg,callback)
        {
          testController.testGetModelMultiple(callback,arg,modelName='user',isDebug=isDebugTest)
        }, // request8

        ],// end of functions flow here
        function(err,result) // last function
        {
          request = result; // save all requests to request variable
          done();
        }
      )
    });
    // end of before function here
    // start of test here
    it('should show an error properly from admin getMechanicInGarage if there is no user to be connected to the mechanic', (done) =>
    {
      let reqNo = 6;
      request.output[reqNo].res.status.should.be.eql(404);
      request.output[reqNo].res.body.message.should.be.eql("error, unable to find user from mechanic");
      done();
    });
    // end of test here
  }); // end of template
});
