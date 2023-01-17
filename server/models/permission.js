  const permission = (sequelize, Sequelize) => sequelize.define("permission", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    //permission_module ID
    permission_module_Id: {
      type: Sequelize.UUID
    },
    title_name: {
      type: Sequelize.STRING
    },
    //default: "user", enum: []
    title_key: {
      type: Sequelize.ENUM("user", "city_management", "roles_and_access","lead_management"),
      defaultValue: "roles_and_access",
    },
    can_add: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    can_edit: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    can_view: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    can_delete: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
  });
  
  

export default class Permission {
  constructor(sequelize, Sequelize) {
    const permissionDetails = permission(sequelize, Sequelize);
    this.model = permissionDetails
  }
  static get modelName() {
    return modelDefination.modelName;
  }
}