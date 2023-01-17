  const permissionModule = (sequelize, Sequelize) => sequelize.define("permission_module", {
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
    sort_order: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
  });
  
  

export default class PermissionModuleDetails {
  constructor(sequelize, Sequelize) {
    const permissionModuleDetails = permissionModule(sequelize, Sequelize);
    this.model = permissionModuleDetails
  }
  static get modelName() {
    return modelDefination.modelName;
  }
}