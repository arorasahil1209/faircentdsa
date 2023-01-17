import Express from "express";
import controller from "./controller";
//import authorizationController from "../../authorization/controller";
// import awsUpload from "../../../../../helper/awsUploadHandler";
// import uploadHandler from "../../../../../helper/uploadHandler";

export default Express.Router()
  //Permission_Modules
  .post("/permissionmodule/add", controller.addPermissionModule)
  .put("/permissionmodule/edit/:id", controller.editPermissionModule)
  .put("/permissionmodule/active/:id", controller.activePermissionModule)
  .put("/permissionmodule/inactive/:id", controller.inactivePermissionModule)
  .get("/permissionmodule/list", controller.listPermissionModule)
  .get("/permissionmodule/:id", controller.detailsPermissionModule)

  //Permissions
  .post("/permission/add", controller.addPermission)
  .put("/permission/edit/:id", controller.editPermission)
  .put("/permission/active/:id", controller.activePermission)
  .put("/permission/inactive/:id", controller.inactivePermission)
  .get("/permission/list", controller.listPermission)
  .get("/permission/:id", controller.detailsPermission)

  //Roles
  .post("/roles/add", controller.addRoles)
  .put("/roles/edit/:id", controller.editRoles)
  .put("/roles/active/:id", controller.activeRoles)
  .put("/roles/inactive/:id", controller.inactiveRoles)
  .get("/roles/list", controller.listRoles)
  .get("/roles/:id", controller.detailsRoles)

  //Roles_Privileges
  .post("/rolesprivileges/add", controller.addRolesPrivileges)
  .put("/rolesprivileges/edit/:id", controller.editRolesPrivileges)
  .put("/rolesprivileges/active/:id", controller.activeRolesPrivileges)
  .put("/rolesprivileges/inactive/:id", controller.inactiveRolesPrivileges)
  .get("/rolesprivileges/list", controller.listRolesPrivileges)
  .get("/rolesprivileges/:id", controller.detailsRolesPrivileges)

  .put("/assignrole", controller.assignRole)
