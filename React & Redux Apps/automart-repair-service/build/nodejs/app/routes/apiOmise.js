// add express here
console.log('hey!')

const express = require('express')
const router = express.Router()
const omise = require('omise')({
  'secretKey': 'skey_test_52dae3d7f7foabhys9k',
  'omiseVersion': '2015-09-10'
})

router.post('', function (req, res) {
  console.log('req:', req.body)
  console.log('number:', req.body.cardNumber)
  // console.log('res:', res)
  omise.charges.create({
    'description': 'Charge for order ID: 888',
    'amount': '100000',
    'currency': 'thb',
    'card': req.body.omiseToken
  }, (err, resp) => {
    console.log('resp', resp)
    console.log('err:', err)
    if (resp.paid) {
      //  Success
      console.log('res:', resp.message)
      res.status(200).json({message: 'ok'})
    } else {
      //  Handle failure
      console.log('err:', err.message)
      res.status(400).json({message: 'not ok'})
      // throw resp.failure_code
    }
  })
})

// function check(req, res, next){
//     if(verifyMech)
//     {//req.isAuthenticated()){
//         // console.log('verify Mech pass')
//         // console.log(req.user);
//         next();
//     }
//     else
//     {
//       var obj = {"message":"Unauthorized"};
//       res.status(401).json({obj})
//     }
// }
//
// router.post('/part', [checkAdmin, upload_part.single('file'), adminController.postPart])
//
// router.post('/mechanic', [checkGarage, upload_mechanic.single('file'), adminController.postMechanicWithUser])

module.exports = router
