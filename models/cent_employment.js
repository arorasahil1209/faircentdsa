module.exports = (sequelize, Sequelize, DataTypes) => {
    const centEmployment = sequelize.define(
      "cent_employment",
      {
        id: {
          autoIncrement: true,
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          primaryKey: true
        },
        uid: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'users',
            key: 'uid'
          }
        },
        loan_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: true,
          comment: "In case this employment is against a loan"
        },
        employment_type_cnd: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          references: {
            model: 'cent_cnd',
            key: 'id'
          }
        },
        is_current: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
          comment: "0  = false, 1 = true"
        },
        comp_designation: {
          type: DataTypes.STRING(128),
          allowNull: true,
          comment: "Designation at which users is employed"
        },
        comp_name: {
          type: DataTypes.STRING(256),
          allowNull: false,
          comment: "Employer Name"
        },
        comp_address: {
          type: DataTypes.STRING(1024),
          allowNull: true
        },
        comp_city: {
          type: DataTypes.STRING(45),
          allowNull: true,
          comment: "City name.. not getting from cnd"
        },
        comp_cnd_state: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: true,
          comment: "cnd state",
          references: {
            model: 'cent_cnd',
            key: 'id'
          }
        },
        comp_cnd_country: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: true,
          comment: "cnd country ",
          references: {
            model: 'cent_cnd',
            key: 'id'
          }
        },
        comp_tenure: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: true,
          comment: "Tenure in days in current copany"
        },
        comp_pin: {
          type: DataTypes.STRING(16),
          allowNull: true,
          comment: "Pin code of company"
        },
        comp_phone: {
          type: DataTypes.STRING(16),
          allowNull: true,
          comment: "Company phone"
        },
        comp_email: {
          type: DataTypes.STRING(128),
          allowNull: true,
          comment: "Official email id of user in company"
        },
        comp_website: {
          type: DataTypes.STRING(256),
          allowNull: true
        },
        comp_start: {
          type: DataTypes.STRING(256),
          allowNull: true
        },
        comp_end: {
          type: DataTypes.STRING(256),
          allowNull: true
        },
        comp_business_type_cnd: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: true,
          comment: "Which type of company is it",
          references: {
            model: 'cent_cnd',
            key: 'id'
          }
        },
        comp_industry_cnd: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: true,
          comment: "Indutry type in which company deals.",
          references: {
            model: 'cent_cnd',
            key: 'id'
          }
        },
        company_profit: {
          type: DataTypes.DECIMAL(20,2),
          allowNull: true,
          comment: "Business only: Last year profit"
        },
        company_depreciation: {
          type: DataTypes.DECIMAL(20,2),
          allowNull: true,
          comment: "Business only field - Last year depereciataion of the company"
        },
        company_emi_loan: {
          type: DataTypes.DECIMAL(20,2),
          allowNull: true,
          comment: "Business only: Total emi paid by company for business loan"
        },
        company_salary_paid: {
          type: DataTypes.DECIMAL(20,2),
          allowNull: true,
          comment: "Business only: Salary paid last year"
        },
        company_offc_ownership_cnd: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: true,
          comment: "Business only: Owneship of company premises type eg. Lease\/Rent",
          references: {
            model: 'cent_cnd',
            key: 'id'
          }
        },
        is_verified: {
          type: DataTypes.CHAR(1),
          allowNull: true,
          defaultValue: "0"
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
        desig_level_cnd: {
          type: DataTypes.BIGINT,
          allowNull: true
        },
        profession_cnd: {
          type: DataTypes.BIGINT,
          allowNull: true
        },
        other_salaries_paid: {
          type: DataTypes.DECIMAL(20,2),
          allowNull: true
        },
        work_exp: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0
        },
        prev_takehome_sal: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        business_type: {
          type: DataTypes.STRING(64),
          allowNull: true
        },
        office_type: {
          type: DataTypes.STRING(20),
          allowNull: true
        },
        no_of_employee: {
          type: DataTypes.STRING(50),
          allowNull: true
        },
        company_turnover: {
          type: DataTypes.STRING(50),
          allowNull: true
        },
        comp_registration_no: {
          type: DataTypes.STRING(60),
          allowNull: true
        },
        contact2: {
          type: DataTypes.STRING(100),
          allowNull: true
        },
        nature_of_business: {
          type: DataTypes.STRING(50),
          allowNull: true
        },
        industry_type: {
          type: DataTypes.STRING(200),
          allowNull: true
        },
        sub_industry_type: {
          type: DataTypes.STRING(200),
          allowNull: true
        },
        caution_profile: {
          type: DataTypes.STRING(200),
          allowNull: true
        },
        business_cash_component: {
          type: DataTypes.STRING(50),
          allowNull: true
        }
      },
      {
        freezeTableName: true,
        tableName: "cent_employment",
        updatedAt: false,
        createdAt: false,
        sequelize,
      }
    );
    return centEmployment;
  };
  