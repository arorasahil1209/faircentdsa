let express = require('express');
let router = express.Router();
let {getStates,getCities,getReligions,getLoans,getEmploymentTypes,
    getBusinessTypes,getIndianAssets,getPinCodes,getAllBanks,
    getResidenceType
    } = require('../controllers/cndController');

router.get('/states',getStates);
router.get('/city',getCities);
router.get('/religion',getReligions);  
router.get('/loans',getLoans);  
router.get('/employment-types',getEmploymentTypes);  
router.get('/business-types',getBusinessTypes);  
router.get('/assets',getIndianAssets); 
router.get('/pin',getPinCodes); 
router.get('/bank',getAllBanks); 
router.get('/residence-types',getResidenceType); 

module.exports = router