const { Sequelize, Model, DataTypes, DATE} = require('sequelize');

const sequelize = new Sequelize('database', 'Anton', null, {
  host: 'localhost',
  dialect: "sqlite"
});

const User = sequelize.define('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
})

// ANOTHER WAY TO INITIALIZE A MODEL 

// class User extends Model {};
// User.init({
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false, 
//     unique: true
//   }
// }, {
//   sequelize,
//   modelName: 'user'
// });

module.exports = {
  User,
  sequelize
};