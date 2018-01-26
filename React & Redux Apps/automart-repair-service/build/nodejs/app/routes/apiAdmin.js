// add express here
const express = require('express');
const router = express.Router();

const User = require('.'+'/../models/user');

const adminController = require('.'+'/../controllers/adminController')
const verifyController = require('../controllers/verifyController')
const toolController = require('../controllers/toolController')

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
      // console.log('verify Garage pass')
      // console.log(req.user);
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

// check route 250117, 1154
router.get('/:type/list',verifyAdmin,toolController.getDataList); //(GET)  : _id, name of mechanic, part, garage

router.get('/getUserServicePerMonth',verifyAdmin,adminController.getUserServicePerMonth);
router.get('/getActPerWeek',verifyAdmin,adminController.getActPerWeek);
router.get('/getCount',verifyAdmin, adminController.getCount);
router.get('/getMechActPerWeek',verifyAdmin, adminController.getMechActPerWeek);
router.get('/getPartPerWeek',verifyAdmin, adminController.getPartPerWeek);

router.post('/part', [checkAdmin, upload_part.single('file'), adminController.postPart]);
router.put(   '/part/:id',verifyAdmin,    adminController.putPart);
router.put('/partImg/:id', upload_part.single('file'), adminController.putPartImg);
router.delete('/part/:id',verifyAdmin, adminController.deletePart);

router.post('/mechanic', [checkGarage, upload_mechanic.single('file'), adminController.postMechanicWithUser]); // mechanicWithUser
router.route('/mechanic')
  .get(verifyAdmin, adminController.getMechanic);
router.get(   '/mechanic/:id',verifyAdmin,   adminController.showMechanic);
router.put(   '/mechanic/:id',verifyAdmin,    adminController.putMechanic);
router.delete('/mechanic/:id',verifyAdmin, adminController.deleteMechanic);
router.put(   '/mechanicImg/:id',upload_mechanic.single('file'),    adminController.putMechanicImg);

router.route('/garage')
  .get(verifyAdmin   ,    adminController.getGarage);
router.post('/garage', upload_garage.single('file'), adminController.postGarageWithUser); //garageWithUser

router.get(   '/garage/:id',verifyAdmin,   adminController.showGarage);
router.put(   '/garage/:id',verifyAdmin,    adminController.putGarage);
router.delete('/garage/:id',verifyAdmin, adminController.deleteGarage);
router.put('/garageImg/:id', upload_garage.single('file'), adminController.putGarageImg);

router.post('/car', [check, upload_car.single('file'), adminController.postCar]);
router.put(   '/car/:id',verifyAdmin,    adminController.putCar);
router.delete('/car/:id',verifyAdmin, adminController.deleteCar);
router.put(   '/carImg/:id',upload_car.single('file'),    adminController.putCarImg);

router.route('/service')
  .get(verifyAdmin   ,    adminController.getService);

router.get(   '/service/:id',verifyAdmin,   adminController.showService);
router.put(   '/service/:id',verifyAdmin,    adminController.putService);
router.delete('/service/:id',verifyAdmin, adminController.deleteService);

// router.get('/:type/list',verifyAdmin,toolController.getDataList) //(GET)  : _id, name of mechanic, part, garage


// end check route 250117, 1154



//Create Read Update Delete

// router.get('/mechanicWithBanStatus',verifyAdmin, adminController.getMechanicWithBanStatus);
router.get('/mechanicInGarage/:id',verifyAdmin, adminController.getMechanicInGarage);

router.route('/user')
  .post(verifyAdmin  ,   adminController.postUser)
  .get(verifyAdmin   ,    adminController.getUser);
  // .put(allVerify   ,    adminController.putUser)
  // .delete(allVerify, adminController.deleteUser);
  router.put(   '/user/:id',verifyAdmin,    adminController.putUser);
  router.delete('/user/:id',verifyAdmin, adminController.deleteUser);

  router.route('/service')
    .post(verifyAdmin  ,   adminController.postService);


router.put('/service/status/:id/:step',verifyAdmin, adminController.putServiceStatus);

router.route('/request')
  .post(verifyAdmin  ,   adminController.postRequest)
  .get(verifyAdmin   ,    adminController.getRequest);
router.get(   '/request/:id',verifyAdmin,   adminController.showRequest);
router.put(   '/request/:id',verifyAdmin,    adminController.putRequest);
router.delete('/request/:id',verifyAdmin, adminController.deleteRequest);

router.route('/billing')
  .post(verifyAdmin  ,   adminController.postBilling)
  .get(verifyAdmin   ,    adminController.getBilling);
router.get(   '/billing/:id',verifyAdmin,   adminController.showBilling);
router.put(   '/billing/:id',verifyAdmin,    adminController.putBilling);
router.delete('/billing/:id',verifyAdmin, adminController.deleteBilling);

router.route('/promotion')
  .post(verifyAdmin  ,   adminController.postPromotion)
  .get(verifyAdmin   ,    adminController.getPromotion);
router.get(   '/promotion/:id',verifyAdmin,   adminController.showPromotion);
router.put(   '/promotion/:id',verifyAdmin,    adminController.putPromotion);
router.delete('/promotion/:id',verifyAdmin, adminController.deletePromotion);

//*/
module.exports = router;
// part
// repair_list
// corrected_price
// car_id
