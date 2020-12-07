const { Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize('database', 'Anton', null, {
  host: 'localhost',
  dialect: "sqlite"
});

class User extends Model {};
User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'user'
});

module.exports = {
  User,
  sequelize
};