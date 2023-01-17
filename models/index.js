const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const {DataTypes} = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER,
    dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operationsAliases: false,
	pool: {
	max: dbConfig.pool.max,
	min: dbConfig.pool.min,
	acquire: dbConfig.pool.acquire,
	idle: dbConfig.pool.idle
	}
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//db.tutorials = require(“./tutorial.model.js”) (sequelize, Sequelize);
db.users = require("./users")(sequelize, Sequelize,DataTypes);
db.centUser = require('./cent_user')(sequelize, Sequelize,DataTypes);
db.centEmployment = require('./cent_employment')(sequelize, Sequelize,DataTypes);
db.centCnd = require('./cent_cnd')(sequelize, Sequelize,DataTypes);
db.centLoan = require('./cent_loan')(sequelize, Sequelize,DataTypes);
db.centBankDetails= require('./cent_bank_details')(sequelize, Sequelize,DataTypes);
module.exports = db;