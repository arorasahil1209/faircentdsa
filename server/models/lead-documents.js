
  const leadDocuments = (sequelize, Sequelize) => sequelize.define("lead-document", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    //Lead Captured
    user_id: {
      type: Sequelize.UUID
    },
    lead_id: {
      type: Sequelize.UUID
    },
    file_password: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    key_name: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    document_no: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    file_url: {
      type: Sequelize.STRING,
      defaultValue: null
    }
  });
  
  

export default class LeadDocuments {
  constructor(sequelize, Sequelize) {
    this.model = leadDocuments(sequelize, Sequelize);
  }
  static get modelName() {
    return modelDefination.modelName;
  }
}