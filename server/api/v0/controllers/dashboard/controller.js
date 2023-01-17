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
const sequelize = require("sequelize");
const Lead = db.lead;
const OTPDetails = db.otpDetails
const EmploymentDetail = db.employmentDetail
const PersonalDetail = db.personalDetail
const LeadDocuments = db.leadDocuments;
const Op = db.Sequelize.Op;

export class LeadController {
  /**
   * @swagger
   * /dashboard/applicationfunnel:
   *   get:
   *     tags:
   *       - Dashboard
   *     description: Get Application Funnel Data
   *     produces:
   *       - application/json
   *     security:
   *       - tokenauth: [Authorization]
   *     responses:
   *       200:
   *         description: Returns success message
   */
   async getApplicationFunnel(request, response, next) {
    const validationSchema = {};
    try {
      let validatedBody = await Joi.validate({}, validationSchema);
      // Total Applications
      // WP Cases
      // Disbursed Application
      // Action Needed
      //"Pending", "Application Complete","Approved","Rejected","On-hold","Cancel"
      let condition = {}
      let total_applications  = await Lead.count({
        where: condition,
      })
      condition = {
        lead_status: "Application Complete"
      }
      let wp_cases  = await Lead.count({
        where: condition,
      })
      condition = {
        lead_status: "Approved"
      }
      let disbursed_application  = await Lead.count({
        where: condition,
      })
      condition = {
        lead_status: "On-hold"
      }
      let action_needed  = await Lead.count({
        where: condition,
      })
      let responseData = {

      }
      return response.json(
            new Response({total_applications,wp_cases,disbursed_application,action_needed}, "Application Funnel Data", 200)
          );
    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
  /**
   * @swagger
   * /dashboard/businesssnapshots:
   *   get:
   *     tags:
   *       - Dashboard
   *     description: Get Business Snapshots Data
   *     produces:
   *       - application/json
   *     security:
   *       - tokenauth: [Authorization]
   *     responses:
   *       200:
   *         description: Returns success message
   */
   async getBusinessSnapshots(request, response, next) {
    const validationSchema = {};
    try {
      let validatedBody = await Joi.validate({}, validationSchema);
      // Loan Amount Applied
      // Loan Disbursed
      // Loan Approved
      // Tentative Commission
      ////"Pending", "Application Complete","Approved","Rejected","On-hold","Cancel"
      let condition = {lead_status: "Pending"}
      let loan_amount_applied  = 0//await Lead.findAll({
      //   where: condition,
      //   attributes: [[sequelize.fn('sum', sequelize.col('loan_amount')), 'loan_amount']],
      //   raw: true,
      // })
      // loan_amount_applied = (loan_amount_applied[0].loan_amount)?loan_amount_applied[0].loan_amount:0
      condition = {
        lead_status: "Approved"
      }
      let loan_disbursed  = 0//
      // loan_disbursed = (loan_disbursed[0].loan_amount)?loan_disbursed[0].loan_amount:0
      condition = {
        lead_status: "Approved"
      }
      let loan_approved  = await 0//
      // loan_approved = (loan_approved[0].loan_amount)?loan_approved[0].loan_amount:0
      let tentative_commission_amount  = 0
      return response.json(
            new Response({loan_amount_applied,loan_disbursed,loan_approved,tentative_commission_amount}, "Business Snapshots Data", 200)
          );
    } catch (error) {
      return response.json(
        new Response(null, error, 401)
      );
    }
  }
}


export default new LeadController();
