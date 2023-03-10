const sequelize = require("sequelize");
let { httpReqequest } = require("../services/faircent.services");
let { splitName } = require("../dao/util");
const db = require("../models");
let Config = require("../config/dev.json");
const Users = db.users;
const centUser = db.centUser;
const centLoan = db.centLoan;
const centEmployment = db.centEmployment;
const centBankDetails = db.centBankDetails;
const centLoanDoc = db.centLoanDoc;
const centLoanDetails = db.centLoanDetails;
let parser = require('xml2json');
let { findMaxUid, getEpochTimestamp } = require("../dao/repo");
/* create new lead */
let createLead = async (req, res) => {
  try {
    // let data = await findMaxUid();
    //console.log('max uid::',data);
    let currentStamp = getEpochTimestamp();
    //req.body.uid = data + 1;
    req.body.currentStamp = currentStamp;
    let config = {
      method: "post",
      url:Config.faircentApi.droopleUrl + '/loan_ruleapi/borrower_api_account_creation',  
      data: {
        password: Config.faircentApi.tempPassword,
        username: req.body.name,
        email: req.body.primary_email_id,
      },
    };
    let defaultLead = await httpReqequest(config);
    console.log('default lead::',defaultLead);
    console.log('default lead::',defaultLead.value);
    req.body.uid = defaultLead.value;
    let [user, centUser, centEmployment, centLoan] = await Promise.all([
      createUser(req.body),
      createCentUser(req.body),
      createCentEmployment(req.body),
      createCentLoan(req.body),
    ]);
    return res.json({
      uid: defaultLead.value,
      message: "captured",
      status: 200,
    });
  } catch (err) {
    console.log('error::',err);
    return res.json({
      message: "Error occured",
      error: err,
    });
  }
};
let createCentLoan = async (body) => {  
  let createLoan = await centLoan.create({
    uid: body.uid,
    loan_amount_expected: 0,
    tenure: 0,
    loan_type_cnd: body.loan_type_cnd,
    loan_state: 249,
    loan_desc: "others",
    max_days_approved: 10,
    verified_personal: 0,
    verfied_professional: 0,
    loan_irate_expected: 10, // default value ?
    created: body.currentStamp,
    udated: body.currentStamp,
  });
  return createLoan;
};

let createUser = async (body) => {
  let createUser = await Users.create({
    uid: body.uid,
    mail: body.primary_email_id,
    status: 1,
    init: body.primary_email_id,
    created: body.currentStamp,
    access: body.currentStamp,
    login: body.currentStamp,
    timezone: "Asia/Kolkata",
    picture: 0,
    data: null,
    pass: "default",
    language: "default",
    name: body.name,
  });
  return createUser;
};

let createCentUser = async (body) => {
  let userName = splitName(body.name);
  let createCentUser = await centUser.create({
    uid: body.uid,
    deleted: "N",
    mobile: body.primary_mobile_no,
    PAN: body.pan_no,
    is_pan_verified: "Y",
    mobile_verify: 1,
    created: body.currentStamp,
    fname: userName.firstName,
    lname: userName.lastName,
  });
  return createCentUser;
};

let createCentEmployment = async (body) => {
  let createCentEmp = await centEmployment.create({
    uid: body.uid,
    deleted: "N",
    employment_type_cnd: body.employment_type_cnd, //changing this to dyanmic value
    created: body.currentStamp,
    comp_name: "default",
  });
  return createCentEmp;
};

let updateLead = async (req, res) => {
  try {
    if (!req.body.uid) {
      return res.json({
        message: "UID is mandatory",
      });
    }
    let currentStamp = getEpochTimestamp();
    //let userName = splitName(req.body.name);
    // let updateUser = await Users.update(
    //   {
    //     name: userName.firstName + userName.lastName,
    //     updated: currentStamp,
    //   },
    //   {
    //     where: { uid: req.body.uid },
    //   }
    // );
    let loanId = await centLoan.findAll({
      where: {
        uid: req.body.uid,
      },
      raw: true,
    });
    let updateCentUser = await centUser.update(
      {
        dob: req.body.dob,
        marital_status: req.body.marital_status,
        city: req.body.city, 
        pin: req.body.pin,
        state_cnd: req.body.state_cnd,
        udated: currentStamp,
        address: req.body.address,
        highest_education: req.body.highest_education,
        gender: req.body.gender
      },
      {
        where: { uid: req.body.uid },
      }
    ); 
    await centLoanDetails.create({
      uid: req.body.uid,
      loan_id: loanId[0]["id"],
      created: currentStamp,
      residence_type_cnd: req.body.residence_type_cnd,
    });
    return res.json({
      data: updateCentUser,
      message: "Update user data successfully!",
      status: 200,
    });
  } catch (err) {
    return res.json({
      message: "Error occured",
      error: err,
    });
  }
};

