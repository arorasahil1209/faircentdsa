  const tokenManagement = (sequelize, Sequelize) => sequelize.define("token_management", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.UUID,
    },
    token: {
      type: Sequelize.STRING
    },
    user_module_name: {
      type: Sequelize.STRING
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
  });  

export default class TokenManagement {
  constructor(sequelize, Sequelize) {
    const tokenDetails = tokenManagement(sequelize, Sequelize);
    this.model = tokenDetails
  }
  static get modelName() {
    return modelDefination.modelName;
  }
}