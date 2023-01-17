let express = require('express');
let router = express.Router();
let {verifyPan
    } = require('../controllers/faircentController');



router.post('/pan-verification',verifyPan);

module.exports = router