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
db.centVerification= require('./cent_verification')(sequelize, Sequelize,DataTypes);
db.centLoanDoc= require('./cent_loan_doc')(sequelize, Sequelize,DataTypes);
db.centLoanDetails= require('./cent_loan_detail')(sequelize, Sequelize,DataTypes);
db.centDsaRoles= require('./cent_dsapro_roles')(sequelize, Sequelize,DataTypes);
db.centDsaUserRoles= require('./cent_dsapro_user_roles')(sequelize, Sequelize,DataTypes);
module.exports = db;