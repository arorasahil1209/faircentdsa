let { httpReqequest } = require("../services/faircent.services");
const db = require("../models");
const centUser = db.centUser;
const Users = db.users;
const centDsaRoles = db.centDsaRoles;
const centDsaUserRoles = db.centDsaUserRoles;
let { getEpochTimestamp } = require("../dao/repo");
let Config = require("../config/dev.json");

const createUser = async (req, res) => {
  try {
    let currentStamp = getEpochTimestamp();
    req.body.currentStamp = currentStamp;
    let config = {
      method: "post",
      url:
        Config.faircentApi.droopleUrl +
        "/loan_ruleapi/borrower_api_account_creation.json",
      data: {
        password: Config.faircentApi.tempPassword,
        username: req.body.primary_email_id,
        email: req.body.primary_email_id,
      },
    };
    let defaultLead = await httpReqequest(config);
    console.log("defaultLead:", defaultLead);
    req.body.uid = defaultLead.value;
    let [centUser] = await Promise.all([createCentUser(req.body)]);
    let cenUserRole = await centUserRoles(req.body);
    return res.json({
      message: "user created successfully",
      data: centUser,
      status: 200,
    });
  } catch (err) {
    return res.json({
      message: "Error occured",
      error: err,
    });
  }
};

const centUserRoles = async (body) => {
  let user = await centDsaUserRoles.create({
    uid: body.uid,
    rid: body.roleId,
    isActive: 1,
  });
  return user;
};

const createCentUser = async (body) => {
  let createCentUser = await centUser.create({
    uid: body.uid,
    deleted: "N",
    mobile: body.primary_mobile_no,
    created: body.currentStamp,
    fname: body.name.split(" ")[0],
    lname: body.name.split(" ")[1],
  });
  return createCentUser;
};

const listUser = async (req, res) => {
  try {
    let users = await db.sequelize.query(
      `select  ur.uid, ur.isActive,r.roleName,cu.fname, cu.lname,cu.mobile,u.mail,r.role_key
      from cent_dsapro_user_roles ur
      join cent_dsapro_roles r on r.id = ur.rid
      join cent_user cu on cu.uid = ur.uid
      join users u on u.uid =ur.uid
      limit ${req.query.limit} offset ${req.query.offset}
      `
    );
    console.log("users:::", users);

    return res.json({
      message: "List of users fetched successfully",
      data: users[0],
      status: 200,
    });
  } catch (err) {
    return res.json({
      message: "Error occured",
      error: err,
    });
  }
};

const userById = async (req, res) => {
  try {
    let user = await db.sequelize.query(
      `select  ur.uid, r.name,cu.fname, cu.lname,cu.mobile,u.mail from cent_dsapro_user_roles ur
      join cent_dsapro_roles r on r.id = ur.rid
      join cent_user cu on cu.uid = ur.uid
      join users u on u.uid =ur.uid
      where ur.uid = ${req.query.uid}
      `
    );
    console.log("users:::", user);

    return res.json({
      message: "User detail fetched successfully",
      data: user[0],
      status: 200,
    });
  } catch (err) {
    return res.json({
      message: "Error occured",
      error: err,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    let roleExist = await centDsaRoles.findAll({
      where: { id: req.body.roleId },
      raw: true,
    });
    console.log("roleExist:::", roleExist);
    if (roleExist.length == 0) {
      return res.json({
        message: "Role id does not exist in the system",
      });
    }
    let [updateUserRole, updateUser, updateUserBasicInfo] = await Promise.all([
      updateUserStatusOrRole(req.body),
      updateCentUser(req.body),
      updateUserBasicDetails(req.body),
    ]);
    return res.json({
      message: "User updated successfully!",
      data: updateUserRole,
      status: 200,
    });
  } catch (err) {
    return res.json({
      message: "Error occured",
      error: err,
    });
  }
};

const updateUserStatusOrRole = async (body) => {
  let updateUserRole = await centDsaUserRoles.update(
    {
      rid: body.roleId,
      isActive: body.isActive,
    },
    {
      where: { uid: body.uid },
    }
  );
  return updateUserRole;
};

const updateCentUser = async (body) => {
  let updateUser = await centUser.update(
    {
      fname: body.fname,
      lname: body.lname,
      mobile: body.mobile,
      gender: body.gender,
    },
    {
      where: { uid: body.uid },
    }
  );
  return updateUser;
};

const updateUserBasicDetails = async (body) => {
  let updateUser = await centUser.update(
    {
      name: `${body.fname} ${body.lname}`,
      pass: body.password,
    },
    {
      where: { uid: body.uid },
    }
  );
  return updateUser;
};

module.exports = {
  createUser,
  listUser,
  userById,
  updateUser,
};
