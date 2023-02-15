const db = require("../models");
const Users = db.users;
const centUser = db.centUser;
const centDsaRoles = db.centDsaRoles;
const centCnd = db.centCnd;
const centDsaUserRoles = db.centDsaUserRoles;
let getStates = async (req, res) => {
  try {
    let getStateData = await centCnd.findAll({
      where: {
        cnd_group: "STATE_INDIA",
        deleted: "N",
        is_active: 1,
      },
      raw: true,
    });
    return res.json({
      data: getStateData,
      message: "SUCCESS",
      status: 200,
    });
  } catch (err) {
    return res.json({
      message: "Error occured",
      error: err,
    });
  }
};

let getCities = async (req, res) => {
  try {
    let getCityData = await centCnd.findAll({
      where: {
        cnd_group: req.query.cityCode.toUpperCase(),
        deleted: "N",
        is_active: 1,
      },
      raw: true,
    });
    return res.json({
      data: getCityData,
      message: "SUCCESS",
      status: 200,
    });
  } catch (err) {
    return res.json({
      message: "Error occured",
      error: err,
    });
  }
};

let getReligions = async (req, res) => {
  try {
    let getReligionData = await centCnd.findAll({
      where: {
        cnd_group: "INDIA_RELIGION",
        deleted: "N",
        is_active: 1,
      },
      raw: true,
    });
    return res.json({
      data: getReligionData,
      message: "SUCCESS",
      status: 200,
    });
  } catch (err) {
    return res.json({
      message: "Error occured religion list",
      error: err,
    });
  }
};

let getLoans = async (req, res) => {
  try {
    let getLoanData = await centCnd.findAll({
      where: {
        cnd_group: "INDIA_LOAN",
        deleted: "N",
        is_active: 1,
      },
      raw: true,
    });
    return res.json({
      data: getLoanData,
      message: "SUCCESS",
      status: 200,
    });
  } catch (err) {
    return res.json({
      message: "Error occured religion list",
      error: err,
    });
  }
};

let getEmploymentTypes = async (req, res) => {
  try {
    let getEmploymentData = await centCnd.findAll({
      where: {
        cnd_group: "EMPLOYMENT_TYPE",
        deleted: "N",
        is_active: 1,
      },
      raw: true,
    });
    return res.json({
      data: getEmploymentData,
      message: "SUCCESS",
      status: 200,
    });
  } catch (err) {
    return res.json({
      message: "Error occured religion list",
      error: err,
    });
  }
};

let getBusinessTypes = async (req, res) => {
  try {
    let getBuisnessData = await centCnd.findAll({
      where: {
        cnd_group: "BUSINESS_INDUSTRY",
      },
      raw: true,
    });
    return res.json({
      data: getBuisnessData,
      message: "SUCCESS",
      status: 200,
    });
  } catch (err) {
    return res.json({
      message: "Error occured religion list",
      error: err,
    });
  }
};

let getIndianAssets = async (req, res) => {
  try {
    let getBuisnessData = await centCnd.findAll({
      where: {
        cnd_group: "INDIA_ASSET",
        deleted: "N",
        is_active: 1,
      },
      raw: true,
    });
    return res.json({
      data: getBuisnessData,
      message: "SUCCESS",
      status: 200,
    });
  } catch (err) {
    return res.json({
      message: "Error occured religion list",
      error: err,
    });
  }
};

let getPinCodes = async (req, res) => {
  try {
    //select DISTINCT cnd_name,cnd_code,cnd_group,priority from cent_cnd WHERE cnd_group = "STATE_PIN" and cnd_parent_id =332
    let pinCodes = await centCnd.findAll({
      where: {
        cnd_parent_id: req.query.parentId,
        cnd_group: "STATE_PIN",
        deleted: "N",
        is_active: 1,
      },
      raw: true,
    });
    return res.json({
      data: pinCodes,
      message: "SUCCESS",
      status: 200,
    });
  } catch (err) {
    return res.json({
      message: "Error occured pinCodes list",
      error: err,
    });
  }
};

let getAllBanks = async (req, res) => {
  try {
    let getBankDetails = await centCnd.findAll({
      where: {
        cnd_group: "INDIA_BANK_NAME",
        deleted: "N",
        is_active: 1,
      },
      raw: true,
    });
    return res.json({
      data: getBankDetails,
      message: "SUCCESS",
      status: 200,
    });
  } catch (err) {
    return res.json({
      message: "Error occured banking list",
      error: err,
    });
  }
};

let getResidenceType = async (req, res) => {
  try {
    let getResidenceTypes = await centCnd.findAll({
      where: {
        cnd_group: "RESIDENCE_TYPE",
        deleted: "N",
        is_active: 1,
      },
      raw: true,
    });
    return res.json({
      data: getResidenceTypes,
      message: "SUCCESS",
      status: 200,
    });
  } catch (err) {
    return res.json({
      message: "Error occured banking list",
      error: err,
    });
  }
};

let getEducationTypes = async (req, res) => {
  try {
    let getEducationTypes = await centCnd.findAll({
      where: {
        cnd_group: "EDUCATION_QULIFICATION",
        deleted: "N",
        is_active: 1,
      },
      raw: true,
    });
    return res.json({
      data: getEducationTypes,
      message: "SUCCESS",
      status: 200,
    });
  } catch (err) {
    return res.json({
      message: "Error occured education type list",
      error: err,
    });
  }
};

let getDocumentVerifications = async (req, res) => {
  try {
    let documentVerifications = await centCnd.findAll({
      where: {
        cnd_group: "DOCUMENT_VERIFICATION",
        deleted: "N",
        is_active: 1,
      },
      raw: true,
    });
    return res.json({
      data: documentVerifications,
      message: "SUCCESS",
      status: 200,
    });
  } catch (err) {
    return res.json({
      message: "Error occured documentVerifications type list",
      error: err,
    });
  }
};

const createDsaRoles = async (req, res) => {
  try {
    let role = await centDsaRoles.create({
      name: req.body.name,
      role_key:req.body.name.split(' ').join('_').toUpperCase(),
      isActive:1
    });
    return res.json({
      data: role,
      message: "SUCCESS",
      status: 200,
    });
  } catch (err) {
    return res.json({
      message: "Error occured documentVerifications type list",
      error: err,
    });
  }
};

const getDsaRoles = async (req, res) => {
  try {
    let role = await centDsaRoles.findAll({
      raw: true
    },);
    return res.json({
      data: role,
      message: "Roles List",
      status: 200,
    });
  } catch (err) {
    return res.json({
      message: "Error occured while getting all roles",
      error: err,
    });
  }
};
const updateDsaRoles = async (req, res) => {
    try {
      let role = await centDsaRoles.update(
        {
          name: req.body.name,
          role_key:req.body.rolekey,
          isActive: req.body.isActive,
        },
        {
          where: { id: req.body.roleId },
        }
      );
      return res.json({
        data: role,
        message: "Roles List",
        status: 200,
      });
    } catch (err) {
      return res.json({
        message: "Error occured while getting all roles",
        error: err,
      });
    }
  };
module.exports = {
  getStates,
  getCities,
  createDsaRoles,
  getReligions,
  getLoans,
  getEmploymentTypes,
  getBusinessTypes,
  getIndianAssets,
  getPinCodes,
  getAllBanks,
  getResidenceType,
  getEducationTypes,
  getDocumentVerifications,
  getDsaRoles,
  updateDsaRoles
};
