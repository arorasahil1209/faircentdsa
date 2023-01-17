
  const employmentDetail =(sequelize, Sequelize) => sequelize.define("employment_detail",{
      //Employment Details - Step 1
      user_id:{
        type: Sequelize.UUID,
      },
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
    }
  );
  //return employmentDetail;

export default class EmploymentDetail {
  constructor(sequelize, Sequelize) {
    this.model = employmentDetail(sequelize, Sequelize);
  }
  static get modelName() {
    return modelDefination.modelName;
  }
}