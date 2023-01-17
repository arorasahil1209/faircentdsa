let express = require('express');
let router = express.Router();
let {verifyPan,sendOtp,verifyOtp
    } = require('../controllers/faircentController');



router.post('/pan-verification',verifyPan);
router.post('/send-verification',sendOtp);
router.post('/verify-otp',verifyOtp);

module.exports = router