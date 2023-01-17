import Joi from "joi";
import Async from "async";
import Boom from "boom";
import _ from "lodash";
import Path from "path";
import Config from "config";
import PermissionModuleModel from "../../../../models/permissionModule";
import RolesPrivilegesModel from "../../../../models/role_privilege";
import PermissionModel from "../../../../models/permission";
import RolesModel from "../../../../models/roles";
import AdminUserModel from "../../../../models/admin";
import { find, findOne, findOneAndUpdate, remove, countDocuments, create, aggrigate, update, insertMany } from "../../services/common.services";
import Response from "../../../../models/response";
import mongoose from 'mongoose';
const apiAddress = Config.get("hostAddress");
const db = require("../../../../models");
const Permission = db.permission;
const PermissionModule = db.permissionModule;
const Roles = db.roles;
const RolePrivilege = db.rolePrivilege;

export class RolesAndAccessController {
  /**
   * @swagger
   * /admin/rolesandaccess/permissionmodule/add:
   *   post:
   *     tags:
   *       - Admin
   *     description: Add New Permission Module
   *     produces:
   *       - application/json
   *     security:
   *       - tokenauth: [Authorization]
   *     parameters:
   *       - name: country
   *         description: Permission Module
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/PermissionModule'
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async addPermissionModule(request, response, next) {
    const validationSchema = {
      title_name: Joi.string().required(),
      title_key: Joi.string().required(),
      is_system: Joi.boolean().optional(),
      sort_order: Joi.number().optional()
    };
    try {
      let validatedBody = await Joi.validate(request.body, validationSchema);
      PermissionModule.create(validatedBody)
      .then(data => {
        //res.send(data);
        return response.json(
              new Response(data, "Captured", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while creating the Permission.", 401)
      );
      });

    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
  /**
   * @swagger
   * /admin/rolesandaccess/permissionmodule/edit/{id}:
   *   put:
   *     tags:
   *       - Admin
   *     description: Edit PermissionModule
   *     produces:
   *       - application/json
   *     security:
   *       - tokenauth: [Authorization]
   *     parameters:
   *       - name: id
   *         description: PermissionModule ID
   *         in: path
   *         required: true
   *       - name: country
   *         description: PermissionModule Details
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/EditPermissionModule'
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async editPermissionModule(request, response, next) {
    const validationSchema = {
      title_name: Joi.string().optional(),
      title_key: Joi.string().optional()
    };
    let requestedData = request.body
    try {
      let validatedBody = await Joi.validate(requestedData, validationSchema);
      PermissionModule.findOne({where: {id:request.params.id}})
      .then(async data => {
        //delete validatedBody.id
        const result = await PermissionModule.update(validatedBody,{where: {id:request.params.id}});
        return response.json(
              new Response(validatedBody, "Permission Updated", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while generating OTP.", 401)
      );
      });

    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
  /**
 * @swagger
 * /admin/rolesandaccess/permissionmodule/active/{id}:
 *   put:
 *     tags:
 *       - Admin
 *     description: Activate PermissionModule
 *     produces:
 *       - application/json
 *     security:
 *       - tokenauth: [Authorization]
 *     parameters:
 *       - name: id
 *         description: PermissionModule ID
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
  async activePermissionModule(request, response, next) {
    const validationSchema = {
      id: Joi.string().required().trim()
    };
    try {
      let validatedBody = await Joi.validate(request.params, validationSchema);
      let updatedData = {
        is_active:true
      }
      PermissionModule.findOne({where: {id:validatedBody.id}})
      .then(async data => {
        //delete validatedBody.id
        const result = await PermissionModule.update(updatedData,{where: {id:validatedBody.id}});
        return response.json(
              new Response(validatedBody, "Permission Module Activated sucessfull!", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while Activating Permission.", 401)
      );
      });

    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
  /**
* @swagger
* /admin/rolesandaccess/permissionmodule/inactive/{id}:
*   put:
*     tags:
*       - Admin
*     description: DeActivate PermissionModule
*     produces:
*       - application/json
*     security:
*       - tokenauth: [Authorization]
*     parameters:
*       - name: id
*         description: PermissionModule ID
*         in: path
*         required: true
*     responses:
*       200:
*         description: Returns success message
*/
  async inactivePermissionModule(request, response, next) {
    const validationSchema = {
      id: Joi.string().required().trim()
    };
    try {
      let validatedBody = await Joi.validate(request.params, validationSchema);
      let updatedData = {
        is_active:false
      }
      PermissionModule.findOne({where: {id:validatedBody.id}})
      .then(async data => {
        //delete validatedBody.id
        const result = await PermissionModule.update(updatedData,{where: {id:validatedBody.id}});
        return response.json(
              new Response(validatedBody, "Permission Module De-Activated sucessfull!", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while De-Activating Permission.", 401)
      );
      });

    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
  /**
* @swagger
* /admin/rolesandaccess/permissionmodule/list:
*   get:
*     tags:
*       - Admin
*     description: PermissionModule List
*     produces:
*       - application/json
*     security:
*       - tokenauth: [Authorization]
*     responses:
*       200:
*         description: Returns success message
*/
  async listPermissionModule(request, response, next) {
    const validationSchema = {};
    try {
      let validatedBody = await Joi.validate(validationSchema, validationSchema);      
      PermissionModule.findAll({
        
      })
      .then(data => {
        //res.send(data);
        return response.json(
              new Response(data, "Permission Module List!", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while getting Permission Module List.", 401)
      );
      });
    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
  /**
* @swagger
* /admin/rolesandaccess/permissionmodule/{id}:
*   get:
*     tags:
*       - Admin
*     description: PermissionModule Details
*     produces:
*       - application/json
*     security:
*       - tokenauth: [Authorization]
*     parameters:
*       - name: id
*         description: PermissionModule ID
*         in: path
*         required: true
*     responses:
*       200:
*         description: Returns success message
*/
  async detailsPermissionModule(request, response, next) {
    const validationSchema = {
      id: Joi.string().required().trim()
    };
    try {
      let validatedBody = await Joi.validate(request.params, validationSchema);
      PermissionModule.findOne({
        where: {id: validatedBody.id},
      })
      .then(data => {
        //res.send(data);
        return response.json(
              new Response(data, "Permission Module Information!", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while getting Permission Module List.", 401)
      );
      });
    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
  //Roles
  /**
 * @swagger
 * /admin/rolesandaccess/roles/add:
 *   post:
 *     tags:
 *       - Admin
 *     description: Add New Roles
 *     produces:
 *       - application/json
 *     security:
 *       - tokenauth: [Authorization]
 *     parameters:
 *       - name: country
 *         description: Roles
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Roles'
 *     responses:
 *       200:
 *         description: Returns success message
 */
  async addRoles(request, response, next) {
    const validationSchema = {
      title_name: Joi.string().required(),
      title_key: Joi.string().required(),
      is_system: Joi.boolean().optional()
    };
    try {
      let validatedBody = await Joi.validate(request.body, validationSchema);
      Roles.create(validatedBody)
      .then(data => {
        //res.send(data);
        return response.json(
              new Response(data, "Captured", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while creating the Role.", 401)
      );
      });
    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
  /**
   * @swagger
   * /admin/rolesandaccess/roles/edit/{id}:
   *   put:
   *     tags:
   *       - Admin
   *     description: Edit Roles
   *     produces:
   *       - application/json
   *     security:
   *       - tokenauth: [Authorization]
   *     parameters:
   *       - name: id
   *         description: Roles ID
   *         in: path
   *         required: true
   *       - name: country
   *         description: Roles Details
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/EditRoles'
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async editRoles(request, response, next) {
    const validationSchema = {
      title_name: Joi.string().optional(),
      title_key: Joi.string().optional()
    };
    let requestedData = request.body
    try {
      let validatedBody = await Joi.validate(requestedData, validationSchema);
      Roles.findOne({where: {id:request.params.id}})
      .then(async data => {
        //delete validatedBody.id
        const result = await Roles.update(validatedBody,{where: {id:request.params.id}});
        return response.json(
              new Response(validatedBody, "Roles Updated", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while in Roles.", 401)
      );
      });

    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
  /**
 * @swagger
 * /admin/rolesandaccess/roles/active/{id}:
 *   put:
 *     tags:
 *       - Admin
 *     description: Activate Roles
 *     produces:
 *       - application/json
 *     security:
 *       - tokenauth: [Authorization]
 *     parameters:
 *       - name: id
 *         description: Roles ID
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
  async activeRoles(request, response, next) {
    const validationSchema = {
      id: Joi.string().required().trim()
    };
    try {
      let validatedBody = await Joi.validate(request.params, validationSchema);
      let updatedData = {
        is_active:true
      }
      Roles.findOne({where: {id:validatedBody.id}})
      .then(async data => {
        //delete validatedBody.id
        const result = await Roles.update(updatedData,{where: {id:validatedBody.id}});
        return response.json(
              new Response(validatedBody, "Roles Activated sucessfull!", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while Activating Roles.", 401)
      );
      });
    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
  /**
* @swagger
* /admin/rolesandaccess/roles/inactive/{id}:
*   put:
*     tags:
*       - Admin
*     description: DeActivate Roles
*     produces:
*       - application/json
*     security:
*       - tokenauth: [Authorization]
*     parameters:
*       - name: id
*         description: Roles ID
*         in: path
*         required: true
*     responses:
*       200:
*         description: Returns success message
*/
  async inactiveRoles(request, response, next) {
    const validationSchema = {
      id: Joi.string().required().trim()
    };
    try {
      let validatedBody = await Joi.validate(request.params, validationSchema);
      let updatedData = {
        is_active:false
      }
      Roles.findOne({where: {id:validatedBody.id}})
      .then(async data => {
        //delete validatedBody.id
        const result = await Roles.update(updatedData,{where: {id:validatedBody.id}});
        return response.json(
              new Response(validatedBody, "Roles De-Activated sucessfull!", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while De-Activating Roles.", 401)
      );
      });
    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
  /**
* @swagger
* /admin/rolesandaccess/roles/list:
*   get:
*     tags:
*       - Admin
*     description: Roles List
*     produces:
*       - application/json
*     security:
*       - tokenauth: [Authorization]
*     responses:
*       200:
*         description: Returns success message
*/
  async listRoles(request, response, next) {
    const validationSchema = {};
    try {
      let validatedBody = await Joi.validate(validationSchema, validationSchema);
      Roles.findAll({
        
      })
      .then(data => {
        //res.send(data);
        return response.json(
              new Response(data, "Roles List!", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while getting Roles List.", 401)
      );
      });
    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
  /**
* @swagger
* /admin/rolesandaccess/roles/{id}:
*   get:
*     tags:
*       - Admin
*     description: Roles Details
*     produces:
*       - application/json
*     security:
*       - tokenauth: [Authorization]
*     parameters:
*       - name: id
*         description: Roles ID
*         in: path
*         required: true
*     responses:
*       200:
*         description: Returns success message
*/
  async detailsRoles(request, response, next) {
    const validationSchema = {
      id: Joi.string().required().trim()
    };
    try {
      let validatedBody = await Joi.validate(request.params, validationSchema);
      Roles.findOne({
        where: {id: validatedBody.id},
      })
      .then(data => {
        //res.send(data);
        return response.json(
              new Response(data, "Roles Information!", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while getting Roles Information.", 401)
      );
      });
    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
  //Permission
  /**
 * @swagger
 * /admin/rolesandaccess/permission/add:
 *   post:
 *     tags:
 *       - Admin
 *     description: Add New Permission
 *     produces:
 *       - application/json
 *     security:
 *       - tokenauth: [Authorization]
 *     parameters:
 *       - name: country
 *         description: Permission
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Permission'
 *     responses:
 *       200:
 *         description: Returns success message
 */
  async addPermission(request, response, next) {
    const validationSchema = {
      permission_module_Id: Joi.string().required(),
      title_name: Joi.string().trim().required(),
      title_key: Joi.string().trim().required(),
      can_add: Joi.boolean().optional(),
      can_edit: Joi.boolean().optional(),
      can_view: Joi.boolean().optional(),
      can_delete: Joi.boolean().optional(),
    };

    try {
      let validatedBody = await Joi.validate(request.body, validationSchema);
      Permission.create(validatedBody)
      .then(data => {
        //res.send(data);
        return response.json(
              new Response(data, "Captured", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(err, "Some error occurred while creating the Permission.", 401)
      );
      });

    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
  /**
   * @swagger
   * /admin/rolesandaccess/permission/edit/{id}:
   *   put:
   *     tags:
   *       - Admin
   *     description: Edit Permission
   *     produces:
   *       - application/json
   *     security:
   *       - tokenauth: [Authorization]
   *     parameters:
   *       - name: id
   *         description: Permission ID
   *         in: path
   *         required: true
   *       - name: country
   *         description: Permission Details
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Permission'
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async editPermission(request, response, next) {
    const validationSchema = {
      permission_module_Id: Joi.string().required(),
      title_name: Joi.string().required(),
      title_key: Joi.string().required(),
      can_add: Joi.boolean().optional(),
      can_edit: Joi.boolean().optional(),
      can_view: Joi.boolean().optional(),
      can_delete: Joi.boolean().optional(),
    };
    let requestedData = request.body
    try {
      let validatedBody = await Joi.validate(requestedData, validationSchema);
      Permission.findOne({where: {id:request.params.id}})
      .then(async data => {
        //delete validatedBody.id
        const result = await Permission.update(validatedBody,{where: {id:request.params.id}});
        return response.json(
              new Response(validatedBody, "Permission Updated", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while generating OTP.", 401)
      );
      });

    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
  /**
 * @swagger
 * /admin/rolesandaccess/permission/active/{id}:
 *   put:
 *     tags:
 *       - Admin
 *     description: Activate Permission
 *     produces:
 *       - application/json
 *     security:
 *       - tokenauth: [Authorization]
 *     parameters:
 *       - name: id
 *         description: Permission ID
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
  async activePermission(request, response, next) {
    const validationSchema = {
      id: Joi.string().required().trim()
    };
    try {
      let validatedBody = await Joi.validate(request.params, validationSchema);
      let updatedData = {
        is_active:true
      }
      Permission.findOne({where: {id:validatedBody.id}})
      .then(async data => {
        //delete validatedBody.id
        const result = await LeadDocuments.update(updatedData,{where: {id:validatedBody.id}});
        return response.json(
              new Response(validatedBody, "Permission Module Activated sucessfull!", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while Activating Permission.", 401)
      );
      });

    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
  /**
* @swagger
* /admin/rolesandaccess/permission/inactive/{id}:
*   put:
*     tags:
*       - Admin
*     description: DeActivate Permission
*     produces:
*       - application/json
*     security:
*       - tokenauth: [Authorization]
*     parameters:
*       - name: id
*         description: Permission ID
*         in: path
*         required: true
*     responses:
*       200:
*         description: Returns success message
*/
  async inactivePermission(request, response, next) {
    const validationSchema = {
      id: Joi.string().required().trim()
    };
    try {
      let validatedBody = await Joi.validate(request.params, validationSchema);
      let updatedData = {
        is_active:false
      }
      Permission.findOne({where: {id:validatedBody.id}})
      .then(async data => {
        //delete validatedBody.id
        const result = await LeadDocuments.update(updatedData,{where: {id:validatedBody.id}});
        return response.json(
              new Response(validatedBody, "Permission Module Activated sucessfull!", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while Activating Permission.", 401)
      );
      });

    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
  /**
* @swagger
* /admin/rolesandaccess/permission/list:
*   get:
*     tags:
*       - Admin
*     description: Permission List
*     produces:
*       - application/json
*     security:
*       - tokenauth: [Authorization]
*     responses:
*       200:
*         description: Returns success message
*/
  async listPermission(request, response, next) {
    const validationSchema = {};
    try {
      let validatedBody = await Joi.validate(validationSchema, validationSchema);
      Permission.findAll({
        
      })
      .then(data => {
        //res.send(data);
        return response.json(
              new Response(data, "Permission List!", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while getting Permission List.", 401)
      );
      });
    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
  /**
* @swagger
* /admin/rolesandaccess/permission/{id}:
*   get:
*     tags:
*       - Admin
*     description: Permission Details
*     produces:
*       - application/json
*     security:
*       - tokenauth: [Authorization]
*     parameters:
*       - name: id
*         description: Permission ID
*         in: path
*         required: true
*     responses:
*       200:
*         description: Returns success message
*/
  async detailsPermission(request, response, next) {
    const validationSchema = {
      id: Joi.string().required().trim()
    };
    try {
      let validatedBody = await Joi.validate(request.params, validationSchema);
      Permission.findOne({
        where: {id: validatedBody.id},
      })
      .then(data => {
        //res.send(data);
        return response.json(
              new Response(data, "Permission Information!", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while getting Permission Information.", 401)
      );
      });
    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
  //Roles_Privileges
  /**
 * @swagger
 * /admin/rolesandaccess/rolesprivileges/add:
 *   post:
 *     tags:
 *       - Admin
 *     description: Add New RolesPrivileges
 *     produces:
 *       - application/json
 *     security:
 *       - tokenauth: [Authorization]
 *     parameters:
 *       - name: country
 *         description: RolesPrivileges
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/RolesPrivileges'
 *     responses:
 *       200:
 *         description: Returns success message
 */
  async addRolesPrivileges(request, response, next) {
    const validationSchema = {
      permission_id: Joi.string().required(),
      role_id: Joi.string().required(),
      can_add: Joi.boolean().optional(),
      can_edit: Joi.boolean().optional(),
      can_view: Joi.boolean().optional(),
      can_delete: Joi.boolean().optional(),
    };

    try {
      let validatedBody = await Joi.validate(request.body, validationSchema);
      RolePrivilege.create(validatedBody)
      .then(data => {
        //res.send(data);
        return response.json(
              new Response(data, "New RolesPrivileges Added sucessfull!", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while creating the RolesPrivileges.", 401)
      );
      }); 

    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
  /**
 * @swagger
 * /admin/rolesandaccess/assignrole:
 *   put:
 *     tags:
 *       - Admin
 *     description: Assign Role To User
 *     produces:
 *       - application/json
 *     security:
 *       - tokenauth: [Authorization]
 *     parameters:
 *       - name: role
 *         description: Assign Role To User
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/AssignRole'
 *     responses:
 *       200:
 *         description: Returns success message
 */
  async assignRole(request, response, next) {
    const validationSchema = {
      user_id: Joi.string().required(),
      role_id: Joi.string().required()
    };

    try {
      let validatedBody = await Joi.validate(request.body, validationSchema);
      let _adminUserModel = new AdminUserModel().model;
      let result = await findOneAndUpdate(_adminUserModel, { _id: validatedBody.user_id }, { assigned_role_id: validatedBody.role_id });
      return response.json(
        new Response(null, "Roles Assigned sucessfull!")
      );

    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
  /**
   * @swagger
   * /admin/rolesandaccess/rolesprivileges/edit/{id}:
   *   put:
   *     tags:
   *       - Admin
   *     description: Edit RolesPrivileges
   *     produces:
   *       - application/json
   *     security:
   *       - tokenauth: [Authorization]
   *     parameters:
   *       - name: id
   *         description: RolesPrivileges ID
   *         in: path
   *         required: true
   *       - name: country
   *         description: RolesPrivileges Details
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/RolesPrivileges'
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async editRolesPrivileges(request, response, next) {
    const validationSchema = {
      permission_id: Joi.string().required(),
      role_id: Joi.string().required(),
      can_add: Joi.boolean().optional(),
      can_edit: Joi.boolean().optional(),
      can_view: Joi.boolean().optional(),
      can_delete: Joi.boolean().optional(),
    };
    let requestedData = request.body
    try {
      let validatedBody = await Joi.validate(requestedData, validationSchema);
      RolePrivilege.findOne({where: {id:request.params.id}})
      .then(async data => {
        //delete validatedBody.id
        const result = await RolePrivilege.update(validatedBody,{where: {id:request.params.id}});
        return response.json(
              new Response(validatedBody, "RolePrivilege Updated", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred in RolePrivilege.", 401)
      );
      });

    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
  /**
 * @swagger
 * /admin/rolesandaccess/rolesprivileges/active/{id}:
 *   put:
 *     tags:
 *       - Admin
 *     description: Activate RolesPrivileges
 *     produces:
 *       - application/json
 *     security:
 *       - tokenauth: [Authorization]
 *     parameters:
 *       - name: id
 *         description: RolesPrivileges ID
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
  async activeRolesPrivileges(request, response, next) {
    const validationSchema = {
      id: Joi.string().required().trim()
    };
    try {
      let validatedBody = await Joi.validate(request.params, validationSchema);
      let updatedData = {
        is_active:true
      }
      RolePrivilege.findOne({where: {id:validatedBody.id}})
      .then(async data => {
        //delete validatedBody.id
        const result = await RolePrivilege.update(updatedData,{where: {id:validatedBody.id}});
        return response.json(
              new Response(validatedBody, "RolePrivilege Activated sucessfull!", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while Activating RolePrivilege.", 401)
      );
      });
    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
  /**
* @swagger
* /admin/rolesandaccess/rolesprivileges/inactive/{id}:
*   put:
*     tags:
*       - Admin
*     description: DeActivate RolesPrivileges
*     produces:
*       - application/json
*     security:
*       - tokenauth: [Authorization]
*     parameters:
*       - name: id
*         description: RolesPrivileges ID
*         in: path
*         required: true
*     responses:
*       200:
*         description: Returns success message
*/
  async inactiveRolesPrivileges(request, response, next) {
    const validationSchema = {
      id: Joi.string().required().trim()
    };
    try {
      let validatedBody = await Joi.validate(request.params, validationSchema);
      let updatedData = {
        is_active:false
      }
      RolePrivilege.findOne({where: {id:validatedBody.id}})
      .then(async data => {
        //delete validatedBody.id
        const result = await RolePrivilege.update(updatedData,{where: {id:validatedBody.id}});
        return response.json(
              new Response(validatedBody, "RolePrivilege De-Activated sucessfull!", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while De-Activating RolePrivilege.", 401)
      );
      });
    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
  /**
* @swagger
* /admin/rolesandaccess/rolesprivileges/list:
*   get:
*     tags:
*       - Admin
*     description: RolesPrivileges List
*     produces:
*       - application/json
*     security:
*       - tokenauth: [Authorization]
*     responses:
*       200:
*         description: Returns success message
*/
  async listRolesPrivileges(request, response, next) {
    const validationSchema = {};
    try {
      let validatedBody = await Joi.validate(validationSchema, validationSchema);
      RolePrivilege.findAll({
        
      })
      .then(data => {
        //res.send(data);
        return response.json(
              new Response(data, "RolePrivilege List!", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while getting RolePrivilege List.", 401)
      );
      });
    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
  /**
* @swagger
* /admin/rolesandaccess/rolesprivileges/{id}:
*   get:
*     tags:
*       - Admin
*     description: RolesPrivileges Details
*     produces:
*       - application/json
*     security:
*       - tokenauth: [Authorization]
*     parameters:
*       - name: id
*         description: RolesPrivileges ID
*         in: path
*         required: true
*     responses:
*       200:
*         description: Returns success message
*/
  async detailsRolesPrivileges(request, response, next) {
    const validationSchema = {
      id: Joi.string().required().trim()
    };
    try {
      let validatedBody = await Joi.validate(request.params, validationSchema);
      RolePrivilege.findOne({
        where: {id: validatedBody.id},
      })
      .then(data => {
        //res.send(data);
        return response.json(
              new Response(data, "RolePrivilege Information!", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while getting RolePrivilege Information.", 401)
      );
      });
    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
}


export default new RolesAndAccessController();
