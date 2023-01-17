
  import EmploymentDetail from "./employmentDetail";
  import PersonalDetail from "./personalDetail";
  import OtpDetails from "./otpDetails";
  import LeadDocuments from "./lead-documents";

  const lead = (sequelize, Sequelize) => sequelize.define("lead", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    //Lead Captured
    borrower_type: {
      type: Sequelize.ENUM("Salaried", "Self Employed"),
      defaultValue: "Salaried",
    },
    selected_loan_product: {
      type: Sequelize.STRING,
      defaultValue: "Term Loan"
    },
    is_aggreed_privacy_policy: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
  //Basic Details
    pan_no: {
      type: Sequelize.STRING
    },
    primary_email_id: {
      type: Sequelize.STRING
    },
    primary_mobile_no: {
      type: Sequelize.BIGINT
    },
    // Additional Details
    lead_status: {
      type: Sequelize.ENUM("Pending", "Application Complete","Approved","Rejected","On-hold","Cancel"),
      defaultValue: "Pending",
    },
  });
  
  

export default class Lead {
  constructor(sequelize, Sequelize) {
    const leadDetails = lead(sequelize, Sequelize);
    const personalDetail = new PersonalDetail(sequelize, Sequelize).model
    const employmentDetail = new EmploymentDetail(sequelize, Sequelize).model
    const otpDetail = new OtpDetails(sequelize, Sequelize).model
    const leadDocuments = new LeadDocuments(sequelize, Sequelize).model
    leadDetails.hasMany(personalDetail,{as: 'personal_detail', foreignKey: 'user_id'});
    leadDetails.hasMany(employmentDetail,{as: 'employment_detail', foreignKey: 'user_id'});
    leadDetails.hasOne(otpDetail,{as: 'otp_detail', foreignKey: 'user_id'});
    leadDetails.hasOne(leadDocuments,{as: 'lead_documents', foreignKey: 'user_id'});
    
    this.model = leadDetails
  }
  static get modelName() {
    return modelDefination.modelName;
  }
}