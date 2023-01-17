import Joi from "joi";
import Async from "async";
import Boom from "boom";
import _ from "lodash";
import Path from "path";
import Config from "config";
import CityModel from "../../../../models/city";
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
const City = db.city;
const Roles = db.roles;
const RolePrivilege = db.rolePrivilege;

export class CityController {
  /**
   * @swagger
   * /city/add:
   *   post:
   *     tags:
   *       - City
   *     description: Add New City 
   *     produces:
   *       - application/json
   *     security:
   *       - tokenauth: [Authorization]
   *     parameters:
   *       - name: country
   *         description: City 
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/City'
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async addCity(request, response, next) {
    const validationSchema = {
      city_name: Joi.string().required(),
      state_name: Joi.string().required(),
      country_name: Joi.string().optional(),
      country_code: Joi.string().optional()
    };
    try {
      let validatedBody = await Joi.validate(request.body, validationSchema);
      City.create(validatedBody)
      .then(data => {
        //res.send(data);
        return response.json(
              new Response(data, "Captured", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while creating the City.", 401)
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
   * /city/edit/{id}:
   *   put:
   *     tags:
   *       - City
   *     description: Edit City
   *     produces:
   *       - application/json
   *     security:
   *       - tokenauth: [Authorization]
   *     parameters:
   *       - name: id
   *         description: City ID
   *         in: path
   *         required: true
   *       - name: country
   *         description: City Details
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/City'
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async editCity(request, response, next) {
    const validationSchema = {
      city_name: Joi.string().optional(),
      state_name: Joi.string().optional(),
      country_name: Joi.string().optional(),
      country_code: Joi.string().optional()
    };
    let requestedData = request.body
    try {
      let validatedBody = await Joi.validate(requestedData, validationSchema);
      City.findOne({where: {id:request.params.id}})
      .then(async data => {
        //delete validatedBody.id
        const result = await City.update(validatedBody,{where: {id:request.params.id}});
        return response.json(
              new Response(validatedBody, "City Updated", 200)
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
 * /city/active/{id}:
 *   put:
 *     tags:
 *       - City
 *     description: Activate City
 *     produces:
 *       - application/json
 *     security:
 *       - tokenauth: [Authorization]
 *     parameters:
 *       - name: id
 *         description: City ID
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
  async activeCity(request, response, next) {
    const validationSchema = {
      id: Joi.string().required().trim()
    };
    try {
      let validatedBody = await Joi.validate(request.params, validationSchema);
      let updatedData = {
        is_active:true
      }
      City.findOne({where: {id:validatedBody.id}})
      .then(async data => {
        //delete validatedBody.id
        const result = await City.update(updatedData,{where: {id:validatedBody.id}});
        return response.json(
              new Response(validatedBody, "City  Activated sucessfull!", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while Activating City.", 401)
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
* /city/inactive/{id}:
*   put:
*     tags:
*       - City
*     description: DeActivate City
*     produces:
*       - application/json
*     security:
*       - tokenauth: [Authorization]
*     parameters:
*       - name: id
*         description: City ID
*         in: path
*         required: true
*     responses:
*       200:
*         description: Returns success message
*/
  async inactiveCity(request, response, next) {
    const validationSchema = {
      id: Joi.string().required().trim()
    };
    try {
      let validatedBody = await Joi.validate(request.params, validationSchema);
      let updatedData = {
        is_active:false
      }
      City.findOne({where: {id:validatedBody.id}})
      .then(async data => {
        //delete validatedBody.id
        const result = await City.update(updatedData,{where: {id:validatedBody.id}});
        return response.json(
              new Response(validatedBody, "City  De-Activated sucessfull!", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while De-Activating City.", 401)
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
* /city/list:
*   get:
*     tags:
*       - City
*     description: City List
*     produces:
*       - application/json
*     security:
*       - tokenauth: [Authorization]
*     responses:
*       200:
*         description: Returns success message
*/
  async listCity(request, response, next) {
    const validationSchema = {};
    try {
      let validatedBody = await Joi.validate(validationSchema, validationSchema);      
      City.findAll({
        
      })
      .then(data => {
        //res.send(data);
        return response.json(
              new Response(data, "City  List!", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while getting City  List.", 401)
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
* /city/{id}:
*   get:
*     tags:
*       - City
*     description: City Details
*     produces:
*       - application/json
*     security:
*       - tokenauth: [Authorization]
*     parameters:
*       - name: id
*         description: City ID
*         in: path
*         required: true
*     responses:
*       200:
*         description: Returns success message
*/
  async detailsCity(request, response, next) {
    const validationSchema = {
      id: Joi.string().required().trim()
    };
    try {
      let validatedBody = await Joi.validate(request.params, validationSchema);
      City.findOne({
        where: {id: validatedBody.id},
      })
      .then(data => {
        //res.send(data);
        return response.json(
              new Response(data, "City  Information!", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while getting City  List.", 401)
      );
      });
    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
}

export default new CityController();
