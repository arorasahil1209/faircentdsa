let express = require('express');
let router = express.Router();
let {createLead,updateLead,companyDetails,accountDetails} = require('../controllers/leadControllers');

router.post('/leads',createLead);
router.post('/company-details',companyDetails);
router.post('/borrowers-personal-details',updateLead);
router.post('/account-details',accountDetails);


module.exports = router