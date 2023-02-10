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
    },
    {
      sequelize,
      tableName: "cent_dsapro_roles",
      timestamps: false,
    }
  );
  return centDsaRoles
};
