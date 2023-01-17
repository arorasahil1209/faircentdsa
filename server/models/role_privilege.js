  const rolePrivilege = (sequelize, Sequelize) => sequelize.define("role_privilege", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    role_id: {
      type: Sequelize.UUID
    },
    //permission_module ID
    permission_id: {
      type: Sequelize.UUID
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
  
  

export default class RolePrivilege {
  constructor(sequelize, Sequelize) {
    const rolePrivilegeDetails = rolePrivilege(sequelize, Sequelize);
    this.model = rolePrivilegeDetails
  }
  static get modelName() {
    return modelDefination.modelName;
  }
}