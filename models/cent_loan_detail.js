const Sequelize = require('sequelize');
module.exports = function(sequelize, Sequelize, DataTypes) {
    const centLoanDetails = sequelize.define('cent_loan_detail', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    loan_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'cent_loan',
        key: 'id'
      }
    },
    spouse: {
      type: DataTypes.STRING(256),
      allowNull: true,
      comment: "name of spouse when loan was applied\n"
    },
    child: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    dependent: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total_exp: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sibling: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    cibil: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    equinox: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    landline: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    gross_salary_m: {
      type: DataTypes.DECIMAL(20,2),
      allowNull: true
    },
    take_home_salary_m: {
      type: DataTypes.DECIMAL(20,2),
      allowNull: true
    },
    deductions_m: {
      type: DataTypes.DECIMAL(20,2),
      allowNull: true
    },
    uid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "uid of user for whom these details are"
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
    residence_type_cnd: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    residence_shifting_date: {
      type: DataTypes.STRING(156),
      allowNull: true
    },
    field1: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    dept: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    business_reg_proof: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: ""
    },
    business_owner_proof: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: ""
    },
    itr_gstin_proof: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: ""
    },
    itr_ack_num: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    itr_valid_message: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    itr_valid_status: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    action_deviation: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'cent_loan_detail',
    timestamps: false,
  });
  return centLoanDetails
};
