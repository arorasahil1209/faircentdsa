import Mongoose, { Schema } from "mongoose";
const bcrypt = require('bcryptjs');
var randomize = require('randomatic');
const saltRounds = 10;
const adminDetail =(sequelize, Sequelize) => sequelize.define("admin",{
  //Employment Details - Step 1
  company_name: {
    type: Sequelize.STRING
  },
  joining_date: {
    type: Sequelize.DATE
  },
  official_email_id: {
    type: Sequelize.STRING
  },
  salary_mode: {
    type: Sequelize.ENUM("Cash", "Cheque", "Bank Transfer"),
    defaultValue: "Cash",
  },
  office_city: {
    type: Sequelize.STRING
  },
  office_state: {
    type: Sequelize.STRING
  },
  office_add: {
    type: Sequelize.STRING
  },
  office_pin_code: {
    type: Sequelize.INTEGER
  },
},
{ timestamps: false }
);

export default class Admin {
  constructor(sequelize, Sequelize) {
    this.model = adminDetail(sequelize, Sequelize);
  }
  static get modelName() {
    return modelDefination.modelName;
  }
}
