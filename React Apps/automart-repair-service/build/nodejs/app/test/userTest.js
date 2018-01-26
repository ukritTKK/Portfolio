//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let config = require(__dirname+'/../configs/env');
let testController = require(__dirname+'/../controllers/testController.js');
var jwt = require('jsonwebtoken');
// please add token first before doing this test...
let token;
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRldiIsInR5cGUiOjAsImlhdCI6MTQ3Njg1MzcyMywiZXhwIjoxNDc2ODYwOTIzfQ.BC06ghxbzXs_xIyPHtCSYQXxiJKZpwerFOWjBloHbRQ'
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = config.test_protocol+config.test_host+":"+config.test_port//require('../app');
let should = chai.should();
let async = require('async');
let User = require('../models/user')

let isDebugTest = false;
chai.use(chaiHttp);
// start of parent block
describe('User CRUD permission test', () =>
{
  beforeEach((done) =>
  {
    let Model, modelList = {mechanic:'',part:'',car:'',user:'',service:'',request:'',billing:'',promotion:'',garage:''};//modelList = {client:'',user:'',code:'',mechanic:''};
    for(var modelName in modelList)
      if(testController.testDropModel(function(){},modelName)==0) console.log("ERROR: can't delete database "+modelName);
    done();
  });
  //start template here
  describe('? "Check if Mechanic CRUD work":', () =>
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
          // callback(callback,arg)
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
          User.update({},{user_type:0},function(err,docs)
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
        // function(arg,callback)
        // {
        //   let route = '/api/users/mechanic';
        //   //let arg = request;
        //   let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
        //   let reqNo = 2; token = arg.output[reqNo-1].res.body.token;
        //   testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
        // }, // request2
        function(arg,callback)
        {
          let reqNo = 4;
          let token = arg.output[1].res.body.token;
          let route = '/api/admins/mechanic';
          // let arg = request;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
            .field('name',obj.name).field('tel',obj.tel)
            .field('rating',obj.rating).field('service_amount',obj.service_amount)////.set('Content-Type','multipart/form-data')
            .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token).send(obj),isDebug=isDebugTest);
        }, // request 4
        function(arg,callback)
        {
          let reqNo = 5;
          let token = arg.output[3].res.body.token;
          let route = '/api/users/mechanic';
          // let arg = request;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
            .field('name',obj.name).field('tel',obj.tel)
            .field('rating',obj.rating).field('service_amount',obj.service_amount)////.set('Content-Type','multipart/form-data')
            .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token).send(obj),isDebug=isDebugTest);
        }, // request 5
          /*
          function(arg,callback){
            callback(callback,arg)
          } // request...//*/
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='mechanic',isDebug=isDebugTest)
          }, // request6
          function(arg,callback)
          {
            let route = '/api/users/mechanic';
            // route += '/'+arg.output[4].res.body.obj._id;

            //let arg = request;

            let reqNo = 6; token = arg.output[3].res.body.token;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request7
          function(arg,callback)
          {
            let route = '/api/users/mechanic';
            if(arg.output[7].res.hasOwnProperty('body')
            && arg.output[7].res.body.hasOwnProperty(0)
            && arg.output[7].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[7].res.body[0]._id;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 8
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='mechanic',isDebug=isDebugTest)
          }, // request9
          function(arg,callback)
          {
            let route = '/api/users/mechanic',reqNo = 10;
            if(arg.output[7].res.hasOwnProperty('body')
            && arg.output[7].res.body.hasOwnProperty(0)
            && arg.output[7].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[7].res.body[0]._id;
            // console.log('arg.output = ')
            // console.log(arg.output)
            let obj = {name:'thanawat wong',tel:'081-929-9999'};
            // let obj = {id:arg.output[4].res.body[0]._id,name:'thanawat wong',tel:'081-929-9999'};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).put(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 10
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='mechanic',isDebug=isDebugTest)
          }, // request11
          function(arg,callback)
          {
            let route = '/api/users/mechanic',reqNo = 12;
            if(arg.output[7].res.hasOwnProperty('body')
            && arg.output[7].res.body.hasOwnProperty(0)
            && arg.output[7].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[7].res.body[0]._id;
            let obj = {name:'thanawat wong',tel:'081-929-9999'};
            // let obj = {id:arg.output[4].res.body[0]._id,name:'thanawat wong',tel:'081-929-9999'};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).delete(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 12
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='mechanic',isDebug=isDebugTest)
          }, // request13
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='garage',isDebug=isDebugTest)
          }, // request14

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
    it('when called postMechanic, the route should not exist', (done) =>
    {
      let reqNo = 5;
      request.output[reqNo].res.status.should.be.eql(404);
      done();
    })
    it('the record should had been shown when called showMechanic', (done) =>
    {
      let reqNo = 8;
      // console.log('newnewnew request.output = ')
      // console.log(request.output[reqNo])
      let obj = request.output[reqNo].res.body.obj;
      // console.log('----------------------------------')
      // console.log(obj);
      // console.log(request.output[reqNo+1].docs)
      for(var argName in obj)
      {
        //console.log('argName = '+argName)
        if(argName.length>4 && argName!='updatedAt' && argName!='createdAt')
          obj[argName].should.be.eql(request.output[reqNo+2].docs[argName])
        obj.createdAt.should.be.eql(request.output[reqNo+2].docs.createdAt.toISOString())
        obj.updatedAt.should.be.eql(request.output[reqNo+2].docs.updatedAt.toISOString())
      }
      done();
    })
    it('the record should had been shown when called getMechanic', (done) =>
    {
      let reqNo = 7;
      let obj = request.output[reqNo].res.body[0];
      // console.log('----------------------------------')
      // console.log(obj);
      // console.log(request.output[reqNo+1].docs)
      for(var argName in obj)
      {
        //console.log('argName = '+argName)
        if(argName.length>4 && argName!='updatedAt' && argName!='createdAt')
          obj[argName].should.be.eql(request.output[reqNo+2].docs[argName])
        obj.createdAt.should.be.eql(request.output[reqNo+2].docs.createdAt.toISOString())
        obj.updatedAt.should.be.eql(request.output[reqNo+2].docs.updatedAt.toISOString())
      }
      done();
    })
    it('the record should not had been changed when called putMechanic', (done) =>
    {
      let reqNo = 11;
      request.output[reqNo].docs.name.should.be.eql('thanawat mangnee') //wong'), in case you want it to change
      // should.equal(null,request.output[reqNo].docs)
      //request.output[6].res.body.message.should.be.eql("you passed the test");
      done();
    });
    it('the record should not had been removed when called deleteMechanic', (done)=>
    {
      let reqNo = 12;
      // request.output[reqNo].res.body.ok.should.be.eql(1);
      // request.output[reqNo].res.body.n.should.be.eql(1);
      // request.output[reqNo].res.body.message.should.be.eql("You are not the admin, so you can\'t use this function.");
      request.output[reqNo].res.status.should.be.eql(404);
      reqNo = 13;
      should.not.equal(null,request.output[reqNo].docs);
      done();
    })
    // end of test here
  }); //*/ //end of template here
  describe('? "Check if Part CRUD work":', () =>
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
        //   let route = '/api/users/part';
        //   let arg = request;
        //   let obj = {garage_id:'zJELcGlf1gsjbcqy',part_number:'WH31U-82TAA',name:'วาล์วน้ำ',image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg',price:1090,amount:20}
        //   testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
        // }, // request0
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
          User.update({},{user_type:0},function(err,docs)
          {
            callback(null,arg);
          })
        },
        function(arg,callback)
        {
          let route = '/login',obj=request.account;
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
          // callback(callback,arg)
        }, // request2
          function(arg,callback)
          {
            let reqNo = 3;
            let route = '/api/admins/part';
            // let arg = request;
            let token = arg.output[1].res.body.token;
            let obj = {garage_id:'zJELcGlf1gsjbcqy',part_number:'WH31U-82TAA',name:'วาล์วน้ำ',image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg',price:1090,amount:20}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
              .field('part_number',obj.part_number).field('name',obj.name).field('image_url',obj.image_url)
              .field('price',obj.price).field('amount',obj.amount)////.set('Content-Type','multipart/form-data')
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request3
          function(arg,callback)
          {
            let reqNo = 4;
            let route = '/api/users/part';
            // let arg = request;
            token = arg.output[2].res.body.token;
            let obj = {garage_id:'zJELcGlf1gsjbcqy',part_number:'WH31U-82TAA',name:'วาล์วน้ำ',image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg',price:1090,amount:20}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
              .field('part_number',obj.part_number).field('name',obj.name).field('image_url',obj.image_url)
              .field('price',obj.price).field('amount',obj.amount)////.set('Content-Type','multipart/form-data')
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request4
          /*
          function(arg,callback){
            callback(callback,arg)
          } // request...//*/
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='part',isDebug=isDebugTest)
          }, // request5
          function(arg,callback)
          {
            let route = '/api/users/part';
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request6
          function(arg,callback)
          {
            let route = '/api/users/part';
            if(arg.output[6].res.hasOwnProperty('body')
            && arg.output[6].res.body.hasOwnProperty(0)
            && arg.output[6].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[6].res.body[0]._id;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request7
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='part',isDebug=isDebugTest)
          }, // request8
          function(arg,callback)
          {
            let route = '/api/users/part',reqNo = 9;
            // console.log('arg.output = ')
            // console.log(arg.output)
            if(arg.output[6].res.hasOwnProperty('body')
            && arg.output[6].res.body.hasOwnProperty(0)
            && arg.output[6].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[6].res.body[0]._id;
            // console.log('res.body')
            // console.log(arg.output[2].res.body);
            let obj = {part_number:'WH31U-82TAA-NEW'};
            // let obj = {id:arg.output[2].res.body[0]._id,part_number:'WH31U-82TAA-NEW'};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).put(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 9
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='part',isDebug=isDebugTest)
          }, // request10
          function(arg,callback)
          {
            let route = '/api/users/part',reqNo = 11;
            if(arg.output[6].res.hasOwnProperty('body')
            && arg.output[6].res.body.hasOwnProperty(0)
            && arg.output[6].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[6].res.body[0]._id;
            let obj = {part_number:'WH31U-82TAA-NEW'};
            // let obj = {id:arg.output[2].res.body[0]._id,part_number:'WH31U-82TAA-NEW'};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).delete(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request11
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='part',isDebug=isDebugTest)
          }, // request12

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
    it('when called postPart, the route should not exist', (done) =>
    {
      let reqNo = 4;
      request.output[reqNo].res.status.should.be.eql(404);
      done();
    })
    it('the record should had been shown when called getPart', (done) =>
    {
      let reqNo = 6;
      let obj = request.output[reqNo].res.body[0];
      // console.log('----------------------------------')
      // console.log(obj);
      // console.log(request.output[reqNo+1].docs)
      for(var argName in obj)
      {
        //console.log('argName = '+argName)
        if(argName.length>4 && argName!='updatedAt' && argName!='createdAt')
          obj[argName].should.be.eql(request.output[reqNo+2].docs[argName])
        obj.createdAt.should.be.eql(request.output[reqNo+2].docs.createdAt.toISOString())
        obj.updatedAt.should.be.eql(request.output[reqNo+2].docs.updatedAt.toISOString())
      }
      done();
    })
    it('the record should had been shown when called showPart', (done) =>
    {
      let reqNo = 7;
      let obj = request.output[reqNo].res.body;
      // console.log('----------------------------------')
      // console.log(obj);
      // console.log(request.output[reqNo+1].docs)
      for(var argName in obj)
      {
        //console.log('argName = '+argName)
        if(argName.length>4 && argName!='updatedAt' && argName!='createdAt')
          obj[argName].should.be.eql(request.output[reqNo+1].docs[argName])
        obj.createdAt.should.be.eql(request.output[reqNo+1].docs.createdAt.toISOString())
        obj.updatedAt.should.be.eql(request.output[reqNo+1].docs.updatedAt.toISOString())
      }
      done();
    })
    it('the record should had been changed when called putPart', (done) =>
    {
      //console.log('here we go')
      //console.log(request.output)
      let reqNo = 10;
      request.output[reqNo].docs.part_number.should.be.eql('WH31U-82TAA')//-NEW'), in case you want to check if it changes
      // should.equal(null,request.output[reqNo].docs);
      //request.output[6].res.body.message.should.be.eql("you passed the test");
      done();
    });
    it('the record should not had been removed when called deletePart', (done)=>
    {
      let reqNo = 11;
      // request.output[reqNo].res.body.ok.should.be.eql(1);
      // request.output[reqNo].res.body.n.should.be.eql(1);
      request.output[reqNo].res.status.should.be.eql(404);
      // request.output[reqNo].res.status.should.be.eql(403);
      reqNo = 12;
      should.not.equal(null,request.output[reqNo].docs);
      done();
    })
    // end of test here
  }); //*/ //end of template here
  describe('? "Check if Car CRUD work":', () =>
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
        }, // request1
        function(arg,callback)
        {
          token = arg.output[1].res.body.token;
          let route = '/api/admins/car';
          let obj = {car_model:'City',car_brand:'Honda',car_year:2012}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).post(route).field('car_model',obj.car_model)
            .field('car_brand',obj.car_brand).field('car_year',obj.car_year)
            .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token).send(obj),isDebug=isDebugTest);
          //testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
        }, // request2
          /*
          function(arg,callback){
            callback(callback,arg)
          } // request...//*/
          function(arg,callback)
          {
            User.update({},{user_type:0},function(err,docs)
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
            token = arg.output[3].res.body.token;
            testController.testGetModel(callback,arg,modelName='car',isDebug=isDebugTest)
          }, // request4
          function(arg,callback)
          {
            let route = '/api/users/car';
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 5
          function(arg,callback)
          {
            let route = '/api/users/car';
            if(arg.output[5].res.hasOwnProperty('body')
            && arg.output[5].res.body.hasOwnProperty(0)
            && arg.output[5].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[5].res.body[0]._id;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 6
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='car',isDebug=isDebugTest)
          }, // request7
          function(arg,callback)
          {
            let route = '/api/users/car',reqNo = 4;
            route += '/'+arg.output[5].res.body[0]._id;
            let obj = {car_model:'Jazz'};
            // let obj = {id:arg.output[2].res.body[0]._id,car_model:'Jazz'};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).put(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 8
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='car',isDebug=isDebugTest)
          }, // request9
          function(arg,callback)
          {
            let route = '/api/users/car',reqNo = 10;
            route += '/'+arg.output[5].res.body[0]._id;
            // let obj = {id:arg.output[4].res.body[0]._id};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).delete(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 10
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='car',isDebug=isDebugTest)
          }, // request11
          function(arg,callback)
          {
            let route = '/api/users/car';
            let obj = {car_model:'City',car_brand:'Honda',car_year:2012}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('car_model',obj.car_model)
              .field('car_brand',obj.car_brand).field('car_year',obj.car_year)
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .set('Authorization',token).send(obj),isDebug=isDebugTest);
            //testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request12

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
    it('the record should had been created when called postCar', (done) =>
    {
      let reqNo = 12;
      request.output[reqNo].res.status.should.be.eql(404);
      done();
    })
    it('the record should had been shown when called getCar', (done) =>
    {
      let reqNo = 3;
      let obj = request.output[reqNo].res.body[0];
      // console.log('----------------------------------')
      // console.log(obj);
      // console.log(request.output[reqNo+1].docs)
      for(var argName in obj)
      {
        //console.log('argName = '+argName)
        if(argName.length>4 && argName!='updatedAt' && argName!='createdAt')
          obj[argName].should.be.eql(request.output[reqNo+2].docs[argName])
        obj.createdAt.should.be.eql(request.output[reqNo+2].docs.createdAt.toISOString())
        obj.updatedAt.should.be.eql(request.output[reqNo+2].docs.updatedAt.toISOString())
      }
      done();
    })
    it('the record should had been shown when called showCar', (done) =>
    {
      let reqNo = 6;
      let obj = request.output[reqNo].res.body;
      // console.log('----------------------------------')
      // console.log(obj);
      // console.log(request.output[reqNo+1].docs)
      for(var argName in obj)
      {
        //console.log('argName = '+argName)
        if(argName.length>4 && argName!='updatedAt' && argName!='createdAt')
          obj[argName].should.be.eql(request.output[reqNo+1].docs[argName])
        obj.createdAt.should.be.eql(request.output[reqNo+1].docs.createdAt.toISOString())
        obj.updatedAt.should.be.eql(request.output[reqNo+1].docs.updatedAt.toISOString())
      }
      done();
    })
    it('the record should had been changed when called putCar', (done) =>
    {
      //console.log('here we go')
      //console.log(request.output)
      let reqNo = 8;
      request.output[reqNo].res.status.should.be.eql(404);
      // request.output[reqNo].docs.car_model.should.be.eql('Jazz')
      //request.output[6].res.body.message.should.be.eql("you passed the test");
      done();
    });
    it('when called deleteCar, the route should not exist', (done)=>
    {
      let reqNo = 10;
      request.output[reqNo].res.status.should.be.eql(404);
      reqNo = 11;
      should.not.equal(null,request.output[reqNo].docs);
      done();
    })
    // end of test here
  }); //*/ //end of template here

  describe('? "Check if User CRUD work":', () =>
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
          // callback(callback,arg)
        }, // request1
        function(arg,callback)
        {
          User.update({},{user_type:0},function(err,docs)
          {
            callback(null,arg);
          })
        },
        function(arg,callback)
        {
          let route = '/login',obj=request.account;
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
          // callback(callback,arg)
        }, // request2
        function(arg,callback)
        {
          let route = '/api/users/user';
          // let arg = request;
          token = arg.output[2].res.body.token;
          let obj = {username:'david',password:'99',name:"David","email":"david@gg.g",home_address:"222/20",home_address_lat:13.295761,home_address_lng:100.251065,tel:"02-668-3578"}
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
        }, // request3
          /*
          function(arg,callback){
            callback(callback,arg)
          } // request...//*/
          function(arg,callback)
          {
            testController.testGetModelMultiple(callback,arg,modelName='user',isDebug=isDebugTest)
          }, // request4
          function(arg,callback)
          {
            let route = '/api/users/user';
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 5
          function(arg,callback)
          {
            let route = '/api/users/user';

            if(arg.output[5].res.hasOwnProperty('body')
            && arg.output[5].res.body.hasOwnProperty(0)
            && arg.output[5].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[5].res.body[0]._id;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 6
          function(arg,callback)
          {
            testController.testGetModelMultiple(callback,arg,modelName='user',isDebug=isDebugTest)
          }, // request7
          function(arg,callback)
          {
            let route = '/api/users/user',reqNo = 7;
            if(arg.output[5].res.hasOwnProperty('body')
            && arg.output[5].res.body.hasOwnProperty(0)
            && arg.output[5].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[5].res.body[0]._id;
            // console.log('arg.output = ')
            // console.log(arg.output)
            // console.log(arg.output[2].res.body[0])
            let obj = {name:'Joe'};
            // let obj = {id:arg.output[2].res.body[0]._id,name:'Joe'};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).put(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 8
          function(arg,callback)
          {
            testController.testGetModelMultiple(callback,arg,modelName='user',isDebug=isDebugTest)
          }, // request9
          function(arg,callback)
          {
            let route = '/api/users/user',reqNo = 10;
            if(arg.output[5].res.hasOwnProperty('body')
            && arg.output[5].res.body.hasOwnProperty(0)
            && arg.output[5].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[5].res.body[0]._id;
            // let obj = {id:arg.output[2].res.body[0]._id};
            // console.log(arg.output[2].res.body[0]._id)
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).delete(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 10
          function(arg,callback)
          {
            testController.testGetModelMultiple(callback,arg,modelName='user',isDebug=isDebugTest)
          }, // request11
          //*/


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
    it('when called postUser, the route should not exist', (done) =>
    {
      let reqNo = 3;
      request.output[reqNo].res.status.should.be.eql(404)
      done();
    })
    it('the record should had been shown when called getUser', (done) =>
    {
      let reqNo = 5;
      let obj = request.output[reqNo].res.body[1];
      // console.log('----------------------------------')
      // console.log(obj);
      // console.log(request.output[reqNo+1].docs)
      // console.log('abcd')
      // console.log(request.output[reqNo].res.body)
      request.output[reqNo].res.body.should.not.have.property('password')
      for(var argName in obj)
      {
        //console.log('argName = '+argName)
        if(argName.length>4 && argName!='updatedAt' && argName!='createdAt' && argName!='password')
          obj[argName].should.be.eql(request.output[reqNo+2].docs[0][argName])

        // obj.createdAt.should.be.eql(request.output[reqNo+2].docs[0].createdAt.toISOString()) // got delayed somehow, so commented
        // obj.updatedAt.should.be.eql(request.output[reqNo+2].docs[0].updatedAt.toISOString()) // got delayed somehow, so commented
      }
      done();
    })
    it('when called showUser the route should show the data properly', (done) =>
    {
      // TODO: check if this function should be possible to use, instead of return 404. The user may able to view himself for sure, but for the other? still not sure though
      let reqNo = 6;
      let obj = request.output[reqNo].res.body;
      // console.log('----------------------------------')
      // console.log(obj);
      // console.log(request.output[reqNo+1].docs)
      // console.log('abcd')
      // console.log(request.output[reqNo].res.body)
      request.output[reqNo].res.body.should.not.have.property('password')
      for(var argName in obj)
      {
        //console.log('argName = '+argName)
        if(argName.length>4 && argName!='updatedAt' && argName!='createdAt' && argName!='password')
          obj[argName].should.be.eql(request.output[reqNo+1].docs[0][argName])

        obj.createdAt.should.be.eql(request.output[reqNo+1].docs[0].createdAt.toISOString())
        obj.updatedAt.should.be.eql(request.output[reqNo+1].docs[0].updatedAt.toISOString())
      }
      request.output[reqNo].res.status.should.be.eql(200)
      done();
    })
    it('the record should had been changed when called putUser', (done) =>
    {
      let reqNo = 9;
      // should.equal([],request.output[reqNo].docs)
      // JSON.stringify(request.output[reqNo].docs).should.be.eql('[]')
      request.output[reqNo].docs[0].name.should.be.eql('Joe')
      //request.output[6].res.body.message.should.be.eql("you passed the test");
      done();
    });

    it('the record should had been removed when called deleteUser', (done)=>
    {
      let reqNo = 10;
      // request.output[reqNo].res.body.ok.should.be.eql(1);
      // request.output[reqNo].res.body.n.should.be.eql(1);

      // request.output[reqNo].res.body.message.should.be.eql("You are not the admin, so you can\'t use this function.");
      request.output[reqNo].res.status.should.be.eql(404);
      reqNo = 11;
      should.not.equal(null,request.output[reqNo].docs);

      // reqNo = 8;
      // should.equal(false,request.output[reqNo].docs.hasOwnProperty(1));
      done();
    })
    // end of test here
    //*/
  }); //*/ //end of template here
  describe('? "Check if Garage CRUD work":', () =>
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
        //   let route = '/api/users/garage';
        //   let arg = request;
        //   let obj ={
        //     "name":"Toyotacare",
        //     "tel":"089-999-9999",
        //     "rating":"4",
        //     "address":"222/20",
        //     "address_lat":"13.296745",
        //     "address_lng":"100.178454",
        //     // "mechanic_id_list[]":"1",
        //     // "mechanic_id_list[]":"2",
        //     // "part_id_list[]":"3",
        //     // "part_id_list[]":"4",
        //     "mechanic_id_list":["1","2"],
        //     "part_id_list":["3","4"]
        //
        //   }
        //   testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
        // }, // request0
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
          let route = '/api/admins/garage';
          let reqNo = 2;
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
            .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',arg.output[reqNo-1].res.body.token).send(obj),isDebug=isDebugTest);
        }, // request2
        function(arg,callback)
        {
          let route = '/api/users/garage';
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
            .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token).send(obj),isDebug=isDebugTest);
        }, // request3
          function(arg,callback)
          {
            testController.testGetModelMultiple(callback,arg,modelName='garage',isDebug=isDebugTest)
          }, // request4
          function(arg,callback)
          {
            let route = '/api/users/garage';
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request5
          function(arg,callback)
          {
            let route = '/api/users/garage';
            if(arg.output[5].res.hasOwnProperty('body')
            && arg.output[5].res.body.hasOwnProperty(0)
            && arg.output[5].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[5].res.body[0]._id;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request6
          function(arg,callback)
          {
            testController.testGetModelMultiple(callback,arg,modelName='garage',isDebug=isDebugTest)
          }, // request7
          function(arg,callback)
          {
            let route = '/api/users/garage',reqNo = 7;
            // console.log('arg.output = ')
            // console.log(arg.output)
            // console.log(arg.output[2].res.body[0])
            if(arg.output[5].res.hasOwnProperty('body')
            && arg.output[5].res.body.hasOwnProperty(0)
            && arg.output[5].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[5].res.body[0]._id;
            let obj = {rating:5};
            // let obj = {id:arg.output[2].res.body[0]._id,rating:5};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).put(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request8
          function(arg,callback)
          {
            testController.testGetModelMultiple(callback,arg,modelName='garage',isDebug=isDebugTest)
          }, // request9
          function(arg,callback)
          {
            let route = '/api/users/garage',reqNo = 10;
            if(arg.output[5].res.hasOwnProperty('body')
            && arg.output[5].res.body.hasOwnProperty(0)
            && arg.output[5].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[5].res.body[0]._id;
            // let obj = {id:arg.output[2].res.body[0]._id};
            // console.log(arg.output[2].res.body[0]._id)
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).delete(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request10
          function(arg,callback)
          {
            testController.testGetModelMultiple(callback,arg,modelName='garage',isDebug=isDebugTest)
          }, // request11
          //*/


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
    it('the record should had not been created when called postGarage', (done) =>
    {
      let reqNo = 3;
      request.output[reqNo].res.status.should.be.eql(404);
      // reqNo = 1;
      // JSON.stringify(request.output[reqNo].docs).should.be.eql('[]');
      //*/
      done();
    })
    it('the record should had been shown when called getGarage', (done) =>
    {
      let reqNo = 5;
      let obj = request.output[reqNo].res.body[0];
      // console.log('----------------------------------')
      // console.log('the record should had been shown when called getGarage')
      // console.log(request.output[reqNo].res.body)
      // console.log('obj = ')
      // console.log(obj);
      // console.log(request.output[reqNo+1].docs)
      // console.log('abcd')
      // console.log(request.output[reqNo+2].docs[0])
      request.output[reqNo].res.body.should.not.have.property('password')
      for(var argName in obj)
      {
        // console.log('argName = '+argName)
        // console.log(obj[argName])
        // console.log(request.output[reqNo+2].docs[0][argName])
        // console.log(typeof obj[argName])
        // console.log(typeof request.output[reqNo+2].docs[0][argName])
        // console.log(obj[argName][0])
        // console.log(request.output[reqNo+2].docs[0][argName][0])
        // console.log(typeof obj[argName][0])
        // console.log(typeof request.output[reqNo+2].docs[0][argName][0])
        // console.log(JSON.stringify(obj[argName]))
        // console.log(JSON.stringify(request.output[reqNo+2].docs[0][argName]))
        // console.log(typeof JSON.stringify(obj[argName]))
        // console.log(typeof JSON.stringify(request.output[reqNo+2].docs[0][argName]))
        if(argName.length>4 && argName!='updatedAt' && argName!='createdAt' && argName!='password' && argName!='mechanic_id_list[]' && argName!='part_id_list[]' && argName!='mechanic_id_list' && argName!='part_id_list')
          obj[argName].should.be.eql(request.output[reqNo+2].docs[0][argName])
        else if(argName.length>4 && argName!='updatedAt' && argName!='createdAt' && argName!='password')
          JSON.stringify(obj[argName]).should.be.eql(JSON.stringify(request.output[reqNo+2].docs[0][argName]))

        obj.createdAt.should.be.eql(request.output[reqNo+2].docs[0].createdAt.toISOString())
        obj.updatedAt.should.be.eql(request.output[reqNo+2].docs[0].updatedAt.toISOString())
      }
      // JSON.stringify(request.output[reqNo].res.body).should.be.eql('[]');
      done();
    })
    it('the record should had been shown when called showGarage', (done) =>
    {
      let reqNo = 6;
      let obj = request.output[reqNo].res.body;
      // // console.log('----------------------------------')
      // // console.log('the record should had been shown when called showGarage')
      // // console.log(request.output[reqNo].res.body)
      // // console.log('obj = ')
      // // console.log(obj);
      // // console.log(request.output[reqNo+1].docs)
      // // console.log('abcd')
      // // console.log(request.output[reqNo+1].docs[0])
      // request.output[reqNo].res.body.should.not.have.property('password')
      for(var argName in obj)
      {
        // console.log('argName = '+argName)
        // console.log(obj[argName])
        // console.log(request.output[reqNo+1].docs[0][argName])
        // console.log(typeof obj[argName])
        // console.log(typeof request.output[reqNo+1].docs[0][argName])
        // console.log(obj[argName][0])
        // console.log(request.output[reqNo+1].docs[0][argName][0])
        // console.log(typeof obj[argName][0])
        // console.log(typeof request.output[reqNo+1].docs[0][argName][0])
        // console.log(JSON.stringify(obj[argName]))
        // console.log(JSON.stringify(request.output[reqNo+1].docs[0][argName]))
        // console.log(typeof JSON.stringify(obj[argName]))
        // console.log(typeof JSON.stringify(request.output[reqNo+1].docs[0][argName]))
        if(argName.length>4 && argName!='updatedAt' && argName!='createdAt' && argName!='password' && argName!='mechanic_id_list[]' && argName!='part_id_list[]' && argName!='mechanic_id_list' && argName!='part_id_list')
          obj[argName].should.be.eql(request.output[reqNo+1].docs[0][argName])
        else if(argName.length>4 && argName!='updatedAt' && argName!='createdAt' && argName!='password')
          JSON.stringify(obj[argName]).should.be.eql(JSON.stringify(request.output[reqNo+1].docs[0][argName]))

        obj.createdAt.should.be.eql(request.output[reqNo+1].docs[0].createdAt.toISOString())
        obj.updatedAt.should.be.eql(request.output[reqNo+1].docs[0].updatedAt.toISOString())
      }
      // JSON.stringify(request.output[reqNo].res.body).should.be.eql('[]');
      done();
    })
    it('the record should had been changed when called putGarage', (done) =>
    {
      //console.log('here we go')
      //console.log(request.output)
      let reqNo = 9;
      // request.output[reqNo].docs[0].rating.should.be.eql(5)
      JSON.stringify(request.output[reqNo].docs).should.not.be.eql('[]');
      //request.output[6].res.body.message.should.be.eql("you passed the test");
      done();
    });

    it('the record should had been removed when called deleteGarage', (done)=>
    {
      let reqNo = 10;
      // request.output[reqNo].res.body.ok.should.be.eql(1);
      // request.output[reqNo].res.body.n.should.be.eql(1);
      request.output[reqNo].res.status.should.be.eql(404);
      reqNo = 11;
      // should.equal(false,request.output[reqNo].docs.hasOwnProperty(1));
      // JSON.stringify(request.output[reqNo].docs).should.be.eql('[]');
      // request.output[reqNo].res.status.should.be.eql(403);
      // request.output[reqNo].res.body.message.should.be.eql('forbidden')
      done();
    })
    // end of test here
    //*/
  });
  describe('? "Check if Service CRUD work":', () =>
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
          // callback(callback,arg)
        }, // request1
        function(arg,callback)
        {
          User.update({},{user_type:0},function(err,docs)
          {
            callback(null,arg);
          })
        },
        function(arg,callback)
        {
          let route = '/login',obj=request.account;
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
          // callback(callback,arg)
        }, // request2
        function(arg,callback)
        {
          let route = '/api/admins/service';
          // let arg = request;
          let year = 2016, month = 10, date = 20;
          // let date1 = new Date(year,month,date,00,00);
          // let date2 = new Date(year,month,date+2,00,00);
          // let date3 = new Date(year,month,date+3,00,00);
          let reqNo = 3;
          let date1 = date2 = date3 = "2016-06-03T10:34"
          let obj ={
                      user_id: arg.output[2].res.body.id,
                      mechanic_id:"1",
                      promotion_id:"6",
                      car_id:"7",
                      car_miles:90,
                      car_used_years:386,
                      part_id_list:["8","9"],
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
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',arg.output[1].res.body.token).send(obj),isDebug=isDebugTest);
        }, // request3
          /*
          function(arg,callback){
            callback(callback,arg)
          } // request...//*/
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='service',isDebug=isDebugTest)
          }, // request4
          function(arg,callback)
          {
            token = arg.output[2].res.body.token;
            let route = '/api/users/service'; 
            // let arg = request;
            let year = 2016, month = 10, date = 20;
            // let date1 = new Date(year,month,date,00,00);
            // let date2 = new Date(year,month,date+2,00,00);
            // let date3 = new Date(year,month,date+3,00,00);
            let date1 = date2 = date3 = "2016-06-03T10:34"
            let obj ={
                        user_id:arg.output[2].res.body.id,
                        mechanic_id:"1",
                        promotion_id:"6",
                        car_id:"7",
                        car_miles:90,
                        car_used_years:386,
                        part_id_list:["8","9"],
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
            testController.testGetModel(callback,arg,modelName='service',isDebug=isDebugTest)
          }, // request6
          function(arg,callback)
          {
            let route = '/api/users/service';
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 7
          function(arg,callback)
          {
            let route = '/api/users/service';
            // route += '/'+arg.output[2].res.body[0]._id;
            if(arg.output[7].res.hasOwnProperty('body')
            && arg.output[7].res.body.hasOwnProperty(0)
            && arg.output[7].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[7].res.body[0]._id;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 8
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='service',isDebug=isDebugTest)
          }, // request9
          function(arg,callback)
          {
            let route = '/api/users/service',reqNo = 10;
            // console.log('arg.output = ')
            // console.log(arg.output)
            // console.log('arg.output[2].res.body =')
            // console.log(arg.output[2].res.body);
            if(arg.output[7].res.hasOwnProperty('body')
            && arg.output[7].res.body.hasOwnProperty(0)
            && arg.output[7].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[7].res.body[0]._id;
            let obj = {car_used_years:365};
            // let obj = {id:arg.output[2].res.body[0]._id,car_used_years:365};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).put(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 10
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='service',isDebug=isDebugTest)
          }, // request11
          function(arg,callback)
          {
            let route = '/api/users/service',reqNo = 12;
            if(arg.output[7].res.hasOwnProperty('body')
            && arg.output[7].res.body.hasOwnProperty(0)
            && arg.output[7].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[7].res.body[0]._id;
            // let obj = {id:arg.output[4].res.body[0]._id};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).delete(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 12
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='service',isDebug=isDebugTest)
          }, // request13
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
    it('when called postService, the route should not exist', (done) =>
    {
      let reqNo = 5;
      request.output[reqNo].res.status.should.be.eql(404);
      reqNo = 6;
      // should.equal(null,request.output[reqNo].docs)
      done();
    })
    it('the record should had been shown when called getService', (done) =>
    {
      let reqNo = 7;
      request.output[reqNo].res.status.should.be.eql(200);
      let obj = request.output[reqNo].res.body[0];
      // console.log('----------------------------------')
      // console.log(obj);
      // console.log(request.output[reqNo+1].docs)
      for(var argName in obj)
      {
        //console.log('argName = '+argName)
        if(argName.length>4 && argName!='updatedAt' && argName!='createdAt' && argName!="repair_list" && argName!="status_list" && argName!="part_id_list" && argName!="service_date")
          obj[argName].should.be.eql(request.output[reqNo+2].docs[argName])
        obj.createdAt.should.be.eql(request.output[reqNo+2].docs.createdAt.toISOString())
        obj.updatedAt.should.be.eql(request.output[reqNo+2].docs.updatedAt.toISOString())
        obj.service_date.should.be.eql(request.output[reqNo+2].docs.service_date.toISOString())
      }
      done();
    })
    it('the record should had been shown when called showService', (done) =>
    {
      let reqNo = 8;
      let obj = request.output[reqNo].res.body;
      // console.log('----------------------------------')
      // console.log(obj);
      // console.log(request.output[reqNo+1].docs)
      for(var argName in obj)
      {
        //console.log('argName = '+argName)
        if(argName.length>4 && argName!='updatedAt' && argName!='createdAt' && argName!="repair_list" && argName!="status_list" && argName!="part_id_list" && argName!="service_date")
          obj[argName].should.be.eql(request.output[reqNo+1].docs[argName])
        obj.createdAt.should.be.eql(request.output[reqNo+1].docs.createdAt.toISOString())
        obj.updatedAt.should.be.eql(request.output[reqNo+1].docs.updatedAt.toISOString())
        obj.service_date.should.be.eql(request.output[reqNo+1].docs.service_date.toISOString())
      }
      done();
    })
    it('the record should not had been changed when called putService', (done) =>
    {
      //console.log('here we go')
      //console.log(request.output)
      let reqNo = 11;
      request.output[reqNo].docs.car_used_years.should.be.eql(386)
      // should.equal(null,request.output[reqNo].docs)
      //request.output[6].res.body.message.should.be.eql("you passed the test");
      done();
    });
    it('the record should had not been removed when called deleteService', (done)=>
    {
      let reqNo = 12;
      // request.output[reqNo].res.body.ok.should.be.eql(1);
      // request.output[reqNo].res.body.n.should.be.eql(1);
      request.output[reqNo].res.status.should.be.eql(404);
      // request.output[reqNo].res.body.message.should.be.eql("You are not the admin, so you can't use this function.")
      reqNo = 13;
      // JSON.stringify(request.output[reqNo].docs).should.be.eql('[]');
      should.not.equal(null,request.output[reqNo].docs);
      // request.output[reqNo].res.status.should.be.eql(403);
      // request.output[reqNo].res.body.message.should.be.eql('forbidden')
      // should.equal(null,request.output[reqNo].docs);
      done();
    })
    // end of test here
  }); //*/ //end of template here
  describe('? "Check if Request CRUD work":', () =>
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
          let route = '/api/users/request';
          let arg = request;
          // let obj = {car_model:'City',car_brand:'Honda',car_year:2012}
          let obj = {
            user_id:"1",
            mechanic_id:"2",
            mechanic_reach:0,
            location_lat:13.682659,
            location_lng:100.957553,
            request_time:'2016-06-03T10:34',
            reach_time:'2016-06-03T10:34'
          }
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
        }, // request0
          /*
          function(arg,callback){
            callback(callback,arg)
          } // request...//*/
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='request',isDebug=isDebugTest)
          }, // request1
          function(arg,callback)
          {
            let route = '/api/users/request';
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 2
          function(arg,callback)
          {
            let route = '/api/users/request';
            route += '/'+arg.output[2].res.body[0]._id;

            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 3
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='request',isDebug=isDebugTest)
          }, // request4
          function(arg,callback)
          {
            let route = '/api/users/request',reqNo = 4;
            //console.log('arg.output = ')
            //console.log(arg.output)
            route += '/'+arg.output[2].res.body[0]._id;
            let obj = {mechanic_reach:1};
            // let obj = {id:arg.output[2].res.body[0]._id,mechanic_reach:1};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).put(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 5
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='request',isDebug=isDebugTest)
          }, // request6
          function(arg,callback)
          {
            let route = '/api/users/request',reqNo = 6;
            route += '/'+arg.output[2].res.body[0]._id;
            // let obj = {id:arg.output[2].res.body[0]._id};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).delete(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 7
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='request',isDebug=isDebugTest)
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
    it('the record should had been created when called postRequest', (done) =>
    {
      jwt.verify(token, config.jwt.secret, function(err, decoded)
      {
        let reqNo = 0;
        let obj = {
          user_id:decoded.id,//"1",
          mechanic_id:"2",
          mechanic_reach:0,
          location_lat:13.682659,
          location_lng:100.957553,
          request_time:'2016-06-03T10:34',
          reach_time:'2016-06-03T10:34'
        }

        //isDebugTest = true;
        //testController.testCheckResponse(request.output[reqNo].res,arg,isDebug=isDebugTest);
        //console.log("request.output[0].res= ")
        //console.log(request.output[reqNo].res)
        // console.log(request.output)
        for(var argName in obj)
          if(argName!="request_time" && argName!="reach_time")
            request.output[reqNo].res.body[argName].should.be.eql(obj[argName])
        /*request.output[reqNo].res.body.garage_id.should.be.eql(arg[0].garage_id)
        request.output[reqNo].res.body.name.should.be.eql(arg[1].name)
        request.output[reqNo].res.body.tel.should.be.eql(arg[2].tel)
        request.output[reqNo].res.body.rating.should.be.eql(arg[3].rating)
        request.output[reqNo].res.body.service_amount.should.be.eql(arg[4].service_amount)
        //*/
        reqNo = 1;
        for(var argName in obj)
          if(argName!="request_time" && argName!="reach_time")
            request.output[reqNo].docs[argName].should.be.eql(obj[argName])
        /*
        request.output[reqNo].docs.garage_id.should.be.eql(arg[0].garage_id)
        request.output[reqNo].docs.name.should.be.eql(arg[1].name)
        request.output[reqNo].docs.tel.should.be.eql(arg[2].tel)
        request.output[reqNo].docs.rating.should.be.eql(arg[3].rating)
        request.output[reqNo].docs.service_amount.should.be.eql(arg[4].service_amount)
        //*/
        done();
      })
    })
    it('the record should had been shown when called getRequest', (done) =>
    {
      let reqNo = 2;
      let obj = request.output[reqNo].res.body[0];
      // console.log('----------------------------------')
      // console.log(obj);
      // console.log(request.output[reqNo+2].docs)
      for(var argName in obj)
      {
        //console.log('argName = '+argName)
        if(argName.length>4 && argName!='updatedAt' && argName!='createdAt' && argName!='reach_time' && argName!='request_time')
          obj[argName].should.be.eql(request.output[reqNo+2].docs[argName])
        obj.createdAt.should.be.eql(request.output[reqNo+2].docs.createdAt.toISOString())
        obj.updatedAt.should.be.eql(request.output[reqNo+2].docs.updatedAt.toISOString())
      }
      done();
    })
    it('the record should had been shown when called showRequest', (done) =>
    {
      let reqNo = 3;
      let obj = request.output[reqNo].res.body;
      // console.log('----------------------------------')
      // console.log(obj);
      // console.log(request.output[reqNo+1].docs)
      for(var argName in obj)
      {
        //console.log('argName = '+argName)
        if(argName.length>4 && argName!='updatedAt' && argName!='createdAt' && argName!='reach_time' && argName!='request_time')
          obj[argName].should.be.eql(request.output[reqNo+1].docs[argName])
        obj.createdAt.should.be.eql(request.output[reqNo+1].docs.createdAt.toISOString())
        obj.updatedAt.should.be.eql(request.output[reqNo+1].docs.updatedAt.toISOString())
      }
      done();
    })
    it('the record should not had been changed when called putRequest', (done) =>
    {
      // console.log('here we go')
      // console.log(request.output)
      let reqNo = 6;
      request.output[reqNo].docs.mechanic_reach.should.be.eql(0)
      //request.output[7].res.body.message.should.be.eql("you passed the test");
      done();
    });
    it('when called deleteRequest, the route should not exist', (done)=>
    {
      // TODO: check if the user should be able to remove their own request, but not the others.
      let reqNo = 7;
      request.output[reqNo].res.status.should.be.eql(404);
      reqNo = 8;
      // JSON.stringify(request.output[reqNo].docs).should.be.eql('[]');
      should.not.equal(null,request.output[reqNo].docs);
      done();
    })
    // end of test here
  }); //*/ //end of template here
  describe('? "Check if Billing CRUD work":', () =>
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
          // callback(callback,arg)
        }, // request1
        function(arg,callback)
        {
          let reqNo = 2
          let route = '/api/admins/billing';
          token = arg.output[reqNo-1].res.body.token;
          // let arg = request;
          let obj = {
            user_id:arg.output[reqNo-1].res.body.id,//"1",
            service_id:"2",
            price:125677
          }
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
        }, // request2
        function(arg,callback)
        {
          User.update({},{user_type:0},function(err,docs)
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
          let route = '/api/users/billing';
          // let arg = request;
          token = arg.output[reqNo-1].res.body.token;
          let obj = {
            user_id:"1",
            service_id:"2",
            price:125677
          }
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
        }, // request4
          /*
          function(arg,callback){
            callback(callback,arg)
          } // request...//*/
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='billing',isDebug=isDebugTest)
          }, // request5
          function(arg,callback)
          {
            let route = '/api/users/billing';
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 6
          function(arg,callback)
          {
            let route = '/api/users/billing';
            // route += '/'+arg.output[2].res.body[0]._id;
            if(arg.output[6].res.hasOwnProperty('body')
            && arg.output[6].res.body.hasOwnProperty(0)
            && arg.output[6].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[6].res.body[0]._id;

            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 7
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='billing',isDebug=isDebugTest)
          }, // request8
          function(arg,callback)
          {
            let route = '/api/users/billing',reqNo = 9;
            //console.log('arg.output = ')
            //console.log(arg.output)
            if(arg.output[6].res.hasOwnProperty('body')
            && arg.output[6].res.body.hasOwnProperty(0)
            && arg.output[6].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[6].res.body[0]._id;
            let obj = {price:10200};
            // let obj = {id:arg.output[2].res.body[0]._id,price:10200};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).put(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 9
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='billing',isDebug=isDebugTest)
          }, // request10
          function(arg,callback)
          {
            let route = '/api/users/billing',reqNo = 11;
            if(arg.output[6].res.hasOwnProperty('body')
            && arg.output[6].res.body.hasOwnProperty(0)
            && arg.output[6].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[6].res.body[0]._id;
            // let obj = {id:arg.output[2].res.body[0]._id};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).delete(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 11
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='billing',isDebug=isDebugTest)
          }, // request12

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
    it('when called postBilling, the route should not exist', (done) =>
    {
      let reqNo = 4;
      request.output[reqNo].res.status.should.be.eql(404);
      reqNo = 1;
      done();
    })
    it('the record should had been shown when called getBilling', (done) =>
    {
      let reqNo = 6;
      let obj = request.output[reqNo].res.body[0];
      // console.log('----------------------------------')
      // console.log(obj);
      // console.log(request.output[reqNo+2].docs)
      for(var argName in obj)
      {
        //console.log('argName = '+argName)
        if(argName.length>4 && argName!='updatedAt' && argName!='createdAt')
          obj[argName].should.be.eql(request.output[reqNo+2].docs[argName])
        obj.createdAt.should.be.eql(request.output[reqNo+2].docs.createdAt.toISOString())
        obj.updatedAt.should.be.eql(request.output[reqNo+2].docs.updatedAt.toISOString())
      }
      done();
    })
    it('the record should had been shown when called showBilling', (done) =>
    {
      let reqNo = 7;
      let obj = request.output[reqNo].res.body;
      // console.log('----------------------------------')
      // console.log(obj);
      // console.log(request.output[reqNo+1].docs)
      for(var argName in obj)
      {
        //console.log('argName = '+argName)
        if(argName.length>4 && argName!='updatedAt' && argName!='createdAt')
          obj[argName].should.be.eql(request.output[reqNo+1].docs[argName])
        obj.createdAt.should.be.eql(request.output[reqNo+1].docs.createdAt.toISOString())
        obj.updatedAt.should.be.eql(request.output[reqNo+1].docs.updatedAt.toISOString())
      }
      done();
    })
    it('the record should had not been changed when called putBilling', (done) =>
    {
      //console.log('here we go')
      //console.log(request.output)
      let reqNo = 10;
      request.output[reqNo].docs.price.should.be.eql(125677) //10200)
      //request.output[6].res.body.message.should.be.eql("you passed the test");
      done();
    });
    it('when called deleteBilling, the route should not exist', (done)=>
    {
      let reqNo = 11;
      request.output[reqNo].res.status.should.be.eql(404);
      reqNo = 12;
      // JSON.stringify(request.output[reqNo].docs).should.be.eql('[]');
      should.not.equal(null,request.output[reqNo].docs);
      done();
    })
    // end of test here
  }); //*/ //end of template here
  describe('? "Check if Promotion CRUD work":', () =>
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
          // callback(callback,arg)
        }, // request1
        function(arg,callback)
        {
          let reqNo = 2;
          let route = '/api/admins/promotion';
          token = arg.output[reqNo-1].res.body.token;
          let obj = {
            promotion_type:"winter sale",
            discount_price:1250,
            discount_percent:10
          }
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
        }, // request2
        function(arg,callback)
        {
          User.update({},{user_type:0},function(err,docs)
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
          let route = '/api/users/promotion';
          token = arg.output[reqNo-1].res.body.token;
          let obj = {
            promotion_type:"winter sale",
            discount_price:1250,
            discount_percent:10
          }
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
        }, // request4
          /*
          function(arg,callback){
            callback(callback,arg)
          } // request...//*/
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='promotion',isDebug=isDebugTest)
          }, // request5
          function(arg,callback)
          {
            let route = '/api/users/promotion';
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 6
          function(arg,callback)
          {
            let route = '/api/users/promotion';
            route += '/'+arg.output[6].res.body[0]._id;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 7
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='promotion',isDebug=isDebugTest)
          }, // request8
          function(arg,callback)
          {
            let route = '/api/users/promotion',reqNo = 9;
            //console.log('arg.output = ')
            //console.log(arg.output)
            route += '/'+arg.output[6].res.body[0]._id;
            let obj = {discount_percent:15};
            // let obj = {id:arg.output[2].res.body[0]._id,discount_percent:15};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).put(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 9
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='promotion',isDebug=isDebugTest)
          }, // request10
          function(arg,callback)
          {
            let route = '/api/users/promotion',reqNo = 11;
            route += '/'+arg.output[6].res.body[0]._id;
            // let obj = {id:arg.output[2].res.body[0]._id};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).delete(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 11
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='promotion',isDebug=isDebugTest)
          }, // request12

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
    it('when called postPromotion, the route should not exist', (done) =>
    {
      let reqNo = 4;
      request.output[reqNo].res.status.should.be.eql(404);
      reqNo = 5;
      done();
    })
    it('the record should had been shown when called getPromotion', (done) =>
    {
      let reqNo = 6;
      let obj = request.output[reqNo].res.body[0];
      // console.log('----------------------------------')
      // console.log(obj);
      // console.log(request.output[reqNo+2].docs)
      for(var argName in obj)
      {
        //console.log('argName = '+argName)
        if(argName.length>4 && argName!='updatedAt' && argName!='createdAt')
          obj[argName].should.be.eql(request.output[reqNo+2].docs[argName])
        obj.createdAt.should.be.eql(request.output[reqNo+2].docs.createdAt.toISOString())
        obj.updatedAt.should.be.eql(request.output[reqNo+2].docs.updatedAt.toISOString())
      }
      done();
    })
    it('the record should had been shown when called showPromotion', (done) =>
    {
      let reqNo = 7;
      let obj = request.output[reqNo].res.body;
      // console.log('----------------------------------')
      // console.log(obj);
      // console.log(request.output[reqNo+1].docs)
      for(var argName in obj)
      {
        //console.log('argName = '+argName)
        if(argName.length>4 && argName!='updatedAt' && argName!='createdAt')
          obj[argName].should.be.eql(request.output[reqNo+1].docs[argName])
        obj.createdAt.should.be.eql(request.output[reqNo+1].docs.createdAt.toISOString())
        obj.updatedAt.should.be.eql(request.output[reqNo+1].docs.updatedAt.toISOString())
      }
      done();
    })
    it('the record should had been changed when called putPromotion', (done) =>
    {
      //console.log('here we go')
      //console.log(request.output)
      let reqNo = 10;
      request.output[reqNo].docs.discount_percent.should.be.eql(10)
      //request.output[6].res.body.message.should.be.eql("you passed the test");
      done();
    });
    it('the record should had been removed when called deletePromotion', (done)=>
    {
      let reqNo = 11;
      // request.output[reqNo].res.body.ok.should.be.eql(1);
      // request.output[reqNo].res.body.n.should.be.eql(1);
      // reqNo = 8;
      // should.equal(null,request.output[reqNo].docs);
      request.output[reqNo].res.status.should.be.eql(404);
      reqNo = 12;
      // JSON.stringify(request.output[reqNo].docs).should.be.eql('[]');
      should.not.equal(null,request.output[reqNo].docs);
      done();
    })
    // end of test here
    // for getPartPerWeek test
    //db.services.update({_id:ObjectId('580ee536f9208d002c18d609')},{createdAt:new Date('2016-10-15T04:48:03.408Z')})
    afterEach((done) =>
    {
      let Model, modelList = {mechanic:'',part:'',car:'',user:'',service:'',request:'',billing:'',promotion:'',garage:''};//modelList = {client:'',user:'',code:'',mechanic:''};
      for(var modelName in modelList)
        if(testController.testDropModel(function(){},modelName)==0) console.log("ERROR: can't delete database "+modelName);
      done();
    });
  }); //*/ //end of template here

});
