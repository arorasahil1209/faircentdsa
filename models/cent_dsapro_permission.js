module.exports = (sequelize, Sequelize, DataTypes) => {
  const centDsaPermission = sequelize.define(
    "cent_dsapro_permission",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      permission_name: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      permission_key: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      createAccess: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      editAccess: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      viewAccess: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      deleteAccess: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "cent_dsapro_permission",
      timestamps: false,
    }
  );
  return centDsaPermission;
};
