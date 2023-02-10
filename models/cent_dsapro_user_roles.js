module.exports = (sequelize, Sequelize, DataTypes) => {
    const centDsaUserRoles = sequelize.define(
      "cent_dsapro_user_roles",
      {
        id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
        uid: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false
        },
        rid: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false
        },
        isActive: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false
        },

      },
      {
        sequelize,
        tableName: "cent_dsapro_user_roles",
        timestamps: false,
      }
    );
    return centDsaUserRoles
  };
  