let updateBusinessLead = async (req, res) => {
  try {
    if (!req.body.uid) {
      return res.json({
        message: "UID is mandatory",
      });
    }
    let currentStamp = getEpochTimestamp();
    let updateCentUser = await centEmployment.update(
      {
        comp_name: req.body.comp_name,
        comp_address: req.body.comp_address,
        comp_city: req.body.comp_city, // string west delhi
        comp_cnd_state: req.body.comp_cnd_state,
        comp_pin: req.body.comp_pin, // 110018
        udated: currentStamp,
      },
      {
        where: { uid: req.body.uid },
      }
    );
    return res.json({
      data: updateCentUser,
      message: "Update user data successfully!",
      status: 200,
    });
  } catch (err) {
    return res.json({
      message: "Error occured",
      error: err,
    });
  }
};
let companyDetails = async (req, res) => {
  try {
    if (!req.body.uid) {
      return res.json({
        message: "UID is mandatory",
      });
    }
    let currentStamp = getEpochTimestamp();
    let updateUser = await centEmployment.update(
      {
        comp_name: req.body.comp_name,
        comp_address: req.body.comp_address,
        comp_city: req.body.comp_city,
        comp_email: req.body.comp_email,
        comp_cnd_state: req.body.comp_cnd_state,
        comp_pin: req.body.comp_pin,
      },
      {
        where: { uid: req.body.uid },
      }
    );
    let updateCentUser = await centUser.update(
      {
        fname: req.body.fname,
        lname: req.body.lname,
        dob: req.body.dob,
        marital_status: req.body.marital_status,
        city: req.body.city,
        pin: req.body.pin,
        udated: currentStamp,
      },
      {
        where: { uid: req.body.uid },
      }
    );
    return res.json({
      data: updateUser,
      message: "Update user data successfully!",
      status: 200,
    });
  } catch (err) {
    return res.json({
      message: "Error occured",
      error: err,
    });
  }
};

let accountDetails = async (req, res) => {
  try {
    if (!req.body.uid) {
      return res.json({
        message: "UID is mandatory",
      });
    }
    let currentStamp = getEpochTimestamp();
    let updateUser = await centBankDetails.update(
      {
        uid: req.body.uid,
        account_name: req.body.account_name,
        account_number: req.body.account_number,
        account_ifsc_number: req.body.account_ifsc_number,
        account_type: req.body.account_type,
        deleted: "N",
      },
      {
        where: { uid: req.body.uid },
      }
    );
    let updateCentUser = await centUser.update(
      {
        fname: req.body.fname,
        lname: req.body.lname,
        dob: req.body.dob,
        marital_status: req.body.marital_status,
        city: req.body.city,
        pin: req.body.pin,
        udated: currentStamp,
      },
      {
        where: { uid: req.body.uid },
      }
    );
    return res.json({
      data: updateUser,
      message: "Update user data successfully!",
      status: 200,
    });
  } catch (err) {
    return res.json({
      message: "Error occured",
      error: err,
    });
  }
};

let createDefaultLead = async (data) => {
  try {
    let config = {
      method: "post",
      url:
        Config.faircentApi.url + "/loan_ruleapi/borrower_api_account_creation",
      data: {
        password: "Password@123",
        username: data.username,
        email: data.email,
      },
    };
    let createLeadDetails = await httpReqequest(config);
    return {
      message: "created new user successfully!",
      status: 200,
    };
  } catch (err) {
    return {
      message: "Error occured",
      error: err,
    };
  }
};

let getLeads = async (req, res) => {
  try {
    let [getLeadsData,count] = await Promise.all (  [ (db.sequelize.query(
      `
      select cu.fname,cu.lname,
      cu.uid,u.mail,cu.dob,
      cu.address,cu.city,cu.pin,
      cu.mobile,cu.PAN,cu.gender,
      cu.is_pan_verified
      from cent_user cu
      join users u on u.uid = cu.uid
      limit ${req.query.limit} offset ${req.query.offset}
      `)
    ),
    (db.sequelize.query(
      `
      select count(*) as count
      from cent_user cu
      join users u on u.uid = cu.uid
      `,{
        raw:true
      })
    )
    ]
    );
    return res.status(200).json({
      message: "Leads data",
      data:getLeadsData[0],
      count:count[0][0]['count'],
      status: 200,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error occured while fetching the leads data",
      error: err,
    });
  }
};

let getBorrowerDetails = async (req, res) => {
  try {
    let borrowerData = await centUser.findAll({
      where: {
        uid: req.query.uid,
      },
      raw: true,
    });
    return res.json({
      message: "Borrower Details",
      data: borrowerData,
      status: 200,
    });
  } catch (err) {
    return {
      message: "Error occured",
      error: err,
    };
  }
};

let getBorrowerBusinessLead = async (req, res) => {
  try {
    let borrowerBusinessData = await centEmployment.findAll({
      where: {
        uid: req.query.uid,
      },
      raw: true,
    });
    return res.json({
      message: "Borrower business Details",
      data: borrowerBusinessData,
      status: 200,
    });
  } catch (err) {
    return {
      message: "Error occured in getting borrower business details",
      error: err,
    };
  }
};

let uploadUserPhoto = async (body) => {
  try {
    let updateCentUser = await centLoanDoc.update(
      {
        doc_type_cnd: body.docId,
      },
      {
        where: {
          uid: body.uid,
          upload_file_key: "TEST",
          doc_file: body.photoId,
        },
      }
    );
    return {
      message: "Photo saved successfully",
      data: updateCentUser,
      status: 200,
    };
  } catch (err) {
    return {
      message: "Error occured in uploading user photograph",
      error: err,
    };
  }
};

module.exports = {
  createLead,
  createDefaultLead,
  updateLead,
  companyDetails,
  accountDetails,
  getLeads,
  getBorrowerDetails,
  updateBusinessLead,
  getBorrowerBusinessLead,
  uploadUserPhoto,
};
