let express = require('express');
let router = express.Router();
let {getStates,getCities,getReligions,getLoans,getEmploymentTypes,
    getBusinessTypes,getIndianAssets,getPinCodes,getAllBanks,
    getResidenceType,getEducationTypes,getDocumentVerifications,createDsaRoles,getDsaRoles,
    updateDsaRoles
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
router.get('/education',getEducationTypes); 
router.get('/document-verifications',getDocumentVerifications); 

router.post('/dsa-roles',createDsaRoles)
router.get('/dsa-roles',getDsaRoles)
router.put('/dsa-roles',updateDsaRoles)
module.exports = router