const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('test_db', 'root', '1214', {
  host: 'localhost',
  // port: '3306',
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
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING    
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