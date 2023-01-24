let express = require('express');
const multer = require("multer");
let FormData = require('form-data');
var axios = require('axios');
let fs = require('fs');
let path = require('path');

let router = express.Router();
let {verifyPan,sendOtp,verifyOtp,uploadS3Docs
    } = require('../controllers/faircentController');

router.post('/pan-verification',verifyPan);
router.post('/send-verification',sendOtp);
router.post('/verify-otp',verifyOtp);
const storage= multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

const upload =multer({storage})

router.post('/upload-document',upload.single('fileKey'),uploadS3Docs)

module.exports = router