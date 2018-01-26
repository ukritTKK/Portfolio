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
var Part = require('../models/part')

let isDebugTest = false;
chai.use(chaiHttp);
// start of parent block
describe('Garage CRUD permission test', () =>
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
        // function(arg,callback)
        // {
        //   let route = '/api/garages/mechanic';
        //   //let arg = request;
        //   let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
        //   let reqNo = 2; token = arg.output[reqNo-1].res.body.token;
        //   testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
        // }, // request2
        function(arg,callback)
        {
          let reqNo = 4;
          token = arg.output[3].res.body.token;
          let route = '/api/garages/mechanic';
          // let arg = request;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
            .field('name',obj.name).field('tel',obj.tel)
            .field('rating',obj.rating).field('service_amount',obj.service_amount)////.set('Content-Type','multipart/form-data')
            .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
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
            route += '/'+arg.output[4].res.body.obj._id;
            //let arg = request;

            let reqNo = 6; token = arg.output[3].res.body.token;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request6
          function(arg,callback)
          {
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
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='mechanic',isDebug=isDebugTest)
          }, // request10
          function(arg,callback)
          {
            let route = '/api/garages/mechanic',reqNo = 3;
            route += '/'+arg.output[4].res.body.obj._id;
            let obj = {name:'thanawat wong',tel:'081-929-9999'};
            // let obj = {id:arg.output[4].res.body[0]._id,name:'thanawat wong',tel:'081-929-9999'};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).delete(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 11
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='mechanic',isDebug=isDebugTest)
          }, // request12
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='garage',isDebug=isDebugTest)
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
    it('the record should had been created when called postMechanic', (done) =>
    {
      let reqNo = 4;
      let arg  = {garage_id:request.output[2].res.body.obj._id ,name:'thanawat mangnee',tel:'089-999-9999',rating:4,service_amount:3};
      testController.testCheckResponse_2(request.output[reqNo].res,arg,isDebug=isDebugTest,request.output[reqNo].res.body.obj);
      reqNo = 5;
      testController.testCheckResponse_2("mongo",arg,isDebug=isDebugTest,request.output[reqNo].docs);
      done();
    })
    it('the record should had been shown when called showMechanic', (done) =>
    {
      let reqNo = 6;
      let obj = request.output[reqNo].res.body.obj;
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
      let reqNo = 7;
      let obj = request.output[reqNo].res.body[0];
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
    it('the record should had been changed when called putMechanic', (done) =>
    {
      let reqNo = 10;
      request.output[reqNo].docs.name.should.be.eql('thanawat wong')
      //request.output[6].res.body.message.should.be.eql("you passed the test");
      done();
    });
    it('when called deleteMechanic, the route should not exist', (done)=>
    {
      let reqNo = 11;
      // request.output[reqNo].res.body.ok.should.be.eql(1);
      // request.output[reqNo].res.body.n.should.be.eql(1);

      request.output[reqNo].res.status.should.be.eql(404);
      reqNo = 12;
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
        //   let route = '/api/garages/part';
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
            token = arg.output[1].res.body.token;
            let route = '/api/admins/part';
            // let arg = request;
            let obj = {garage_id:'zJELcGlf1gsjbcqy',part_number:'WH31U-82TAA',name:'วาล์วน้ำ',image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg',price:1090,amount:20}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
              .field('part_number',obj.part_number).field('name',obj.name).field('image_url',obj.image_url)
              .field('price',obj.price).field('amount',obj.amount)////.set('Content-Type','multipart/form-data')
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 4;
          /*
          function(arg,callback){
            callback(callback,arg)
          } // request...//*/
          function(arg,callback)
          {
            token = arg.output[3].res.body.token;
            testController.testGetModel(callback,arg,modelName='part',isDebug=isDebugTest)
          }, // request5
          function(arg,callback)
          {
            let route = '/api/garages/part';
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 6
          function(arg,callback)
          {
            let route = '/api/garages/part';
            if(arg.output[6].res.hasOwnProperty('body')
            && arg.output[6].res.body.hasOwnProperty(0)
            && arg.output[6].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[6].res.body[0]._id;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 7
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='part',isDebug=isDebugTest)
          }, // request8
          function(arg,callback)
          {
            let route = '/api/garages/part',reqNo = 9;
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
            let route = '/api/garages/part',reqNo = 11;
            if(arg.output[6].res.hasOwnProperty('body')
            && arg.output[6].res.body.hasOwnProperty(0)
            && arg.output[6].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[6].res.body[0]._id;
            let obj = {part_number:'WH31U-82TAA-NEW'};
            // let obj = {id:arg.output[2].res.body[0]._id,part_number:'WH31U-82TAA-NEW'};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).delete(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 11
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='part',isDebug=isDebugTest)
          }, // request12
          function(arg,callback)
          {
            Part.remove({}).exec(function(err,docs)
            {
              if(docs) callback(err,arg)
            })
          },
          function(arg,callback)
          {
            let reqNo = 13;
            let route = '/api/garages/part';
            // let arg = request;
            let obj = {garage_id:'zJELcGlf1gsjbcqy',part_number:'WH31U-82TAA',name:'วาล์วน้ำ',image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg',price:1090,amount:20}
            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
              .field('part_number',obj.part_number).field('name',obj.name).field('image_url',obj.image_url)
              .field('price',obj.price).field('amount',obj.amount)////.set('Content-Type','multipart/form-data')
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
              .set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 13;
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='part',isDebug=isDebugTest)
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
    it('when called postPart, the route should not exist', (done) =>
    {
      let reqNo = 13;
      let obj = {part_number:'WH31U-82TAA',name:'วาล์วน้ำ'/*,image_url:'http://wi.th/automartservicerepair/assets/img/acc4.jpg'//*/,price:1090,amount:20}
      request.output[reqNo].res.status.should.be.eql(404);
      reqNo = 14;
      should.equal(null,request.output[reqNo].docs)
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
        if(argName.length>4 && argName!='updatedAt' && argName!='createdAt' && argName!='message')
          obj[argName].should.be.eql(request.output[reqNo+1].docs[argName])
        obj.createdAt.should.be.eql(request.output[reqNo+1].docs.createdAt.toISOString())
        obj.updatedAt.should.be.eql(request.output[reqNo+1].docs.updatedAt.toISOString())
      }
      done();
    })
    it('should not be called as putPart route not exist for a garage', (done) =>
    {
      //console.log('here we go')
      //console.log(request.output)
      let reqNo = 9;
      request.output[reqNo].res.status.should.be.eql(404);
      // request.output[reqNo].docs.part_number.should.be.eql('WH31U-82TAA-NEW')
      //request.output[6].res.body.message.should.be.eql("you passed the test");
      done();
    });
    it('the record should not had been removed when called deletePart', (done)=>
    {
      let reqNo = 11;
      request.output[reqNo].res.status.should.be.eql(404);
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
          token = arg.output[1].res.body.token;
          let route = '/api/admins/car';
          let obj = {car_model:'City',car_brand:'Honda',car_year:2012}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).post(route).field('car_model',obj.car_model)
            .field('car_brand',obj.car_brand).field('car_year',obj.car_year)
            .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token).send(obj),isDebug=isDebugTest);

        }, // request4
          /*
          function(arg,callback){
            callback(callback,arg)
          } // request...//*/
          function(arg,callback)
          {
            token = arg.output[3].res.body.token;
            testController.testGetModel(callback,arg,modelName='car',isDebug=isDebugTest)
          }, // request5
          function(arg,callback)
          {
            let route = '/api/garages/car';
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 6
          function(arg,callback)
          {
            let route = '/api/garages/car';
            if(arg.output[6].res.hasOwnProperty('body')
            && arg.output[6].res.body.hasOwnProperty(0)
            && arg.output[6].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[6].res.body[0]._id;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 7
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='car',isDebug=isDebugTest)
          }, // request8
          function(arg,callback)
          {
            let route = '/api/garages/car',reqNo = 9;
            route += '/'+arg.output[6].res.body[0]._id;

            let obj = {car_model:'Jazz'};
            // let obj = {id:arg.output[2].res.body[0]._id,car_model:'Jazz'};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).put(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 9
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='car',isDebug=isDebugTest)
          }, // request10
          function(arg,callback)
          {
            let route = '/api/garages/car',reqNo = 11;
            route += '/'+arg.output[6].res.body[0]._id;
            // let obj = {id:arg.output[2].res.body[0]._id};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).delete(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 11
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='car',isDebug=isDebugTest)
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
      let reqNo = 4;
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
      reqNo = 5;
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
    it('the record should had been shown when called showCar', (done) =>
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
    it('the record should had been changed when called putCar', (done) =>
    {
      let reqNo = 10;
      request.output[reqNo].docs.car_model.should.be.eql('City') //Jazz, in case you want to check if it change, use this
      //request.output[6].res.body.message.should.be.eql("you passed the test");
      done();
    });
    it('when called deleteCar, the route should not exist', (done)=>
    {
      let reqNo = 11;
      // request.output[reqNo].res.body.ok.should.be.eql(1);
      // request.output[reqNo].res.body.n.should.be.eql(1);
      // reqNo = 9;
      // should.equal(null,request.output[reqNo].docs);
      request.output[reqNo].res.status.should.be.eql(404);
      reqNo = 12;
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
          let route = '/api/garages/user';
          let reqNo = 4;
          token = arg.output[reqNo-1].res.body.token;
          // let arg = request;
          let obj = {username:'david',password:'99',name:"David","email":"david@gg.g",home_address:"222/20",home_address_lat:13.295761,home_address_lng:100.251065,tel:"02-668-3578"}
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
        }, // request4
          /*
          function(arg,callback){
            callback(callback,arg)
          } // request...//*/
          function(arg,callback)
          {
            testController.testGetModelMultiple(callback,arg,modelName='user',isDebug=isDebugTest)
          }, // request5
          function(arg,callback)
          {
            let route = '/api/garages/user';
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 6
          function(arg,callback)
          {
            let route = '/api/garages/user';

            if(arg.output[6].res.hasOwnProperty('body')
            && arg.output[6].res.body.hasOwnProperty(0)
            && arg.output[6].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[6].res.body[0]._id;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 7
          function(arg,callback)
          {
            testController.testGetModelMultiple(callback,arg,modelName='user',isDebug=isDebugTest)
          }, // request8
          function(arg,callback)
          {
            let route = '/api/garages/user',reqNo = 9;
            if(arg.output[6].res.hasOwnProperty('body')
            && arg.output[6].res.body.hasOwnProperty(0)
            && arg.output[6].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[6].res.body[0]._id;

            // console.log('arg.output = ')
            // console.log(arg.output)
            // console.log(arg.output[2].res.body[0])
            let obj = {name:'Joe'};
            // let obj = {id:arg.output[2].res.body[0]._id,name:'Joe'};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).put(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 9
          function(arg,callback)
          {
            testController.testGetModelMultiple(callback,arg,modelName='user',isDebug=isDebugTest)
          }, // request10
          function(arg,callback)
          {
            let route = '/api/garages/user',reqNo = 11;
            if(arg.output[6].res.hasOwnProperty('body')
            && arg.output[6].res.body.hasOwnProperty(0)
            && arg.output[6].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[6].res.body[0]._id;
            // let obj = {id:arg.output[6].res.body[0]._id};
            // console.log(arg.output[6].res.body[0]._id)
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).delete(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 11
          function(arg,callback)
          {
            testController.testGetModelMultiple(callback,arg,modelName='user',isDebug=isDebugTest)
          }, // request12
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
      // console.log('the record should had been created when called postUser')
      let reqNo = 4;
      let obj = {username:'david',password:'99',user_type:0,name:"David","email":"david@gg.g",home_address:"222/20",home_address_lat:13.295761,home_address_lng:100.251065,tel:"02-668-3578"}
      request.output[reqNo].res.status.should.be.eql(404)
      done();
    })
    it('the record should had been shown when called getUser', (done) =>
    {
      let reqNo = 6;
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
    it('when called showUser, it should only show the user of garage', (done) =>
    {
      let reqNo = 7;
      // TODO: check what you should check with showUser
      let obj = request.output[reqNo].res.body;
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
      request.output[reqNo].res.status.should.be.eql(200);
      reqNo = 10;
      // should.equal([],request.output[reqNo].docs)
      request.output[reqNo].docs[0].name.should.be.eql('Joe')

      //request.output[6].res.body.message.should.be.eql("you passed the test");
      done();
    });

    it('the record should had been removed when called deleteUser', (done)=>
    {
      let reqNo = 11;
      // request.output[reqNo].res.body.ok.should.be.eql(1);
      // request.output[reqNo].res.body.n.should.be.eql(1);

      // request.output[reqNo].res.body.message.should.be.eql("You are not the admin, so you can\'t use this function.");
      request.output[reqNo].res.status.should.be.eql(404);
      reqNo = 12;
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
        //   let route = '/api/garages/garage';
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
          let route = '/api/garages/garage';
          token = arg.output[reqNo-1].res.body.token;
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
        }, // request4
          /*
          function(arg,callback){
            callback(callback,arg)
          } // request...//*/
          function(arg,callback)
          {
            testController.testGetModelMultiple(callback,arg,modelName='garage',isDebug=isDebugTest)
          }, // request5
          function(arg,callback)
          {
            let route = '/api/garages/garage';
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 6
          function(arg,callback)
          {
            let route = '/api/garages/garage';
            if(arg.output[6].res.hasOwnProperty('body')
            && arg.output[6].res.body.hasOwnProperty(0)
            && arg.output[6].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[6].res.body[0]._id;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 7
          function(arg,callback)
          {
            testController.testGetModelMultiple(callback,arg,modelName='garage',isDebug=isDebugTest)
          }, // request8
          function(arg,callback)
          {
            let route = '/api/garages/garage',reqNo = 9;
            // console.log('arg.output = ')
            // console.log(arg.output)
            // console.log(arg.output[8].res.body[0])
            if(arg.output[6].res.hasOwnProperty('body')
            && arg.output[6].res.body.hasOwnProperty(0)
            && arg.output[6].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[6].res.body[0]._id;
            let obj = {rating:5};
            // let obj = {id:arg.output[2].res.body[0]._id,rating:5};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).put(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 9
          function(arg,callback)
          {
            testController.testGetModelMultiple(callback,arg,modelName='garage',isDebug=isDebugTest)
          }, // request10
          function(arg,callback)
          {
            let route = '/api/garages/garage',reqNo = 11;
            if(arg.output[6].res.hasOwnProperty('body')
            && arg.output[6].res.body.hasOwnProperty(0)
            && arg.output[6].res.body[0].hasOwnProperty('_id') )
              route += '/'+arg.output[6].res.body[0]._id;
            // let obj = {id:arg.output[2].res.body[0]._id};
            // console.log(arg.output[2].res.body[0]._id)
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).delete(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 11
          function(arg,callback)
          {
            testController.testGetModelMultiple(callback,arg,modelName='garage',isDebug=isDebugTest)
          }, // request12
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
      // console.log('----------------------------------')
      // console.log('the record should had been created when called postGarage')
      let reqNo = 4;
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
        "mechanic_id_list":["1","2"],
        "part_id_list":["3","4"]

      }
      request.output[reqNo].res.status.should.be.eql(404);
      // for(var argName in obj)
      // {
      //   if(argName!='password' && argName!='mechanic_id_list' && argName!='part_id_list')
      //     request.output[reqNo].res.body.obj[argName].should.be.eql(obj[argName])
      //   else if(argName!='password')
      //     JSON.stringify(request.output[reqNo].res.body.obj[argName]).should.be.eql(JSON.stringify(obj[argName]))
      // }
      // /*request.output[reqNo].res.body.garage_id.should.be.eql(arg[0].garage_id)
      // request.output[reqNo].res.body.name.should.be.eql(arg[1].name)
      // request.output[reqNo].res.body.tel.should.be.eql(arg[2].tel)
      // request.output[reqNo].res.body.rating.should.be.eql(arg[3].rating)
      // request.output[reqNo].res.body.service_amount.should.be.eql(arg[4].service_amount)
      // //*/
      reqNo = 5;
      JSON.stringify(request.output[reqNo].docs).should.not.be.eql('[]');
      // for(var argName in obj)
      //   if(argName!='password'  && argName!='mechanic_id_list' && argName!='part_id_list')
      //     request.output[reqNo].docs[0][argName].should.be.eql(obj[argName])
      //   else if(argName!='password')
      //     JSON.stringify(request.output[reqNo].docs[0][argName]).should.be.eql(JSON.stringify(obj[argName]))
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
      let reqNo = 6;
      // let obj = request.output[reqNo].res.body[0];
      // // console.log('----------------------------------')
      // // console.log('the record should had been shown when called getGarage')
      // // console.log(request.output[reqNo].res.body)
      // // console.log('obj = ')
      // // console.log(obj);
      // // console.log(request.output[reqNo+1].docs)
      // // console.log('abcd')
      // // console.log(request.output[reqNo+2].docs[0])
      // request.output[reqNo].res.body.should.not.have.property('password')
      // for(var argName in obj)
      // {
      //   // console.log('argName = '+argName)
      //   // console.log(obj[argName])
      //   // console.log(request.output[reqNo+2].docs[0][argName])
      //   // console.log(typeof obj[argName])
      //   // console.log(typeof request.output[reqNo+2].docs[0][argName])
      //   // console.log(obj[argName][0])
      //   // console.log(request.output[reqNo+2].docs[0][argName][0])
      //   // console.log(typeof obj[argName][0])
      //   // console.log(typeof request.output[reqNo+2].docs[0][argName][0])
      //   // console.log(JSON.stringify(obj[argName]))
      //   // console.log(JSON.stringify(request.output[reqNo+2].docs[0][argName]))
      //   // console.log(typeof JSON.stringify(obj[argName]))
      //   // console.log(typeof JSON.stringify(request.output[reqNo+2].docs[0][argName]))
      //   if(argName.length>4 && argName!='updatedAt' && argName!='createdAt' && argName!='password' && argName!='mechanic_id_list[]' && argName!='part_id_list[]' && argName!='mechanic_id_list' && argName!='part_id_list')
      //     obj[argName].should.be.eql(request.output[reqNo+2].docs[0][argName])
      //   else if(argName.length>4 && argName!='updatedAt' && argName!='createdAt' && argName!='password')
      //     JSON.stringify(obj[argName]).should.be.eql(JSON.stringify(request.output[reqNo+2].docs[0][argName]))
      //
      //   obj.createdAt.should.be.eql(request.output[reqNo+2].docs[0].createdAt.toISOString())
      //   obj.updatedAt.should.be.eql(request.output[reqNo+2].docs[0].updatedAt.toISOString())
      // }
      JSON.stringify(request.output[reqNo].res.body).should.not.be.eql('[]');
      done();
    })
    it('the record should had been shown when called showGarage', (done) =>
    {
      let reqNo = 7;
      // let obj = request.output[reqNo].res.body;
      // // console.log('----------------------------------')
      // // console.log('the record should had been shown when called showGarage')
      // // console.log(request.output[reqNo].res.body)
      // // console.log('obj = ')
      // // console.log(obj);
      // // console.log(request.output[reqNo+1].docs)
      // // console.log('abcd')
      // // console.log(request.output[reqNo+1].docs[0])
      // request.output[reqNo].res.body.should.not.have.property('password')
      // for(var argName in obj)
      // {
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
        // if(argName.length>4 && argName!='updatedAt' && argName!='createdAt' && argName!='password' && argName!='mechanic_id_list[]' && argName!='part_id_list[]' && argName!='mechanic_id_list' && argName!='part_id_list')
        //   obj[argName].should.be.eql(request.output[reqNo+1].docs[0][argName])
        // else if(argName.length>4 && argName!='updatedAt' && argName!='createdAt' && argName!='password')
        //   JSON.stringify(obj[argName]).should.be.eql(JSON.stringify(request.output[reqNo+1].docs[0][argName]))

        // obj.createdAt.should.be.eql(request.output[reqNo+1].docs[0].createdAt.toISOString())
        // obj.updatedAt.should.be.eql(request.output[reqNo+1].docs[0].updatedAt.toISOString())
      // }
      JSON.stringify(request.output[reqNo].res.body).should.not.be.eql('[]');
      done();
    })
    it('the record should had been changed when called putGarage', (done) =>
    {
      //console.log('here we go')
      //console.log(request.output)
      let reqNo = 10;
      // request.output[reqNo].docs[0].rating.should.be.eql(5)
      JSON.stringify(request.output[reqNo].docs).should.not.be.eql('[]');
      //request.output[6].res.body.message.should.be.eql("you passed the test");
      done();
    });

    it('the record should had been removed when called deleteGarage', (done)=>
    {
      let reqNo = 11;
      // request.output[reqNo].res.body.ok.should.be.eql(1);
      // request.output[reqNo].res.body.n.should.be.eql(1);
      request.output[reqNo].res.status.should.be.eql(404);
      reqNo = 12;
      // should.equal(false,request.output[reqNo].docs.hasOwnProperty(1));
      JSON.stringify(request.output[reqNo].docs).should.not.be.eql('[]');
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
        // function(arg,callback)
        // {
        //   let route = '/api/garages/mechanic';
        //   //let arg = request;
        //   let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
        //   let reqNo = 2; token = arg.output[reqNo-1].res.body.token;
        //   testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
        // }, // request2
        function(arg,callback)
        {
          let reqNo = 4;
          token = arg.output[3].res.body.token;
          let route = '/api/garages/mechanic';
          // let arg = request;
          let obj = {garage_id:arg.output[reqNo-2].res.body.obj._id,name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
            .field('name',obj.name).field('tel',obj.tel)
            .field('rating',obj.rating).field('service_amount',obj.service_amount)////.set('Content-Type','multipart/form-data')
            .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
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
          let reqNo = 6;
          let route = '/api/garages/service';
          // let arg = request;
          let year = 2016, month = 10, date = 20;
          // let date1 = new Date(year,month,date,00,00);
          // let date2 = new Date(year,month,date+2,00,00);
          // let date3 = new Date(year,month,date+3,00,00);
          let date1 = date2 = date3 = "2016-06-03T10:34"
          let obj ={
                      user_id:"5",
                      mechanic_id:arg.output[reqNo-2].res.body.obj._id,
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
        }, // request6
          /*
          function(arg,callback){
            callback(callback,arg)
          } // request...//*/
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='service',isDebug=isDebugTest)
          }, // request7
          function(arg,callback)
          {
            let route = '/api/garages/service';
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 8
          function(arg,callback)
          {
            let route = '/api/garages/service';
            route += '/'+arg.output[8].res.body[0]._id;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 9
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='service',isDebug=isDebugTest)
          }, // request10
          function(arg,callback)
          {
            let route = '/api/garages/service',reqNo = 11;
            // console.log('arg.output = ')
            // console.log(arg.output)
            // console.log('arg.output[2].res.body =')
            // console.log(arg.output[2].res.body);
            route += '/'+arg.output[8].res.body[0]._id;
            let obj = {car_used_years:365};
            // let obj = {id:arg.output[2].res.body[0]._id,car_used_years:365};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).put(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 11
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='service',isDebug=isDebugTest)
          }, // request12
          function(arg,callback)
          {
            let route = '/api/garages/service',reqNo = 13;
            route += '/'+arg.output[8].res.body[0]._id;
            // let obj = {id:arg.output[2].res.body[0]._id};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).delete(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 13
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='service',isDebug=isDebugTest)
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
    it('the record should had been created when called postService', (done) =>
    {
      let reqNo = 6;
      let year = 2016, month = 10, date = 20;
      let date1 = new Date(year,month,date,0,0);
      let date2 = new Date(year,month,date+2,0,0);
      let date3 = new Date(year,month,date+3,0,0);
      let obj ={
                  user_id:"5",
                  // mechanic_id:"1",
                  promotion_id:"6",
                  car_id:"7",
                  car_miles:90,
                  car_used_years:386,
                  part_id_list:["8","9"],
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

      for(var argName in obj)
        if(argName!="repair_list" && argName!="status_list" && argName!="part_id_list" && argName!="service_date") request.output[reqNo].res.body[argName].should.be.eql(obj[argName])
      // obj.service_date.should.be.eql(request.output[reqNo].res.body.service_date.toISOString())
        // JSON.stringify(
      /*request.output[reqNo].res.body.garage_id.should.be.eql(arg[0].garage_id)
      request.output[reqNo].res.body.name.should.be.eql(arg[1].name)
      request.output[reqNo].res.body.tel.should.be.eql(arg[2].tel)
      request.output[reqNo].res.body.rating.should.be.eql(arg[3].rating)
      request.output[reqNo].res.body.service_amount.should.be.eql(arg[4].service_amount)
      //*/
      reqNo = 7;
      for(var argName in obj)
        if(argName!="repair_list" && argName!="status_list" && argName!="part_id_list" && argName!="service_date") request.output[reqNo].docs[argName].should.be.eql(obj[argName])
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
      let reqNo = 8;
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
      let reqNo = 9;
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
    it('the record should had been changed when called putService', (done) =>
    {
      //console.log('here we go')
      //console.log(request.output)
      let reqNo = 12;
      request.output[reqNo].docs.car_used_years.should.be.eql(365)
      //request.output[6].res.body.message.should.be.eql("you passed the test");
      done();
    });
    it('when called deleteService, the route should not exist', (done)=>
    {
      let reqNo = 13;
      // request.output[reqNo].res.body.ok.should.be.eql(1);
      // request.output[reqNo].res.body.n.should.be.eql(1);
      request.output[reqNo].res.status.should.be.eql(404);
      reqNo = 14;
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
        // the test process, create the request as follows:
        // admin -> garage -> mech -> request
        function(callback)
        {
          let Model, modelList = {mechanic:'',part:'',car:'',user:'',service:'',request:'',billing:'',promotion:'',garage:''};//modelList = {client:'',user:'',code:'',mechanic:''};
          for(var modelName in modelList)
            if(testController.testDropModel(function(){},modelName)==0) console.log("ERROR: can't delete database "+modelName);
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
        // function(arg,callback)
        // {
        //   let route = '/api/garages/mechanic';
        //   //let arg = request;
        //   let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
        //   let reqNo = 2; token = arg.output[reqNo-1].res.body.token;
        //   testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
        // }, // request2
        function(arg,callback)
        {
          let reqNo = 4;
          token = arg.output[3].res.body.token;
          let route = '/api/garages/mechanic';
          // let arg = request;

          let obj = {garage_id:arg.output[reqNo-2].res.body.obj._id,name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
            .field('name',obj.name).field('tel',obj.tel)
            .field('rating',obj.rating).field('service_amount',obj.service_amount)////.set('Content-Type','multipart/form-data')
            .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
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
          let reqNo = 6;
          let route = '/api/admins/request';
          let obj = {
            user_id:"1",
            mechanic_id:arg.output[reqNo-2].res.body.obj._id,
            mechanic_reach:0,
            location_lat:13.682659,
            location_lng:100.957553,
            request_time:'2016-06-03T10:34',
            reach_time:'2016-06-03T10:34'
          }
          let token = arg.output[1].res.body.token;
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
        }, // request6
          /*
          function(arg,callback){
            callback(callback,arg)
          } // request...//*/
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='request',isDebug=isDebugTest)
          }, // request7
          function(arg,callback)
          {
            let route = '/api/garages/request';
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 8
          function(arg,callback)
          {
            let route = '/api/garages/request';
            route += '/'+arg.output[8].res.body[0]._id;

            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 9
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='request',isDebug=isDebugTest)
          }, // request10
          function(arg,callback)
          {
            let route = '/api/garages/request',reqNo = 11;
            //console.log('arg.output = ')
            //console.log(arg.output)
            route += '/'+arg.output[8].res.body[0]._id;
            let obj = {mechanic_reach:1};
            // let obj = {id:arg.output[2].res.body[0]._id,mechanic_reach:1};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).put(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 11
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='request',isDebug=isDebugTest)
          }, // request12
          function(arg,callback)
          {
            let route = '/api/garages/request',reqNo = 13;
            route += '/'+arg.output[8].res.body[0]._id;
            // let obj = {id:arg.output[2].res.body[0]._id};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).delete(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 13
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='request',isDebug=isDebugTest)
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
    it('the record should had been created when called postRequest', (done) =>
    {
      let reqNo = 6;
      let obj = {
        user_id:"1",
        // mechanic_id:"2",
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
      reqNo = 7;
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
    it('the record should had been shown when called getRequest', (done) =>
    {
      let reqNo = 8;
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
      let reqNo = 9;
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
    it('the record should had been changed when called putRequest', (done) =>
    {
      //console.log('here we go')
      //console.log(request.output)
      let reqNo = 12;
      request.output[reqNo].docs.mechanic_reach.should.be.eql(1)
      //request.output[7].res.body.message.should.be.eql("you passed the test");
      done();
    });
    it('when called deleteRequest, the route should not exist', (done)=>
    {
      let reqNo = 13;
      // request.output[reqNo].res.body.ok.should.be.eql(1);
      // request.output[reqNo].res.body.n.should.be.eql(1);
      // reqNo = 8;
      // should.equal(null,request.output[reqNo].docs);
      request.output[reqNo].res.status.should.be.eql(404);
      reqNo = 14;
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
          token = arg.output[3].res.body.token; // as a garage
          let route = '/api/garages/mechanic';
          // let arg = request;
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
        }, // request5
        function(arg,callback)
        {
          token = arg.output[5].res.body.token; // as a mechanic
          let reqNo = 6;
          let route = '/api/mechanics/service';
          // let arg = request;
          let year = 2016, month = 10, date = 20;
          // let date1 = new Date(year,month,date,00,00);
          // let date2 = new Date(year,month,date+2,00,00);
          // let date3 = new Date(year,month,date+3,00,00);
          let date1 = date2 = date3 = "2016-06-03T10:34"
          let obj ={
                      user_id:"5",
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
        }, // request6
        function(arg,callback)
        {
          let reqNo = 7;
          token = arg.output[3].res.body.token; // as a garage
          let route = '/api/garages/billing';
          // let arg = request;
          let obj = {
            user_id:"1",
            service_id:arg.output[reqNo-1].res.body._id,
            price:125677
          }
          testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).post(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
        }, // request7
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='billing',isDebug=isDebugTest)
          }, // request8
          function(arg,callback)
          {
            let route = '/api/garages/billing';
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request9
          function(arg,callback)
          {
            let route = '/api/garages/billing';
            route += '/'+arg.output[9].res.body[0]._id;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request10
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='billing',isDebug=isDebugTest)
          }, // request11
          function(arg,callback)
          {
            let route = '/api/garages/billing',reqNo = 12;
            route += '/'+arg.output[9].res.body[0]._id;
            let obj = {price:10200};
            // let obj = {id:arg.output[9].res.body[0]._id,price:10200};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).put(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token).send(obj),isDebug=isDebugTest);
          }, // request 12
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='billing',isDebug=isDebugTest)
          }, // request13
          function(arg,callback)
          {
            let route = '/api/garages/billing',reqNo = 14;
            route += '/'+arg.output[9].res.body[0]._id;
            // let obj = {id:arg.output[2].res.body[0]._id};
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).delete(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request14
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='billing',isDebug=isDebugTest)
          }, // request15

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
      let reqNo = 7;
      let obj = {
        user_id:"1",
        service_id:request.output[reqNo-1].res.body._id,
        price:125677
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
      reqNo = 8;
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
    it('the record should had been shown when called getBilling', (done) =>
    {
      let reqNo = 9;
      let obj = request.output[reqNo].res.body[0];
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
      let reqNo = 10;
      let obj = request.output[reqNo].res.body;
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
    it('the record should had been changed when called putBilling', (done) =>
    {
      //console.log('here we go')
      //console.log(request.output)
      let reqNo = 13;
      request.output[reqNo].docs.price.should.be.eql(10200)
      //request.output[6].res.body.message.should.be.eql("you passed the test");
      done();
    });
    it('when called deleteBilling, the route should not exist', (done)=>
    {
      let reqNo = 14;
      // request.output[reqNo].res.body.ok.should.be.eql(1);
      // request.output[reqNo].res.body.n.should.be.eql(1);
      // reqNo = 8;
      // should.equal(null,request.output[reqNo].docs);
      request.output[reqNo].res.status.should.be.eql(404);
      reqNo = 15;
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
          let route = '/api/garages/promotion';
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
            let route = '/api/garages/promotion';
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 6
          function(arg,callback)
          {
            let route = '/api/garages/promotion';
            route += '/'+arg.output[6].res.body[0]._id;
            testController.testGetAPI(callback,arg,route,tmpRequest = chai.request(server).get(route).set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token),isDebug=isDebugTest);
          }, // request 7
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='promotion',isDebug=isDebugTest)
          }, // request8
          function(arg,callback)
          {
            let route = '/api/garages/promotion',reqNo = 9;
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
            let route = '/api/garages/promotion',reqNo = 11;
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
    it('the record should had been created when called postPromotion', (done) =>
    {
      let reqNo = 4;
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
      reqNo = 5;
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
      request.output[reqNo].docs.discount_percent.should.be.eql(15)
      //request.output[6].res.body.message.should.be.eql("you passed the test");
      done();
    });
    it('when called deletePromotion, the route should not exist', (done)=>
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
  describe('? "Check if classDataWithUser CRUD work":', () =>
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
          let token = arg.output[3].res.body.token;
          let route = '/api/garages/mechanic';
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          jwt.verify(arg.output[reqNo-1].res.body.token, config.jwt.secret, function(err, decoded)
          {

            testController.testGetAPI(callback,arg,route,
              tmpRequest = chai.request(server).post(route)
              // .field('garage_id',obj.garage_id)
              .field('name',obj.name).field('tel',obj.tel)
              .field('rating',obj.rating).field('service_amount',obj.service_amount)////.set('Content-Type','multipart/form-data')
              .field('user_id',decoded.id)
              .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token).send(obj),isDebug=isDebugTest);
          })
        }, // request 4
        function(arg,callback)
        {
          let reqNo = 5;
          token = arg.output[3].res.body.token;
          let route = '/api/garages/classDataWithUser/mechanic';
          route += '/'+arg.output[4].res.body.obj._id;
          // let arg = request;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).get(route)
            .set('Authorization',token).send(obj),isDebug=isDebugTest);
        }, // request 5
        function(arg,callback)
        {
          testController.testGetModel(callback,arg,modelName='mechanic',isDebug=isDebugTest)
        }, // request6
        function(arg,callback)
        {
          testController.testGetModel(callback,arg,modelName='garage',isDebug=isDebugTest)
        }, // request7
        function(arg,callback)
        {
          testController.testGetModel(callback,arg,modelName='user',isDebug=isDebugTest)
        }, // request8
        function(arg,callback)
        {
          let reqNo = 9;
          token = arg.output[3].res.body.token;
          let route = '/api/garages/classDataWithUser/mechanic';
          // route += '/'+arg.output[4].res.body.obj._id;
          // let arg = request;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).get(route)
            .set('Authorization',token).send(obj),isDebug=isDebugTest);
        }, // request 9
        function(arg,callback)
        {
          testController.testGetModel(callback,arg,modelName='mechanic',isDebug=isDebugTest)
        }, // request10
        function(arg,callback)
        {
          let reqNo = 11;
          token = arg.output[3].res.body.token;
          let route = '/api/garages/classDataWithUser/garage';
          route += '/'+arg.output[2].res.body.obj._id;
          // let arg = request;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).get(route)
            .set('Authorization',token).send(obj),isDebug=isDebugTest);
        }, // request 11
        function(arg,callback)
        {
          testController.testGetModel(callback,arg,modelName='garage',isDebug=isDebugTest)
        }, // request12
      ],// end of functions flow here
        function(err,result) // last function
        {
          request = result; // save all requests to request variable
          done();
        }
      )
    });
    it('when called showClassDataWithUser, the route should show the data properly', (done) =>
    {
      let reqNo = 5;
      let obj = request.output[reqNo].res.body;
      // console.log('----------------------------------')
      // console.log(obj);
      // console.log(request.output[reqNo+1].docs)
      for(var argName in obj)
      {
        //console.log('argName = '+argName)
        if(argName.length>4 && argName!='updatedAt' && argName!='createdAt' && argName!='enabled' && argName!='username')
          obj[argName].should.be.eql(request.output[reqNo+1].docs[argName])

      }
      obj.createdAt.should.be.eql(request.output[reqNo+1].docs.createdAt.toISOString())
      obj.updatedAt.should.be.eql(request.output[reqNo+1].docs.updatedAt.toISOString())
      obj.username.should.be.eql("test");
      obj.enabled.should.be.eql(1);
      done();
    })
    it('when called getClassDataWithUser, the route should show the data properly', (done) =>
    {
      let reqNo = 9;
      let obj = request.output[reqNo].res.body[0];
      // console.log('----------------------------------')
      // console.log(obj);
      // console.log(request.output[reqNo+1].docs)
      for(var argName in obj)
      {
        //console.log('argName = '+argName)
        if(argName.length>4 && argName!='updatedAt' && argName!='createdAt' && argName!='enabled' && argName!='username')
        {
          obj[argName].should.be.eql(request.output[reqNo+1].docs[argName])
        }
      }
      obj.createdAt.should.be.eql(request.output[reqNo+1].docs.createdAt.toISOString())
      obj.updatedAt.should.be.eql(request.output[reqNo+1].docs.updatedAt.toISOString())
      obj.username.should.be.eql("test");
      obj.enabled.should.be.eql(1);

      done();
    })
    it('when called showClassDataWithUser (show their own garage), the route should show the data properly', (done) =>
    {
      let reqNo = 11;
      let obj = request.output[reqNo].res.body;
      // console.log('----------------------------------')
      // console.log(obj);
      // console.log(request.output[reqNo+1].docs)
      for(var argName in obj)
      {
        //console.log('argName = '+argName)
        if(argName.length>4 && argName!='updatedAt' && argName!='createdAt' && argName!='enabled' && argName!='username' && argName!='part_id_list' && argName!='mechanic_id_list')
          obj[argName].should.be.eql(request.output[reqNo+1].docs[argName])

      }
      JSON.stringify(obj["part_id_list"]).should.be.eql(JSON.stringify(request.output[reqNo+1].docs["part_id_list"]))
      JSON.stringify(obj["mechanic_id_list"]).should.be.eql(JSON.stringify(request.output[reqNo+1].docs["mechanic_id_list"]))

      obj.createdAt.should.be.eql(request.output[reqNo+1].docs.createdAt.toISOString())
      obj.updatedAt.should.be.eql(request.output[reqNo+1].docs.updatedAt.toISOString())
      obj.username.should.be.eql("test");
      obj.enabled.should.be.eql(1);
      done();
    })
  });//end of template here
  describe('? "Check if garage postMechanicWithUser work":', () =>
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
          let token = arg.output[reqNo-1].res.body.token;
          let route = '/api/garages/mechanicWithUser';
          // let arg = request;
          let obj = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:'4',service_amount:'3'}
          testController.testGetAPI(callback,arg,route,
            tmpRequest = chai.request(server).post(route).field('garage_id',obj.garage_id)
            .field('name',obj.name).field('tel',obj.tel)
            .field('username',request.account.username+'2')
            .field('password',request.account.password)
            .field('rating',obj.rating).field('service_amount',obj.service_amount)////.set('Content-Type','multipart/form-data')
            .attach('file',__dirname+'/../sample/LRG_DSC03836.JPG')
            .set('Authorization',token).send(obj),isDebug=isDebugTest);
        }, // request 4
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='mechanic',isDebug=isDebugTest)
          }, // request5
          function(arg,callback)
          {
            testController.testGetModel(callback,arg,modelName='user',isDebug=isDebugTest)
          }, // request6
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
    it('when called garage postMechanicWithUser, a mechanic should be registered with a user', (done) =>
    {
      let arg  = {garage_id:'zJELcGlf1gsjbcqy',name:'thanawat mangnee',tel:'089-999-9999',rating:4,service_amount:3};
      let reqNo = 4;
      testController.testCheckResponse_2(request.output[reqNo].res,arg,isDebug=isDebugTest,request.output[reqNo].res.body.obj);
      request.output[reqNo].res.body.obj.should.not.have.property('password')
      reqNo = 5;
      should.not.equal(null,request.output[reqNo].docs)
      testController.testCheckResponse_2("mongo",arg,isDebug=isDebugTest,request.output[reqNo].docs);
      arg = {username:request.account.username}
      reqNo = 6;
      testController.testCheckResponse_2("mongo",arg,isDebug=isDebugTest,request.output[reqNo].docs);
      done();
    })
  });
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
          testController.testGetModelMultiple(callback,arg,modelName='mechanic',isDebug=isDebugTest)
        }, // request5
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
            .field('file','')
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
  describe('? "Check if getMechanicInGarage works":', () => 
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

          let token = arg.output[3].res.body.token;
          let route = '/api/garages/mechanicInGarage'
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
    it('should return the data properly if you getMechanicInGarage', (done) =>
    {
      let reqNo = 6;
      request.output[reqNo].res.status.should.be.eql(200);
      let obj = request.output[reqNo].res.body[0];
      // console.log('----------------------------------')
      // console.log(obj);
      // console.log(request.output[reqNo+1].docs)
      for(var argName in obj)
      {
        //console.log('argName = '+argName)
        if(argName.length>4 && argName!='updatedAt' && argName!='createdAt' && argName!='image_url' && argName!='garage_id' && argName!='enabled' && argName!='username')
        {
          obj[argName].should.be.eql(request.output[reqNo+1].docs[0][argName])
        }

      }
      obj.createdAt.should.be.eql(request.output[reqNo+1].docs[0].createdAt.toISOString())
      obj.updatedAt.should.be.eql(request.output[reqNo+1].docs[0].updatedAt.toISOString())
      obj.enabled.should.be.eql(request.output[reqNo+2].docs[0].enabled)
      obj.username.should.be.eql(request.output[reqNo+2].docs[0].username)
      done();
    });
  }) // end of template
});
