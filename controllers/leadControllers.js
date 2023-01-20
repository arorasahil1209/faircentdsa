const sequelize= require('sequelize');
let {httpReqequest} = require('../services/faircent.services');
const db = require('../models');
let Config =require('../config/dev.json');
const Users =  db.users; 
const centUser = db.centUser;
const centLoan = db.centLoan;
const centEmployment = db.centEmployment;
const centBankDetails = db.centBankDetails;
let {findMaxUid,getEpochTimestamp}  = require('../dao/repo');
/* create new lead */
let createLead =async(req,res)=>{
    try{
        console.log('here::',req.body);
        let data= await findMaxUid();
        let currentStamp = getEpochTimestamp();
        req.body.uid = data + 1;
        req.body.currentStamp = currentStamp;
        let [user,centUser,centEmployment,centLoan] = await Promise.all([createUser(req.body),createCentUser(req.body),createCentEmployment(req.body),createCentLoan(req.body)])
        console.log('user:',user);
        console.log('centUser:',centUser);
        console.log('centEmployment:',centEmployment);
        console.log('centLoan:',centLoan);
        return res.json({
            uid:data,
            message:'captured',
            status:200
        })
    }catch(err){
        console.log('error::',err);
        return res.json({
            message:"Error occured",
            error:err
        })
    }
}
let createCentLoan =async(body)=>{
    console.log('creating loan now::::')
    let createLoan = await centLoan.create({
        uid:body.uid,
        loan_amount_expected:0,
        tenure:0,
        loan_type_cnd:60,
        loan_state:249,
        loan_desc:'others',
        max_days_approved:10,
        verified_personal:0,
        verfied_professional:0,
        loan_irate_expected:10, // default value ?
        created:body.currentStamp,
        udated:body.currentStamp,
    })
    return createLoan;
}


let createUser =async(body)=>{
    let createUser = await Users.create({
        uid:body.uid,
        mail:body.primary_email_id,
        status:1,
        init:body.primary_email_id,
        created:body.currentStamp,
        access:body.currentStamp,
        login:body.currentStamp,
        timezone:'Asia/Kolkata',
        picture:0,
        data:null,
        pass:'default',
        language:'default',
        name:body.name
    })
    return createUser;
}

let createCentUser =async(body)=>{
    let createCentUser = await centUser.create({
        uid:body.uid,
        deleted:'N',
        mobile:body.primary_mobile_no,
        PAN:body.pan_no,
        is_pan_verified:'Y',
        mobile_verify:1,
        created:body.currentStamp
    });
    return createCentUser;
}

let createCentEmployment =async(body)=>{
    let createCentEmp = await centEmployment.create({
        uid:body.uid,
        deleted:'N',
        employment_type_cnd:21,
        created:body.currentStamp,
        comp_name:'default'
    });
    return createCentEmp;
}


let updateLead = async(req,res)=>{
    try{
        if(!req.body.uid){
            return res.json({
                message:"UID is mandatory"
            })
        }
    let currentStamp = getEpochTimestamp();
    let updateUser = await Users.update(
        {
          name: req.body.fname + req.body.lname,
          updated:currentStamp
        },
        {
          where: { uid: req.body.uid },
        }
    );
    let updateCentUser = await centUser.update(
        {
            fname:req.body.fname,
            lname:req.body.lname,
            dob:req.body.dob,
            marital_status:req.body.marital_status,
            city:req.body.city,
            pin:req.body.pin,
            udated:currentStamp
        },
        {
            where: { uid: req.body.uid },
        }
    )
    console.log('updateCentUser:',updateCentUser);
    return res.json({
        data:updateUser,
        message:'Update user data successfully!',
        status:200
    })
}catch(err){
        console.log('error::',err);
        return res.json({
            message:"Error occured",
            error:err
        })
}
}

let companyDetails = async(req,res)=>{
    try{
        if(!req.body.uid){
            return res.json({
                message:"UID is mandatory"
            })
        }
    let currentStamp = getEpochTimestamp();
    let updateUser = await centEmployment.update(
        {
            comp_name: req.body.comp_name,
            comp_address: req.body.comp_address,
            comp_city:req.body.comp_city,
            comp_email:req.body.comp_email,
            comp_cnd_state:req.body.comp_cnd_state,
            comp_pin:req.body.comp_pin
        },
        {
          where: { uid: req.body.uid },
        }
    );
    let updateCentUser = await centUser.update(
        {
            fname:req.body.fname,
            lname:req.body.lname,
            dob:req.body.dob,
            marital_status:req.body.marital_status,
            city:req.body.city,
            pin:req.body.pin,
            udated:currentStamp
        },
        {
            where: { uid: req.body.uid },
        }
    )
    console.log('updateCentUser:',updateCentUser);
    return res.json({
        data:updateUser,
        message:'Update user data successfully!',
        status:200
    })
}catch(err){
        console.log('error::',err);
        return res.json({
            message:"Error occured",
            error:err
        })
}
}



let accountDetails = async(req,res)=>{
    try{
        if(!req.body.uid){
            return res.json({
                message:"UID is mandatory"
            })
        }
    let currentStamp = getEpochTimestamp();
    let updateUser = await centBankDetails.update(
        {
            uid: req.body.uid,
            account_name: req.body.account_name,
            account_number:req.body.account_number,
            account_ifsc_number:req.body.account_ifsc_number,
            account_type:req.body.account_type,
            deleted:'N'
        },
        {
          where: { uid: req.body.uid },
        }
    );
    let updateCentUser = await centUser.update(
        {
            fname:req.body.fname,
            lname:req.body.lname,
            dob:req.body.dob,
            marital_status:req.body.marital_status,
            city:req.body.city,
            pin:req.body.pin,
            udated:currentStamp
        },
        {
            where: { uid: req.body.uid },
        }
    )
    console.log('updateCentUser:',updateCentUser);
    return res.json({
        data:updateUser,
        message:'Update user data successfully!',
        status:200
    })
}catch(err){
        console.log('error::',err);
        return res.json({
            message:"Error occured",
            error:err
        })
}
}

let createDefaultLead = async(data)=>{
    try{
        let config ={
            method:'post',
            url:Config.faircentApi.url + '/loan_ruleapi/borrower_api_account_creation',
            data:{
                "password": "Password@123",
                "username":data.username,
                "email":data.email
            }
        }
        let createLeadDetails = await httpReqequest(config)
        console.log('createLeadDetails',createLeadDetails)
        return {
            message:'created new user successfully!',
            status:200
        }
}catch(err){
        console.log('error::',err.data);
        return {
            message:"Error occured",
            error:err
        }
}
}

module.exports={
    createLead,
    createDefaultLead,
    updateLead,
    companyDetails,
    accountDetails
}