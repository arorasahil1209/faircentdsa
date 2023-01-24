const Sequelize = require('sequelize');
module.exports = function(sequelize, Sequelize, DataTypes) {
    const centLoanDoc =  sequelize.define('cent_loan_doc', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    uid: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    loan_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    doc_type_cnd: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: "Document type cnd"
    },
    doc_file: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    is_doc_local: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "Y",
      comment: "Document url is local url"
    },
    doc_year: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "Year for which this document is"
    },
    doc_month: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "Month for which this docutment is.\nstart from Jan =1"
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
    doc_password: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    other_ref_id: {
      type: DataTypes.STRING(16),
      allowNull: true,
      defaultValue: "0"
    },
    product_type: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    upload_file_key: {
      type: DataTypes.STRING(64),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cent_loan_doc',
    timestamps: false,
    
  });
  return centLoanDoc
};
