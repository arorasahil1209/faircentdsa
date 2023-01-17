  const dsaPartner = (sequelize, Sequelize) => sequelize.define("dsa_partner", { 
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    pan_card_url: {
      type: Sequelize.STRING
    },
    adhar_card_url: {
      type: Sequelize.STRING
    },
    add_1: {
      type: Sequelize.STRING
    },
    add_2: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    pin_code: {
      type: Sequelize.STRING
    },
    account_holder_name: {
      type: Sequelize.STRING
    },
    bank_name: {
      type: Sequelize.STRING
    },
    account_no: {
      type: Sequelize.STRING
    },
    ifsc_code: {
      type: Sequelize.STRING
    },
    account_type: {
      type: Sequelize.STRING
    },
    bank_add: {
      type: Sequelize.STRING
    },
    gst_no: {
      type: Sequelize.STRING
    },
    association_type: {
      type: Sequelize.STRING
    },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    mobile: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    is_comp_reg: {
      type: Sequelize.BOOLEAN
    },
    vintage: {
      type: Sequelize.STRING
    },
    is_office_setup: {
      type: Sequelize.BOOLEAN
    },
    partner_count: {
      type: Sequelize.STRING
    },
    employee_count: {
      type: Sequelize.STRING
    },
    overall_business: {
      type: Sequelize.STRING
    },
    comp_reg_doc: {
      type: Sequelize.STRING
    },
    permission_id: {
      type: Sequelize.UUID
    },
    password: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
  });  

export default class DsaPartner {
  constructor(sequelize, Sequelize) {
    const dsaPartnerDetails = dsaPartner(sequelize, Sequelize);
    this.model = dsaPartnerDetails
  }
  static get modelName() {
    return modelDefination.modelName;
  }
}