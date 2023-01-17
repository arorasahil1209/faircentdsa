const dbConfig = require("../../config/db.config");
const Sequelize = require("sequelize");
import adminModel from "./admin";
import employmentDetail from "./employmentDetail";
import personalDetail from "./personalDetail";
import otpDetails from "./otpDetails";
import leadDocuments from "./lead-documents"
import lead from "./lead";
import permission from "./permission";
import permissionModule from "./permissionModule";
import roles from "./roles";
import rolePrivilege from "./role_privilege";
import token from "./tokenManagement";
import user from "./user";
import users from "./users";
import dsaPartner from "./dsaPartner";
import city from "./city";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
const Admin = new adminModel(sequelize, Sequelize).model
const EmploymentDetail = new employmentDetail(sequelize, Sequelize).model
const PersonalDetail = new personalDetail(sequelize, Sequelize).model
const OtpDetails = new otpDetails(sequelize, Sequelize).model
const Lead = new lead(sequelize, Sequelize).model
const LeadDocuments = new leadDocuments(sequelize, Sequelize).model
const User = new user(sequelize, Sequelize).model
const Users = new users(sequelize, Sequelize).model
const DsaPartner = new dsaPartner(sequelize, Sequelize).model
const City = new city(sequelize, Sequelize).model

const Permission = new permission(sequelize, Sequelize).model
const PermissionModule = new permissionModule(sequelize, Sequelize).model
const Roles = new roles(sequelize, Sequelize).model
const RolePrivilege = new rolePrivilege(sequelize, Sequelize).model
const Token = new token(sequelize, Sequelize).model

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.admin = Admin;
db.lead = Lead
db.employmentDetail = EmploymentDetail;
db.personalDetail = PersonalDetail;
db.otpDetails = OtpDetails;
db.leadDocuments = LeadDocuments;

db.permission = Permission;
db.permissionModule = PermissionModule;
db.roles = Roles;
db.rolePrivilege = RolePrivilege;
db.token = Token;
db.user = User;
db.users = Users;
db.dsaPartner = DsaPartner;
db.city = City;

module.exports = db;