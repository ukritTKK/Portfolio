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
let moment = require('moment-timezone')
let token = '';
let Service = require('../models/service')
let testController = require('../controllers/testController')
chai.use(chaiHttp);
// start of parent block
describe('Dashboard', () =>
{
  before((done) =>
  {
    let Model, modelList = {mechanic:'',part:'',car:'',user:'',service:'',request:'',billing:'',promotion:''};//modelList = {client:'',user:'',code:'',mechanic:''};
    for(var modelName in modelList)
      if(testController.testDropModel(function(){},modelName)==0) console.log("ERROR: can't delete database "+modelName);
    done();
  });
  beforeEach((done) =>
  {
    let Model, modelList = {mechanic:'',part:'',car:'',user:'',service:'',request:'',billing:'',promotion:''};//modelList = {client:'',user:'',code:'',mechanic:''};
    for(var modelName in modelList)
      if(testController.testDropModel(function(){},modelName)==0) console.log("ERROR: can't delete database "+modelName);
    done();
  });
  //start template here
  describe('? Check if Dashboard work properly: ', () =>
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
          function(arg,callback)
          {
            let reqNo = 2;
            token = arg.output[reqNo-1].res.body.token;
            let route = '/api/admins/part';
            let obj = {garage_id:'581c0b75ec942200ca236ef7',part_number:'WH31U-82TAA',name:'วาล์วน้ำ',image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg',price:1090,amount:20}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
              .field('part_number',obj.part_number).field('name',obj.name).field('image_url',obj.image_url)
              .field('price',obj.price).field('amount',obj.amount)////.set('Content-Type','multipart/form-data')
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request2
          function(arg,callback)
          {
            let route = '/api/admins/part';
            let obj = {garage_id:'581c0b75ec942200ca236ef7',part_number:'WH31U-82TAA',name:'วาล์วน้ำ',image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg',price:1090,amount:20}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
              .field('part_number',obj.part_number).field('name',obj.name).field('image_url',obj.image_url)
              .field('price',obj.price).field('amount',obj.amount)////.set('Content-Type','multipart/form-data')
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request3
          function(arg,callback)
          {
            let route = '/api/admins/part';
            let obj = {garage_id:'581c0b75ec942200ca236ef7',part_number:'WH31U-82TAA',name:'วาล์วน้ำ',image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg',price:1090,amount:20}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
              .field('part_number',obj.part_number).field('name',obj.name).field('image_url',obj.image_url)
              .field('price',obj.price).field('amount',obj.amount)////.set('Content-Type','multipart/form-data')
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request4
          function(arg,callback)
          {
            let reqNo = 5;
            // console.log('arg.output = ');
            // console.log(arg.output)

            let route = '/api/admins/service';
            // console.log('abc token = '+token)
            // let arg = request;
            let year = 2016, month = 10, date = 20;
            // let date1 = new Date(year,month,date,00,00);
            // let date2 = new Date(year,month,date+2,00,00);
            // let date3 = new Date(year,month,date+3,00,00);
            let date1 = date2 = date3 = "2016-06-03T10:34"
            let obj ={
                        user_id:"581c0b75ec942200ca236ef7",
                        mechanic_id:"581c0b75ec942200ca236ef7",
                        promotion_id:"581c0b75ec942200ca236ef7",
                        car_id:"581c0b75ec942200ca236ef7",
                        car_miles:90,
                        car_used_years:386,
                        // part_id_list:["8","9"],
                        part_id_list:[arg.output[2].res.body.obj._id,arg.output[3].res.body.obj._id],
                        repair_list:["change wheel","change body"],
                        status_list:['{"status":"received","date":"'+date1+'"}','{"status":"fixing","date":"'+date2+'"}'],
                        // status_list:[["received",date1],["fixing",date2]],
                        // status_list_date:[[date1],[date2]],
                        price:125890,
                        location_lat:13.296745,
                        location_lng:100.178454,
                        service_date:date3,
                        corrected_price:125000
            }
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request5
          function(arg,callback)
          {
            let reqNo = 6;
            // token = arg.output[reqNo-1].res.body.token;
            let route = '/api/admins/service';
            // let arg = request;
            let year = 2016, month = 10, date = 20;
            // let date1 = new Date(year,month,date,00,00);
            // let date2 = new Date(year,month,date+2,00,00);
            // let date3 = new Date(year,month,date+3,00,00);
            let date1 = date2 = date3 = "2016-06-03T10:34"
            let obj ={
                        user_id:"581c0b75ec942200ca236ef7",
                        mechanic_id:"581c0b75ec942200ca236ef7",
                        promotion_id:"581c0b75ec942200ca236ef7",
                        car_id:"581c0b75ec942200ca236ef7",
                        car_miles:90,
                        car_used_years:386,
                        // part_id_list:["8","9","10"],
                        part_id_list:[arg.output[2].res.body.obj._id,arg.output[3].res.body.obj._id,arg.output[4].res.body.obj._id],
                        repair_list:["change wheel","change body"],
                        status_list:['{"status":"received","date":"'+date1+'"}','{"status":"fixing","date":"'+date2+'"}'],
                        // status_list:[["received",date1],["fixing",date2]],
                        // status_list_date:[[date1],[date2]],
                        price:125890,
                        location_lat:13.296745,
                        location_lng:100.178454,
                        service_date:date3,
                        corrected_price:125000
            }
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request6
          function(arg,callback)
          {
            let reqNo  = 7;
            // token = arg.output[reqNo-1].res.body.token;
            let route = '/api/admins/service';
            // let arg = request;
            let year = 2016, month = 10, date = 20;
            // let date1 = new Date(year,month,date,00,00);
            // let date2 = new Date(year,month,date+2,00,00);
            // let date3 = new Date(year,month,date+3,00,00);
            let date1 = date2 = date3 = "2016-06-03T10:34"
            let obj ={
                        user_id:"581c0b75ec942200ca236ef7",
                        mechanic_id:"581c0b75ec942200ca236ef7",
                        promotion_id:"581c0b75ec942200ca236ef7",
                        car_id:"581c0b75ec942200ca236ef7",
                        car_miles:90,
                        car_used_years:386,
                        // part_id_list:["8"],
                        part_id_list:[arg.output[2].res.body.obj._id],
                        repair_list:["change wheel","change body"],
                        status_list:['{"status":"received","date":"'+date1+'"}','{"status":"fixing","date":"'+date2+'"}'],
                        // status_list:[["received",date1],["fixing",date2]],
                        // status_list_date:[[date1],[date2]],
                        price:125890,
                        location_lat:13.296745,
                        location_lng:100.178454,
                        service_date:date3,
                        corrected_price:125000
            }
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request7
          function(arg,callback)
          {
            let route = '/api/admins/getPartPerWeek',obj=request.account;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
            // callback(callback,arg)
          }, // request8
          function(arg,callback)
          {
            let route = '/api/admins/getMechActPerWeek',obj=request.account;
            console.log("debug arg = ")
            console.log(arg.output)
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
            // callback(callback,arg)
          }, // request9
          function(arg,callback)
          {
            let reqNo = 10;
            console.log("HI HI HI asdjlkfasldf")
            // console.log('arg.output = ')
            // console.log(arg.output)
            Service.findOneAndUpdate({_id:arg.output[4].res.body._id},{createdAt:new Date(moment().subtract(7,'days').tz("Asia/Bangkok"))},{upsert:true},function(err,docs)
            {
              arg.output[arg.count] = {err:err,docs:docs}
              arg.count+=1;
              // console.log('test1')
              callback(null,arg);
            })

          }, // request10
          function(arg,callback)
          {
            let route = '/api/admins/getPartPerWeek',obj=request.account;
            // console.log('test2')
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
            // callback(callback,arg)
          }, // request11
          function(arg,callback)
          {
            let route = '/api/admins/getMechActPerWeek',obj=request.account;
            // console.log('test2')
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
            // callback(callback,arg)
          } // request12

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
    it('getPartPerWeek check in the same week work', (done) =>
    {
      let reqNo = 8;
      console.log("debug dashboard output = ")
      console.log(request.output)
      request.output[reqNo].res.body[0].number.should.be.eql(3)
      reqNo = 11;
      request.output[reqNo].res.body[0].number.should.be.eql(2)


      done();
    });
    it('getMechActPerWeek in the same week should work', (done) =>
    {
      reqNo = 9;
      request.output[reqNo].res.body[0].number.should.be.eql(2)
      reqNo = 12;
      request.output[reqNo].res.body[0].number.should.be.eql(1)
      done();
    });
    // end of test here
  }); //*/ //end of template here
});
