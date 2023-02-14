module.exports = (sequelize, Sequelize, DataTypes) => {
  const centDsaRoles = sequelize.define(
    "cent_dsapro_roles",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
        defaultValue: "",
        comment: "Unique role name.",
        unique: "name",
      },
      role_key: {
        type: DataTypes.STRING(64),
        allowNull: false,
        defaultValue: "",
        comment: "Unique role key.",
        unique: "role_key",
      },
      isActive: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
    },
    {
      sequelize,
      tableName: "cent_dsapro_roles",
      timestamps: false,
    }
  );
  return centDsaRoles
};
