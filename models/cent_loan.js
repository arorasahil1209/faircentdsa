module.exports = (sequelize, Sequelize, DataTypes) => {
    const centLoan = sequelize.define(
      "cent_loan",
      {
        id: {
          autoIncrement: true,
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          primaryKey: true
        },
        loan_title: {
          type: DataTypes.STRING(256),
          allowNull: true,
          comment: "Title of loan"
        },
        loan_amount_expected: {
          type: DataTypes.DECIMAL(20,2),
          allowNull: false,
          comment: "Loan amount applied"
        },
        tenure: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "Tenure in days"
        },
        loan_type_cnd: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          comment: "Loan type cnd",
          references: {
            model: 'cent_cnd',
            key: 'id'
          }
        },
        loan_state: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1000
        },
        loan_sub_state: {
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: "Loan substate"
        },
        loan_desc: {
          type: DataTypes.TEXT,
          allowNull: false,
          comment: "Description of loan"
        },
        loan_img1: {
          type: DataTypes.STRING(256),
          allowNull: true
        },
        loan_img2: {
          type: DataTypes.STRING(256),
          allowNull: true
        },
        loan_irate_expected: {
          type: DataTypes.BIGINT,
          allowNull: false
        },
        uid: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          comment: "user who has applied for this loan",
          references: {
            model: 'users',
            key: 'uid'
          }
        },
        max_amount_approved: {
          type: DataTypes.DECIMAL(20,2),
          allowNull: true,
          comment: "max loan amount approved by admin"
        },
        min_irate_apporved: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        max_irate_approved: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        max_days_approved: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "max amount apporved for how many days and what int rate \n"
        },
        verified_personal: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 100
        },
        verfied_professional: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 400
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
        loan_city: {
          type: DataTypes.STRING(128),
          allowNull: true
        },
        verified_professional: {
          type: DataTypes.CHAR(1),
          allowNull: false,

          defaultValue: "N"
        },
        percent_fund: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0
        },
        editor_comment: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        document_pending: {
          type: DataTypes.CHAR(1),
          allowNull: true,
          defaultValue: "N"
        },
        underwriting_pending: {
          type: DataTypes.CHAR(1),
          allowNull: true,
          defaultValue: "N"
        },
        doc_verify: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0
        },
        delisting: {
          type: DataTypes.CHAR(1),
          allowNull: true,
          defaultValue: "N"
        },
        emiday: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0
        },
        reference_id: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        risk: {
          type: DataTypes.STRING(16),
          allowNull: true
        },
        live_date: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: true,
          defaultValue: 0
        },
        original_loan_amt: {
          type: DataTypes.DECIMAL(20,2),
          allowNull: true
        },
        processing_fee: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0
        },
        remark: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        loan_sub_type_cnd: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: true,
          comment: "Loan Sub type cnd"
        },
        product_type: {
          type: DataTypes.STRING(32),
          allowNull: true
        },
        total_settlement_amount: {
          type: DataTypes.DECIMAL(10,2),
          allowNull: true
        },
        settlement_term: {
          type: DataTypes.BIGINT,
          allowNull: true,
          defaultValue: 0
        },
        partial_setlement_amount: {
          type: DataTypes.DECIMAL(10,2),
          allowNull: true
        },
        loan_sub_status_settlement: {
          type: DataTypes.STRING(10),
          allowNull: true
        },
        broken_intrest: {
          type: DataTypes.DECIMAL(10,2),
          allowNull: true,
          defaultValue: 0.00
        },
        insurance_fees: {
          type: DataTypes.DECIMAL(10,2),
          allowNull: true,
          defaultValue: 0.00
        },
        health_insurance_fees: {
          type: DataTypes.DECIMAL(10,2),
          allowNull: true,
          defaultValue: 0.00
        },
        bureau_code: {
          type: DataTypes.STRING(5),
          allowNull: true
        },
        thirdparty_ref_id: {
          type: DataTypes.STRING(24),
          allowNull: true
        },
        other_loan_type_cnd: {
          type: DataTypes.BIGINT,
          allowNull: true
        },
        is_exp_pass: {
          type: DataTypes.CHAR(1),
          allowNull: true,
          defaultValue: "N"
        },
        nbfc_eligible: {
          type: DataTypes.STRING(16),
          allowNull: true
        },
        product_tag: {
          type: DataTypes.STRING(16),
          allowNull: true
        },
        emi_month: {
          type: DataTypes.STRING(2),
          allowNull: true
        },
        emi_year: {
          type: DataTypes.STRING(5),
          allowNull: true
        }
      },
      {
        freezeTableName: true,
        tableName: "cent_loan",
        updatedAt: false,
        createdAt: false,
        sequelize,
      }
    );
    return centLoan;
  };
  