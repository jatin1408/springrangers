const { Sequelize } = require("sequelize");
module.exports = new Sequelize(
  "safepay",
  "sql6456336",
  "FzNttLKCLl",
  {
    host: "sql6.freemysqlhosting.net",
    dialect: "mysql",
  }
);