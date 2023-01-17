
  const otpDetails = (sequelize, Sequelize) => sequelize.define("otp_details", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    mobile_no: {
      type: Sequelize.BIGINT
    },
    otp: {
      type: Sequelize.INTEGER,
      defaultValue: 1209
    },
    date_time: {
      type: Sequelize.DATE,
      defaultValue: new Date()
    },
    is_used: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });
export default class OtpDetails {
  constructor(sequelize, Sequelize) {
    this.model = otpDetails(sequelize, Sequelize);
  }
  static get modelName() {
    return modelDefination.modelName;
  }
}