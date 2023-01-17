  const user = (sequelize, Sequelize) => sequelize.define("dsa_user", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    permission_id: {
      type: Sequelize.UUID
    },
    user_type: {
      type: Sequelize.ENUM("super_admin", "admin","lead_user","dsa_partner"),
      defaultValue: "admin",
    },
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    mobile: {
      type: Sequelize.DOUBLE
    },
    profile_pic: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    is_direct_user: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    parent_user_id: {
      type: Sequelize.UUID,
      defaultValue: null
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
  });  

export default class User {
  constructor(sequelize, Sequelize) {
    const userDetails = user(sequelize, Sequelize);
    this.model = userDetails
  }
  static get modelName() {
    return modelDefination.modelName;
  }
}