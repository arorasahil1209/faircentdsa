let { httpReqequest } = require("../services/faircent.services");
let { createDefaultLead } = require("../controllers/leadControllers");
const multer = require("multer");
let FormData = require('form-data');
var axios = require('axios');
let fs = require('fs');
let path = require('path');
let { uploadUserPhoto } = require("../controllers/leadControllers");
const db = require("../models");
const Users = db.users;
const centUser = db.centUser;
const centVerification = db.centVerification;
const centCnd = db.centCnd;
let { getEpochTimestamp,getCndInfo } = require("../dao/repo");
let Config = require("../config/dev.json");
let randomize = require("randomatic");
let verifyPan = async (req, res) => {
  try {
    console.log("here");
    if (!req.body.pan) {
      return res.json({
        message: "PAN number is mandatory",
      });
    }
    let config = {
      method: "post",
      url: Config.faircentApi.url + "/karza/pancheck",
      data: {
        pan: req.body.pan,
        consent: "y",
      },
    };
    let verifyPan = await httpReqequest(config);
    console.log("verifyPan:::", verifyPan);
    return res.json({
      message: "Pan verificaiton details",
      data: verifyPan.result.data,
      status: 200,
    });
  } catch (err) {
    console.log("error::", err);
    return res.json({
      message: "Error occured",
      error: err,
    });
  }
};

let sendOtp = async (req, res) => {
  try {
    if (!req.body.mobile_no) {
      return res.json({
        message: "Mobile number is mandatory",
      });
    }
    let checkOtpCounts = await db.sequelize.query(
      `select * from cent_verification where verification_key = ${req.body.mobile_no} limit 5`
    );
    console.log("checkOtpCounts::", checkOtpCounts[0]);
    console.log("checkOtpCounts::", checkOtpCounts[0].length);
    if (checkOtpCounts[0].length === 5) {
        return res.json({
          message: "Maximum limit exceeded for this user",
          status:409
        });
      }
    let checkUserVerifyStatus = await centUser.findAll({
      where: {
        mobile: req.body.mobile_no,
        mobile_verify: 1,
      },
      raw: true
    });
    console.log('checkUserVerifyStatus:::',checkUserVerifyStatus);
    if (checkUserVerifyStatus.length === 0) {
      let OTP = randomize("000000");
      console.log("otp generated is::", OTP);
      let currentStamp = getEpochTimestamp();
      let verificationData = {
        verification_key_type: "MOB_OTP_USER_REGISTERATION",
        verification_value: OTP,
        verification_create_time: currentStamp,
        verification_ipaddress: req.body.ip_address,
        verification_key: req.body.mobile_no,
      };
      console.log("verificationData::", verificationData);
      let saveVerificationData = await db.sequelize.query(
        `INSERT INTO cent_verification(verification_key,verification_key_type,verification_value,verification_ipaddress,verification_create_time) VALUES(${req.body.mobile_no},'MOB_OTP_USER_REGISTERATION','${OTP}','${req.body.ip_address}',${currentStamp})`
      );
      console.log("saveVerificationData::", saveVerificationData);
      let config = {
        method: "post",
        url: Config.faircentApi.url + "/send/sms",
        data: {
          type: "SMS",
          text: `Dear Customer, ${OTP} is your verification code for Faircent.com.`,
          mobile_no: req.body.mobile_no,
          ip_address: req.body.ip_address,
        },
      };
      let sendOtpMessage = await httpReqequest(config);
      console.log("sendOtpMessage:::", sendOtpMessage);
      return res.json({
        message: "Pan verificaiton details",
        data:sendOtpMessage,
        status: 200,
      });
    } else {
      return res.json({
        message: "user is already verified",
        status: 409,
      });
    }
  } catch (err) {
    console.log("error::", err);
    return res.json({
      message: "Error occured",
      error: err,
    });
  }
};

let verifyOtp = async (req, res) => {
  try {
    if (!req.body.mobile_no) {
      return res.json({
        message: "Mobile number is mandatory",
      });
    }
    let verifyOtpForUser = await db.sequelize.query(
      `select * from cent_verification where verification_key = ${req.body.mobile_no}`
    );
    console.log('verifyOtpForUser::',verifyOtpForUser[0][0]['verification_value']);
    if (verifyOtpForUser[0][0]["verification_value"] == req.body.otp) {
      //let createNewLead = await createDefaultLead(req.body);
     // console.log("createNewLeadn::", createNewLead.data);
      return res.json({
        message: "Otp verify successfully",
        status: 200,
      });
    } else {
      return res.json({
        message: "please enter correcct otp",
        status: 409,
      });
    }
  } catch (err) {
    console.log("error::", err);
    return res.json({
      message: "Error occured",
      error: err,
    });
  }
};

let uploadS3Docs = async (req, res) => {
  try{    
    console.log('dirname::',`${path.resolve('uploads')}/testdoc.png`)
    let datas = new FormData();
    datas.append('type', req.body.type);
    datas.append('uid', req.body.uid);
    datas.append('docType', req.body.docType);
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
    let userData = {
        uid:req.body.uid,
        photoId:s3Upload.data.result.fileKey,
        docType:req.body.docType
    }
    let query =`SELECT id, cnd_name, cnd_code, cnd_group, priority,is_active,deleted,created,udated, 
    updated_by,cnd_parent_id 
    FROM cent_cnd 
    WHERE cnd_group = 'DOCUMENT_VERIFICATION' 
    AND deleted = 'N' AND is_active = 1
    and cnd_code =`
    let getDocId
    if(req.body.docType == 'selfie'){
      getDocId = await db.sequelize.query(
        `${query} '${req.body.docType}'`,{
          raw:true
        }
      );
    } else if(req.body.docType == 'pan_card'){
      getDocId = await db.sequelize.query(
        `${query} '${req.body.docType}'`,{
          raw:true
        }
      );
    }else if(req.body.docType == 'aadhaar'){
      getDocId = await db.sequelize.query(
        `${query} '${req.body.docType}'`,{
          raw:true
        }
      );
    }
    else if(req.body.docType == 'bank_statement'){
      getDocId = await db.sequelize.query(
        `${query} '${req.body.docType}'`,{
          raw:true
        }
      );
    }
    userData.docId = getDocId[0][0]['id']
    await uploadUserPhoto(userData)
    await fs.unlinkSync(`${path.resolve('uploads')}/${req.file.originalname}`);
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
    
};




module.exports = {
  verifyPan,
  sendOtp,
  verifyOtp,
  uploadS3Docs
};
