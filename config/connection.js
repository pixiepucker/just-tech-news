//import sequelize constructor from lib
const Sequelize = require('sequelize');

require('dotenv').config();

//create connection to db, pass mysql info un and pw
const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PQ, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;
