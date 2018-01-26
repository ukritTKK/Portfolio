//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let config = require(__dirname+'/../configs/env');
let testController = require(__dirname+'/../controllers/testController.js');
let db = require('../configs/db')
// please add token first before doing this test...
let token;
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRldiIsInR5cGUiOjAsImlhdCI6MTQ3Njg1MzcyMywiZXhwIjoxNDc2ODYwOTIzfQ.BC06ghxbzXs_xIyPHtCSYQXxiJKZpwerFOWjBloHbRQ'
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = config.test_protocol+config.test_host+":"+config.test_port//require('../app');
let should = chai.should();
let async = require('async');
var jwt = require('jsonwebtoken');
let User = require('../models/user')

let isDebugTest = false;
chai.use(chaiHttp);
// start of parent block
describe('CRUD', () =>
{
  before((done) =>
  {
    let Model, modelList = {mechanic:'',part:'',car:'',user:'',service:'',request:'',billing:'',promotion:'',garage:''};//modelList = {client:'',user:'',code:'',mechanic:''};
    for(var modelName in modelList)
      if(testController.testDropModel(function(){},modelName)==0) console.log("ERROR: can't delete database "+modelName);
    done();
  });
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
        // function(arg,callback)
        // {
        //   let route = '/api/mechanic';
        //   //let arg = request;
        //   let obj = {garage_id:'581c0b75ec942200ca236ef7',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
        //   let reqNo = 2; token = arg.output[reqNo-1].res.body.token;
        //   testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
        // }, // request2
        function(arg,callback)
        {
          let reqNo = 2;
          let token = arg.output[reqNo-1].res.body.token;
          let route = '/api/admins/mechanic';
          // let arg = request;
          let obj = {garage_id:'581c0b75ec942200ca236ef7',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
            .field('name',obj.name).field('tel',obj.tel).field('user_id',arg.output[reqNo-1].res.body.id)
            .field('rating',obj.rating).field('service_amount',obj.service_amount)////.set('Content-Type','multipart/form-data')
            .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .field('username','test2').field('password','12345')
            .set('Authorization',token).send(obj),isDebug=isDebugTest);
        }, // request 2
          /*
          function(arg,callback){
            callback(callback,arg)
          } // request...//*/
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='mechanic',isDebug=isDebugTest)
          }, // request3
          function(arg,callback)
          {
            let route = '/api/admins/mechanic';
            route += '/'+arg.output[2].res.body.obj._id;
            //let arg = request;

            let reqNo = 4; token = arg.output[1].res.body.token;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request4
          function(arg,callback)
          {
            let route = '/api/admins/mechanic';
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 5
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='mechanic',isDebug=isDebugTest)
          }, // request6
          function(arg,callback)
          {
            let route = '/api/admins/mechanic',reqNo = 2;
            route += '/'+arg.output[2].res.body.obj._id;
            // console.log('arg.output = ')
            // console.log(arg.output)
            let obj = {name:'thanawat wong',tel:'081-929-9999'};
            // let obj = {id:arg.output[4].res.body[0]._id,name:'thanawat wong',tel:'081-929-9999'};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).put(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 7
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='mechanic',isDebug=isDebugTest)
          }, // request8
          function(arg,callback)
          {
            let route = '/api/admins/mechanic',reqNo = 3;
            route += '/'+arg.output[2].res.body.obj._id;
            let obj = {name:'thanawat wong',tel:'081-929-9999'};
            // let obj = {id:arg.output[4].res.body[0]._id,name:'thanawat wong',tel:'081-929-9999'};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).delete(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 9
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='mechanic',isDebug=isDebugTest)
          }, // request10

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
    it('the record should had been created when called postMechanic', (done) =>
    {
      let arg  = [{garage_id:'581c0b75ec942200ca236ef7'},{name:'thanawat mangnee'},{tel:'089-999-9999'},{rating:4},{service_amount:3}], reqNo = 2;
      //isDebugTest = true;
      //testController.testCheckResponse(request.output[reqNo].res,arg,isDebug=isDebugTest);
      // console.log("request.output["+reqNo+"].res.body.garage_id= ")
      // console.log(request.output[reqNo].res.body.garage_id)
      request.output[reqNo].res.body.obj.garage_id.should.be.eql(arg[0].garage_id)
      request.output[reqNo].res.body.obj.name.should.be.eql(arg[1].name)
      request.output[reqNo].res.body.obj.tel.should.be.eql(arg[2].tel)
      request.output[reqNo].res.body.obj.rating.should.be.eql(arg[3].rating)
      request.output[reqNo].res.body.obj.service_amount.should.be.eql(arg[4].service_amount)
      reqNo = 3;
      (""+request.output[reqNo].docs.garage_id).should.be.eql(arg[0].garage_id)
      request.output[reqNo].docs.name.should.be.eql(arg[1].name)
      request.output[reqNo].docs.tel.should.be.eql(arg[2].tel)
      request.output[reqNo].docs.rating.should.be.eql(arg[3].rating)
      request.output[reqNo].docs.service_amount.should.be.eql(arg[4].service_amount)
      done();
    })
    it('the record should had been shown when called showMechanic', (done) =>
    {
      let reqNo = 4;
      // console.log('newnewnew request.output = ')
      // console.log(request.output[reqNo])
      let obj = request.output[reqNo].res.body.obj;
      // console.log('----------------------------------')
      // console.log(obj);
      // console.log(request.output[reqNo+1].docs)
      for(var argName in obj)
      {
        if(argName.length>4 && argName!='updatedAt' && argName!='createdAt')
          obj[argName].should.be.eql(request.output[reqNo+2].docs[argName])
        obj.createdAt.should.be.eql(request.output[reqNo+2].docs.createdAt.toISOString())
        obj.updatedAt.should.be.eql(request.output[reqNo+2].docs.updatedAt.toISOString())
      }
      done();
    })
    it('the record should had been shown when called getMechanic', (done) =>
    {
      let reqNo = 5;
      let obj = request.output[reqNo].res.body[0];
      // console.log('----------------------------------')
      // console.log(obj);
      // console.log(request.output[reqNo+1].docs)
      for(var argName in obj)
      {
        //console.log('argName = '+argName)
        if(argName.length>4 && argName!='updatedAt' && argName!='createdAt' && argName!='garage_id' && argName!='user_id')
        {
          obj[argName].should.be.eql(request.output[reqNo+1].docs[argName])
        }
        obj.user_id._id.should.be.eql(request.output[reqNo+1].docs.user_id.toString())
        // (obj["garage_id"]+"").should.be.eql(request.output[reqNo+1].docs.garage_id)
        obj.createdAt.should.be.eql(request.output[reqNo+1].docs.createdAt.toISOString())
        obj.updatedAt.should.be.eql(request.output[reqNo+1].docs.updatedAt.toISOString())
      }
      done();
    })
    it('the record should had been changed when called putMechanic', (done) =>
    {
      // console.log('here we go')
      // console.log(request.output)
      let reqNo = 8;
      request.output[reqNo].docs.name.should.be.eql('thanawat wong')
      //request.output[6].res.body.message.should.be.eql("you passed the test");
      done();
    });
    it('the record should had been removed when called deleteMechanic', (done)=>
    {
      let reqNo = 9;
      request.output[reqNo].res.body.ok.should.be.eql(1);
      request.output[reqNo].res.body.n.should.be.eql(1);
      reqNo = 10;
      should.equal(null,request.output[reqNo].docs);
      done();
    })
    // end of test here
  }); //*/ //end of template here
  describe('? "Check if putMechanicImg work":', () =>
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
        }, // request3
        function(arg,callback)
        {
          let reqNo = 4;
          token = arg.output[3].res.body.token;
          let route = '/api/admins/mechanic';
          let obj = {garage_id:'581c0b75ec942200ca236ef7',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          jwt.verify(arg.output[reqNo-1].res.body.token, config.jwt.secret, function(err, decoded)
          {

            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
              .field('name',obj.name).field('tel',obj.tel)
              .field('rating',obj.rating).field('service_amount',obj.service_amount)////.set('Content-Type','multipart/form-data')
              // .field('user_id',decoded.id)
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .field('username','test2').field('password','12345')
            .set('Authorization',token).send(obj),isDebug=isDebugTest);
          })
        }, // request 4
        function(arg,callback)
        {
          testController.testGetModelMultiple(callback,arg,modelName='mechanic',isDebug=isDebugTest)
        }, // request5
        function(arg,callback)
        {
          let reqNo = 6;
          token = arg.output[3].res.body.token;
          let route = '/api/admins/mechanicImg';
          // let arg = request;

          if(arg.output[4].res.hasOwnProperty('body')
          && arg.output[4].res.body.hasOwnProperty('obj')
          && arg.output[4].res.body.obj.hasOwnProperty('_id') )
            route += '/'+arg.output[4].res.body.obj._id;
          let obj = {garage_id:'581c0b75ec942200ca236ef7',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).put(route)
            .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token),isDebug=isDebugTest);
        }, // request 6

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
    it('should return the response properly if you submit putMechanicImg', (done) =>
    {
      let reqNo = 6;
      // request.output[reqNo].res.status.should.be.eql(400);
      // request.output[reqNo].res.body.message.should.be.eql("error, incorrect input for uploading")
      // console.log(request.output)
      // console.log(request.output[11].docs[0])
      // console.log(request.output[11].docs[1])
      // TODO: check for the file and mechanic Collection image_url too
      request.output[reqNo].res.status.should.be.eql(200);

      done();
    })
  }) // end of template here
  describe('? "Check if getCount work":', () =>
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
              // .field('mechanic_id_list[]',"1")
              // .field('mechanic_id_list[]',"2")
              // .field('part_id_list[]',"3")
              // .field('part_id_list[]',"4")
              // .field('user_id',decoded.id)
              .field('username','test2')
              .field('password','12345')
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
          let route = '/login',obj={username:"test2",password:"12345"};
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').send(obj),isDebug=isDebugTest);
          // callback(callback,arg)
        }, // request3
        // function(arg,callback)
        // {
        //   let route = '/api/garages/mechanic';
        //   //let arg = request;
        //   let obj = {garage_id:'581c0b75ec942200ca236ef7',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
        //   let reqNo = 2; token = arg.output[reqNo-1].res.body.token;
        //   testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
        // }, // request2
        function(arg,callback)
        {
          let reqNo = 4;
          token = arg.output[3].res.body.token;
          let route = '/api/garages/mechanic';
          // let arg = request;
          let obj = {garage_id:'581c0b75ec942200ca236ef7',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
            .field('name',obj.name).field('tel',obj.tel)
            .field('rating',obj.rating).field('service_amount',obj.service_amount)////.set('Content-Type','multipart/form-data')
            .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .field('username','test3')
            .field('password','12345')
            .set('Authorization',token).send(obj),isDebug=isDebugTest);
        }, // request 4
          /*
          function(arg,callback){
            callback(callback,arg)
          } // request...//*/
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='mechanic',isDebug=isDebugTest)
          }, // request5
          function(arg,callback)
          {
            let route = '/api/garages/mechanic';
            // route += '/'+arg.output[4].res.body.obj._id;
            //let arg = request;

            let reqNo = 6;
            let token = arg.output[3].res.body.token;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request6
          function(arg,callback)
          {
            let token = arg.output[3].res.body.token;
            let route = '/api/garages/mechanic';
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 7
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='mechanic',isDebug=isDebugTest)
          }, // request8
          function(arg,callback)
          {
            let route = '/api/garages/mechanic',reqNo = 9;
            route += '/'+arg.output[4].res.body.obj._id;
            // console.log('arg.output = ')
            // console.log(arg.output)
            let obj = {name:'thanawat wong',tel:'081-929-9999'};
            // let obj = {id:arg.output[4].res.body[0]._id,name:'thanawat wong',tel:'081-929-9999'};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).put(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 9
          // function(arg,callback)
          // {
          //   testController.testGetModel(callback,arg,modelName='mechanic',isDebug=isDebugTest)
          // }, // request10
          // function(arg,callback)
          // {
          //   let route = '/api/garages/mechanic',reqNo = 3;
          //   route += '/'+arg.output[4].res.body.obj._id;
          //   let obj = {name:'thanawat wong',tel:'081-929-9999'};
          //   // let obj = {id:arg.output[4].res.body[0]._id,name:'thanawat wong',tel:'081-929-9999'};
          //   testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).delete(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          // }, // request 11
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='mechanic',isDebug=isDebugTest)
          }, // request10
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='garage',isDebug=isDebugTest)
          }, // request11
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
          }, // request12
          function(arg,callback)
          {
            token = arg.output[12].res.body.token;
            let route = '/api/admins/service';
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
          }, // request13
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
          }, // request 14
          function(arg,callback)
          {

            let route = '/api/admins/getCount';
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 15

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
    it('should show an object when getCount got called', (done) =>
    {
      let reqNo = 15;
      let arg = {"garage":1,"mechanic":1,"service":1,"part":1}
      testController.testCheckResponse_2(request.output[reqNo].res,arg,isDebug=isDebugTest,request.output[reqNo].res.body);
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
        //   let route = '/api/part';
        //   let arg = request;
        //   let obj = {garage_id:'581c0b75ec942200ca236ef7',part_number:'WH31U-82TAA',name:'วาล์วน้ำ',image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg',price:1090,amount:20}
        //   testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
        // }, // request0
          function(callback)
          {
            let route = '/api/admins/part';
            let arg = request;
            let obj = {garage_id:'581c0b75ec942200ca236ef7',part_number:'WH31U-82TAA',name:'วาล์วน้ำ',image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg',price:1090,amount:20}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
              .field('part_number',obj.part_number).field('name',obj.name).field('image_url',obj.image_url)
              .field('price',obj.price).field('amount',obj.amount)////.set('Content-Type','multipart/form-data')
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .set('Authorization',token).send(obj),isDebug=isDebugTest);
          },
          /*
          function(arg,callback){
            callback(callback,arg)
          } // request...//*/
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='part',isDebug=isDebugTest)
          }, // request1
          function(arg,callback)
          {
            let route = '/api/part';
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 2
          function(arg,callback)
          {
            let route = '/api/part';
            route += '/'+arg.output[2].res.body[0]._id;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 3
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='part',isDebug=isDebugTest)
          }, // request4
          function(arg,callback)
          {
            let route = '/api/admins/part',reqNo = 4;
            // console.log('arg.output = ')
            // console.log(arg.output)
            route += '/'+arg.output[2].res.body[0]._id;
            // console.log('res.body')
            // console.log(arg.output[2].res.body);
            let obj = {part_number:'WH31U-82TAA-NEW'};
            // let obj = {id:arg.output[2].res.body[0]._id,part_number:'WH31U-82TAA-NEW'};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).put(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 5
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='part',isDebug=isDebugTest)
          }, // request6
          function(arg,callback)
          {
            let reqNo = 7;
            let route = '/api/admins/partImg';
            route += '/'+arg.output[2].res.body[0]._id;
            let obj = {garage_id:'581c0b75ec942200ca236ef7',part_number:'WH31U-82TAA',name:'วาล์วน้ำ',image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg',price:1090,amount:20}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).put(route).field('garage_id',obj.garage_id)
              .field('part_number',obj.part_number).field('name',obj.name).field('image_url',obj.image_url)
              .field('price',obj.price).field('amount',obj.amount)////.set('Content-Type','multipart/form-data')
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request7
          function(arg,callback)
          {
            let route = '/api/admins/part',reqNo = 3;
            route += '/'+arg.output[2].res.body[0]._id;
            let obj = {part_number:'WH31U-82TAA-NEW'};
            // let obj = {id:arg.output[2].res.body[0]._id,part_number:'WH31U-82TAA-NEW'};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).delete(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 8
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='part',isDebug=isDebugTest)
          }, // request9

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
    it('the record should had been created when called postPart', (done) =>
    {
      let reqNo = 0;
      let obj = {part_number:'WH31U-82TAA',name:'วาล์วน้ำ'/*,image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg'//*/,price:1090,amount:20}

      //isDebugTest = true;
      //testController.testCheckResponse(request.output[reqNo].res,arg,isDebug=isDebugTest);
      //console.log("request.output[0].res= ")
      //console.log(request.output[reqNo].res)
      // console.log('ieee1394 request.output = ')
      //  console.log(request.output)
      for(var argName in obj)
      {
        // console.log('argName = '+argName)
        request.output[reqNo].res.body.obj[argName].should.be.eql(obj[argName])
      }
      /*request.output[reqNo].res.body.garage_id.should.be.eql(arg[0].garage_id)
      request.output[reqNo].res.body.name.should.be.eql(arg[1].name)
      request.output[reqNo].res.body.tel.should.be.eql(arg[2].tel)
      request.output[reqNo].res.body.rating.should.be.eql(arg[3].rating)
      request.output[reqNo].res.body.service_amount.should.be.eql(arg[4].service_amount)
      //*/
      reqNo = 1;
      for(var argName in obj)
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
    it('the record should had been shown when called getPart', (done) =>
    {
      let reqNo = 2;
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
      let reqNo = 3;
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
      let reqNo = 6;
      request.output[reqNo].docs.part_number.should.be.eql('WH31U-82TAA-NEW')
      //request.output[6].res.body.message.should.be.eql("you passed the test");
      done();
    });
    it('should be called properly when use putPartImg', (done)=>
    {
      let reqNo = 7;
      request.output[reqNo].res.status.should.be.eql(200);
      done();
    })
    it('the record should had been removed when called deletePart', (done)=>
    {
      let reqNo = 8;
      request.output[reqNo].res.body.ok.should.be.eql(1);
      request.output[reqNo].res.body.n.should.be.eql(1);
      reqNo = 9;
      should.equal(null,request.output[reqNo].docs);
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
          let route = '/api/admins/car';
          let arg = request;
          let obj = {car_model:'City',car_brand:'Honda',car_year:2012}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).post(route).field('car_model',obj.car_model)
            .field('car_brand',obj.car_brand).field('car_year',obj.car_year)
            .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token).send(obj),isDebug=isDebugTest);
          //testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
        }, // request0
          /*
          function(arg,callback){
            callback(callback,arg)
          } // request...//*/
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='car',isDebug=isDebugTest)
          }, // request1
          function(arg,callback)
          {
            let route = '/api/car';
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 2
          function(arg,callback)
          {
            let route = '/api/car';
            route += '/'+arg.output[2].res.body[0]._id;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 3
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='car',isDebug=isDebugTest)
          }, // request4
          function(arg,callback)
          {
            let route = '/api/admins/car',reqNo = 4;
            //console.log('arg.output = ')
            //console.log(arg.output)
            route += '/'+arg.output[2].res.body[0]._id;
            let obj = {car_model:'Jazz'};
            // let obj = {id:arg.output[2].res.body[0]._id,car_model:'Jazz'};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).put(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 5
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='car',isDebug=isDebugTest)
          }, // request6
          function(arg,callback)
          {
            let route = '/api/admins/carImg';
            route += '/'+arg.output[2].res.body[0]._id;
            let obj = {car_model:'City',car_brand:'Honda',car_year:2012}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).put(route).field('car_model',obj.car_model)
              .field('car_brand',obj.car_brand).field('car_year',obj.car_year)
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .set('Authorization',token).send(obj),isDebug=isDebugTest);
            //testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request7
          function(arg,callback)
          {
            let route = '/api/admins/car',reqNo = 6;
            route += '/'+arg.output[2].res.body[0]._id;
            // let obj = {id:arg.output[2].res.body[0]._id};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).delete(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 8
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='car',isDebug=isDebugTest)
          }, // request9

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
      let reqNo = 0;
      let obj = {car_model:'City',car_brand:'Honda',car_year:2012}

      //isDebugTest = true;
      //testController.testCheckResponse(request.output[reqNo].res,arg,isDebug=isDebugTest);
      //console.log("request.output[0].res= ")
      //console.log(request.output[reqNo].res)
      // console.log(request.output)
      for(var argName in obj)
        request.output[reqNo].res.body.obj[argName].should.be.eql(obj[argName])
      /*request.output[reqNo].res.body.garage_id.should.be.eql(arg[0].garage_id)
      request.output[reqNo].res.body.name.should.be.eql(arg[1].name)
      request.output[reqNo].res.body.tel.should.be.eql(arg[2].tel)
      request.output[reqNo].res.body.rating.should.be.eql(arg[3].rating)
      request.output[reqNo].res.body.service_amount.should.be.eql(arg[4].service_amount)
      //*/
      reqNo = 1;
      for(var argName in obj)
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
    it('the record should had been shown when called getCar', (done) =>
    {
      let reqNo = 2;
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
      let reqNo = 3;
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
      let reqNo = 6;
      request.output[reqNo].docs.car_model.should.be.eql('Jazz')
      //request.output[6].res.body.message.should.be.eql("you passed the test");
      done();
    });
    it('should be able to access the route for putCarImg', (done) =>
    {
      let reqNo = 7;
      request.output[reqNo].res.status.should.be.eql(200);
      done();
    })
    it('the record should had been removed when called deleteCar', (done)=>
    {
      let reqNo = 8;
      request.output[reqNo].res.body.ok.should.be.eql(1);
      request.output[reqNo].res.body.n.should.be.eql(1);
      reqNo = 9;
      should.equal(null,request.output[reqNo].docs);
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
          let route = '/api/admins/user';
          let arg = request;
          let obj = {username:'david',password:'99',name:"David","email":"david@gg.g",home_address:"222/20",home_address_lat:13.295761,home_address_lng:100.251065,tel:"02-668-3578"}
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
        }, // request0
          /*
          function(arg,callback){
            callback(callback,arg)
          } // request...//*/
          function(arg,callback)
          {
            testController.testGetModelMultiple(callback,arg,modelName='user',isDebug=isDebugTest)
          }, // request1
          function(arg,callback)
          {
            let route = '/api/admins/user';
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 2
          function(arg,callback)
          {
            let route = '/api/admins/user';
            // route += '/'+arg.output[2].res.body[0]._id;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 3
          function(arg,callback)
          {
            testController.testGetModelMultiple(callback,arg,modelName='user',isDebug=isDebugTest)
          }, // request4
          function(arg,callback)
          {
            let route = '/api/admins/user',reqNo = 4;
            route += '/'+arg.output[2].res.body[0]._id;
            // console.log('arg.output = ')
            // console.log(arg.output)
            // console.log(arg.output[2].res.body[0])
            let obj = {name:'Joe'};
            // let obj = {id:arg.output[2].res.body[0]._id,name:'Joe'};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).put(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 5
          function(arg,callback)
          {
            testController.testGetModelMultiple(callback,arg,modelName='user',isDebug=isDebugTest)
          }, // request6
          function(arg,callback)
          {
            let route = '/api/admins/user',reqNo = 6;
            route += '/'+arg.output[2].res.body[0]._id;
            // let obj = {id:arg.output[2].res.body[0]._id};
            // console.log(arg.output[2].res.body[0]._id)
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).delete(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 7
          function(arg,callback)
          {
            testController.testGetModelMultiple(callback,arg,modelName='user',isDebug=isDebugTest)
          }, // request8
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
    it('the record should had been created when called postUser', (done) =>
    {
      // console.log('the record should had been created when called postUser')
      let reqNo = 0;
      let obj = {username:'david',password:'99',user_type:0,name:"David","email":"david@gg.g",home_address:"222/20",home_address_lat:13.295761,home_address_lng:100.251065,tel:"02-668-3578"}


      //isDebugTest = true;
      //testController.testCheckResponse(request.output[reqNo].res,arg,isDebug=isDebugTest);
      //console.log("request.output[0].res= ")
      //console.log(request.output[reqNo].res)
      // console.log(request.output)
      // console.log(request.output[reqNo].res.body)
      for(var argName in obj)
      {
        // console.log('argName = ')
        // console.log(argName)
        request.output[reqNo].res.body[argName]
        obj[argName]
        if(argName!='password') request.output[reqNo].res.body[argName].should.be.eql(obj[argName])
      }
      /*request.output[reqNo].res.body.garage_id.should.be.eql(arg[0].garage_id)
      request.output[reqNo].res.body.name.should.be.eql(arg[1].name)
      request.output[reqNo].res.body.tel.should.be.eql(arg[2].tel)
      request.output[reqNo].res.body.rating.should.be.eql(arg[3].rating)
      request.output[reqNo].res.body.service_amount.should.be.eql(arg[4].service_amount)
      //*/
      reqNo = 1;
      for(var argName in obj)
        if(argName!='password') request.output[reqNo].docs[0][argName].should.be.eql(obj[argName])
      /*
      request.output[reqNo].docs.garage_id.should.be.eql(arg[0].garage_id)
      request.output[reqNo].docs.name.should.be.eql(arg[1].name)
      request.output[reqNo].docs.tel.should.be.eql(arg[2].tel)
      request.output[reqNo].docs.rating.should.be.eql(arg[3].rating)
      request.output[reqNo].docs.service_amount.should.be.eql(arg[4].service_amount)
      //*/
      done();
    })
    it('the record should had been shown when called getUser', (done) =>
    {
      let reqNo = 2;
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

        obj.createdAt.should.be.eql(request.output[reqNo+2].docs[0].createdAt.toISOString())
        obj.updatedAt.should.be.eql(request.output[reqNo+2].docs[0].updatedAt.toISOString())
      }
      done();
    })
    it('the record should had been changed when called putUser', (done) =>
    {
      //console.log('here we go')
      //console.log(request.output)
      let reqNo = 6;
      request.output[reqNo].docs[0].name.should.be.eql('Joe')
      //request.output[6].res.body.message.should.be.eql("you passed the test");
      done();
    });

    it('the record should had been removed when called deleteUser', (done)=>
    {
      let reqNo = 7;
      request.output[reqNo].res.body.ok.should.be.eql(1);
      request.output[reqNo].res.body.n.should.be.eql(1);
      reqNo = 8;
      should.equal(false,request.output[reqNo].docs.hasOwnProperty(1));
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
        //   let route = '/api/garage';
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
            // "mechanic_id_list":["1","2"],
            // "part_id_list":["3","4"]

          }
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).post(route).field('name',obj.name)
            .field('tel',obj.tel).field('rating',obj.rating).field('address',obj.address)
            .field('address_lat',obj.address_lat).field('address_lng',obj.address_lng)////.set('Content-Type','multipart/form-data')
            // .field('mechanic_id_list[]',"1")
            // .field('mechanic_id_list[]',"2")
            // .field('part_id_list[]',"3")
            // .field('part_id_list[]',"4")
            .field('username','test2')
            .field('password','12345')
            .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token).send(obj),isDebug=isDebugTest);
        }, // request0
          /*
          function(arg,callback){
            callback(callback,arg)
          } // request...//*/
          function(arg,callback)
          {
            testController.testGetModelMultiple(callback,arg,modelName='garage',isDebug=isDebugTest)
          }, // request1
          function(arg,callback)
          {
            let route = '/api/admins/garage';
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 2
          function(arg,callback)
          {
            let route = '/api/admins/garage';
            // route += '/'+arg.output[2].res.body[0]._id;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 3
          function(arg,callback)
          {
            testController.testGetModelMultiple(callback,arg,modelName='garage',isDebug=isDebugTest)
          }, // request4
          function(arg,callback)
          {
            let route = '/api/admins/garage',reqNo = 4;
            // console.log(arg.output[2].res.body[0])
            route += '/'+arg.output[2].res.body[0]._id;
            let obj = {rating:5};
            // let obj = {id:arg.output[2].res.body[0]._id,rating:5};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).put(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 5
          function(arg,callback)
          {
            testController.testGetModelMultiple(callback,arg,modelName='garage',isDebug=isDebugTest)
          }, // request6
          function(arg,callback)
          {
            let route = '/api/admins/garage',reqNo = 6;
            route += '/'+arg.output[2].res.body[0]._id;
            // let obj = {id:arg.output[2].res.body[0]._id};
            // console.log(arg.output[2].res.body[0]._id)
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).delete(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 7
          function(arg,callback)
          {
            testController.testGetModelMultiple(callback,arg,modelName='garage',isDebug=isDebugTest)
          }, // request8
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
    it('the record should had been created when called postGarage', (done) =>
    {
      // console.log('----------------------------------')
      // console.log('the record should had been created when called postGarage')
      let reqNo = 0;
      // let obj = {username:'david',password:'99',user_type:1,name:"David","email":"david@gg.g",home_address:"222/20",home_address_lat:13.295761,home_address_lng:100.251065,tel:"02-668-3578"}
      // let obj ={
      //   "name":"Toyotacare",
      //   "tel":"089-999-9999",
      //   "rating":4,
      //   "address":"222/20",
      //   "address_lat":13.296745,
      //   "address_lng":100.178454,
      //   "mechanic_id_list[]":"1",
      //   "mechanic_id_list[]":"2",
      //   "part_id_list[]":"3",
      //   "part_id_list[]":"4",
      // }
      let obj ={
        "name":"Toyotacare",
        "tel":"089-999-9999",
        "rating":4,
        "address":"222/20",
        "address_lat":13.296745,
        "address_lng":100.178454,
        // "mechanic_id_list[]":"1",
        // "mechanic_id_list[]":"2",
        // "part_id_list[]":"3",
        // "part_id_list[]":"4",
        "mechanic_id_list":[],
        "part_id_list":[]

      }
      for(var argName in obj)
      {
        if(argName!='password' && argName!='mechanic_id_list' && argName!='part_id_list')
          request.output[reqNo].res.body.obj[argName].should.be.eql(obj[argName])
        else if(argName!='password')
          JSON.stringify(request.output[reqNo].res.body.obj[argName]).should.be.eql(JSON.stringify(obj[argName]))
      }
      /*request.output[reqNo].res.body.garage_id.should.be.eql(arg[0].garage_id)
      request.output[reqNo].res.body.name.should.be.eql(arg[1].name)
      request.output[reqNo].res.body.tel.should.be.eql(arg[2].tel)
      request.output[reqNo].res.body.rating.should.be.eql(arg[3].rating)
      request.output[reqNo].res.body.service_amount.should.be.eql(arg[4].service_amount)
      //*/
      reqNo = 1;
      for(var argName in obj)
        if(argName!='password'  && argName!='mechanic_id_list' && argName!='part_id_list')
          request.output[reqNo].docs[0][argName].should.be.eql(obj[argName])
        else if(argName!='password')
          JSON.stringify(request.output[reqNo].docs[0][argName]).should.be.eql(JSON.stringify(obj[argName]))
      /*
      request.output[reqNo].docs.garage_id.should.be.eql(arg[0].garage_id)
      request.output[reqNo].docs.name.should.be.eql(arg[1].name)
      request.output[reqNo].docs.tel.should.be.eql(arg[2].tel)
      request.output[reqNo].docs.rating.should.be.eql(arg[3].rating)
      request.output[reqNo].docs.service_amount.should.be.eql(arg[4].service_amount)
      //*/
      done();
    })
    it('the record should had been shown when called getGarage', (done) =>
    {
      let reqNo = 2;
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
        if(argName.length>4 && argName!='updatedAt' && argName!='createdAt' && argName!='password' && argName!='mechanic_id_list[]' && argName!='part_id_list[]' && argName!='mechanic_id_list' && argName!='part_id_list' && argName!='user_id')
          obj[argName].should.be.eql(request.output[reqNo+2].docs[0][argName])
        else if(argName.length>4 && argName!='updatedAt' && argName!='createdAt' && argName!='password' && argName!='user_id')
          JSON.stringify(obj[argName]).should.be.eql(JSON.stringify(request.output[reqNo+2].docs[0][argName]))
        else if(argName=="user_id")
          obj.user_id._id.should.be.eql(request.output[reqNo+2].docs[0].user_id.toString())

        obj.createdAt.should.be.eql(request.output[reqNo+2].docs[0].createdAt.toISOString())
        obj.updatedAt.should.be.eql(request.output[reqNo+2].docs[0].updatedAt.toISOString())
      }
      done();
    })
    it('the record should had been shown when called showGarage', (done) =>
    {
      let reqNo = 3;
      let obj = request.output[reqNo].res.body[0];
      // console.log('----------------------------------')
      // console.log('the record should had been shown when called showGarage')
      // console.log(request.output[reqNo].res.body)
      // console.log('obj = ')
      // console.log(obj);
      // console.log(request.output[reqNo+1].docs)
      // console.log('abcd')
      // console.log(request.output[reqNo+1].docs[0])
      obj.should.not.have.property('password')
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
        if(argName.length>4 && argName!='updatedAt' && argName!='createdAt' && argName!='password' && argName!='mechanic_id_list[]' && argName!='part_id_list[]' && argName!='mechanic_id_list' && argName!='part_id_list' && argName!='user_id')
          obj[argName].should.be.eql(request.output[reqNo+1].docs[0][argName])
        else if(argName.length>4 && argName!='updatedAt' && argName!='createdAt' && argName!='password' && argName!='user_id')
          JSON.stringify(obj[argName]).should.be.eql(JSON.stringify(request.output[reqNo+1].docs[0][argName]))
        else if(argName=="user_id")
          obj.user_id._id.should.be.eql(request.output[reqNo+1].docs[0].user_id.toString())

        obj.createdAt.should.be.eql(request.output[reqNo+1].docs[0].createdAt.toISOString())
        obj.updatedAt.should.be.eql(request.output[reqNo+1].docs[0].updatedAt.toISOString())
      }
      done();
    })
    it('the record should had been changed when called putGarage', (done) =>
    {
      //console.log('here we go')
      //console.log(request.output)
      let reqNo = 6;
      request.output[reqNo].docs[0].rating.should.be.eql(5)
      //request.output[6].res.body.message.should.be.eql("you passed the test");
      done();
    });

    it('the record should had been removed when called deleteGarage', (done)=>
    {
      let reqNo = 7;
      request.output[reqNo].res.body.ok.should.be.eql(1);
      request.output[reqNo].res.body.n.should.be.eql(1);
      reqNo = 8;
      should.equal(false,request.output[reqNo].docs.hasOwnProperty(1));
      done();
    })
    // end of test here
    //*/
  });
  describe('? "Check if postGarageWithUser CRUD work":', () =>
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
            "part_id_list":["3","4"],
            "username":"test2",
            "password":"12345"

          }
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).post(route).field('name',obj.name)
            .field('tel',obj.tel).field('rating',obj.rating).field('address',obj.address)
            .field('address_lat',obj.address_lat).field('address_lng',obj.address_lng)////.set('Content-Type','multipart/form-data')
            // .field('mechanic_id_list[]',"1")
            // .field('mechanic_id_list[]',"2")
            // .field('part_id_list[]',"3")
            // .field('part_id_list[]',"4")
            .field('username',obj.username)
            .field('password',obj.password)
            .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request0
          function(arg,callback)
          {
            testController.testGetModelMultiple(callback,arg,modelName='garage',isDebug=isDebugTest)
          }, // request1
          function(arg,callback)
          {
            let route = '/api/admins/garageImg';
            route+='/'+arg.output[0].res.body.obj._id;
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
              "part_id_list":["3","4"],
              "username":"test2",
              "password":"12345"

            }
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).put(route).field('name',obj.name)
              .field('tel',obj.tel).field('rating',obj.rating).field('address',obj.address)
              .field('address_lat',obj.address_lat).field('address_lng',obj.address_lng)////.set('Content-Type','multipart/form-data')
              .field('mechanic_id_list[]',"1")
              .field('mechanic_id_list[]',"2")
              .field('part_id_list[]',"3")
              .field('part_id_list[]',"4")
              .field('username',obj.username)
              .field('password',obj.password)
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .set('Authorization',token).send(obj),isDebug=isDebugTest);
            }, // request2
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
      it('the record should had been created when called postGarageWithUser', (done) =>
      {
        let reqNo = 0;
        request.output[reqNo].res.status.should.be.eql(200);

        let obj ={
          "name":"Toyotacare",
          "tel":"089-999-9999",
          "rating":4,
          "address":"222/20",
          "address_lat":13.296745,
          "address_lng":100.178454,
          // "mechanic_id_list[]":"1",
          // "mechanic_id_list[]":"2",
          // "part_id_list[]":"3",
          // "part_id_list[]":"4",
          "mechanic_id_list":[],
          "part_id_list":[]

        }

        for(var argName in obj)
        {
          if(argName!='password' && argName!='mechanic_id_list' && argName!='part_id_list')
            request.output[reqNo].res.body.obj[argName].should.be.eql(obj[argName])
          else if(argName!='password')
            JSON.stringify(request.output[reqNo].res.body.obj[argName]).should.be.eql(JSON.stringify(obj[argName]))
        }
        /*request.output[reqNo].res.body.garage_id.should.be.eql(arg[0].garage_id)
        request.output[reqNo].res.body.name.should.be.eql(arg[1].name)
        request.output[reqNo].res.body.tel.should.be.eql(arg[2].tel)
        request.output[reqNo].res.body.rating.should.be.eql(arg[3].rating)
        request.output[reqNo].res.body.service_amount.should.be.eql(arg[4].service_amount)
        //*/
        reqNo = 1;
        for(var argName in obj)
          if(argName!='password'  && argName!='mechanic_id_list' && argName!='part_id_list')
            request.output[reqNo].docs[0][argName].should.be.eql(obj[argName])
          else if(argName!='password')
            JSON.stringify(request.output[reqNo].docs[0][argName]).should.be.eql(JSON.stringify(obj[argName]))
        done();
      })
      it('when called putGarageImg, the route should exist', (done) =>
      {
        let reqNo = 2;
        request.output[reqNo].res.status.should.be.eql(200);
        // TODO: check if the file really exist after uploading the file
        done();
      })
      // end of test here
    }); //*/ //end of template here

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
          let route = '/api/admins/service';
          let arg = request;
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
        }, // request0
          /*
          function(arg,callback){
            callback(callback,arg)
          } // request...//*/
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='service',isDebug=isDebugTest)
          }, // request1
          function(arg,callback)
          {
            let route = '/api/admins/service';
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 2
          function(arg,callback)
          {
            let route = '/api/admins/service';
            route += '/'+arg.output[2].res.body[0]._id;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 3
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='service',isDebug=isDebugTest)
          }, // request4
          function(arg,callback)
          {
            let route = '/api/admins/service',reqNo = 4;
            // console.log('arg.output = ')
            // console.log(arg.output)
            // console.log('arg.output[2].res.body =')
            // console.log(arg.output[2].res.body);
            route += '/'+arg.output[2].res.body[0]._id;
            let obj = {car_used_years:365};
            // let obj = {id:arg.output[2].res.body[0]._id,car_used_years:365};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).put(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 5
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='service',isDebug=isDebugTest)
          }, // request6
          function(arg,callback)
          {
            let route = '/api/admins/service',reqNo = 6;
            route += '/'+arg.output[2].res.body[0]._id;
            // let obj = {id:arg.output[2].res.body[0]._id};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).delete(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 7
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='service',isDebug=isDebugTest)
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
    it('the record should had been created when called postService', (done) =>
    {
      let reqNo = 0;
      let year = 2016, month = 10, date = 20;
      let date1 = new Date(year,month,date,00,00);
      let date2 = new Date(year,month,date+2,00,00);
      let date3 = new Date(year,month,date+3,00,00);
      let obj ={
                  user_id:"581c0b75ec942200ca236ef7",
                  mechanic_id:"581c0b75ec942200ca236ef7",
                  promotion_id:"581c0b75ec942200ca236ef7",
                  car_id:"581c0b75ec942200ca236ef7",
                  car_miles:90,
                  car_used_years:386,
                  part_id_list:[],
                  repair_list:["change wheel","change body"],
                  status_list:[{status:"received",date:date1},{status:"fixing",date:date2}],
                  // status_list:[["received",date1],["fixing",date2]],
                  // status_list_date:[[date1],[date2]],
                  price:125890,
                  location_lat:13.296745,
                  location_lng:100.178454,
                  service_date:date3,
                  corrected_price:125000
      }

      //isDebugTest = true;
      //testController.testCheckResponse(request.output[reqNo].res,arg,isDebug=isDebugTest);
      // console.log("request.output["+reqNo+"].res.body= ")
      // console.log(request.output[reqNo].res.body)
      // console.log(request.output)
      let exceptList = ["repair_list","status_list","part_id_list","service_date","user_id","mechanic_id","promotion_id","car_id"];
      let checkObjIdList = ["user_id","mechanic_id","promotion_id","car_id"]
      for(var argName in obj)
        if(exceptList.indexOf(argName)==-1) request.output[reqNo].res.body[argName].should.be.eql(obj[argName])
        else if(checkObjIdList.indexOf(argName)!=-1) request.output[reqNo].res.body[argName].toString().should.be.eql(obj[argName])


      // obj.service_date.should.be.eql(request.output[reqNo].res.body.service_date.toISOString())
        // JSON.stringify(
      /*request.output[reqNo].res.body.garage_id.should.be.eql(arg[0].garage_id)
      request.output[reqNo].res.body.name.should.be.eql(arg[1].name)
      request.output[reqNo].res.body.tel.should.be.eql(arg[2].tel)
      request.output[reqNo].res.body.rating.should.be.eql(arg[3].rating)
      request.output[reqNo].res.body.service_amount.should.be.eql(arg[4].service_amount)
      //*/
      reqNo = 1;
      for(var argName in obj)
        if(exceptList.indexOf(argName)==-1) request.output[reqNo].docs[argName].should.be.eql(obj[argName])
        else if(checkObjIdList.indexOf(argName)!=-1) request.output[reqNo].docs[argName].toString().should.be.eql(obj[argName])
      // obj.service_date.should.be.eql(request.output[reqNo].docs.service_date.toISOString())
      /*
      request.output[reqNo].docs.garage_id.should.be.eql(arg[0].garage_id)
      request.output[reqNo].docs.name.should.be.eql(arg[1].name)
      request.output[reqNo].docs.tel.should.be.eql(arg[2].tel)
      request.output[reqNo].docs.rating.should.be.eql(arg[3].rating)
      request.output[reqNo].docs.service_amount.should.be.eql(arg[4].service_amount)
      //*/
      done();
    })
    it('the record should had been shown when called getService', (done) =>
    {
      let reqNo = 2;
      let obj = request.output[reqNo].res.body[0];
      // console.log('----------------------------------')
      // console.log(obj);
      // console.log(request.output[reqNo+1].docs)
      let exceptList = ["updatedAt","createdAt","repair_list","status_list","part_id_list","service_date","user_id","mechanic_id","promotion_id","car_id"];
      let checkObjIdList = ["user_id","mechanic_id","promotion_id","car_id"]
      let timeCheckList = ["createdAt","updatedAt","service_date"]
      // for(var argName in obj)
      //   if(exceptList.indexOf(argName)==-1) request.output[reqNo].res.body[argName].should.be.eql(obj[argName])
      //   else if(checkObjIdList.indexOf(argName)!=-1) request.output[reqNo].res.body[argName].toString().should.be.eql(obj[argName])
      for(var argName in obj)
      {
        //console.log('argName = '+argName)
        if(argName.length>4 && exceptList.indexOf(argName)==-1)
          obj[argName].should.be.eql(request.output[reqNo+2].docs[argName])
        // else if(checkObjIdList.indexOf(argName)!=-1)
        // {
        //   obj[argName].toString().should.be.eql(request.output[reqNo+2].docs[argName].toString())
        // }
        else if(timeCheckList.indexOf(argName)!=-1)
          obj[argName].should.be.eql(request.output[reqNo+2].docs[argName].toISOString())
      }
      done();
    })
    it('the record should had been shown when called showService', (done) =>
    {
      let reqNo = 3;
      let obj = request.output[reqNo].res.body;
      // console.log('----------------------------------')
      // console.log(obj);
      // console.log(request.output[reqNo+1].docs)
      let exceptList = ["repair_list","status_list","part_id_list","user_id","mechanic_id","promotion_id","car_id"]
      let objTimeList = ["updatedAt","createdAt","service_date"]
      exceptList = exceptList.concat(objTimeList);
      for(var argName in obj)
      {
        // user_id when connect it become null, so I just left it out for now

        if(argName.length>4 && exceptList.indexOf(argName)==-1 )
        {
          obj[argName].should.be.eql(request.output[reqNo+1].docs[argName])
        }
        else if(objTimeList.indexOf(argName)!=-1)
        {
          obj[argName].should.be.eql(request.output[reqNo+1].docs[argName].toISOString())
        }
      }
      done();
    })
    it('the record should had been changed when called putService', (done) =>
    {
      //console.log('here we go')
      //console.log(request.output)
      let reqNo = 6;
      request.output[reqNo].docs.car_used_years.should.be.eql(365)
      //request.output[6].res.body.message.should.be.eql("you passed the test");
      done();
    });
    it('the record should had been removed when called deleteService', (done)=>
    {
      let reqNo = 7;
      request.output[reqNo].res.body.ok.should.be.eql(1);
      request.output[reqNo].res.body.n.should.be.eql(1);
      reqNo = 8;
      should.equal(null,request.output[reqNo].docs);
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
          let route = '/api/admins/request';
          let arg = request;
          // let obj = {car_model:'City',car_brand:'Honda',car_year:2012}
          let obj = {
            user_id:"581c0b75ec942200ca236ef7",
            mechanic_id:"581c0b75ec942200ca236ef7",
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
            let route = '/api/admins/request';
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 2
          function(arg,callback)
          {
            let route = '/api/admins/request';

            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 3
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='request',isDebug=isDebugTest)
          }, // request4
          function(arg,callback)
          {
            let route = '/api/admins/request',reqNo = 4;
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
            let route = '/api/admins/request',reqNo = 6;
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
      let reqNo = 0;
      let obj = {
        user_id:"581c0b75ec942200ca236ef7",
        mechanic_id:"581c0b75ec942200ca236ef7",
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
      let exceptList = ["request_time","reach_time","user_id","mechanic_id"]
      let objIdList = ["user_id","mechanic_id"]
      for(var argName in obj)
        if(exceptList.indexOf(argName)==-1)
          request.output[reqNo].res.body[argName].should.be.eql(obj[argName])
        else if(objIdList.indexOf(argName)!=-1)
          request.output[reqNo].res.body[argName].toString().should.be.eql(obj[argName])

      /*request.output[reqNo].res.body.garage_id.should.be.eql(arg[0].garage_id)
      request.output[reqNo].res.body.name.should.be.eql(arg[1].name)
      request.output[reqNo].res.body.tel.should.be.eql(arg[2].tel)
      request.output[reqNo].res.body.rating.should.be.eql(arg[3].rating)
      request.output[reqNo].res.body.service_amount.should.be.eql(arg[4].service_amount)
      //*/
      reqNo = 1;
      for(var argName in obj)
        if(exceptList.indexOf(argName)==-1)
          request.output[reqNo].docs[argName].should.be.eql(obj[argName])
        else if(objIdList.indexOf(argName)!=-1)
          request.output[reqNo].docs[argName].toString().should.be.eql(obj[argName])
      /*
      request.output[reqNo].docs.garage_id.should.be.eql(arg[0].garage_id)
      request.output[reqNo].docs.name.should.be.eql(arg[1].name)
      request.output[reqNo].docs.tel.should.be.eql(arg[2].tel)
      request.output[reqNo].docs.rating.should.be.eql(arg[3].rating)
      request.output[reqNo].docs.service_amount.should.be.eql(arg[4].service_amount)
      //*/
      done();
    })
    it('the record should had been shown when called getRequest', (done) =>
    {
      let reqNo = 2;
      let obj = request.output[reqNo].res.body[0];
      // console.log('----------------------------------')
      // console.log(obj);
      // console.log(request.output[reqNo+2].docs)
      let exceptList = ["updatedAt","createdAt",'reach_time','request_time','user_id','mechanic_id'];
      let timeCheckList = ["createdAt","updatedAt"]
      for(var argName in obj)
      {


        // for(var argName in obj)
        //   if(exceptList.indexOf(argName)==-1) request.output[reqNo].res.body[argName].should.be.eql(obj[argName])
        //   else if(checkObjIdList.indexOf(argName)!=-1) request.output[reqNo].res.body[argName].toString().should.be.eql(obj[argName])

          if(argName.length>4 && exceptList.indexOf(argName)==-1)
            obj[argName].should.be.eql(request.output[reqNo+2].docs[argName])
          else if(timeCheckList.indexOf(argName)!=-1)
            obj[argName].should.be.eql(request.output[reqNo+2].docs[argName].toISOString())

        // if(argName.length>4 && argName!='updatedAt' && argName!='createdAt' && argName!='reach_time' && argName!='request_time')
        //   obj[argName].should.be.eql(request.output[reqNo+2].docs[argName])
        // obj.createdAt.should.be.eql(request.output[reqNo+2].docs.createdAt.toISOString())
        // obj.updatedAt.should.be.eql(request.output[reqNo+2].docs.updatedAt.toISOString())
      }
      done();
    })
    it('the record should had been changed when called putRequest', (done) =>
    {
      //console.log('here we go')
      //console.log(request.output)
      let reqNo = 6;
      request.output[reqNo].docs.mechanic_reach.should.be.eql(1)
      //request.output[7].res.body.message.should.be.eql("you passed the test");
      done();
    });
    it('the record should had been removed when called deleteRequest', (done)=>
    {
      let reqNo = 7;
      request.output[reqNo].res.body.ok.should.be.eql(1);
      request.output[reqNo].res.body.n.should.be.eql(1);
      reqNo = 8;
      should.equal(null,request.output[reqNo].docs);
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
          let route = '/api/admins/billing';
          let arg = request;
          let obj = {
            user_id:"581c0b75ec942200ca236ef7",
            service_id:"581c0b75ec942200ca236ef7",
            price:125677
          }
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
        }, // request0
          /*
          function(arg,callback){
            callback(callback,arg)
          } // request...//*/
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='billing',isDebug=isDebugTest)
          }, // request1
          function(arg,callback)
          {
            let route = '/api/admins/billing';
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 2
          function(arg,callback)
          {
            let route = '/api/admins/billing';
            // route += '/'+arg.output[2].res.body[0]._id;

            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 3
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='billing',isDebug=isDebugTest)
          }, // request4
          function(arg,callback)
          {
            let route = '/api/admins/billing',reqNo = 4;
            //console.log('arg.output = ')
            //console.log(arg.output)
            route += '/'+arg.output[2].res.body[0]._id;
            let obj = {price:10200};
            // let obj = {id:arg.output[2].res.body[0]._id,price:10200};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).put(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 5
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='billing',isDebug=isDebugTest)
          }, // request6
          function(arg,callback)
          {
            let route = '/api/admins/billing',reqNo = 6;
            route += '/'+arg.output[2].res.body[0]._id;
            // let obj = {id:arg.output[2].res.body[0]._id};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).delete(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 7
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='billing',isDebug=isDebugTest)
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
    it('the record should had been created when called postBilling', (done) =>
    {
      let reqNo = 0;
      let obj = {
        user_id:"581c0b75ec942200ca236ef7",
        service_id:"581c0b75ec942200ca236ef7",
        price:125677
      }

      //isDebugTest = true;
      //testController.testCheckResponse(request.output[reqNo].res,arg,isDebug=isDebugTest);
      //console.log("request.output[0].res= ")
      //console.log(request.output[reqNo].res)
      // console.log(request.output)
      for(var argName in obj)
        request.output[reqNo].res.body[argName].toString().should.be.eql(obj[argName].toString())
      /*request.output[reqNo].res.body.garage_id.should.be.eql(arg[0].garage_id)
      request.output[reqNo].res.body.name.should.be.eql(arg[1].name)
      request.output[reqNo].res.body.tel.should.be.eql(arg[2].tel)
      request.output[reqNo].res.body.rating.should.be.eql(arg[3].rating)
      request.output[reqNo].res.body.service_amount.should.be.eql(arg[4].service_amount)
      //*/
      reqNo = 1;
      for(var argName in obj)
        request.output[reqNo].docs[argName].toString().should.be.eql(obj[argName].toString())
      /*
      request.output[reqNo].docs.garage_id.should.be.eql(arg[0].garage_id)
      request.output[reqNo].docs.name.should.be.eql(arg[1].name)
      request.output[reqNo].docs.tel.should.be.eql(arg[2].tel)
      request.output[reqNo].docs.rating.should.be.eql(arg[3].rating)
      request.output[reqNo].docs.service_amount.should.be.eql(arg[4].service_amount)
      //*/
      done();
    })
    it('the record should had been shown when called getBilling', (done) =>
    {
      let reqNo = 2;
      let obj = request.output[reqNo].res.body[0];
      // console.log('----------------------------------')
      // console.log(obj);
      // console.log(request.output[reqNo+2].docs)
      let exceptList = ['updatedAt','createdAt','service_id','user_id']
      let timeList = ['updatedAt','createdAt'];
      for(var argName in obj)
      {
        //console.log('argName = '+argName)
        if(argName.length>4 && exceptList.indexOf(argName)==-1)
          obj[argName].should.be.eql(request.output[reqNo+2].docs[argName])
        else if(timeList.indexOf(argName)!=-1)
          obj[argName].should.be.eql(request.output[reqNo+2].docs[argName].toISOString())
      }
      done();
    })
    it('the record should had been shown when called showBilling', (done) =>
    {
      let reqNo = 3;
      let obj = request.output[reqNo].res.body;
      // console.log('----------------------------------')
      // console.log(obj);
      // console.log(request.output[reqNo+1].docs)
      let exceptList = ['updatedAt','createdAt','service_id','user_id']
      let timeList = ['updatedAt','createdAt'];
      for(var argName in obj)
      {
        //console.log('argName = '+argName)
        if(argName.length>4 && exceptList.indexOf(argName)==-1)
          obj[argName].should.be.eql(request.output[reqNo+1].docs[argName])
        else if(timeList.indexOf(argName)!=-1)
          obj[argName].should.be.eql(request.output[reqNo+1].docs[argName].toISOString())
      }
      done();
    })
    it('the record should had been changed when called putBilling', (done) =>
    {
      //console.log('here we go')
      //console.log(request.output)
      let reqNo = 6;
      request.output[reqNo].docs.price.should.be.eql(10200)
      //request.output[6].res.body.message.should.be.eql("you passed the test");
      done();
    });
    it('the record should had been removed when called deleteBilling', (done)=>
    {
      let reqNo = 7;
      request.output[reqNo].res.body.ok.should.be.eql(1);
      request.output[reqNo].res.body.n.should.be.eql(1);
      reqNo = 8;
      should.equal(null,request.output[reqNo].docs);
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
          let route = '/api/admins/promotion';
          let arg = request;
          let obj = {
            promotion_type:"winter sale",
            discount_price:1250,
            discount_percent:10
          }
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
        }, // request0
          /*
          function(arg,callback){
            callback(callback,arg)
          } // request...//*/
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='promotion',isDebug=isDebugTest)
          }, // request1
          function(arg,callback)
          {
            let route = '/api/admins/promotion';
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 2
          function(arg,callback)
          {
            let route = '/api/admins/promotion';
            route += '/'+arg.output[2].res.body[0]._id;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 3
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='promotion',isDebug=isDebugTest)
          }, // request4
          function(arg,callback)
          {
            let route = '/api/admins/promotion',reqNo = 4;
            //console.log('arg.output = ')
            //console.log(arg.output)
            route += '/'+arg.output[2].res.body[0]._id;
            let obj = {discount_percent:15};
            // let obj = {id:arg.output[2].res.body[0]._id,discount_percent:15};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).put(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 5
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='promotion',isDebug=isDebugTest)
          }, // request6
          function(arg,callback)
          {
            let route = '/api/admins/promotion',reqNo = 6;
            route += '/'+arg.output[2].res.body[0]._id;
            // let obj = {id:arg.output[2].res.body[0]._id};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).delete(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 7
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='promotion',isDebug=isDebugTest)
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
    it('the record should had been created when called postPromotion', (done) =>
    {
      let reqNo = 0;
      let obj = {
        promotion_type:"winter sale",
        discount_price:1250,
        discount_percent:10
      }

      //isDebugTest = true;
      //testController.testCheckResponse(request.output[reqNo].res,arg,isDebug=isDebugTest);
      //console.log("request.output[0].res= ")
      //console.log(request.output[reqNo].res)
      // console.log(request.output)
      for(var argName in obj)
        request.output[reqNo].res.body[argName].should.be.eql(obj[argName])
      /*request.output[reqNo].res.body.garage_id.should.be.eql(arg[0].garage_id)
      request.output[reqNo].res.body.name.should.be.eql(arg[1].name)
      request.output[reqNo].res.body.tel.should.be.eql(arg[2].tel)
      request.output[reqNo].res.body.rating.should.be.eql(arg[3].rating)
      request.output[reqNo].res.body.service_amount.should.be.eql(arg[4].service_amount)
      //*/
      reqNo = 1;
      for(var argName in obj)
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
    it('the record should had been shown when called getPromotion', (done) =>
    {
      let reqNo = 2;
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
      let reqNo = 3;
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
      let reqNo = 6;
      request.output[reqNo].docs.discount_percent.should.be.eql(15)
      //request.output[6].res.body.message.should.be.eql("you passed the test");
      done();
    });
    it('the record should had been removed when called deletePromotion', (done)=>
    {
      let reqNo = 7;
      request.output[reqNo].res.body.ok.should.be.eql(1);
      request.output[reqNo].res.body.n.should.be.eql(1);
      reqNo = 8;
      should.equal(null,request.output[reqNo].docs);
      done();
    })
    // end of test here
    // for getPartPerWeek test
    //db.services.update({_id:ObjectId('580ee536f9208d002c18d609')},{createdAt:new Date('2016-10-15T04:48:03.408Z')})
  }); //*/ //end of template here
});
