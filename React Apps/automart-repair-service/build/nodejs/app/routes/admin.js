
const express = require('express');
const router = express.Router();
const User = require('.'+'/../models/user');

const adminController = require('.'+'/../controllers/adminController')
const verifyController = require('../controllers/verifyController')

const allVerify = verifyController.verifyAllV2;
const allVerifyIndiv = verifyController.verifyAllIndivV2;
const verifyMech = verifyController.verifyMechanicV2;
const verifyGarage = verifyController.verifyGarageV2;
const verifyMechIndiv = verifyController.verifyMechanicIndivV2;
const verifyGarageIndiv = verifyController.verifyGarageIndivV2;
const verifyAdmin = verifyController.verifyAdminV2;

const multer  = require('multer');
const upload_part = multer({ dest: 'public/uploads/part/images/' });
const upload_garage = multer({ dest: 'public/uploads/garage/images/' });
const upload_mechanic = multer({ dest: 'public/uploads/mechanic/images/' });
const upload_car = multer({ dest: 'public/uploads/car/images/' });

/* GET home page. */
router.get('/hello', function(req, res, next) {
  res.send('hello world!');
});
//TODO: check and make sure that the normal user shouldn't be able to use this...
function check(req, res, next){
    if(verifyMech)
    {//req.isAuthenticated()){
        // console.log('verify Mech pass')
        // console.log(req.user);
        next();
    }
    else
    {
      var obj = {"message":"Unauthorized"};
      res.status(401).json({obj})
    }
}
function checkGarage(req, res, next){
    if(verifyGarage)
    {
      next();
    }
    else
    {
      var obj = {"message":"Unauthorized"};
      res.status(401).json({obj})
    }
}
function checkAdmin(req, res, next){
    if(verifyAdmin)
    {
      // console.log('verify Admin pass')
      // console.log(req.user);
      next();
    }
    else
    {
      var obj = {"message":"Unauthorized"};
      res.status(401).json({obj})
    }
}

//Create Read Update Delete
router.route('/mechanic')
  // .post(allVerify, adminController.postMechanic)
  .get(allVerify, adminController.getMechanic);
  // .put(allVerify, adminController.putMechanic)
  // .delete(allVerify, adminController.deleteMechanic);
router.post('/mechanic', [checkGarage, upload_mechanic.single('file'), adminController.postMechanic]);
router.get(   '/mechanic/:id',allVerify,   adminController.showMechanic);
router.get('/classDataWithUser/:userType',verifyGarage,adminController.getClassDataWithUser);
router.get('/classDataWithUser/:userType/:id',verifyMechIndiv,adminController.showClassDataWithUser);
router.put(   '/mechanic/:id',verifyMechIndiv,    adminController.putMechanic);
router.delete('/mechanic/:id',verifyAdmin, adminController.deleteMechanic);
router.put(   '/mechanicImg/:id',upload_mechanic.single('file'),    adminController.putMechanicImg);
router.post('/mechanicWithUser', [checkGarage, upload_mechanic.single('file'), adminController.postMechanicWithUser]);

// router.get('/mechanicWithBanStatus',verifyAdmin, adminController.getMechanicWithBanStatus);
router.get('/mechanicInGarage',verifyGarage, adminController.getMechanicInGarage);
router.post('/part', [checkAdmin, upload_part.single('file'), adminController.postPart]);

router.put(   '/part/:id',verifyAdmin,    adminController.putPart);
router.put('/partImg/:id', upload_part.single('file'), adminController.putPartImg);
router.delete('/part/:id',verifyAdmin, adminController.deletePart);


router.put(   '/car/:id',allVerify,    adminController.putCar);
router.delete('/car/:id',verifyAdmin, adminController.deleteCar);
router.put(   '/carImg/:id',upload_car.single('file'),    adminController.putCarImg);
router.post('/car', [check, upload_car.single('file'), adminController.postCar]);
router.route('/user')
  .post(verifyAdmin  ,   adminController.postUser)
  .get(verifyAdmin   ,    adminController.getUser);
  // .put(allVerify   ,    adminController.putUser)
  // .delete(allVerify, adminController.deleteUser);
  router.get(   '/user/:id',verifyAdmin,   adminController.showUser);
  router.put(   '/user/:id',allVerifyIndiv,    adminController.putUser);
  router.delete('/user/:id',verifyAdmin, adminController.deleteUser);
router.route('/garage')
  // .post(allVerify  ,   adminController.postGarage)
  .get(allVerify   ,    adminController.getGarage)
  // .put(allVerify   ,    adminController.putGarage)
  // .delete(allVerify, adminController.deleteGarage);
router.post('/garage', [check, upload_garage.single('file'), adminController.postGarage]);
  router.get(   '/garage/:id',allVerify,   adminController.showGarage);
  router.put(   '/garage/:id',verifyGarageIndiv,    adminController.putGarage);
  router.delete('/garage/:id',verifyAdmin, adminController.deleteGarage);
router.put('/garageImg/:id', upload_garage.single('file'), adminController.putGarageImg);
router.post('/garageWithUser', upload_garage.single('file'), adminController.postGarageWithUser);
// router.get('/garageWithUser',verifyGarage,adminController.getGarageWithUser)
router.route('/service')
  .post(verifyMech  ,   adminController.postService)
  .get(allVerify   ,    adminController.getService);
  // .put(allVerify   ,    adminController.putService)
  // .delete(allVerify, adminController.deleteService);
  router.get(   '/service/:id',allVerify,   adminController.showService);
  router.put(   '/service/:id',verifyMech,    adminController.putService);
  router.delete('/service/:id',verifyAdmin, adminController.deleteService);
router.route('/request')
  .post(allVerify  ,   adminController.postRequest)
  .get(allVerify   ,    adminController.getRequest);
  // .put(allVerify   ,    adminController.putRequest)
  // .delete(allVerify, adminController.deleteRequest);
  router.get(   '/request/:id',allVerify,   adminController.showRequest);
  router.put(   '/request/:id',verifyMech,    adminController.putRequest);
  router.delete('/request/:id',verifyAdmin, adminController.deleteRequest);
router.route('/billing')
  .post(verifyMech  ,   adminController.postBilling)
  .get(allVerify   ,    adminController.getBilling);
  // .put(allVerify   ,    adminController.putBilling)
  // .delete(allVerify, adminController.deleteBilling);
  router.get(   '/billing/:id',allVerify,   adminController.showBilling);
  router.put(   '/billing/:id',verifyMech,    adminController.putBilling);
  router.delete('/billing/:id',verifyAdmin, adminController.deleteBilling);
router.route('/promotion')
  .post(verifyGarage  ,   adminController.postPromotion)
  .get(allVerify   ,    adminController.getPromotion);
  // .put(allVerify   ,    adminController.putPromotion)
  // .delete(allVerify, adminController.deletePromotion);
  router.get(   '/promotion/:id',allVerify,   adminController.showPromotion);
  router.put(   '/promotion/:id',verifyGarage,    adminController.putPromotion);
  router.delete('/promotion/:id',verifyAdmin, adminController.deletePromotion);
router.get('/getCount',verifyAdmin, adminController.getCount);
router.get('/getPartPerWeek',verifyAdmin, adminController.getPartPerWeek);
router.get('/getMechActPerWeek',verifyAdmin, adminController.getMechActPerWeek);

//*/
module.exports = router;
