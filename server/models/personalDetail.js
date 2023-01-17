
  const personalDetail =(sequelize, Sequelize) => sequelize.define("personal_detail",{
      //Personal Details
      user_id:{
        type: Sequelize.UUID,
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      marital_status: {
        type: Sequelize.ENUM("Unmarried", "Married", "Divorced", "Widow"),
        defaultValue: "Unmarried",
      },
      qualification: {
        type: Sequelize.ENUM("Under Graduate", "Graduate", "Post Graduate", "Professional"),
        defaultValue: "Under Graduate",
      },
      current_residential_pin_code: {
        type: Sequelize.INTEGER
      },
      current_residential_city: {
        type: Sequelize.STRING
      },
      current_residential_state: {
        type: Sequelize.STRING
      },
      full_address: {
        type: Sequelize.TEXT
      },
      residence_type: {
        type: Sequelize.ENUM("Rented", "Owned", "Parental", "Relative", "Co. Provided","Paying Guest"),
        defaultValue: "Rented",
      },
      dob: {
        type: Sequelize.DATEONLY,
        defaultValue: new Date()
      }
    }
  );

export default class PersonalDetail {
  constructor(sequelize, Sequelize) {
    this.model = personalDetail(sequelize, Sequelize);
  }
  static get modelName() {
    return modelDefination.modelName;
  }
}