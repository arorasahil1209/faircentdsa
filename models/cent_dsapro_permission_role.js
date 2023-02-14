module.exports = (sequelize, Sequelize, DataTypes) => {
  const centDsaPermissionRole = sequelize.define(
    "cent_dsapro_permission_role",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      permissionId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "cent_dsapro_permission_role",
      timestamps: false,
    }
  );
  return centDsaPermissionRole;
};
