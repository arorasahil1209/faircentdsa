module.exports = (sequelize, Sequelize, DataTypes) => {
    const centCnd = sequelize.define(
      "cent_cnd",
      {
        id: {
          autoIncrement: true,
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          primaryKey: true
        },
        cnd_name: {
          type: DataTypes.STRING(1024),
          allowNull: false,
          comment: "Name of cnd"
        },
        cnd_code: {
          type: DataTypes.STRING(256),
          allowNull: false,
          comment: "Code of cnd - this will be used for internal purpose"
        },
        cnd_group: {
          type: DataTypes.STRING(128),
          allowNull: false
        },
        priority: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        is_active: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 1
        },
        deleted: {
          type: DataTypes.CHAR(1),
          allowNull: false,
          defaultValue: "N"
        },
        created: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false
        },
        udated: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: true
        },
        updated_by: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: true
        },
        cnd_parent_id: {
          type: DataTypes.BIGINT,
          allowNull: true,
          defaultValue: 0
        }
      },
      {
        freezeTableName: true,
        tableName: "cent_cnd",
        updatedAt: false,
        createdAt: false,
        sequelize,
        indexes: [
            {
              name: "PRIMARY",
              unique: true,
              using: "BTREE",
              fields: [
                { name: "id" },
              ]
            },
            {
              name: "cnd_code_index",
              using: "BTREE",
              fields: [
                { name: "cnd_code" },
              ]
            },
            {
              name: "cnd_group_index",
              using: "BTREE",
              fields: [
                { name: "cnd_group" },
              ]
            },
            {
              name: "cnd_parent_id_index",
              using: "BTREE",
              fields: [
                { name: "cnd_parent_id" },
              ]
            },
            {
              name: "cent_cnd_name_ix1",
              using: "BTREE",
              fields: [
                { name: "cnd_name", length: 767 },
              ]
            },
          ]
      }
    );
    return centCnd;
  };
  