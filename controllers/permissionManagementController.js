const db = require("../models");
const centDsaPermission = db.centDsaPermission;
const centDsaPermissionRole = db.centDsaPermissionRole;

const createPermission = async (req, res) => {
  try {
    let permission = await centDsaPermission.create({
      permission_name: req.body.permission_name,
      permission_key: req.body.permission_key,
      createAccess: req.body.createAccess,
      editAccess: req.body.editAccess,
      viewAccess: req.body.viewAccess,
      deleteAccess: req.body.deleteAccess,
      isActive: 1,
    });
    return res.json({
      message: "New Permission created successfully",
      data: permission,
      status: 200,
    });
  } catch (err) {
    return res.json({
      message: "Error occured while creating the permission",
      error: err,
    });
  }
};

const fetchPermissions = async (req, res) => {
  try {
    let permission = await centDsaPermission.findAll({
      where: { isActive: 1 },
      raw: true,
    });
    return res.json({
      message: "New Permission created successfully",
      data: permission,
      status: 200,
    });
  } catch (err) {
    return res.json({
      message: "Error occured while fetching the list of  permission",
      error: err,
    });
  }
};
const updatePermissions = async (req, res) => {
  try {
    let updatePermission = await centDsaPermission.update(
      {
        isActive: req.body.isActive,
        permission_name: req.body.permission_name,
        permission_key: req.body.permission_key,
        createAccess: req.body.createAccess,
        editAccess: req.body.editAccess,
        viewAccess: req.body.viewAccess,
        deleteAccess: req.body.deleteAccess,
      },
      {
        where: { id: req.body.id },
      }
    );
    return res.json({
        message: "Permission updated successfully",
        data: updatePermission,
        status: 200,
      });
  } catch (err) {
    return res.json({
      message: "Error occured while fetching the list of  permission",
      error: err,
    });
  }
};


const createPermissionRole = async (req, res) => {
    try {
      let permission = await centDsaPermission.create({
        permissionId: req.body.permissionId,
        roleId: req.body.roleId,
        isActive: 1,
      });
      return res.json({
        message: "New Permission role created successfully",
        data: permission,
        status: 200,
      });
    } catch (err) {
      return res.json({
        message: "Error occured while creating the permission",
        error: err,
      });
    }
};


const updatePermissionRole = async (req, res) => {
    try {
      let updatePermission = await centDsaPermission.update(
        {
          isActive: req.body.isActive,
          permissionId: req.body.permissionId,
          roleId: req.body.roleId,
        },
        {
          where: { id: req.body.permissionId },
        }
      );
      return res.json({
          message: "Permission role updated successfully",
          data: updatePermission,
          status: 200,
        });
    } catch (err) {
      return res.json({
        message: "Error occured while fetching the list of  permission",
        error: err,
      });
    }
  };

module.exports = {
  createPermission,
  fetchPermissions,
  updatePermissions,
  createPermissionRole,
  updatePermissionRole
};
