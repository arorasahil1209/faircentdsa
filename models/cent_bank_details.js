const Sequelize = require('sequelize');
module.exports = function(sequelize,Sequelize, DataTypes) {
  const centBankDetails = sequelize.define('cent_bank_details', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    uid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    txn_tid: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'cent_transaction',
        key: 'id'
      }
    },
    account_name: {
      type: DataTypes.STRING(64),
      allowNull: true,
      comment: "Bank Account name"
    },
    cash_amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    txn_cash_tid: {
      type: DataTypes.STRING(264),
      allowNull: true,
      comment: "'Third party transaction id. In case of cheque it will be cheque id'"
    },
    account_number: {
      type: DataTypes.STRING(32),
      allowNull: true,
      comment: "Bank Account number"
    },
    account_ifsc_number: {
      type: DataTypes.STRING(32),
      allowNull: true,
      comment: "Bank Account number"
    },
    account_type: {
      type: DataTypes.STRING(16),
      allowNull: false,
      comment: "Saving\/Current"
    },
    vallet_amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
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
    branch_add: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    bank_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    micr_number: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    account_holder: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    created_by: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cent_bank_details',
    timestamps: false,
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
        name: "cent_bank_details_txn_id",
        using: "BTREE",
        fields: [
          { name: "txn_tid" },
        ]
      },
      {
        name: "cbd_ix1",
        using: "BTREE",
        fields: [
          { name: "uid" },
        ]
      },
    ]
  });
  return centBankDetails;
};
