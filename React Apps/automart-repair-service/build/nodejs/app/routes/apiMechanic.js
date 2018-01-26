// add express here
const express = require('express');
const router = express.Router();

// add controllers here
const adminController  = require('../controllers/adminController');
const verifyController = require('../controllers/verifyController');
const apiMechanicController  = require('../controllers/apiMechanicController');
const toolController = require('../controllers/toolController');

// add middleware here
const verifyMech = verifyController.verifyMechanicV2;
const verifyMechIndiv = verifyController.verifyMechanicIndivV2;

// add multer here
const multer  = require('multer');
const upload_car = multer({ dest: 'public/uploads/car/images/' });
const upload_mechanic = multer({ dest: 'public/uploads/mechanic/images/' });

// check route 250117, 1154

router.route('/service')
  .get(verifyMech   ,    apiMechanicController.getService)
  .post(verifyMech  ,   apiMechanicController.postService);
router.put('/service/:id',verifyMechIndiv,    apiMechanicController.putService);
router.delete('/service/:id',verifyMechIndiv,    apiMechanicController.deleteService);
router.get('/service/:id',verifyMechIndiv,   apiMechanicController.showService);
router.put('/service/status/:id/:step',verifyMechIndiv, apiMechanicController.putServiceStatus);

router.put('/mechanic',verifyMech,    apiMechanicController.putMechanic);
router.put('/mechanicImg',upload_mechanic.single('file'),    apiMechanicController.putMechanicImg);

router.get('/:type/list',verifyMech,toolController.getDataList); //(GET)  : _id, name of mechanic, part, garage

// end check route 250117, 1154



router.route('/mechanic').get(verifyMech, apiMechanicController.getMechanic);

router.route('/part').get(verifyMech, apiMechanicController.getPart);
router.get(   '/part/listExist',verifyMech,   apiMechanicController.getPartListExist);

router.route('/car').get(verifyMech   ,    apiMechanicController.getCar);

router.route('/user').get(verifyMech   ,    apiMechanicController.getUser);
router.put('/user',verifyMech,    apiMechanicController.putUser);

router.route('/garage').get(verifyMech   ,    apiMechanicController.getGarage);
router.get  ('/garage/:id',verifyMechIndiv,   apiMechanicController.showGarage);


router.route('/request')
  .get(verifyMech   ,    apiMechanicController.getRequest);
router.get(   '/request/:id',verifyMechIndiv,   apiMechanicController.showRequest);
router.put(   '/request/:id',verifyMechIndiv,    apiMechanicController.putRequest);

router.route('/billing')
.get(verifyMech   ,    apiMechanicController.getBilling)
.post(verifyMech  ,   apiMechanicController.postBilling);
router.get('/billing/:id',verifyMechIndiv,   apiMechanicController.showBilling);
router.put('/billing/:id',verifyMechIndiv,    apiMechanicController.putBilling);

router.route('/promotion').get(verifyMech   ,    apiMechanicController.getPromotion);
router.get('/promotion/:id',verifyMechIndiv,   apiMechanicController.showPromotion);

module.exports = router;
