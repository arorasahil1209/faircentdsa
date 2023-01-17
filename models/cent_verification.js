const Sequelize = require('sequelize');
module.exports = function(sequelize, Sequelize ,DataTypes) {
    const centVerification =  sequelize.define('cent_verification', {
    verification_key: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    verification_key_type: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    verification_value: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    verification_ipaddress: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    verification_create_time: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    verification_expiry_time: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    verification_expiry_limit: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    product_type: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    value1: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    value2: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cent_verification',
    timestamps: false
  });
  return centVerification;
};
