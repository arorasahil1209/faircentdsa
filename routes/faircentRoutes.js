let express = require('express');
let router = express.Router();
let {verifyPan,sendOtp,verifyOtp,uploadDocument
    } = require('../controllers/faircentController');



router.post('/pan-verification',verifyPan);
router.post('/send-verification',sendOtp);
router.post('/verify-otp',verifyOtp);

router.post('/upload-document',uploadDocument);

module.exports = router