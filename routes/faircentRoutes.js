let express = require('express');
var axios = require('axios');
let fs = require('fs');
let path = require('path');

let { uploadUserPhoto } = require("../controllers/leadControllers");
let FormData = require('form-data');
const multer = require("multer");
//const upload = multer({ dest: './uploads/' });
let router = express.Router();
let {verifyPan,sendOtp,verifyOtp,uploadDocument
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

//const storage= multer.memoryStorage()

// const multerupload =upload.fields([
//     {name:'fileKey',maxCount:1}
// ])
const upload =multer({storage})
router.post('/upload-document',upload.single('fileKey'),async(req,res)=>{
    try{
        
    console.log('dirname::',`${path.resolve('uploads')}/testdoc.png`)
    console.log('files;:',req.file.originalname)
   
   console.log('req.file.buffer',req.file)
    let datas = new FormData();
    datas.append('type', req.body.type);
    datas.append('uid', req.body.uid);
    datas.append('fileKey', fs.createReadStream(`${path.resolve('uploads')}/${req.file.originalname}`));
    
    var config = {
      method: 'post',
      url: 'https://fcnode11.faircent.com/v1/api/standard/upload',
      headers: { 
        'Content-Type': 'application/json', 
        'x-application-id': 'b6419f1a493a09e21aae9de583f0d9dd', 
        'x-application-name': 'FAIRCENT',
        ...datas.getHeaders()
      },
      data : datas
    };
    let s3Upload= await axios(config);
    console.log('s3Upload::',s3Upload.data);
    let userData = {
        uid:req.body.uid,
        photoId:s3Upload.data.result.fileKey
    }
    console.log("userData::::",userData);
    let updateUserPhotograph =  await uploadUserPhoto(userData)
    //fs.unlinkSync(`${path.resolve('uploads')}/${req.file.originalname}`);
    return res.status(200).json({
        message:'file uploaded successfully on s3 bucket',
        data:s3Upload.data

    })
}catch(err){
    console.log('s3 error',err)
    return res.status(400).json({
        message:'error occured while uploading data to s3',
        error:err
    })
}
});




module.exports = router