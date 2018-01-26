// add express here
const express = require('express');
const router = express.Router();

// add controllers here
const adminController  = require('../controllers/adminController');
const verifyController = require('../controllers/verifyController');
const apiGarageController = require('../controllers/apiGarageController');
const toolController = require('../controllers/toolController');

// add middleware here
const verifyGarage = verifyController.verifyGarageV2;
const verifyGarageIndiv = verifyController.verifyGarageIndivV2;

// add multer here
const multer  = require('multer');
const upload_mechanic = multer({ dest: 'public/uploads/mechanic/images/' });
const upload_garage = multer({ dest: 'public/uploads/garage/images/' });




// check route 250117, 1154
router.get('/part/list',verifyGarage,apiGarageController.getPartList); //(GET)  : _id, name of mechanic, part, garage
router.get('/mechanic/list',verifyGarage,apiGarageController.getMechanicList); //(GET)  : _id, name of mechanic, part, garage
// router.get('/:type/list',verifyGarage,toolController.getDataList) //(GET)  : _id, name of mechanic, part, garage


router.get(   '/part/listExist',verifyGarage,   apiGarageController.getPartListExist);
router.put('/part/:id',verifyGarage,apiGarageController.putPartByOne);
router.delete('/part/:id',verifyGarage,apiGarageController.deletePartByOne);

router.route('/mechanic').get(verifyGarage, apiGarageController.getMechanic);
router.post('/mechanic',upload_mechanic.single('file'), apiGarageController.postMechanicWithUser);
router.put(   '/mechanic/:id',verifyGarage,    apiGarageController.putMechanic);
router.get  ('/mechanic/:id', verifyGarage, apiGarageController.showMechanic);
router.put(   '/mechanicImg/:id',upload_mechanic.single('file'),    apiGarageController.putMechanicImg);

// router.get('/:type/list',verifyGarage,toolController.getDataList) //(GET)  : _id, name of mechanic, part, garage

router.put('/garageImg', upload_garage.single('file'), apiGarageController.putGarageImg);

// end check route 250117, 1154


router.post('/mechanic', upload_mechanic.single('file'), apiGarageController.postMechanic);

router.route('/service')
  .get(verifyGarage   ,    apiGarageController.getService);
router.get(   '/service/:id',verifyGarage,   apiGarageController.showService);

// router.get('/mechanic',verifyGarage, apiGarageController.getMechanicInGarage)


router.route('/part').get(verifyGarage, apiGarageController.getPart);

router.route('/car').get(verifyGarage   ,    apiGarageController.getCar);

router.route('/user')
  .get(verifyGarage   ,    apiGarageController.getUser);
router.get(   '/user/:id',verifyGarage,   apiGarageController.showUser);
router.put(   '/user/:id',verifyGarageIndiv,    apiGarageController.putUser);

router.route('/garage').get(verifyGarage   ,    apiGarageController.getGarage);
router.put(   '/garage',verifyGarage,    apiGarageController.putGarage);


router.route('/service')
  .post(verifyGarage  ,   apiGarageController.postService);
router.put(   '/service/:id',verifyGarage,    apiGarageController.putService);
router.put('/service/status/:id/:step',verifyGarage, apiGarageController.putServiceStatus);

router.route('/request')
  .get(verifyGarage   ,    apiGarageController.getRequest);
router.get(   '/request/:id',verifyGarage,   apiGarageController.showRequest);
router.put(   '/request/:id',verifyGarage,    apiGarageController.putRequest);

router.route('/billing')
  .get(verifyGarage   ,    apiGarageController.getBilling)
  .post(verifyGarage  ,   apiGarageController.postBilling);
router.get(   '/billing/:id',verifyGarage,   apiGarageController.showBilling);
router.put(   '/billing/:id',verifyGarage,    apiGarageController.putBilling);

router.route('/promotion')
  .get(verifyGarage   ,    apiGarageController.getPromotion)
  .post(verifyGarage  ,   apiGarageController.postPromotion);
router.get(   '/promotion/:id',verifyGarage,   apiGarageController.showPromotion);
router.put(   '/promotion/:id',verifyGarage,    apiGarageController.putPromotion);

module.exports = router;
