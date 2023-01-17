  const roles = (sequelize, Sequelize) => sequelize.define("role", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    title_name: {
      type: Sequelize.STRING
    },
    title_key: {
      type: Sequelize.STRING
    },
    is_system: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
  });  

export default class Roles {
  constructor(sequelize, Sequelize) {
    const rolesDetails = roles(sequelize, Sequelize);
    this.model = rolesDetails
  }
  static get modelName() {
    return modelDefination.modelName;
  }
}