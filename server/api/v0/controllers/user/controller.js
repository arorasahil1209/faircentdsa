import Joi from "joi";
import Async from "async";
import Boom from "boom";
import _ from "lodash";
import Path from "path";
import Config from "config";
import AdminUserModel from "../../../../models/admin";
import { find, findOne, findOneAndUpdate, remove, countDocuments, create, aggrigate, update, insertMany } from "../../services/common.services";
import Response from "../../../../models/response";
const apiAddress = Config.get("hostAddress");
const db = require("../../../../models");
import jwt from "jsonwebtoken";
let secret = Config.get("jwtsecret");
const User = db.user;
const DsaPartner = db.dsaPartner;
const TokenManagement = db.token;
const Op = db.Sequelize.Op;

export class UserController {
  /**
   * @swagger
   * /user/addnewuser:
   *   post:
   *     tags:
   *       - User
   *     description: Add New User
   *     produces:
   *       - application/json
   *       - multipart/form-data
   *     consumes:
   *       - multipart/form-data
   *       - application/json
   *     parameters: 
   *       - name: file
   *         in: formData
   *         required: true
   *         type: file
   *         description: Profile Pic to upload.
   *       - name: permission_id
   *         description: permission_id
   *         in: formData
   *         required: true
   *         type: string
   *       - name: user_type
   *         description: user_type
   *         in: formData
   *         required: true
   *         type: string
   *       - name: name
   *         description: name
   *         in: formData
   *         required: true
   *         type: string
   *       - name: email
   *         description: email
   *         in: formData
   *         required: true
   *         type: string
   *       - name: mobile
   *         description: mobile
   *         in: formData
   *         required: true
   *         type: number
   *       - name: password
   *         description: password
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Returns success message
   */
   async addNewUser(request, response, next) {
    const validationSchema = {
      permission_id: Joi.string().trim().required(),
      user_type: Joi.string().trim().required(),
      name: Joi.string().trim().required(),
      email: Joi.string().trim().required(),
      mobile: Joi.number().required(),
      password: Joi.string().trim().required(),
    };
    try {
      let validatedBody = await Joi.validate(request.body, validationSchema);
      const requestedFile = request.files;
      let finalUrl = null;
      for (let index = 0; index < requestedFile.length; index++) {
        let element = requestedFile[index];
        finalUrl = apiAddress + "files?image=" + element.filename
        
      }
      validatedBody.profile_pic = finalUrl

      User.create(validatedBody)
      .then(data => {
        //res.send(data);
        return response.json(
              new Response(data, "User Added Successfully", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(err, "Some error occurred while creating the User.", 401)
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
   * /user/edit/{id}:
   *   put:
   *     tags:
   *       - User
   *     description: Edit User
   *     produces:
   *       - application/json
   *       - multipart/form-data
   *     consumes:
   *       - multipart/form-data
   *       - application/json
   *     security:
   *       - tokenauth: [Authorization]
   *     parameters:
   *       - name: id
   *         description: User ID
   *         in: path
   *         required: true
   *       - name: file
   *         in: formData
   *         required: true
   *         type: file
   *         description: Profile Pic to upload.
   *       - name: permission_id
   *         description: permission_id
   *         in: formData
   *         required: true
   *         type: string
   *       - name: user_type
   *         description: user_type
   *         in: formData
   *         required: true
   *         type: string
   *       - name: name
   *         description: name
   *         in: formData
   *         required: true
   *         type: string
   *       - name: email
   *         description: email
   *         in: formData
   *         required: true
   *         type: string
   *       - name: mobile
   *         description: mobile
   *         in: formData
   *         required: true
   *         type: number
   *       - name: password
   *         description: password
   *         in: formData
   *         required: true
   *         type: string
   *       - name: profile_pic
   *         description: profile_pic
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Returns success message
   */
   async editUser(request, response, next) {
    const validationSchema = {
      permission_id: Joi.string().trim().required(),
      user_type: Joi.string().trim().required(),
      name: Joi.string().trim().required(),
      email: Joi.string().trim().required(),
      mobile: Joi.number().required(),
      password: Joi.string().trim().required(),
      profile_pic: Joi.string().trim().required()
    };
    let requestedData = request.body
    try {
      let validatedBody = await Joi.validate(requestedData, validationSchema);

      let finalUrl = validatedBody.profile_pic;
      for (let index = 0; index < requestedFile.length; index++) {
        let element = requestedFile[index];
        finalUrl = apiAddress + "files?image=" + element.filename
        
      }
      validatedBody.profile_pic = finalUrl

      User.findOne({where: {id:request.params.id}})
      .then(async data => {
        //delete validatedBody.id
        const result = await User.update(validatedBody,{where: {id:request.params.id}});
        return response.json(
              new Response(validatedBody, "User Updated", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while updating User.", 401)
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
   * /user/forgotpassword/{email}:
   *   put:
   *     tags:
   *       - User
   *     description: forgotpassword
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: email
   *         description: email ID
   *         in: path
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
   async forgotPassword(request, response, next) {
    const validationSchema = {
      email: Joi.string().trim().required()
    };
    let requestedData = request.params
    try {
      let validatedBody = await Joi.validate(requestedData, validationSchema);
      let userCount  = await User.count({
        where: validatedBody,
      })
      let partnerUserCount  = await DsaPartner.count({
        where: validatedBody
      })
      if(userCount || partnerUserCount ){
        let model = (userCount)?User: DsaPartner
        model.findOne({where: validatedBody})
        .then(async data => {
          return response.json(
                new Response({user_id: data.id}, "Email Sent", 200)
              );
        })
        .catch(err => {
            return response.json(
          new Response(null, "Some error occurred while fetching User.", 401)
        );
        });
      }else{
        return response.json(
          new Response(null, "Some error occurred while fetching User.", 401)
        );
      }
      
    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
  /**
   * @swagger
   * /user/resetpassword/{id}:
   *   put:
   *     tags:
   *       - User
   *     description: user reset password
   *     produces:
   *       - application/json
   *     security:
   *       - tokenauth: [Authorization]
   *     parameters:
   *       - name: id
   *         description: user ID
   *         in: path
   *         required: true
   *       - name: password
   *         description: password
   *         in: query
   *         required: true
   *       - name: confirm_password
   *         description: confirm_password
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
   async resetPassword(request, response, next) {
    const validationSchema = {
      id: Joi.string().trim().required()
    };
    let requestedData = request.params
    let query = request.query
    if(query && query.password && query.confirm_password){
      if(query.password == query.confirm_password){
        try {
          let validatedBody = await Joi.validate(requestedData, validationSchema);
          let userCount  = await User.count({
            where: validatedBody,
          })
          let partnerUserCount  = await DsaPartner.count({
            where: validatedBody
          })
          if(userCount || partnerUserCount ){
            let model = (userCount)?User: DsaPartner
            model.findOne({where: validatedBody})
            .then(async data => {
              const result = await model.update({password:query.password},{where: validatedBody});
              return response.json(
                    new Response(null, "Password Reset Successfully", 200)
                  );
            })
            .catch(err => {
                return response.json(
              new Response(null, "Some error occurred while fetching User.", 401)
            );
            });
          }else{
            return response.json(
              new Response(null, "Some error occurred while fetching User.", 401)
            );
          }          
        } catch (error) {
          return response.json(
            new Response(null, error, 401)
          );
        }
      }else{
        return response.json(
          new Response(null, "Password and Confirm Password should be same.", 401)
        );
      }
    }else{
      return response.json(
        new Response(null, "Password and Confirm Password are required.", 401)
      );
    }
  }
  /**
   * @swagger
   * /user/editdsapartner/{id}:
   *   put:
   *     tags:
   *       - User
   *     description: Edit dsapartner
   *     produces:
   *       - application/json
   *       - multipart/form-data
   *     consumes:
   *       - multipart/form-data
   *       - application/json
   *     security:
   *       - tokenauth: [Authorization]
   *     parameters:
   *       - name: id
   *         description: dsapartner ID
   *         in: path
   *         required: true
   *       - name: pan_card
   *         in: formData
   *         required: true
   *         type: file
   *         description: pan_card to upload.
   *       - name: adhar_card
   *         in: formData
   *         required: true
   *         type: file
   *         description: adhar_card to upload.
   *       - name: first_name
   *         description: first_name
   *         in: formData
   *         required: true
   *         type: string
   *       - name: last_name
   *         description: last_name
   *         in: formData
   *         required: true
   *         type: string
   *       - name: mobile
   *         description: mobile
   *         in: formData
   *         required: true
   *         type: string
   *       - name: email
   *         description: email
   *         in: formData
   *         required: false
   *         type: string
   *       - name: add_1
   *         description: add_1
   *         in: formData
   *         required: false
   *         type: string
   *       - name: add_2
   *         description: add_2
   *         in: formData
   *         required: false
   *         type: string
   *       - name: state
   *         description: state
   *         in: formData
   *         required: false
   *         type: string
   *       - name: city
   *         description: city
   *         in: formData
   *         required: false
   *         type: string
   *       - name: pin_code
   *         description: pin_code
   *         in: formData
   *         required: false
   *         type: string
   *       - name: account_holder_name
   *         description: account_holder_name
   *         in: formData
   *         required: false
   *         type: string
   *       - name: bank_name
   *         description: bank_name
   *         in: formData
   *         required: false
   *         type: string
   *       - name: account_no
   *         description: account_no
   *         in: formData
   *         required: false
   *         type: string
   *       - name: ifsc_code
   *         description: ifsc_code
   *         in: formData
   *         required: false
   *         type: string
   *       - name: account_type
   *         description: account_type
   *         in: formData
   *         required: false
   *         type: string
   *       - name: bank_add
   *         description: bank_add
   *         in: formData
   *         required: false
   *         type: string
   *       - name: gst_no
   *         description: gst_no
   *         in: formData
   *         required: false
   *         type: string
   *       - name: association_type
   *         description: association_type
   *         in: formData
   *         required: false
   *         type: string
   *       - name: is_comp_reg
   *         description: is_comp_reg
   *         in: formData
   *         required: false
   *         type: boolean
   *       - name: vintage
   *         description: vintage
   *         in: formData
   *         required: false
   *         type: string
   *       - name: is_office_setup
   *         description: is_office_setup
   *         in: formData
   *         required: false
   *         type: boolean
   *       - name: partner_count
   *         description: partner_count
   *         in: formData
   *         required: false
   *         type: string
   *       - name: employee_count
   *         description: employee_count
   *         in: formData
   *         required: false
   *         type: string
   *       - name: overall_business
   *         description: overall_business
   *         in: formData
   *         required: false
   *         type: string
   *       - name: comp_reg_doc
   *         description: comp_reg_doc
   *         in: formData
   *         required: true
   *         type: file
   *       - name: pan_card_url
   *         description: pan_card_url
   *         in: formData
   *         required: false
   *         type: string
   *       - name: adhar_card_url
   *         description: adhar_card_url
   *         in: formData
   *         required: false
   *         type: file
   *       - name: comp_reg_doc
   *         description: comp_reg_doc
   *         in: formData
   *         required: false
   *         type: file
   *     responses:
   *       200:
   *         description: Returns success message
   */
   async editDsaPartner(request, response, next) {
    const validationSchema = {
      add_1: Joi.string().trim().required(),
      add_2: Joi.string().trim().required(),
      state: Joi.string().trim().required(),
      city: Joi.string().trim().required(),
      pin_code: Joi.string().trim().required(),
      account_holder_name: Joi.string().trim().required(),
      bank_name: Joi.string().trim().required(),
      account_no: Joi.string().trim().required(),
      ifsc_code: Joi.string().trim().required(),
      account_type: Joi.string().trim().required(),
      bank_add: Joi.string().trim().required(),
      gst_no: Joi.string().trim().required(),
      association_type: Joi.string().trim().required(),
      first_name: Joi.string().trim().required(),
      last_name: Joi.string().trim().required(),
      mobile: Joi.string().trim().required(),
      email: Joi.string().trim().required(),
      is_comp_reg: Joi.boolean().required(),
      vintage: Joi.string().trim().required(),
      is_office_setup: Joi.boolean().required(),
      partner_count: Joi.string().trim().required(),
      employee_count: Joi.string().trim().required(),
      overall_business: Joi.string().trim().required(),
      pan_card_url: Joi.string().trim().required(),
      adhar_card_url: Joi.string().trim().required(),
      comp_reg_doc: Joi.string().trim().required()
    };
    let requestedData = request.body
    try {
      let validatedBody = await Joi.validate(requestedData, validationSchema);

      const requestedFile = request.files;
      let pan_card_url = validatedBody.pan_card_url
      let adhar_card_url = validatedBody.adhar_card_url
      let comp_reg_doc = validatedBody.comp_reg_doc
      let finalUrl = null;
      for (let index = 0; index < requestedFile.length; index++) {
        let element = requestedFile[index];
        finalUrl = apiAddress + "files?image=" + element.filename
        if(requestedFile[index].fieldname == 'pan_card')
          pan_card_url = finalUrl
        if(requestedFile[index].fieldname == 'adhar_card')
          adhar_card_url = finalUrl
        if(requestedFile[index].fieldname == 'comp_reg_doc')
          comp_reg_doc = finalUrl
      }
      validatedBody.pan_card_url = pan_card_url
      validatedBody.adhar_card_url = adhar_card_url
      validatedBody.comp_reg_doc = comp_reg_doc


      DsaPartner.findOne({where: {id:request.params.id}})
      .then(async data => {
        //delete validatedBody.id
        const result = await DsaPartner.update(validatedBody,{where: {id:request.params.id}});
        return response.json(
              new Response(validatedBody, "DsaPartner Updated", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while updating DsaPartner.", 401)
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
   * /user/userLogin:
   *   post:
   *     tags:
   *       - User
   *     description: userLogin
   *     produces:
   *       - application/json
   *       - multipart/form-data
   *     consumes:
   *       - application/json
   *     parameters: 
   *       - name: loginDetails
   *         description: login Details
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/LoginDetails'
   *     responses:
   *       200:
   *         description: Returns success message
   */
   async userLogin(request, response, next) {
    const validationSchema = {
      user_type: Joi.string().trim().optional().allow(null),
      email: Joi.string().trim().required(),
      password: Joi.string().trim().required(),
    };
    try {
      let validatedBody = await Joi.validate(request.body, validationSchema);
      delete validatedBody.user_type
      //count for every user type login and then find
      let userCount  = await User.count({
        where: validatedBody,
      })
      let partnerUserCount  = await DsaPartner.count({
        where: {email:validatedBody.email}
      })
      if(userCount || partnerUserCount ){
        let model = (userCount)?User: DsaPartner
        
        model.findOne({
          where: validatedBody,
        })
        .then(async data => {
          if(data){
            data = JSON.stringify(data)
            data = JSON.parse(data)
            let token = jwt.sign(data, secret, { expiresIn: "180 days" });
            let condition = { user_id: (data.id) }
            const result = await TokenManagement.update({ token: token },{where: { user_id: data.id }});
                
            let responseData = {
              token: token,
              userInfo:data
            }
            return response.json(
                  new Response(responseData, "UserDetails", 200)
                );
    
          }else{
            return response.json(
              new Response(err, "Invalid User Credentials.", 401)
            );
          }
        })
        .catch(err => {
            return response.json(
          new Response(err, "Some error occurred while getting the User details.", 401)
        );
        });
      }
      else{
        return response.json(
          new Response(err, "Invalid User details.", 401)
        );
      }
    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
  /**
   * @swagger
   * /user/userlist:
   *   get:
   *     tags:
   *       - User
   *     description: Get User List
   *     produces:
   *       - application/json
   *     security:
   *       - tokenauth: [Authorization]
   *     responses:
   *       200:
   *         description: Returns success message
   */
   async userList(request, response, next) {
    const validationSchema = {};
    try {
      let validatedBody = await Joi.validate({}, validationSchema);
      User.findAll({
        where: {},
      })
      .then(data => {
        //res.send(data);
        return response.json(
              new Response(data, "User List", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while getting User List.", 401)
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
   * /user/adddsapartner:
   *   post:
   *     tags:
   *       - DSA Partner
   *     description: Upload Documents 
   *     produces:
   *       - application/json
   *       - multipart/form-data
   *     consumes:
   *       - multipart/form-data
   *       - application/json
   *     parameters: 
   *       - name: pan_card
   *         in: formData
   *         required: true
   *         type: file
   *         description: pan_card to upload.
   *       - name: adhar_card
   *         in: formData
   *         required: true
   *         type: file
   *         description: adhar_card to upload.
   *       - name: first_name
   *         description: first_name
   *         in: formData
   *         required: true
   *         type: string
   *       - name: last_name
   *         description: last_name
   *         in: formData
   *         required: true
   *         type: string
   *       - name: mobile
   *         description: mobile
   *         in: formData
   *         required: true
   *         type: string
   *       - name: email
   *         description: email
   *         in: formData
   *         required: false
   *         type: string
   *       - name: add_1
   *         description: add_1
   *         in: formData
   *         required: false
   *         type: string
   *       - name: add_2
   *         description: add_2
   *         in: formData
   *         required: false
   *         type: string
   *       - name: state
   *         description: state
   *         in: formData
   *         required: false
   *         type: string
   *       - name: city
   *         description: city
   *         in: formData
   *         required: false
   *         type: string
   *       - name: pin_code
   *         description: pin_code
   *         in: formData
   *         required: false
   *         type: string
   *       - name: account_holder_name
   *         description: account_holder_name
   *         in: formData
   *         required: false
   *         type: string
   *       - name: bank_name
   *         description: bank_name
   *         in: formData
   *         required: false
   *         type: string
   *       - name: account_no
   *         description: account_no
   *         in: formData
   *         required: false
   *         type: string
   *       - name: ifsc_code
   *         description: ifsc_code
   *         in: formData
   *         required: false
   *         type: string
   *       - name: account_type
   *         description: account_type
   *         in: formData
   *         required: false
   *         type: string
   *       - name: bank_add
   *         description: bank_add
   *         in: formData
   *         required: false
   *         type: string
   *       - name: gst_no
   *         description: gst_no
   *         in: formData
   *         required: false
   *         type: string
   *       - name: association_type
   *         description: association_type
   *         in: formData
   *         required: false
   *         type: string
   *       - name: is_comp_reg
   *         description: is_comp_reg
   *         in: formData
   *         required: false
   *         type: boolean
   *       - name: vintage
   *         description: vintage
   *         in: formData
   *         required: false
   *         type: string
   *       - name: is_office_setup
   *         description: is_office_setup
   *         in: formData
   *         required: false
   *         type: boolean
   *       - name: partner_count
   *         description: partner_count
   *         in: formData
   *         required: false
   *         type: string
   *       - name: employee_count
   *         description: employee_count
   *         in: formData
   *         required: false
   *         type: string
   *       - name: overall_business
   *         description: overall_business
   *         in: formData
   *         required: false
   *         type: string
   *       - name: comp_reg_doc
   *         description: comp_reg_doc
   *         in: formData
   *         required: true
   *         type: file
   *     responses:
   *       200:
   *         description: Returns success message
   */
   async addNewDsaPartner(request, response, next) {
    const validationSchema = {
      add_1: Joi.string().trim().required(),
      add_2: Joi.string().trim().required(),
      state: Joi.string().trim().required(),
      city: Joi.string().trim().required(),
      pin_code: Joi.string().trim().required(),
      account_holder_name: Joi.string().trim().required(),
      bank_name: Joi.string().trim().required(),
      account_no: Joi.string().trim().required(),
      ifsc_code: Joi.string().trim().required(),
      account_type: Joi.string().trim().required(),
      bank_add: Joi.string().trim().required(),
      gst_no: Joi.string().trim().required(),
      association_type: Joi.string().trim().required(),
      first_name: Joi.string().trim().required(),
      last_name: Joi.string().trim().required(),
      mobile: Joi.string().trim().required(),
      email: Joi.string().trim().required(),
      is_comp_reg: Joi.boolean().required(),
      vintage: Joi.string().trim().required(),
      is_office_setup: Joi.boolean().required(),
      partner_count: Joi.string().trim().required(),
      employee_count: Joi.string().trim().required(),
      overall_business: Joi.string().trim().required()
    };
    try {
      let validatedBody = await Joi.validate(request.body, validationSchema);
      const requestedFile = request.files;
      let pan_card_url = null
      let adhar_card_url = null
      let comp_reg_doc = null
      let finalUrl = null;
      for (let index = 0; index < requestedFile.length; index++) {
        let element = requestedFile[index];
        finalUrl = apiAddress + "files?image=" + element.filename
        if(requestedFile[index].fieldname == 'pan_card')
          pan_card_url = finalUrl
        if(requestedFile[index].fieldname == 'adhar_card')
          adhar_card_url = finalUrl
        if(requestedFile[index].fieldname == 'comp_reg_doc')
          comp_reg_doc = finalUrl
      }
      validatedBody.pan_card_url = pan_card_url
      validatedBody.adhar_card_url = adhar_card_url
      validatedBody.comp_reg_doc = comp_reg_doc
      DsaPartner.create(validatedBody)
      .then(data => {
        return response.json(
              new Response(data, "Partner Details Captured.", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(err, "Some error occurred while creating the User.", 401)
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
   * /user/dsapartnerlist:
   *   get:
   *     tags:
   *       - DSA Partner
   *     description: Get Document Details
   *     produces:
   *       - application/json
   *     security:
   *       - tokenauth: [Authorization]
   *     responses:
   *       200:
   *         description: Returns success message
   */
   async dsaPartnerList(request, response, next) {
    const validationSchema = {};
    try {
      let validatedBody = await Joi.validate({}, validationSchema);
      DsaPartner.findAll({
        where: {},
      })
      .then(data => {
        //res.send(data);
        return response.json(
              new Response(data, "Dsa Partner List", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while getting Dsa Partner List.", 401)
      );
      });
    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
}


export default new UserController();
