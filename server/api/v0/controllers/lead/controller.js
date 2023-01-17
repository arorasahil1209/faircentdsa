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
const Lead = db.lead;
const Users = db.users;
const OTPDetails = db.otpDetails
const EmploymentDetail = db.employmentDetail
const PersonalDetail = db.personalDetail
const LeadDocuments = db.leadDocuments;
const Op = db.Sequelize.Op;

export class LeadController {
  /**
   * @swagger
   * /lead:
   *   post:
   *     tags:
   *       - Lead
   *     description: Add New Lead 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: lead
   *         description: Lead Info
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/LeadStepOne'
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async createNewLead(request, response, next) {
    const validationSchema = {
      borrower_type: Joi.string().trim().required(),
      selected_loan_product: Joi.string().trim().required(),
      is_aggreed_privacy_policy: Joi.boolean().optional().allow(null),
      pan_no: Joi.string().required(),
      primary_email_id: Joi.string().required(),
      primary_mobile_no: Joi.number().required()
    };
    try {
      let validatedBody = await Joi.validate(request.body, validationSchema);
      Lead.create(validatedBody)
      .then(data => {
        //res.send(data);
        return response.json(
              new Response(data, "Captured", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while creating the Lead.", 401)
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
   * /lead/uploadDocuments:
   *   post:
   *     tags:
   *       - Lead
   *     description: Upload Documents 
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
   *         description: The file to upload.
   *       - name: key_name
   *         description: key_name
   *         in: formData
   *         required: true
   *         type: string
   *       - name: user_id
   *         description: user_id
   *         in: formData
   *         required: true
   *         type: string
   *       - name: lead_id
   *         description: lead_id
   *         in: formData
   *         required: true
   *         type: string
   *       - name: file_password
   *         description: file_password
   *         in: formData
   *         required: false
   *         type: string
   *       - name: document_no
   *         description: document_no
   *         in: formData
   *         required: false
   *         type: document_no
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async getUsers(request, response, next) {
    try {
      console.log('here')
      let details = await Users.findAll({});
        return response.json(
              new Response(details, "Captured", 200)
      );
    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
   async uploadDocuments(request, response, next) {
    try {
      const requestedFile = request.files;
      let finalUrl = null;
      for (let index = 0; index < requestedFile.length; index++) {
        let element = requestedFile[index];
        finalUrl = apiAddress + "files?image=" + element.filename
        
      }
      let validatedBody = request.body
      validatedBody.file_url = finalUrl
      LeadDocuments.create(validatedBody)
      .then(data => {
        //res.send(data);
        return response.json(
              new Response(data, "File Upload Successfully.", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while document Upload.", 401)
      );
      });
    } catch (error) {
      return response.json(
        new Response(error, "Some error occurred while document Upload.", 401))
    }
    
  }
  /**
   * @swagger
   * /lead/uploadeddocuments/{user_id}/{lead_id}:
   *   get:
   *     tags:
   *       - Lead
   *     description: Get Document Details
   *     produces:
   *       - application/json
   *     security:
   *       - tokenauth: [Authorization]
   *     parameters:
   *       - name: user_id
   *         description: User ID
   *         in: path
   *         required: true
   *       - name: lead_id
   *         description: Lead ID
   *         in: path
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async getUploadedDocuments(request, response, next) {
    const validationSchema = {
      user_id: Joi.string().required(),
      lead_id: Joi.string().required()
    };
    try {
      let validatedBody = await Joi.validate(request.params, validationSchema);
      LeadDocuments.find({
        where: validatedBody,
      })
      .then(data => {
        //res.send(data);
        return response.json(
              new Response(data, "Employment Details", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while getting Personal Detail.", 401)
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
   * /lead/updateuploaddocuments:
   *   put:
   *     tags:
   *       - Lead
   *     description: Update Document Details
   *     produces:
   *       - application/json
   *       - multipart/form-data
   *     consumes:
   *       - multipart/form-data
   *       - application/json
   *     parameters: 
   *       - name: id
   *         description: id
   *         in: formData
   *         required: true
   *         type: string
   *       - name: file
   *         in: formData
   *         required: true
   *         type: file
   *         description: The file to upload.
   *       - name: key_name
   *         description: key_name
   *         in: formData
   *         required: true
   *         type: string
   *       - name: user_id
   *         description: user_id
   *         in: formData
   *         required: true
   *         type: string
   *       - name: lead_id
   *         description: lead_id
   *         in: formData
   *         required: true
   *         type: string
   *       - name: file_password
   *         description: file_password
   *         in: formData
   *         required: false
   *         type: string
   *     responses:
   *       200:
   *         description: Returns success message
   */
   async updateUploadedDocuments(request, response, next) {
    const validationSchema = {
      id: Joi.string().required(),
      user_id: Joi.string().required(),
      lead_id: Joi.string().required(),
      file_password: Joi.string().optional().allow(null),
      key_name: Joi.string().required()
    };
    try {
      const requestedFile = request.files;
      let finalUrl = null;
      for (let index = 0; index < requestedFile.length; index++) {
        let element = requestedFile[index];
        finalUrl = apiAddress + "files?image=" + element.filename
        
      }
      let validatedBody = await Joi.validate(request.body, validationSchema);
      validatedBody.file_url = finalUrl
      LeadDocuments.findOne({where: {id:validatedBody.id}})
      .then(async data => {
        //delete validatedBody.id
        const result = await LeadDocuments.update(validatedBody,{where: {id:validatedBody.id}});
        return response.json(
              new Response(validatedBody, "Document Details Updated", 200)
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
   * /lead/generateotp:
   *   put:
   *     tags:
   *       - Lead
   *     description: Generate OTP 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: mobile_no
   *         description: Request for OTP
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/OPTRequest'
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async generateOTP(request, response, next) {
    const validationSchema = {
      mobile_no: Joi.number().required()
    };
    try {
      let validatedBody = await Joi.validate(request.body, validationSchema);
      // validatedBody.mobile_no = validatedBody.mobile_no
      // delete validatedBody.mobile_no
      OTPDetails.create(validatedBody)
      .then(data => {
        //res.send(data);
        return response.json(
              new Response(data, "OTP Details", 200)
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
   * /lead/verifyotp:
   *   put:
   *     tags:
   *       - Lead
   *     description: Verify OTP 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: OTP Details
   *         description: Verify OTP
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/VerifyOPT'
   *     responses:
   *       200:
   *         description: Returns success message
   */
   async verifyOTP(request, response, next) {
    const validationSchema = {
      mobile_no: Joi.number().required(),
      otp: Joi.number().required()
    };
    try {
      let validatedBody = await Joi.validate(request.body, validationSchema);
      OTPDetails.findOne({
        where: validatedBody,
      })
      .then(data => {
        //res.send(data);
        if(data && validatedBody.mobile_no === data.mobile_no)
        return response.json(
              new Response(null, "OTP Verified Successfully", 200)
            );
            return response.json(
              new Response(null, "Incorrect OTP", 401)
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
   * /lead/personaldetails:
   *   post:
   *     tags:
   *       - Lead
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
   *           $ref: '#/definitions/PersonalDetails'
   *     responses:
   *       200:
   *         description: Returns success message
   */
   async personalDetails(request, response, next) {
    const validationSchema = {
      user_id: Joi.string().required(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      marital_status: Joi.string().required(),
      qualification: Joi.string().required(),
      current_residential_pin_code: Joi.number().required(),
      current_residential_city: Joi.string().required(),
      current_residential_state: Joi.string().required(),
      full_address: Joi.string().required(),
      residence_type: Joi.string().required(),
      dob: Joi.string().optional().allow(null)
    };
    try {
      let validatedBody = await Joi.validate(request.body, validationSchema);
      PersonalDetail.create(validatedBody)
      .then(data => {
        //res.send(data);
        return response.json(
              new Response(data, "Captured", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while saving Personal Detail.", 401)
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
   * /lead/personaldetails/{user_id}:
   *   get:
   *     tags:
   *       - Lead
   *     description: Get Personal Details
   *     produces:
   *       - application/json
   *     security:
   *       - tokenauth: [Authorization]
   *     parameters:
   *       - name: user_id
   *         description: User ID
   *         in: path
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
   async getPersonalDetails(request, response, next) {
    const validationSchema = {
      user_id: Joi.string().required()
    };
    try {
      let validatedBody = await Joi.validate(request.params, validationSchema);
      PersonalDetail.findOne({
        where: validatedBody,
      })
      .then(data => {
        //res.send(data);
        return response.json(
              new Response(data, "Personal Details", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while getting Personal Detail.", 401)
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
   * /lead/alllist:
   *   get:
   *     tags:
   *       - Lead
   *     description: Get Leads List
   *     produces:
   *       - application/json
   *     security:
   *       - tokenauth: [Authorization]
   *     parameters:
   *       - name: lead_status
   *         description: lead status
   *         in: query
   *     responses:
   *       200:
   *         description: Returns success message
   */
   async getAllList(request, response, next) {
    const validationSchema = {
      lead_status: Joi.string().optional().allow(null)
    };
    try {
      let validatedBody = await Joi.validate(request.query, validationSchema);
      let condition = {}
      if(validatedBody && validatedBody.lead_status){
        condition = validatedBody
      }
      Lead.findAll({
        where: condition,
        include: [{
          model: PersonalDetail,
          as: 'personal_detail'
        },
        {
          model: EmploymentDetail,
          as: 'employment_detail'
        },
        {
          model: LeadDocuments,
          as: 'lead_documents'
        }]
      })
      .then(data => {
        //res.send(data);
        return response.json(
              new Response(data, "Personal Details", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while getting Personal Detail.", 401)
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
   * /lead/employmentdetails/{user_id}:
   *   get:
   *     tags:
   *       - Lead
   *     description: Get Employment Details
   *     produces:
   *       - application/json
   *     security:
   *       - tokenauth: [Authorization]
   *     parameters:
   *       - name: user_id
   *         description: User ID
   *         in: path
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
   async getEmploymentdetails(request, response, next) {
    const validationSchema = {
      user_id: Joi.string().required()
    };
    try {
      let validatedBody = await Joi.validate(request.params, validationSchema);
      EmploymentDetail.findOne({
        where: validatedBody,
      })
      .then(data => {
        //res.send(data);
        return response.json(
              new Response(data, "Employment Details", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while getting Personal Detail.", 401)
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
   * /lead/employmentdetails:
   *   post:
   *     tags:
   *       - Lead
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
   *           $ref: '#/definitions/EmploymentDetails'
   *     responses:
   *       200:
   *         description: Returns success message
   */
   async employmentDetails(request, response, next) {
    const validationSchema = {
      user_id: Joi.string().required(),
      company_name: Joi.string().required(),
      joining_date: Joi.string().required(),
      official_email_id: Joi.string().required(),
      salary_mode: Joi.string().required(),
      office_city: Joi.string().required(),
      office_state: Joi.string().required(),
      office_add: Joi.string().required(),
      office_pin_code: Joi.number().required()
    };
    try {
      let validatedBody = await Joi.validate(request.body, validationSchema);
      EmploymentDetail.create(validatedBody)
      .then(data => {
        //res.send(data);
        return response.json(
              new Response(data, "Captured", 200)
            );
      })
      .catch(err => {
          return response.json(
        new Response(null, "Some error occurred while saving Employment Detail.", 401)
      );
      });
    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }

}


export default new LeadController();
