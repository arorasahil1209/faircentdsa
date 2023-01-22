let express = require('express');
let router = express.Router();
let {createLead,updateLead,companyDetails,accountDetails,getLeads,getBorrowerDetails,
    updateBusinessLead,getBorrowerBusinessLead} = require('../controllers/leadControllers');

router.post('/leads',createLead);
router.post('/company-details',companyDetails);
router.post('/borrowers-personal-details',updateLead);
router.post('/borrowers-business-details',updateBusinessLead);
router.post('/account-details',accountDetails);

router.get('/leadss',getLeads)
router.get('/borrowers-personal-details',getBorrowerDetails);
router.get('/borrowers-business-details',getBorrowerBusinessLead);
module.exports = router