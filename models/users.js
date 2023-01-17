module.exports = (sequelize, Sequelize,DataTypes) =>{ 
    const Users  = sequelize.define("users", {
    uid: {
      type: Sequelize.NUMBER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.UUID,
      allowNull:false
    },
    pass: {
      type: Sequelize.STRING,
      allowNull:false
    },
    mail: {
      type: Sequelize.STRING,
      allowNull:true
    },
    theme: {
      type: Sequelize.STRING,
      allowNull:true
    },
    signature: {
      type: Sequelize.STRING,
      allowNull:true
    },
    created: {
      type: Sequelize.NUMBER,
      allowNull:false
    },
    access: {
      type: Sequelize.NUMBER,
      allowNull:false
    },
    login: {
      type: Sequelize.NUMBER,
      allowNull:false
    },
    status: {
        type: Sequelize.NUMBER,
        allowNull:false
    },
    timezone: {
      type: Sequelize.STRING,
      allowNull:true
    },
    language: {
      type: Sequelize.STRING,
      allowNull:false
    },
    picture: {
        type: Sequelize.NUMBER,
        allowNull:false
    },
    init: {
        type: Sequelize.STRING,
        allowNull:true
    }, 
  },{
    freezeTableName:true,
    tableName:'users',
    updatedAt: false,
    createdAt: false,
    sequelize
  });  
  return Users;

}