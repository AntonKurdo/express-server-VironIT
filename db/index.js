const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test_db', 'root', '1214', {
  host: 'localhost',
  dialect: "sqlite",
  logging: false,
});

module.exports = sequelize;