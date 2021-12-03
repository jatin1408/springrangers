const { Sequelize } = require("sequelize");
module.exports = new Sequelize(
  "safepay",
  "root",
  "root",
  {
    host: "localhost",
    dialect: "mysql",
  }
);