module.exports = (sequelize, Sequelize, DataTypes) => {
  const centUser = sequelize.define(
    "cent_user",
    {
      uid: {
        type: Sequelize.NUMBER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "users",
          key: "uid",
        },
      },
      fname: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      lname: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      dob: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      add: {
        type: DataTypes.STRING(1024),
        allowNull: true,
        comment: "address of user",
      },
      landmark: {
        type: DataTypes.STRING(512),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      state_cnd: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
      country_cnd: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: "cent_cnd",
          key: "id",
        },
      },
      pin: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      mobile: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      landline: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      photo: {
        type: DataTypes.STRING(512),
        allowNull: true,
      },
      video: {
        type: DataTypes.STRING(512),
        allowNull: true,
      },
      spouse: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      father: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      mother: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      PAN: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      aadhaar_number: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
      },
      aadhaar_yes_no: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      manual_sign: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      facebook: {
        type: DataTypes.STRING(512),
        allowNull: true,
      },
      twitter: {
        type: DataTypes.STRING(512),
        allowNull: true,
      },
      linkedin: {
        type: DataTypes.STRING(512),
        allowNull: true,
      },
      religion_cnd: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: "cent_cnd",
          key: "id",
        },
      },
      caste_cnd: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: "cent_cnd",
          key: "id",
        },
      },
      origin_city: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      origin_state_cnd: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: "cent_cnd",
          key: "id",
        },
      },
      origin_country_cnd: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
      deleted: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        defaultValue: "N",
      },
      created: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      udated: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(1024),
        allowNull: true,
      },
      mothertounge_cnd: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
      marital_status: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      user_vollet: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: true,
      },
      show_fin_details: {
        type: DataTypes.CHAR(1),
        allowNull: true,
        defaultValue: "N",
      },
      gender: {
        type: DataTypes.CHAR(1),
        allowNull: true,
        defaultValue: "M",
      },
      reg_step: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
      fee_payment: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 100,
      },
      plus: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      minus: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      e_wallet: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: true,
        defaultValue: 0.0,
      },
      cid: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      tokenid: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      hash: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      active: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      source: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      old_source: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      mobile_code: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      mobile_verify: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      add2: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      highest_education: {
        type: DataTypes.STRING(8),
        allowNull: true,
      },
      is_account_active: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
      job_assigning: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      registration_type: {
        type: DataTypes.STRING(30),
        allowNull: true,
        defaultValue: "Normal",
      },
      social_id: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      source_type: {
        type: DataTypes.STRING(30),
        allowNull: true,
        comment: "user type ",
      },
      reference_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      other_id: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      gst: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      parent_uid: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      topup_uid: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      agent_uid: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      portfolio_manager: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      collection_charge: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      relation_type: {
        type: DataTypes.STRING(16),
        allowNull: true,
      },
      access_time: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      campaign_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      is_pan_verified: {
        type: DataTypes.CHAR(1),
        allowNull: true,
        defaultValue: "N",
      },
    },
    {
      freezeTableName: true,
      tableName: "cent_user",
      updatedAt: false,
      createdAt: false,
      sequelize,
    }
  );
  return centUser;
};
